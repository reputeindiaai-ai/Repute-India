// ============================================================
// REPUTEINDIA BACKEND — index.js
// ============================================================

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

// ── Clients ──────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const WA_TOKEN = process.env.WHATSAPP_TOKEN;
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const PORT = process.env.PORT || 3000;

// ============================================================
// HEALTH CHECK
// ============================================================
app.get("/", (req, res) => {
  res.json({ status: "ReputeIndia backend is live 🚀", time: new Date() });
});

// ============================================================
// 1. REGISTER A NEW BUSINESS
// POST /api/businesses
// ============================================================
app.post("/api/businesses", async (req, res) => {
  try {
    const {
      owner_name, business_name, category,
      phone, email, city, whatsapp_number,
      google_place_id, google_maps_url
    } = req.body;

    const trial_started_at = new Date();
    const trial_ends_at = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days

    const { data, error } = await supabase
      .from("businesses")
      .insert([{
        owner_name, business_name, category,
        phone, email, city, whatsapp_number,
        google_place_id, google_maps_url,
        plan: "trial",
        trial_started_at,
        trial_ends_at,
        onboarded: true
      }])
      .select()
      .single();

    if (error) throw error;

    // Send welcome WhatsApp message
    await sendWhatsApp(
      whatsapp_number || phone,
      `Hi ${owner_name}! 👋 Welcome to *ReputeIndia*.\n\nYour 15-day free trial has started for *${business_name}*.\n\nWe will now monitor your reviews and send you instant alerts. Sit back and let AI protect your reputation! 🌟`
    );

    res.json({ success: true, business: data });
  } catch (err) {
    console.error("Register business error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 2. GET ALL BUSINESSES
// GET /api/businesses
// ============================================================
app.get("/api/businesses", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, businesses: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 3. GET SINGLE BUSINESS WITH REVIEWS
// GET /api/businesses/:id
// ============================================================
app.get("/api/businesses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [bizRes, reviewsRes, analyticsRes] = await Promise.all([
      supabase.from("businesses").select("*").eq("id", id).single(),
      supabase.from("reviews").select("*").eq("business_id", id).order("review_date", { ascending: false }).limit(50),
      supabase.from("business_analytics").select("*").eq("business_id", id).order("snapshot_date", { ascending: false }).limit(30)
    ]);

    res.json({
      success: true,
      business: bizRes.data,
      reviews: reviewsRes.data,
      analytics: analyticsRes.data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 4. ADD A REVIEW MANUALLY (or from webhook)
// POST /api/reviews
// ============================================================
app.post("/api/reviews", async (req, res) => {
  try {
    const {
      business_id, reviewer_name, rating,
      review_text, review_date, platform,
      google_review_id
    } = req.body;

    // Analyse sentiment with Claude AI
    const sentiment = await analyseSentiment(review_text, rating);

    const { data: review, error } = await supabase
      .from("reviews")
      .insert([{
        business_id, reviewer_name, rating,
        review_text, platform: platform || "google",
        review_date: review_date || new Date(),
        google_review_id,
        sentiment: sentiment.label,
        sentiment_score: sentiment.score,
        keywords: sentiment.keywords
      }])
      .select()
      .single();

    if (error) throw error;

    // Get business details for alert
    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", business_id)
      .single();

    if (business) {
      // Send WhatsApp alert for new review
      await sendReviewAlert(business, review);

      // Auto-generate AI reply
      await generateAndSaveReply(business, review);

      // Update daily analytics
      await updateAnalytics(business_id);
    }

    res.json({ success: true, review });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 5. GET REVIEWS FOR A BUSINESS
// GET /api/reviews/:business_id
// ============================================================
app.get("/api/reviews/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;
    const { limit = 20, unreplied } = req.query;

    let query = supabase
      .from("reviews")
      .select("*, ai_replies(*)")
      .eq("business_id", business_id)
      .order("review_date", { ascending: false })
      .limit(parseInt(limit));

    if (unreplied === "true") {
      query = query.eq("is_replied", false);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, reviews: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 6. GENERATE AI REPLY FOR A REVIEW
// POST /api/reviews/:review_id/generate-reply
// ============================================================
app.post("/api/reviews/:review_id/generate-reply", async (req, res) => {
  try {
    const { review_id } = req.params;
    const { tone = "professional" } = req.body;

    const { data: review } = await supabase
      .from("reviews")
      .select("*, businesses(*)")
      .eq("id", review_id)
      .single();

    if (!review) return res.status(404).json({ success: false, error: "Review not found" });

    const reply = await generateReply(review.businesses, review, tone);

    const { data: savedReply, error } = await supabase
      .from("ai_replies")
      .insert([{
        review_id,
        business_id: review.business_id,
        generated_reply: reply,
        tone,
        status: "pending"
      }])
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, reply: savedReply });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 7. APPROVE & MARK REPLY AS SENT
// POST /api/replies/:reply_id/approve
// ============================================================
app.post("/api/replies/:reply_id/approve", async (req, res) => {
  try {
    const { reply_id } = req.params;

    const { data, error } = await supabase
      .from("ai_replies")
      .update({
        status: "sent",
        approved_by: "owner",
        approved_at: new Date(),
        sent_at: new Date()
      })
      .eq("id", reply_id)
      .select()
      .single();

    if (error) throw error;

    // Mark the review as replied
    await supabase
      .from("reviews")
      .update({ is_replied: true, reply_sent_at: new Date(), reply_source: "ai_auto" })
      .eq("id", data.review_id);

    res.json({ success: true, reply: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 8. SEND REVIEW REQUEST TO A CUSTOMER
// POST /api/review-requests
// ============================================================
app.post("/api/review-requests", async (req, res) => {
  try {
    const { business_id, customer_name, customer_phone } = req.body;

    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", business_id)
      .single();

    if (!business) return res.status(404).json({ success: false, error: "Business not found" });

    const review_link = business.google_maps_url || `https://search.google.com/local/writereview?placeid=${business.google_place_id}`;

    const message = `Hi ${customer_name || "there"}! 😊\n\nThank you for visiting *${business.business_name}*.\n\nWe'd love to hear your feedback! Please take 1 minute to leave us a review:\n👉 ${review_link}\n\nYour review helps us serve you better. 🙏`;

    const waResult = await sendWhatsApp(customer_phone, message);

    const { data, error } = await supabase
      .from("review_requests")
      .insert([{
        business_id,
        customer_name,
        customer_phone,
        review_link,
        status: "sent",
        wa_message_id: waResult?.messages?.[0]?.id
      }])
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, request: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 9. DASHBOARD STATS FOR A BUSINESS
// GET /api/dashboard/:business_id
// ============================================================
app.get("/api/dashboard/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;

    const [
      bizRes,
      reviewsRes,
      unrepliedRes,
      latestAnalytics
    ] = await Promise.all([
      supabase.from("businesses").select("*").eq("id", business_id).single(),
      supabase.from("reviews").select("rating, sentiment, created_at").eq("business_id", business_id),
      supabase.from("reviews").select("id").eq("business_id", business_id).eq("is_replied", false),
      supabase.from("business_analytics").select("*").eq("business_id", business_id).order("snapshot_date", { ascending: false }).limit(7)
    ]);

    const reviews = reviewsRes.data || [];
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    const sentimentCounts = reviews.reduce((acc, r) => {
      acc[r.sentiment || "neutral"] = (acc[r.sentiment || "neutral"] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      business: bizRes.data,
      stats: {
        total_reviews: reviews.length,
        avg_rating: parseFloat(avgRating),
        unreplied_count: unrepliedRes.data?.length || 0,
        sentiment: sentimentCounts
      },
      recent_analytics: latestAnalytics.data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// WHATSAPP WEBHOOK (Meta sends new messages here)
// ============================================================
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "reputeindia_webhook_2024";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];

      if (message) {
        console.log("Incoming WhatsApp message:", message);
        // Handle incoming messages (e.g. owner replies, customer responses)
        await handleIncomingWhatsApp(message, changes.value);
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(200); // Always return 200 to Meta
  }
});

// ============================================================
// HELPER: Send WhatsApp Message
// ============================================================
async function sendWhatsApp(to, message) {
  try {
    const phone = to.replace(/\D/g, ""); // strip non-digits
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${WA_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (err) {
    console.error("WhatsApp send error:", err.response?.data || err.message);
    return null;
  }
}

// ============================================================
// HELPER: Send Review Alert to Business Owner
// ============================================================
async function sendReviewAlert(business, review) {
  const stars = "⭐".repeat(review.rating);
  const emoji = review.rating >= 4 ? "😊" : review.rating === 3 ? "😐" : "😟";

  const message = `${emoji} *New Review Alert!*\n\n*${business.business_name}*\n\n${stars} (${review.rating}/5)\n👤 ${review.reviewer_name || "Anonymous"}\n\n"${review.review_text?.substring(0, 200) || "No text"}"\n\n_ReputeIndia is generating your AI reply..._`;

  const alertTo = business.whatsapp_number || business.phone;
  const result = await sendWhatsApp(alertTo, message);

  // Log the alert
  await supabase.from("whatsapp_alerts").insert([{
    business_id: business.id,
    review_id: review.id,
    to_number: alertTo,
    message_type: "new_review",
    message_text: message,
    status: result ? "sent" : "failed",
    wa_message_id: result?.messages?.[0]?.id
  }]);
}

// ============================================================
// HELPER: Analyse Sentiment with Claude AI
// ============================================================
async function analyseSentiment(text, rating) {
  if (!text) {
    return { label: rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative", score: rating / 5, keywords: [] };
  }

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        messages: [{
          role: "user",
          content: `Analyse this business review and respond ONLY with JSON (no markdown):
{"label": "positive|neutral|negative", "score": 0.0-1.0, "keywords": ["keyword1", "keyword2", "keyword3"]}

Review: "${text}"
Rating: ${rating}/5`
        }]
      },
      {
        headers: {
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json"
        }
      }
    );

    const raw = response.data.content[0].text.trim();
    return JSON.parse(raw);
  } catch (err) {
    console.error("Sentiment error:", err.message);
    return { label: rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative", score: rating / 5, keywords: [] };
  }
}

// ============================================================
// HELPER: Generate AI Reply with Claude
// ============================================================
async function generateReply(business, review, tone = "professional") {
  try {
    const toneGuide = {
      professional: "professional and polished",
      friendly: "warm, friendly and conversational",
      apologetic: "empathetic and apologetic",
      grateful: "deeply grateful and appreciative"
    };

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `Write a ${toneGuide[tone] || "professional"} reply to this Google review for ${business.business_name} (${business.category} in ${business.city || "India"}).

Review (${review.rating}/5 stars) by ${review.reviewer_name || "a customer"}:
"${review.review_text}"

Requirements:
- Keep it under 100 words
- Sound human, not robotic
- Address specific points mentioned
- End with an invitation to return
- Do NOT use phrases like "We apologize for the inconvenience"
- Write only the reply text, nothing else`
        }]
      },
      {
        headers: {
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.content[0].text.trim();
  } catch (err) {
    console.error("Generate reply error:", err.message);
    return `Thank you for your ${review.rating >= 4 ? "wonderful" : "honest"} review, ${review.reviewer_name || "valued customer"}! We ${review.rating >= 4 ? "truly appreciate your kind words" : "take your feedback seriously and will work to improve"}. We look forward to welcoming you again at ${business.business_name}!`;
  }
}

// ============================================================
// HELPER: Generate and Save Reply Automatically
// ============================================================
async function generateAndSaveReply(business, review) {
  try {
    const tone = review.rating <= 2 ? "apologetic" : review.rating === 3 ? "professional" : "grateful";
    const reply = await generateReply(business, review, tone);

    await supabase.from("ai_replies").insert([{
      review_id: review.id,
      business_id: business.id,
      generated_reply: reply,
      tone,
      status: "pending"
    }]);

    // Send the generated reply to the owner via WhatsApp
    const alertTo = business.whatsapp_number || business.phone;
    const message = `✨ *AI Reply Generated*\n\nFor the ${review.rating}⭐ review by ${review.reviewer_name || "Anonymous"}:\n\n_"${reply}"_\n\nReply "APPROVE" to post this, or log in to your dashboard to edit.`;

    await sendWhatsApp(alertTo, message);
  } catch (err) {
    console.error("Auto-reply error:", err.message);
  }
}

// ============================================================
// HELPER: Update Daily Analytics
// ============================================================
async function updateAnalytics(business_id) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data: reviews } = await supabase
      .from("reviews")
      .select("rating, sentiment, is_replied")
      .eq("business_id", business_id);

    if (!reviews) return;

    const stats = {
      total_reviews: reviews.length,
      avg_rating: reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0,
      positive_count: reviews.filter(r => r.sentiment === "positive").length,
      neutral_count: reviews.filter(r => r.sentiment === "neutral").length,
      negative_count: reviews.filter(r => r.sentiment === "negative").length,
      replied_count: reviews.filter(r => r.is_replied).length,
      unreplied_count: reviews.filter(r => !r.is_replied).length,
    };

    await supabase.from("business_analytics").upsert([{
      business_id,
      snapshot_date: today,
      ...stats
    }], { onConflict: "business_id,snapshot_date" });
  } catch (err) {
    console.error("Analytics update error:", err.message);
  }
}

// ============================================================
// HELPER: Handle Incoming WhatsApp Messages
// ============================================================
async function handleIncomingWhatsApp(message, value) {
  try {
    const from = message.from;
    const text = message.text?.body?.trim().toUpperCase();

    if (text === "APPROVE") {
      // Find the latest pending reply for this business owner
      const { data: business } = await supabase
        .from("businesses")
        .select("id")
        .eq("whatsapp_number", from)
        .single();

      if (business) {
        const { data: pendingReply } = await supabase
          .from("ai_replies")
          .select("*")
          .eq("business_id", business.id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (pendingReply) {
          await supabase.from("ai_replies")
            .update({ status: "sent", approved_by: "owner", approved_at: new Date(), sent_at: new Date() })
            .eq("id", pendingReply.id);

          await supabase.from("reviews")
            .update({ is_replied: true, reply_sent_at: new Date(), reply_source: "ai_auto" })
            .eq("id", pendingReply.review_id);

          await sendWhatsApp(from, "✅ Reply approved and marked as sent! Log in to your Google Business Profile to post it.");
        }
      }
    }
  } catch (err) {
    console.error("Incoming WA handler error:", err.message);
  }
}

// ============================================================
// CRON: Weekly Report (every Monday 9 AM)
// ============================================================
cron.schedule("0 9 * * 1", async () => {
  console.log("Running weekly report cron...");
  try {
    const { data: businesses } = await supabase
      .from("businesses")
      .select("*")
      .eq("subscription_active", true);

    for (const business of (businesses || [])) {
      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating, sentiment, is_replied")
        .eq("business_id", business.id)
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (!reviews?.length) continue;

      const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
      const positive = reviews.filter(r => r.sentiment === "positive").length;
      const negative = reviews.filter(r => r.sentiment === "negative").length;

      const msg = `📊 *Weekly Report — ${business.business_name}*\n\n⭐ ${reviews.length} new reviews this week\n📈 Average rating: ${avg.toFixed(1)}/5\n😊 Positive: ${positive} | 😟 Negative: ${negative}\n\nKeep responding to reviews to stay ahead! 💪\n\n_ReputeIndia — Protecting your reputation 24/7_`;

      await sendWhatsApp(business.whatsapp_number || business.phone, msg);
    }
  } catch (err) {
    console.error("Weekly report cron error:", err.message);
  }
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`✅ ReputeIndia backend running on port ${PORT}`);
});
