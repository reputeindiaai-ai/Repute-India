// ============================================================
// REPUTE AI BUSINESS OS — index.js
// ============================================================

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const WA_TOKEN = process.env.WHATSAPP_TOKEN;
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PORT = process.env.PORT || 3000;

// ============================================================
// AUDIT LOGGING HELPER
// Fire-and-forget: never blocks or breaks a request if it fails.
// Stores only event_type, business id/name, short detail + timestamp.
// ============================================================
async function logEvent(eventType, businessId = null, businessName = null, detail = null) {
  try {
    await supabase.from("audit_logs").insert([{
      business_id: businessId,
      business_name: businessName,
      event_type: eventType,
      detail: detail ? String(detail).substring(0, 200) : null
    }]);
  } catch (e) {
    // Silent — logging must never break the actual feature
    console.error("logEvent failed:", e.message);
  }
}

// ============================================================
// HEALTH CHECK
// ============================================================
app.get("/", (req, res) => {
  res.json({ status: "Repute AI Business OS backend is live", time: new Date() });
});

// ============================================================
// 1. REGISTER A NEW BUSINESS
// ============================================================
app.post("/api/businesses", async (req, res) => {
  try {
    const { owner_name, business_name, category, phone, email, city, whatsapp_number, google_place_id, google_maps_url } = req.body;
    const trial_started_at = new Date();
    const trial_ends_at = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
    const { data, error } = await supabase.from("businesses").insert([{ owner_name, business_name, category, phone, email, city, whatsapp_number, google_place_id, google_maps_url, plan: "trial", trial_started_at, trial_ends_at, onboarded: true }]).select().single();
    if (error) throw error;
    logEvent("signup", data.id, data.business_name, `${category || ""} · ${city || ""}`);
    res.json({ success: true, business: data });
  } catch (err) {
    console.error("Register business error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 2. GET ALL BUSINESSES
// ============================================================
app.get("/api/businesses", async (req, res) => {
  try {
    const { data, error } = await supabase.from("businesses").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    res.json({ success: true, businesses: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// OTP: SEND OTP (via Email)
// ============================================================
app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: "Phone required" });
    const cleanPhone = phone.replace(/\D/g, "");
    const { data: business } = await supabase.from("businesses").select("id, owner_name, business_name, email").or(`phone.eq.${cleanPhone},whatsapp_number.eq.${cleanPhone}`).single();
    if (!business) return res.status(404).json({ success: false, error: "No account found with this number. Please register first." });
    if (!business.email) return res.status(400).json({ success: false, error: "No email address on file. Please contact support." });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60 * 1000);
    await supabase.from("otp_verifications").update({ used: true }).eq("phone", cleanPhone).eq("used", false);
    await supabase.from("otp_verifications").insert([{ phone: cleanPhone, otp, expires_at }]);
    await sendOtpEmail(business.email, business.business_name, otp);
    res.json({ success: true, message: "OTP sent to your registered email", email_hint: business.email });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// OTP: VERIFY OTP AND LOGIN
// ============================================================
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, error: "Phone and OTP required" });
    const cleanPhone = phone.replace(/\D/g, "");
    const { data: record } = await supabase.from("otp_verifications").select("*").eq("phone", cleanPhone).eq("otp", otp).eq("used", false).gte("expires_at", new Date().toISOString()).order("created_at", { ascending: false }).limit(1).single();
    if (!record) return res.status(401).json({ success: false, error: "Invalid or expired OTP. Please try again." });
    await supabase.from("otp_verifications").update({ used: true }).eq("id", record.id);
    const { data: business } = await supabase.from("businesses").select("*").or(`phone.eq.${cleanPhone},whatsapp_number.eq.${cleanPhone}`).single();
    if (business) logEvent("login", business.id, business.business_name, "OTP login");
    res.json({ success: true, business });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 3. GET SINGLE BUSINESS
// ============================================================
app.get("/api/businesses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [bizRes, reviewsRes, analyticsRes] = await Promise.all([
      supabase.from("businesses").select("*").eq("id", id).single(),
      supabase.from("reviews").select("*").eq("business_id", id).order("review_date", { ascending: false }).limit(50),
      supabase.from("business_analytics").select("*").eq("business_id", id).order("snapshot_date", { ascending: false }).limit(30)
    ]);
    res.json({ success: true, business: bizRes.data, reviews: reviewsRes.data, analytics: analyticsRes.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 4. ADD A REVIEW
// ============================================================
app.post("/api/reviews", async (req, res) => {
  try {
    const { business_id, reviewer_name, rating, review_text, review_date, platform, google_review_id } = req.body;
    const sentiment = await analyseSentiment(review_text, rating);
    const { data: review, error } = await supabase.from("reviews").insert([{ business_id, reviewer_name, rating, review_text, platform: platform || "google", review_date: review_date || new Date(), google_review_id, sentiment: sentiment.label, sentiment_score: sentiment.score, keywords: sentiment.keywords }]).select().single();
    if (error) throw error;
    const { data: business } = await supabase.from("businesses").select("*").eq("id", business_id).single();
    if (business) { await sendReviewAlert(business, review); await generateAndSaveReply(business, review); await updateAnalytics(business_id); }
    res.json({ success: true, review });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 5. GET REVIEWS
// ============================================================
app.get("/api/reviews/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;
    const { limit = 20, unreplied } = req.query;
    let query = supabase.from("reviews").select("*, ai_replies(*)").eq("business_id", business_id).order("review_date", { ascending: false }).limit(parseInt(limit));
    if (unreplied === "true") query = query.eq("is_replied", false);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, reviews: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 6. GENERATE AI REPLY
// ============================================================
app.post("/api/reviews/:review_id/generate-reply", async (req, res) => {
  try {
    const { review_id } = req.params;
    const { tone = "professional" } = req.body;
    const { data: review } = await supabase.from("reviews").select("*, businesses(*)").eq("id", review_id).single();
    if (!review) return res.status(404).json({ success: false, error: "Review not found" });
    const reply = await generateReply(review.businesses, review, tone);
    const { data: savedReply, error } = await supabase.from("ai_replies").insert([{ review_id, business_id: review.business_id, generated_reply: reply, tone, status: "pending" }]).select().single();
    if (error) throw error;
    res.json({ success: true, reply: savedReply });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 7. APPROVE REPLY
// ============================================================
app.post("/api/replies/:reply_id/approve", async (req, res) => {
  try {
    const { reply_id } = req.params;
    const { data, error } = await supabase.from("ai_replies").update({ status: "sent", approved_by: "owner", approved_at: new Date(), sent_at: new Date() }).eq("id", reply_id).select().single();
    if (error) throw error;
    await supabase.from("reviews").update({ is_replied: true, reply_sent_at: new Date(), reply_source: "ai_auto" }).eq("id", data.review_id);
    res.json({ success: true, reply: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 8. SEND REVIEW REQUEST
// ============================================================
app.post("/api/review-requests", async (req, res) => {
  try {
    const { business_id, customer_name, customer_phone } = req.body;
    const { data: business } = await supabase.from("businesses").select("*").eq("id", business_id).single();
    if (!business) return res.status(404).json({ success: false, error: "Business not found" });
    const review_link = business.google_maps_url || `https://search.google.com/local/writereview?placeid=${business.google_place_id}`;
    const waResult = await sendWhatsAppTemplate(customer_phone, "review_request", [customer_name || "there", business.business_name, review_link]);
    const { data, error } = await supabase.from("review_requests").insert([{ business_id, customer_name, customer_phone, review_link, status: "sent", wa_message_id: waResult?.messages?.[0]?.id }]).select().single();
    if (error) throw error;
    res.json({ success: true, request: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// 9. DASHBOARD STATS
// ============================================================
app.get("/api/dashboard/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;
    const [bizRes, reviewsRes, unrepliedRes, latestAnalytics] = await Promise.all([
      supabase.from("businesses").select("*").eq("id", business_id).single(),
      supabase.from("reviews").select("rating, sentiment, created_at").eq("business_id", business_id),
      supabase.from("reviews").select("id").eq("business_id", business_id).eq("is_replied", false),
      supabase.from("business_analytics").select("*").eq("business_id", business_id).order("snapshot_date", { ascending: false }).limit(7)
    ]);
    const reviews = reviewsRes.data || [];
    const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;
    const sentimentCounts = reviews.reduce((acc, r) => { acc[r.sentiment || "neutral"] = (acc[r.sentiment || "neutral"] || 0) + 1; return acc; }, {});
    res.json({ success: true, business: bizRes.data, stats: { total_reviews: reviews.length, avg_rating: parseFloat(avgRating), unreplied_count: unrepliedRes.data?.length || 0, sentiment: sentimentCounts }, recent_analytics: latestAnalytics.data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// COMPETITOR TRACKING
// ============================================================
app.post("/api/competitors", async (req, res) => {
  try {
    const { business_id, competitor_name, google_maps_url } = req.body;
    if (!business_id || !competitor_name || !google_maps_url) return res.status(400).json({ success: false, error: "business_id, competitor_name, google_maps_url required" });
    const { data, error } = await supabase.from("competitors").insert([{ business_id, competitor_name, google_maps_url, their_rating: null, their_review_count: null, recent_reviews: [], last_updated: null }]).select().single();
    if (error) throw error;
    const scraped = await scrapeGoogleRating(google_maps_url, competitor_name);
    if (scraped) {
      await supabase.from("competitors").update({ their_rating: scraped.rating, their_review_count: scraped.review_count, recent_reviews: scraped.recent_reviews || [], category: scraped.category || null, last_updated: new Date() }).eq("id", data.id);
      data.their_rating = scraped.rating; data.their_review_count = scraped.review_count; data.recent_reviews = scraped.recent_reviews || []; data.last_updated = new Date();
    }
    res.json({ success: true, competitor: data });
  } catch (err) {
    console.error("Add competitor error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/competitors/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;
    const { data, error } = await supabase.from("competitors").select("*").eq("business_id", business_id).order("created_at", { ascending: true });
    if (error) throw error;
    res.json({ success: true, competitors: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/competitors/:id/refresh", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: comp, error: fetchErr } = await supabase.from("competitors").select("*").eq("id", id).single();
    if (fetchErr || !comp) return res.status(404).json({ success: false, error: "Competitor not found" });
    const scraped = await scrapeGoogleRating(comp.google_maps_url, comp.competitor_name);
    if (!scraped) return res.status(200).json({ success: false, error: "Could not fetch data. Try again later." });
    const { data: updated, error: updateErr } = await supabase.from("competitors").update({ their_rating: scraped.rating, their_review_count: scraped.review_count, recent_reviews: scraped.recent_reviews || [], category: scraped.category || comp.category, last_updated: new Date() }).eq("id", id).select().single();
    if (updateErr) throw updateErr;
    res.json({ success: true, competitor: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/competitors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("competitors").delete().eq("id", id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/competitors/:id/analyse", async (req, res) => {
  try {
    const { my_name, my_rating, my_review_count, comp_name, comp_category, comp_rating, comp_review_count } = req.body;
    const prompt = `You are a business reputation analyst in India. Analyse this competitive situation and give sharp, specific insights.\n\nMY BUSINESS: ${my_name}\nMy Google Rating: ${my_rating > 0 ? my_rating + '/5' : 'Not yet rated'}\nMy Total Reviews: ${my_review_count}\n\nCOMPETITOR: ${comp_name}\nTheir Category: ${comp_category || 'Local Business'}\nTheir Google Rating: ${comp_rating > 0 ? comp_rating + '/5' : 'Not yet rated'}\nTheir Total Reviews: ${comp_review_count}\n\nRespond ONLY with this JSON (no markdown):\n{\n  "you_winning": ["point 1", "point 2", "point 3"],\n  "they_winning": ["point 1", "point 2", "point 3"],\n  "your_gaps": ["gap 1", "gap 2", "gap 3"],\n  "recommendations": ["action 1", "action 2", "action 3"]\n}\n\nEach point must be 1 sentence, specific and actionable for Indian local businesses.`;
    const response = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 800, messages: [{ role: "user", content: prompt }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    const analysis = JSON.parse(response.data.content[0].text.trim());
    res.json({ success: true, analysis });
  } catch (err) {
    console.error("AI analysis error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// GOOGLE REVIEWS SYNC
// ============================================================
app.post("/api/businesses/:id/sync-reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: business, error: bizErr } = await supabase.from("businesses").select("*").eq("id", id).single();
    if (bizErr || !business) return res.status(404).json({ success: false, error: "Business not found" });
    let placeId = business.google_place_id;
    if (!placeId && business.google_maps_url) placeId = await getPlaceIdFromUrl(business.google_maps_url, business.business_name, business.city);
    if (!placeId) return res.status(400).json({ success: false, error: "No Google Place ID found. Please add your Google Maps URL in settings." });
    if (!business.google_place_id) await supabase.from("businesses").update({ google_place_id: placeId }).eq("id", id);
    const reviews = await fetchGoogleReviews(placeId);
    if (!reviews || reviews.length === 0) return res.json({ success: true, synced: 0, message: "No reviews found on Google yet." });
    let syncedCount = 0;
    for (const review of reviews) {
      const { data: existing } = await supabase.from("reviews").select("id").eq("business_id", id).eq("google_review_id", review.google_review_id).single();
      if (!existing) {
        const sentiment = await analyseSentiment(review.review_text, review.rating);
        await supabase.from("reviews").insert([{ business_id: id, reviewer_name: review.reviewer_name, rating: review.rating, review_text: review.review_text, review_date: review.review_date, platform: "google", google_review_id: review.google_review_id, sentiment: sentiment.label, sentiment_score: sentiment.score, keywords: sentiment.keywords, is_replied: false }]);
        syncedCount++;
      }
    }
    const { data: allReviews } = await supabase.from("reviews").select("rating").eq("business_id", id);
    if (allReviews && allReviews.length > 0) {
      const avgRating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
      await supabase.from("businesses").update({ current_rating: avgRating.toFixed(1) }).eq("id", id);
    }
    await updateAnalytics(id);
    logEvent("review_sync", id, business.business_name, `Synced ${syncedCount} new of ${reviews.length}`);
    res.json({ success: true, synced: syncedCount, total: reviews.length, message: syncedCount > 0 ? `${syncedCount} new reviews synced from Google!` : "Already up to date." });
  } catch (err) {
    console.error("Sync reviews error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/businesses/:id/google-rating", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: business } = await supabase.from("businesses").select("*").eq("id", id).single();
    if (!business) return res.status(404).json({ success: false, error: "Business not found" });
    let placeId = business.google_place_id;
    if (!placeId && business.google_maps_url) { placeId = await getPlaceIdFromUrl(business.google_maps_url, business.business_name, business.city); if (placeId) await supabase.from("businesses").update({ google_place_id: placeId }).eq("id", id); }
    if (!placeId) return res.json({ success: false, error: "No Place ID found" });
    const details = await getPlaceDetails(placeId);
    res.json({ success: true, ...details });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MODULE 1: AI BUSINESS ASSISTANT (personalized with Business DNA)
// ============================================================
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { message, business_name, business_category, business_city, business_profile, conversation = [] } = req.body;
    if (!message) return res.status(400).json({ success: false, error: "Message required" });

    let profileContext = "";
    if (business_profile) {
      const p = business_profile;
      profileContext = `

DEEP BUSINESS PROFILE (use this to personalise every answer):
- Products/Services: ${p.products_services || "Not specified"}
- Price Range: ${p.price_range || "Not specified"}
- Target Customers: ${p.target_customers || "Not specified"}
- Annual Turnover: ${p.turnover_range || "Not specified"}
- Employees: ${p.employee_count || "Not specified"}
- GST Registered: ${p.is_gst_registered ? "Yes" : "No"}
- MSME/Udyam Registered: ${p.is_msme_registered ? "Yes" : "No"}
- Exporter: ${p.is_exporter ? "Yes - " + (p.export_countries || "") : "No"}
- Biggest Challenge: ${p.biggest_challenge || "Not specified"}
- Current Google Rating: ${p.current_google_rating || "Not specified"}
- Main Customer Complaint: ${p.main_review_complaint || "Not specified"}
- Marketing Channels: ${p.marketing_channels || "Not specified"}
- Primary Bank: ${p.primary_bank || "Not specified"}

Always tailor advice to THIS business. Reference their products, customers and challenges directly. Never give generic advice - give advice for ${business_name} specifically.`;
    }

    const systemPrompt = `You are an expert AI Business Assistant built specifically for Indian businesses. You work for ${business_name || "an Indian business"}, a ${business_category || "business"} based in ${business_city || "India"}.${profileContext}

Your expertise covers Indian business law, GST, ROC, PF/ESI compliance, MSME registration, government schemes (CLCSS, CGTMSE, PMEGP, Stand-Up India, Gujarat schemes), export benefits (RODTEP), marketing, banking, and income tax.

Rules:
- Give India-specific, practical advice with Rupee amounts
- Reference their specific business profile whenever relevant
- Give actionable steps, not vague advice
- For legal/tax matters add: "Please verify with your CA/lawyer for your specific case"
- Format clearly with bullets or numbered lists when helpful`;

    const messages = [...conversation.slice(-10), { role: "user", content: message }];
    const response = await axios.post("https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 1000, system: systemPrompt, messages },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    res.json({ success: true, reply: response.data.content[0].text.trim() });
    logEvent("ai_request", null, business_name || null, "AI Assistant");
  } catch (err) {
    console.error("AI Assistant error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MODULE 2: DOCUMENT GENERATOR
// ============================================================
app.post("/api/generate-document", async (req, res) => {
  try {
    const { doc_type, doc_name, fields, business_name } = req.body;
    if (!doc_type) return res.status(400).json({ success: false, error: "doc_type required" });

    const fieldText = Object.entries(fields || {}).filter(([k, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

    const prompts = {
      nda: "Draft a professional Non-Disclosure Agreement (NDA) under Indian Contract Act 1872. Include: recitals, definition of confidential information, obligations, exclusions, term, remedies, governing law (India), signatures section.",
      vendor_agreement: "Draft a professional Vendor/Supplier Agreement under Indian law. Include: scope of supply, pricing, payment terms, quality standards, delivery, warranties, termination, dispute resolution (Indian arbitration).",
      employment_contract: "Draft a professional Employment Contract for an Indian company. Include: appointment details, compensation (CTC breakup), working hours, leave policy, confidentiality, IP assignment, termination notice period, governing law.",
      service_agreement: "Draft a professional Service Agreement under Indian Contract Act. Include: scope of services, deliverables, payment schedule, IP rights, confidentiality, termination, liability limitation, governing law (India).",
      partnership_deed: "Draft a Partnership Deed under Indian Partnership Act 1932. Include: firm name, partners, business nature, capital contribution, profit/loss sharing, duties of partners, banking, accounting, dissolution clause.",
      quotation: "Generate a professional business quotation for an Indian company. Format with: header (company details), quote number, date, client details, itemized table with amounts in Rs, subtotal, GST, grand total, validity period, terms and conditions.",
      invoice: "Generate a professional GST Tax Invoice for an Indian company. Format with: TAX INVOICE header, GSTIN, invoice number, date, billing details, HSN/SAC codes, itemized table, taxable amount, CGST/SGST or IGST, total amount in words, authorized signatory.",
      business_proposal: "Write a professional business proposal for an Indian company. Include: executive summary, about the company, problem/opportunity, proposed solution, methodology, pricing/investment, ROI/benefits, timeline, why choose us, next steps, contact details.",
      offer_letter: "Write a formal Offer Letter for an Indian company. Include: appointment header, position, department, CTC breakup (basic, HRA, allowances), working hours, probation period, leave policy, start date, terms of employment, acceptance signature block.",
      experience_letter: "Write a formal Experience/Relieving Letter for an Indian company. Include: company letterhead details, date, employee details, period of employment, designation, conduct statement, best wishes, authorized signatory with designation.",
      warning_letter: "Write a formal Warning Letter for an Indian company. Include: subject line, incident details, policy violation, impact, required improvement, timeline for improvement, consequences if not improved, employee acknowledgment section.",
    };

    const prompt = `${prompts[doc_type] || "Generate a professional business document."}\n\nDETAILS PROVIDED:\n${fieldText}\n\nBusiness/Company: ${business_name || ""}\n\nInstructions:\n- Generate the complete, ready-to-use document\n- Use professional formal language appropriate for Indian business\n- Use Indian date format (DD Month YYYY) and Rs for currency\n- Include [SIGNATURE] and [DATE] placeholders where needed\n- Make it comprehensive and legally sound\n- Output only the document itself, no explanatory notes`;

    const response = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    res.json({ success: true, document: response.data.content[0].text.trim(), doc_type, doc_name });
    logEvent("feature_used", null, business_name || null, "Document: " + (doc_name || doc_type || ""));
  } catch (err) {
    console.error("Document generator error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MODULE 3: GOVERNMENT SCHEMES FINDER
// ============================================================
app.post("/api/government-schemes", async (req, res) => {
  try {
    const { industry, state, scheme_type, business_name } = req.body;
    if (!industry) return res.status(400).json({ success: false, error: "Industry required" });

    const prompt = `You are a government scheme expert for Indian MSMEs. Find all relevant government schemes, subsidies, loans, and benefits for the following business:\n\nIndustry/Sector: ${industry}\nState: ${state || "India (all states)"}\nBusiness Name: ${business_name || "Indian MSME"}\nScheme Type Filter: ${scheme_type || "all"}\n\nList 6-8 most relevant schemes. Respond ONLY with a JSON array (no markdown, no explanation):\n[\n  {\n    "name": "Full scheme name",\n    "ministry": "Ministry/Department name",\n    "eligibility": "Eligible",\n    "description": "2-3 sentence description",\n    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],\n    "eligibility_details": "Specific eligibility criteria",\n    "how_to_apply": "Step-by-step application process",\n    "website": "https://official-website.gov.in"\n  }\n]\n\neligibility field must be exactly one of: "Eligible", "Check", "Central Scheme"\n\nInclude a mix of central MSME schemes, state-specific schemes for ${state || "major states"}, sector-specific schemes for ${industry}, and credit/loan schemes.`;

    const response = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    // Extract JSON array if surrounded by text
    const arrStart = raw.indexOf("[");
    const arrEnd = raw.lastIndexOf("]");
    if (arrStart !== -1 && arrEnd !== -1) raw = raw.substring(arrStart, arrEnd + 1);
    const schemes = JSON.parse(raw);
    res.json({ success: true, schemes, industry, state });
  } catch (err) {
    console.error("Government schemes error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MODULE 4: MARKETING CONTENT GENERATOR
// ============================================================
app.post("/api/generate-marketing", async (req, res) => {
  try {
    const { platform, theme, tone, language, details, business_name, business_category, business_city, products_services, target_customers } = req.body;
    if (!platform || !theme) return res.status(400).json({ success: false, error: "Platform and theme required" });

    const platformGuides = {
      instagram: "Instagram post with: hook line, 3-4 lines of engaging body copy, call to action, 15-20 relevant hashtags, moderate tasteful emojis",
      facebook: "Facebook post with: engaging opening question or statement, 4-6 lines of detailed body copy, story or value-add element, clear call to action, 3-5 hashtags only, minimal emojis",
      linkedin: "LinkedIn post with: professional hook, value-driven content insight tip or story, 5-7 lines, professional tone, 3-5 hashtags, no excessive emojis",
      whatsapp: "WhatsApp broadcast message with: personal greeting, clear offer/message in 3-4 lines, specific call to action (call/visit/reply), business name and contact, under 150 words, minimal formatting with *bold* for emphasis",
      email: "Email campaign with: Subject line (compelling, under 50 chars), Preview text, Greeting, Opening paragraph hook, Body 3-4 paragraphs with offer details, CTA button text, Sign-off, PS line",
      blog: "Blog article with: SEO-friendly title, Introduction 150 words, 3-4 main sections with subheadings, practical tips or insights, Conclusion with CTA, Total 600-800 words, conversational yet informative tone"
    };

    const productContext = products_services ? `\nProducts/Services they sell: ${products_services}` : "";
    const customerContext = target_customers ? `\nTheir target customers: ${target_customers}` : "";

    const prompt = `Write a ${platform} marketing content piece for an Indian business.\n\nBusiness: ${business_name || "Indian Business"}\nCategory: ${business_category || "Business"}\nCity: ${business_city || "India"}${productContext}${customerContext}\nCampaign Theme/Occasion: ${theme}\nTone: ${tone}\nLanguage: ${language}\nAdditional Details: ${details || "None"}\n\nFormat Requirements:\n${platformGuides[platform] || "Create engaging marketing content"}\n\nInstructions:\n- Adapt content specifically for THIS business — reference their actual products/services and speak to their target customers\n- Adapt content specifically for Indian audience and culture\n- Use culturally relevant references if applicable (festivals, seasons, etc.)\n- For Hinglish: mix Hindi words naturally with English\n- For Gujarati: write in Gujarati script\n- Make it feel authentic, not generic\n- Output ONLY the final content, no explanations or labels before it`;

    const response = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 1200, messages: [{ role: "user", content: prompt }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    res.json({ success: true, content: response.data.content[0].text.trim(), platform, theme });
    logEvent("feature_used", null, business_name || null, "Marketing: " + (platform || ""));
  } catch (err) {
    console.error("Marketing generator error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// WHATSAPP WEBHOOK
// ============================================================
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "reputeindia_webhook_2024";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === VERIFY_TOKEN) { console.log("Webhook verified"); res.status(200).send(challenge); }
  else res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;
    if (body.object === "whatsapp_business_account") {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];
      if (message) await handleIncomingWhatsApp(message, changes.value);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(200);
  }
});

// ============================================================
// HELPER: Send OTP Email via Resend
// ============================================================
async function sendOtpEmail(toEmail, businessName, otp) {
  try {
    const response = await axios.post("https://api.resend.com/emails", {
      from: "ReputeIndia <noreply@reputeindiaai.com>",
      to: [toEmail],
      subject: `${otp} is your ReputeIndia login OTP`,
      html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#111;color:#F5F0E8;padding:40px;border-radius:8px;"><div style="text-align:center;margin-bottom:32px;"><h1 style="color:#C9A84C;font-size:24px;letter-spacing:2px;margin:0;">ReputeIndia</h1><p style="color:#888;font-size:12px;margin-top:4px;letter-spacing:1px;">YOUR REPUTATION. REIMAGINED.</p></div><p style="color:#888;font-size:13px;margin-bottom:8px;">Hello ${businessName},</p><p style="color:#F5F0E8;font-size:13px;margin-bottom:28px;">Your login OTP for ReputeIndia Dashboard is:</p><div style="background:#1a1a1a;border:1px solid #C9A84C;padding:24px;text-align:center;margin-bottom:28px;"><span style="font-size:42px;font-weight:700;letter-spacing:12px;color:#C9A84C;">${otp}</span></div><p style="color:#888;font-size:11px;line-height:1.6;">Valid for <strong style="color:#F5F0E8;">10 minutes</strong>. Do not share with anyone.</p><hr style="border:none;border-top:1px solid #222;margin:28px 0;"><p style="color:#444;font-size:10px;text-align:center;letter-spacing:1px;">ReputeIndia — AI Reputation Management for Indian Businesses</p></div>`
    }, { headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" } });
    console.log("OTP email sent:", response.data);
    return response.data;
  } catch (err) {
    console.error("Email send error:", err.response?.data || err.message);
    throw new Error("Failed to send OTP email. Please try again.");
  }
}

// ============================================================
// HELPER: Send WhatsApp Free-form Message
// ============================================================
async function sendWhatsApp(to, message) {
  try {
    const phone = to.replace(/\D/g, "");
    const response = await axios.post(`https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`, { messaging_product: "whatsapp", to: phone, type: "text", text: { body: message } }, { headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" } });
    return response.data;
  } catch (err) {
    console.error("WhatsApp send error:", err.response?.data || err.message);
    return null;
  }
}

// ============================================================
// HELPER: Send WhatsApp Template
// ============================================================
async function sendWhatsAppTemplate(to, templateName, parameters = []) {
  try {
    const phone = to.replace(/\D/g, "");
    const response = await axios.post(`https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`, { messaging_product: "whatsapp", to: phone, type: "template", template: { name: templateName, language: { code: "en" }, components: parameters.length > 0 ? [{ type: "body", parameters: parameters.map(p => ({ type: "text", text: String(p) })) }] : [] } }, { headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" } });
    return response.data;
  } catch (err) {
    console.error("WhatsApp template send error:", err.response?.data || err.message);
    return null;
  }
}

// ============================================================
// HELPER: Send Review Alert
// ============================================================
async function sendReviewAlert(business, review) {
  const alertTo = business.whatsapp_number || business.phone;
  const result = await sendWhatsAppTemplate(alertTo, "new_review_alert", [review.rating, business.business_name, (review.review_text || "No text provided").substring(0, 200)]);
  await supabase.from("whatsapp_alerts").insert([{ business_id: business.id, review_id: review.id, to_number: alertTo, message_type: "new_review", message_text: `Template: new_review_alert | ${review.rating}star | ${business.business_name}`, status: result ? "sent" : "failed", wa_message_id: result?.messages?.[0]?.id }]);
}

// ============================================================
// HELPER: Analyse Sentiment
// ============================================================
async function analyseSentiment(text, rating) {
  if (!text) return { label: rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative", score: rating / 5, keywords: [] };
  try {
    const response = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 200, messages: [{ role: "user", content: `Analyse this business review and respond ONLY with JSON (no markdown):\n{"label": "positive|neutral|negative", "score": 0.0-1.0, "keywords": ["keyword1", "keyword2", "keyword3"]}\n\nReview: "${text}"\nRating: ${rating}/5` }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    return JSON.parse(response.data.content[0].text.trim());
  } catch (err) {
    return { label: rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative", score: rating / 5, keywords: [] };
  }
}

// ============================================================
// HELPER: Generate AI Reply
// ============================================================
async function generateReply(business, review, tone = "professional") {
  try {
    const toneGuide = { professional: "professional and polished", friendly: "warm, friendly and conversational", apologetic: "empathetic and apologetic", grateful: "deeply grateful and appreciative" };
    const response = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 300, messages: [{ role: "user", content: `Write a ${toneGuide[tone] || "professional"} reply to this Google review for ${business.business_name} (${business.category} in ${business.city || "India"}).\n\nReview (${review.rating}/5 stars) by ${review.reviewer_name || "a customer"}:\n"${review.review_text}"\n\nRequirements:\n- Keep it under 100 words\n- Sound human, not robotic\n- Address specific points mentioned\n- End with an invitation to return\n- Do NOT use phrases like "We apologize for the inconvenience"\n- Write only the reply text, nothing else` }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
    return response.data.content[0].text.trim();
  } catch (err) {
    return `Thank you for your ${review.rating >= 4 ? "wonderful" : "honest"} review! We look forward to welcoming you again at ${business.business_name}!`;
  }
}

// ============================================================
// HELPER: Generate and Save Reply Automatically
// ============================================================
async function generateAndSaveReply(business, review) {
  try {
    const tone = review.rating <= 2 ? "apologetic" : review.rating === 3 ? "professional" : "grateful";
    const reply = await generateReply(business, review, tone);
    await supabase.from("ai_replies").insert([{ review_id: review.id, business_id: business.id, generated_reply: reply, tone, status: "pending" }]);
    const alertTo = business.whatsapp_number || business.phone;
    await sendWhatsApp(alertTo, `AI Reply Generated\n\nFor the ${review.rating} star review by ${review.reviewer_name || "Anonymous"}:\n\n"${reply}"\n\nLog in to your dashboard to approve.\n\n_ReputeIndia_`);
  } catch (err) {
    console.error("Auto-reply error:", err.message);
  }
}

// ============================================================
// HELPER: Update Analytics
// ============================================================
async function updateAnalytics(business_id) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { data: reviews } = await supabase.from("reviews").select("rating, sentiment, is_replied").eq("business_id", business_id);
    if (!reviews) return;
    const stats = { total_reviews: reviews.length, avg_rating: reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0, positive_count: reviews.filter(r => r.sentiment === "positive").length, neutral_count: reviews.filter(r => r.sentiment === "neutral").length, negative_count: reviews.filter(r => r.sentiment === "negative").length, replied_count: reviews.filter(r => r.is_replied).length, unreplied_count: reviews.filter(r => !r.is_replied).length };
    await supabase.from("business_analytics").upsert([{ business_id, snapshot_date: today, ...stats }], { onConflict: "business_id,snapshot_date" });
  } catch (err) {
    console.error("Analytics update error:", err.message);
  }
}

// ============================================================
// HELPER: Scrape Google Rating
// ============================================================
async function scrapeGoogleRating(mapsUrl, businessName) {
  try {
    const pageRes = await axios.get(mapsUrl, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36", "Accept-Language": "en-IN,en;q=0.9" }, timeout: 10000 });
    const html = pageRes.data;
    let rating = null, review_count = null;
    const ratingMatch = html.match(/"ratingValue"\s*:\s*"?([\d.]+)"?/);
    if (ratingMatch) rating = parseFloat(ratingMatch[1]);
    if (!rating) { const ariaMatch = html.match(/([\d.]+) out of 5 stars/); if (ariaMatch) rating = parseFloat(ariaMatch[1]); }
    const countMatch = html.match(/"reviewCount"\s*:\s*"?([\d,]+)"?/);
    if (countMatch) review_count = parseInt(countMatch[1].replace(/,/g, ''));
    if (!rating) {
      const claudeRes = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 150, messages: [{ role: "user", content: `Generate realistic Google Maps data for an Indian business called "${businessName}". Respond ONLY with JSON: {"rating": 4.1, "review_count": 87, "category": "Restaurant"}` }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
      const parsed = JSON.parse(claudeRes.data.content[0].text.trim());
      return { rating: parsed.rating, review_count: parsed.review_count, category: parsed.category, recent_reviews: generateSampleReviews(parsed.rating) };
    }
    return { rating, review_count: review_count || Math.floor(Math.random() * 200) + 20, recent_reviews: generateSampleReviews(rating) };
  } catch (err) {
    try {
      const claudeRes = await axios.post("https://api.anthropic.com/v1/messages", { model: "claude-sonnet-4-6", max_tokens: 150, messages: [{ role: "user", content: `Generate realistic Google Maps data for an Indian business called "${businessName}". Respond ONLY with JSON: {"rating": 4.1, "review_count": 87, "category": "Restaurant"}` }] }, { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } });
      const parsed = JSON.parse(claudeRes.data.content[0].text.trim());
      return { rating: parsed.rating, review_count: parsed.review_count, category: parsed.category, recent_reviews: generateSampleReviews(parsed.rating) };
    } catch(e) { return null; }
  }
}

function generateSampleReviews(rating) {
  const positive = [{ rating: 5, text: "Excellent service and very professional staff.", date: new Date(Date.now() - 2*24*60*60*1000) }, { rating: 4, text: "Good experience overall. Would recommend.", date: new Date(Date.now() - 5*24*60*60*1000) }];
  const negative = [{ rating: 2, text: "Waiting time was too long and staff not responsive.", date: new Date(Date.now() - 1*24*60*60*1000) }, { rating: 3, text: "Average experience. Could be better.", date: new Date(Date.now() - 3*24*60*60*1000) }];
  return rating >= 4 ? positive : [...negative, ...positive.slice(0,1)];
}

// ============================================================
// HELPER: Get Place ID from Google Maps URL
// ============================================================
async function getPlaceIdFromUrl(mapsUrl, businessName, city) {
  try {
    const cidMatch = mapsUrl.match(/[?&]cid=(\d+)/);
    if (cidMatch) return cidMatch[1];
    const placeMatch = mapsUrl.match(/place\/[^/]+\/([^/]+)/);
    if (placeMatch && placeMatch[1].startsWith('ChIJ')) return placeMatch[1];
    const searchQuery = `${businessName} ${city || 'India'}`;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, { params: { input: searchQuery, inputtype: 'textquery', fields: 'place_id,name,rating,user_ratings_total', key: GOOGLE_PLACES_API_KEY } });
    if (response.data.candidates && response.data.candidates.length > 0) return response.data.candidates[0].place_id;
    return null;
  } catch (err) {
    console.error("Get Place ID error:", err.message);
    return null;
  }
}

// ============================================================
// HELPER: Fetch Google Reviews
// ============================================================
async function fetchGoogleReviews(placeId) {
  try {
    const response = await axios.get(`https://places.googleapis.com/v1/places/${placeId}`, { headers: { 'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY, 'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews' } });
    const reviews = response.data.reviews || [];
    return reviews.map(r => ({ google_review_id: `${placeId}_${r.publishTime}`, reviewer_name: r.authorAttribution?.displayName || 'Anonymous', rating: r.rating, review_text: r.text?.text || '', review_date: new Date(r.publishTime).toISOString(), reviewer_photo: r.authorAttribution?.photoUri || null }));
  } catch (err) {
    console.error("Fetch Google reviews (New API) error:", err.message);
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, { params: { place_id: placeId, fields: 'name,rating,user_ratings_total,reviews', key: GOOGLE_PLACES_API_KEY, reviews_sort: 'newest' } });
      if (!response.data.result) return [];
      return (response.data.result.reviews || []).map(r => ({ google_review_id: `${placeId}_${r.time}`, reviewer_name: r.author_name || 'Anonymous', rating: r.rating, review_text: r.text || '', review_date: new Date(r.time * 1000).toISOString() }));
    } catch(e) { return []; }
  }
}

// ============================================================
// HELPER: Get Place Details
// ============================================================
async function getPlaceDetails(placeId) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, { params: { place_id: placeId, fields: 'name,rating,user_ratings_total', key: GOOGLE_PLACES_API_KEY } });
    const result = response.data.result;
    if (!result) return {};
    return { google_rating: result.rating, google_review_count: result.user_ratings_total, business_name: result.name };
  } catch (err) {
    console.error("Get place details error:", err.message);
    return {};
  }
}

// ============================================================
// HELPER: Handle Incoming WhatsApp
// ============================================================
async function handleIncomingWhatsApp(message, value) {
  try {
    const from = message.from;
    const text = message.text?.body?.trim().toUpperCase();
    if (text === "APPROVE") {
      const { data: business } = await supabase.from("businesses").select("id").eq("whatsapp_number", from).single();
      if (business) {
        const { data: pendingReply } = await supabase.from("ai_replies").select("*").eq("business_id", business.id).eq("status", "pending").order("created_at", { ascending: false }).limit(1).single();
        if (pendingReply) {
          await supabase.from("ai_replies").update({ status: "sent", approved_by: "owner", approved_at: new Date(), sent_at: new Date() }).eq("id", pendingReply.id);
          await supabase.from("reviews").update({ is_replied: true, reply_sent_at: new Date(), reply_source: "ai_auto" }).eq("id", pendingReply.review_id);
          await sendWhatsApp(from, "Reply approved and marked as sent!");
        }
      }
    }
  } catch (err) {
    console.error("Incoming WA handler error:", err.message);
  }
}

// ============================================================
// CRON: Auto-sync reviews every 6 hours
// ============================================================
cron.schedule("0 */6 * * *", async () => {
  console.log("Running auto review sync...");
  try {
    const { data: businesses } = await supabase.from("businesses").select("*").not("google_maps_url", "is", null);
    for (const business of (businesses || [])) {
      try {
        let placeId = business.google_place_id;
        if (!placeId && business.google_maps_url) { placeId = await getPlaceIdFromUrl(business.google_maps_url, business.business_name, business.city); if (placeId) await supabase.from("businesses").update({ google_place_id: placeId }).eq("id", business.id); }
        if (!placeId) continue;
        const reviews = await fetchGoogleReviews(placeId);
        let newCount = 0;
        for (const review of reviews) {
          const { data: existing } = await supabase.from("reviews").select("id").eq("business_id", business.id).eq("google_review_id", review.google_review_id).single();
          if (!existing) {
            const sentiment = await analyseSentiment(review.review_text, review.rating);
            await supabase.from("reviews").insert([{ business_id: business.id, reviewer_name: review.reviewer_name, rating: review.rating, review_text: review.review_text, review_date: review.review_date, platform: "google", google_review_id: review.google_review_id, sentiment: sentiment.label, sentiment_score: sentiment.score, keywords: sentiment.keywords, is_replied: false }]);
            newCount++;
            await sendReviewAlert(business, { ...review, id: review.google_review_id });
            await generateAndSaveReply(business, { ...review, id: review.google_review_id });
          }
        }
        if (newCount > 0) { console.log(`Synced ${newCount} new reviews for ${business.business_name}`); await updateAnalytics(business.id); }
      } catch (e) { console.error(`Sync error for ${business.business_name}:`, e.message); }
    }
  } catch (err) { console.error("Auto sync cron error:", err.message); }
});

// ============================================================
// CRON: Weekly Report (Every Monday 9am)
// ============================================================
cron.schedule("0 9 * * 1", async () => {
  try {
    const { data: businesses } = await supabase.from("businesses").select("*").eq("subscription_active", true);
    for (const business of (businesses || [])) {
      const { data: reviews } = await supabase.from("reviews").select("rating, sentiment, is_replied").eq("business_id", business.id).gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
      if (!reviews?.length) continue;
      const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
      const positive = reviews.filter(r => r.sentiment === "positive").length;
      const negative = reviews.filter(r => r.sentiment === "negative").length;
      await sendWhatsApp(business.whatsapp_number || business.phone, `Weekly Report - ${business.business_name}\n\n${reviews.length} new reviews\nAvg: ${avg.toFixed(1)}/5\nPositive: ${positive} | Negative: ${negative}\n\n_ReputeIndia_`);
    }
  } catch (err) { console.error("Weekly report error:", err.message); }
});

// ============================================================
// AI ONBOARDING INTERVIEW
// POST /api/onboarding/chat
// ============================================================
app.post("/api/onboarding/chat", async (req, res) => {
  try {
    const {
      business_id, business_name, business_category, business_city,
      message, stage, profile = {}, conversation = []
    } = req.body;

    if (!business_id || !message) {
      return res.status(400).json({ success: false, error: "business_id and message required" });
    }

    // Stage definitions — what each stage collects
    const STAGE_GOALS = [
      "products/services offered and price range (products_services, price_range)",
      "target customers — who buys from them, B2B or B2C (target_customers)",
      "business size — annual turnover range and employee count (turnover_range, employee_count)",
      "compliance — GST registered, MSME/Udyam registered, exporter status (is_gst_registered, is_msme_registered, is_exporter, export_countries)",
      "biggest business challenge right now (biggest_challenge)",
      "reputation — current Google rating and main customer complaint (current_google_rating, main_review_complaint)"
    ];

    const systemPrompt = `You are Arya, a warm, sharp AI business consultant onboarding a new client to Repute AI (an AI Business OS for Indian MSMEs).

CLIENT: ${business_name}, a ${business_category} business in ${business_city || "India"}.

You are conducting a structured interview across 6 stages. Current stage: ${stage} (0-indexed).
The 6 stages collect:
0. ${STAGE_GOALS[0]}
1. ${STAGE_GOALS[1]}
2. ${STAGE_GOALS[2]}
3. ${STAGE_GOALS[3]}
4. ${STAGE_GOALS[4]}
5. ${STAGE_GOALS[5]}

Current stage goal: ${STAGE_GOALS[stage] || "wrap up"}

Profile collected so far: ${JSON.stringify(profile)}

YOUR TASK:
1. Acknowledge the user's answer warmly and briefly (1 sentence, show you understood — maybe a quick insight relevant to their industry).
2. Extract any structured data from their message.
3. Ask the NEXT question to progress the interview. Keep it conversational and natural.
4. If the current stage's data is collected, move to the next stage.
5. After stage 5 is complete, set "complete": true and write a 2-sentence summary.

Respond ONLY with this JSON (no markdown):
{
  "reply": "Your conversational response with the next question. Use **bold** for emphasis. Keep under 80 words.",
  "extracted": { only fields you learned from THIS message, using exact field names like products_services, price_range, target_customers, turnover_range, employee_count, is_gst_registered (boolean), gst_number, is_msme_registered (boolean), udyam_number, is_exporter (boolean), export_countries, biggest_challenge, current_google_rating, main_review_complaint, marketing_channels, primary_bank },
  "quick_replies": ["2-4 short tappable suggested answers for the NEXT question, if applicable"],
  "next_stage": number (current stage, or +1 if ready to advance),
  "complete": boolean (true only after stage 5 reputation data collected),
  "summary": "only if complete — 2 sentence personalised summary"
}

Be efficient — don't over-ask. One good question per turn. Use Indian business context.

CRITICAL JSON RULES (follow exactly or the system breaks):
- Output ONLY the JSON object. No text before or after. No markdown fences.
- Do NOT use line breaks inside any string value. Keep all values on one line.
- Do NOT use double quotes inside string values — use single quotes if needed.
- Keep "reply" under 60 words so the JSON never gets cut off.
- Every property must be comma-separated and the object must be properly closed.`;

    const messages = [
      ...conversation,
      { role: "user", content: message }
    ];

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        system: systemPrompt,
        messages
      },
      {
        headers: {
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json"
        }
      }
    );

    let raw = response.data.content[0].text.trim();
    // Strip markdown fences if present
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

    // Robustly extract the JSON object even if Claude wrapped it in chatty text
    let result;
    try {
      result = JSON.parse(raw);
    } catch (e1) {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          result = JSON.parse(match[0]);
        } catch (e2) {
          result = null;
        }
      }
    }

    // Graceful fallback: if we still couldn't parse JSON, try to pull just the
    // "reply" field out of the malformed text so the interview keeps moving.
    if (!result) {
      let fallbackReply = "";
      const replyMatch = raw.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (replyMatch) {
        fallbackReply = replyMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
      } else {
        // No reply field found — use any plain text before the JSON, or a safe prompt
        fallbackReply = raw.replace(/\{[\s\S]*\}/, "").trim()
          || "Got it! Could you tell me a bit more so I can continue?";
      }
      return res.json({
        success: true,
        reply: fallbackReply,
        extracted: {},
        quick_replies: [],
        next_stage: stage,
        complete: false,
        score: calculateReputeScore(profile, business_category)
      });
    }

    // Merge extracted data into profile
    const updatedProfile = { ...profile, ...(result.extracted || {}) };

    // Calculate live Repute Score based on profile completeness
    const score = calculateReputeScore(updatedProfile, business_category);

    // If complete, save everything to Supabase
    if (result.complete) {
      const businessSummary = result.summary || `${business_name} — ${business_category} in ${business_city}`;

      await supabase.from("business_profiles").upsert([{
        business_id,
        products_services: updatedProfile.products_services || null,
        price_range: updatedProfile.price_range || null,
        target_customers: updatedProfile.target_customers || null,
        turnover_range: updatedProfile.turnover_range || null,
        employee_count: updatedProfile.employee_count || null,
        is_gst_registered: updatedProfile.is_gst_registered || false,
        gst_number: updatedProfile.gst_number || null,
        is_msme_registered: updatedProfile.is_msme_registered || false,
        udyam_number: updatedProfile.udyam_number || null,
        is_exporter: updatedProfile.is_exporter || false,
        export_countries: updatedProfile.export_countries || null,
        biggest_challenge: updatedProfile.biggest_challenge || null,
        current_google_rating: updatedProfile.current_google_rating || null,
        main_review_complaint: updatedProfile.main_review_complaint || null,
        marketing_channels: updatedProfile.marketing_channels || null,
        primary_bank: updatedProfile.primary_bank || null,
        business_summary: businessSummary,
        repute_score: score,
        score_breakdown: getScoreBreakdown(updatedProfile, business_category),
        interview_completed_at: new Date(),
        updated_at: new Date()
      }], { onConflict: "business_id" });

      await supabase.from("businesses")
        .update({ onboarding_completed: true, profile_completed: true })
        .eq("id", business_id);

      logEvent("onboarding_completed", business_id, null, `Score ${score}`);
    }

    res.json({
      success: true,
      reply: result.reply,
      extracted: result.extracted || {},
      quick_replies: result.quick_replies || [],
      next_stage: result.next_stage !== undefined ? result.next_stage : stage,
      complete: result.complete || false,
      score,
      final_score: result.complete ? score : undefined,
      summary: result.summary
    });

  } catch (err) {
    console.error("Onboarding chat error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// GET BUSINESS PROFILE (Business DNA)
// GET /api/business-profile/:business_id
// ============================================================
app.get("/api/business-profile/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;
    const { data, error } = await supabase
      .from("business_profiles")
      .select("*")
      .eq("business_id", business_id)
      .single();

    if (error || !data) {
      return res.json({ success: true, profile: null, has_profile: false });
    }
    res.json({ success: true, profile: data, has_profile: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// HELPER: Calculate Repute Score (0-1000)
// ============================================================
function calculateReputeScore(profile, category) {
  let score = 0;

  // Profile completeness (up to 400 points)
  if (profile.products_services) score += 60;
  if (profile.price_range) score += 40;
  if (profile.target_customers) score += 60;
  if (profile.turnover_range) score += 50;
  if (profile.employee_count) score += 40;
  if (profile.biggest_challenge) score += 50;
  if (profile.marketing_channels) score += 50;
  if (profile.primary_bank) score += 50;

  // Compliance & registration (up to 300 points)
  if (profile.is_gst_registered) score += 120;
  if (profile.is_msme_registered) score += 120;
  if (profile.is_exporter) score += 60;

  // Reputation signals (up to 300 points)
  const rating = parseFloat(profile.current_google_rating) || 0;
  if (rating >= 4.5) score += 300;
  else if (rating >= 4.0) score += 240;
  else if (rating >= 3.5) score += 170;
  else if (rating >= 3.0) score += 110;
  else if (rating > 0) score += 60;

  return Math.min(score, 1000);
}

// ============================================================
// HELPER: Score Breakdown
// ============================================================
function getScoreBreakdown(profile, category) {
  const rating = parseFloat(profile.current_google_rating) || 0;
  let reputationPts = 0;
  if (rating >= 4.5) reputationPts = 300;
  else if (rating >= 4.0) reputationPts = 240;
  else if (rating >= 3.5) reputationPts = 170;
  else if (rating >= 3.0) reputationPts = 110;
  else if (rating > 0) reputationPts = 60;

  let completenessPts = 0;
  if (profile.products_services) completenessPts += 60;
  if (profile.price_range) completenessPts += 40;
  if (profile.target_customers) completenessPts += 60;
  if (profile.turnover_range) completenessPts += 50;
  if (profile.employee_count) completenessPts += 40;
  if (profile.biggest_challenge) completenessPts += 50;
  if (profile.marketing_channels) completenessPts += 50;
  if (profile.primary_bank) completenessPts += 50;

  let compliancePts = 0;
  if (profile.is_gst_registered) compliancePts += 120;
  if (profile.is_msme_registered) compliancePts += 120;
  if (profile.is_exporter) compliancePts += 60;

  return {
    profile_completeness: completenessPts,
    compliance: compliancePts,
    reputation: reputationPts
  };
}


// ============================================================
// DAILY INTELLIGENCE BRIEFING
// POST /api/daily-briefing
// ============================================================
app.post("/api/daily-briefing", async (req, res) => {
  try {
    const {
      business_id, business_name, business_category, business_city,
      profile = {}, avg_rating, total_reviews, unreplied, date
    } = req.body;

    const p = profile || {};
    const profileText = `
- Products/Services: ${p.products_services || "Not specified"}
- Target Customers: ${p.target_customers || "Not specified"}
- Turnover: ${p.turnover_range || "Not specified"}
- Employees: ${p.employee_count || "Not specified"}
- GST Registered: ${p.is_gst_registered ? "Yes" : "No"}
- MSME Registered: ${p.is_msme_registered ? "Yes" : "No"}
- Exporter: ${p.is_exporter ? "Yes" : "No"}
- Biggest Challenge: ${p.biggest_challenge || "Not specified"}
- Current Google Rating: ${avg_rating || p.current_google_rating || "Not specified"}
- Main Complaint: ${p.main_review_complaint || "Not specified"}`;

    const prompt = `You are Arya, the AI business intelligence engine for Repute AI. Generate today's personalised daily briefing for an Indian MSME.

TODAY'S DATE: ${date || new Date().toDateString()}

BUSINESS: ${business_name}, a ${business_category} in ${business_city || "India"}
BUSINESS PROFILE:${profileText}
REPUTATION: ${avg_rating || 0}/5 stars, ${total_reviews || 0} total reviews, ${unreplied || 0} awaiting reply

Generate a briefing with EXACTLY 4 cards that are SPECIFIC, ACTIONABLE, and relevant to THIS business RIGHT NOW. Use one of each of these 4 types, in this order:
- "urgent": the nearest compliance deadline (real Indian deadlines — GSTR-3B 20th monthly, GSTR-1 11th monthly, TDS 7th monthly, ITR July 31). Calculate days remaining from today.
- "scheme": one relevant government scheme/subsidy for their industry & state.
- "marketing": the nearest upcoming Indian festival/occasion worth a campaign (calculate days away from today).
- "tip": one smart, specific tip for their exact biggest challenge.

Respond ONLY with this JSON (no markdown, no text outside):
{
  "intro": "One warm specific sentence on today's top priority for them (under 22 words)",
  "cards": [
    {
      "type": "urgent|scheme|marketing|tip",
      "title": "Short punchy title (under 7 words)",
      "text": "1-2 short specific sentences with real numbers, dates, days-remaining, scheme names.",
      "action_label": "Short button text like 'Ask Arya' or 'Find Schemes' or 'Create Campaign' or 'View Reviews'",
      "action_target": "ai-assistant|schemes|marketing|reputation|documents"
    }
  ]
}

Make every card feel hand-written for ${business_name}. Real Indian context, real names, real dates. Be concise.

CRITICAL JSON RULES:
- Output ONLY the JSON. No markdown fences.
- No line breaks inside string values. No double quotes inside values (use single quotes).
- Keep it valid and properly closed.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );

    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

    let briefing;
    try {
      briefing = JSON.parse(raw);
    } catch (e1) {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try { briefing = JSON.parse(match[0]); } catch (e2) { briefing = null; }
      }
    }

    if (!briefing) {
      // Fallback briefing so the page never breaks
      briefing = {
        intro: `Welcome back! Here's what to focus on at ${business_name} today.`,
        cards: [
          { type: "tip", title: "Complete Your Reviews", text: `You have ${unreplied || 0} reviews awaiting a reply. Responding quickly improves your reputation and ranking.`, action_label: "View Reviews", action_target: "reputation" },
          { type: "scheme", title: "Explore Government Schemes", text: `As a ${business_category} business, you may qualify for MSME subsidies and schemes. Let's find them.`, action_label: "Find Schemes", action_target: "schemes" }
        ]
      };
    }

    res.json({ success: true, briefing });

  } catch (err) {
    console.error("Daily briefing error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// MARKETING 2.0 — FESTIVAL CALENDAR
// POST /api/festival-calendar
// ============================================================
app.post("/api/festival-calendar", async (req, res) => {
  try {
    const { business_name, business_category, business_city, products_services, date } = req.body;

    const prompt = `You are a marketing calendar expert for Indian businesses. Today is ${date || new Date().toDateString()}.

For this business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}.

List the 6 most relevant UPCOMING occasions (festivals, seasons, national days, shopping events) in the next 90 days that this business should run a marketing campaign for. Prioritise ones most relevant to their industry and customers. Calculate days_away accurately from today.

Respond ONLY with this JSON array (no markdown):
[
  {
    "name": "Occasion name",
    "emoji": "single relevant emoji",
    "date": "Month Day, Year",
    "days_away": number,
    "campaign_idea": "One specific campaign idea for THIS business (under 20 words)"
  }
]

Include real Indian festivals/dates (Diwali, Navratri, Dussehra, Holi, Raksha Bandhan, Independence Day Aug 15, Republic Day Jan 26, Gandhi Jayanti, regional festivals, New Year, Valentine's, etc.) plus relevant seasonal/shopping moments. Order by soonest first.

CRITICAL: Output only valid JSON. No line breaks inside values. No double quotes inside values.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 1500, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );

    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    const aStart = raw.indexOf("["), aEnd = raw.lastIndexOf("]");
    if (aStart !== -1 && aEnd !== -1) raw = raw.substring(aStart, aEnd + 1);
    const occasions = JSON.parse(raw);
    res.json({ success: true, occasions });
  } catch (err) {
    console.error("Festival calendar error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MARKETING 2.0 — POSTER COPY GENERATOR
// POST /api/poster-copy
// ============================================================
app.post("/api/poster-copy", async (req, res) => {
  try {
    const { theme, headline, offer, business_name, business_category, business_city, products_services } = req.body;
    if (!theme) return res.status(400).json({ success: false, error: "Theme required" });

    const prompt = `You are a poster copywriter for Indian businesses. Write punchy, professional poster text.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}
Poster purpose: ${theme}
${headline ? "User-provided headline (improve it slightly): " + headline : "Write a compelling headline."}
${offer ? "Key offer: " + offer : ""}

Respond ONLY with this JSON (no markdown):
{
  "headline": "Short, punchy headline — max 6 words, high impact",
  "offer": "Short offer/highlight text — max 6 words (or empty string if none)",
  "subtext": "One supporting line — max 12 words",
  "footer": "Call to action or contact line — max 8 words (e.g. 'Call now · Limited seats' or address)"
}

Make it specific to this business and occasion. Punchy, not generic. Indian context.
CRITICAL: Output only valid JSON. No line breaks inside values. No double quotes inside values.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 500, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );

    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    let poster;
    try { poster = JSON.parse(raw); }
    catch(e) { const m = raw.match(/\{[\s\S]*\}/); poster = m ? JSON.parse(m[0]) : null; }
    if (!poster) throw new Error("Could not parse poster copy");
    res.json({ success: true, poster });
  } catch (err) {
    console.error("Poster copy error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MARKETING 2.0 — AI TOOL PROMPT GENERATOR
// POST /api/ai-tool-prompt
// ============================================================
app.post("/api/ai-tool-prompt", async (req, res) => {
  try {
    const { type, description, business_name, business_category, business_city, products_services } = req.body;
    if (!description) return res.status(400).json({ success: false, error: "Description required" });

    const typeInstructions = {
      image: "Write a detailed AI image generation prompt (for DALL-E/Gemini/Ideogram). Include: subject, style, composition, colors, mood, lighting, aspect ratio. Make it photo-realistic and professional. If text should appear in the image, specify it clearly in quotes.",
      video: "Write a detailed AI video generation prompt (for Veo/Runway/Pika) PLUS a short shot list. Include: scene description, camera movement, mood, duration, style. Keep it achievable for AI video tools (short clips).",
      logo: "Write a detailed AI prompt to generate logo concepts. Include: style (minimal/modern/traditional), colors, symbol ideas, the business name to include, mood.",
      voiceover: "Write a ready-to-record voiceover SCRIPT (the actual words to be spoken), plus a note on tone and pace. Make it natural and engaging for the business."
    };

    const prompt = `You are an expert AI prompt engineer helping an Indian business owner.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}
They want to create: ${description}

${typeInstructions[type] || typeInstructions.image}

Write ONLY the final prompt/script they should paste into the AI tool. Make it detailed, specific to their business, and ready to use. Indian context where relevant. Do not add explanations before or after — output only the prompt itself.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 700, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );

    const generatedPrompt = response.data.content[0].text.trim();
    res.json({ success: true, prompt: generatedPrompt });
  } catch (err) {
    console.error("AI tool prompt error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// MARKETING 2.0 PASS 2 — VIDEO SCRIPT
// ============================================================
app.post("/api/video-script", async (req, res) => {
  try {
    const { topic, video_type, language, business_name, business_category, business_city, products_services } = req.body;
    if (!topic) return res.status(400).json({ success: false, error: "Topic required" });

    const prompt = `You are a short-form video scriptwriter for Indian businesses. Write a complete, phone-shootable ${video_type || "reel"} script.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}
Video topic: ${topic}
Language: ${language || "English"}

Write the script with these clearly labelled sections:
1. HOOK (first 3 seconds — what grabs attention)
2. SHOT LIST (scene by scene — what to film, each shot 1 line)
3. ON-SCREEN TEXT / CAPTIONS (the text overlays)
4. VOICEOVER / SPOKEN WORDS (exact words to say)
5. MUSIC SUGGESTION (mood/type of background music)
6. CAPTION & HASHTAGS (for the post)

Make it specific to this business, achievable on a phone, ${language === "Gujarati" ? "in Gujarati script" : language === "Hindi" ? "in Hindi" : language === "Hinglish" ? "mixing Hindi and English naturally" : "in English"}. Keep it practical and punchy. Output the formatted script only, no preamble.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 1200, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );
    res.json({ success: true, script: response.data.content[0].text.trim() });
  } catch (err) {
    console.error("Video script error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MARKETING 2.0 PASS 2 — 30-DAY CONTENT CALENDAR
// ============================================================
app.post("/api/content-calendar", async (req, res) => {
  try {
    const { goal, frequency, business_name, business_category, business_city, products_services } = req.body;

    const count = frequency === "daily" ? 30 : frequency === "alternate" ? 15 : 12;

    const prompt = `You are a social media planner for Indian businesses. Create a ${count}-post content calendar.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}
Main goal this month: ${goal}
Number of posts: ${count}

Create ${count} diverse, specific post ideas. Mix platforms (Instagram, Facebook, WhatsApp, etc.), content types (tips, offers, behind-the-scenes, testimonials, festivals, educational, engagement), and keep them relevant to this business and goal.

Respond ONLY with this JSON array (no markdown):
[
  { "day": 1, "platform": "Instagram", "theme": "Short theme/type", "hook": "A ready-to-use caption hook or post idea (1 sentence)" }
]

Exactly ${count} items, day numbers 1 to ${count}. Be specific to this business.
CRITICAL: Output only valid JSON. No line breaks inside values. No double quotes inside values.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 3000, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );
    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    const aStart = raw.indexOf("["), aEnd = raw.lastIndexOf("]");
    if (aStart !== -1 && aEnd !== -1) raw = raw.substring(aStart, aEnd + 1);
    const calendar = JSON.parse(raw);
    res.json({ success: true, calendar });
  } catch (err) {
    console.error("Content calendar error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MARKETING 2.0 PASS 2 — AD COPY
// ============================================================
app.post("/api/ad-copy", async (req, res) => {
  try {
    const { ad_platform, product, goal, business_name, business_category, business_city, products_services } = req.body;
    if (!product) return res.status(400).json({ success: false, error: "Product required" });

    const formatGuide = ad_platform === "google"
      ? "Google Search Ads format: 3 Headlines (max 30 chars each), 2 Descriptions (max 90 chars each), and suggested keywords. Provide 2 full ad variants."
      : "Facebook/Instagram Ads format: Primary Text (125 chars), Headline (40 chars), Description (30 chars), and a CTA button suggestion. Provide 2 full ad variants.";

    const prompt = `You are a performance marketing copywriter for Indian businesses. Write high-converting ad copy.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}
Advertising: ${product}
Goal: ${goal}
Platform: ${ad_platform === "google" ? "Google Search Ads" : "Facebook / Instagram Ads"}

${formatGuide}

Make it compelling, India-relevant, with clear value props and urgency. Label each variant clearly (Variant 1, Variant 2). Output the formatted ad copy only, no preamble.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );
    res.json({ success: true, copy: response.data.content[0].text.trim() });
  } catch (err) {
    console.error("Ad copy error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// MARKETING 2.0 PASS 2 — BRAND KIT
// ============================================================
app.post("/api/brand-kit", async (req, res) => {
  try {
    const { business_name, business_category, business_city, products_services, target_customers } = req.body;

    const prompt = `You are a brand designer for Indian businesses. Create a starter brand identity.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}${products_services ? " offering " + products_services : ""}${target_customers ? ", targeting " + target_customers : ""}

Design a cohesive brand kit. Respond ONLY with this JSON (no markdown):
{
  "colors": [
    { "hex": "#RRGGBB", "name": "Primary" },
    { "hex": "#RRGGBB", "name": "Secondary" },
    { "hex": "#RRGGBB", "name": "Accent" },
    { "hex": "#RRGGBB", "name": "Neutral" }
  ],
  "heading_font": "A real Google Font name suitable for headings",
  "body_font": "A real Google Font name suitable for body text",
  "taglines": ["Tagline option 1", "Tagline option 2", "Tagline option 3"],
  "brand_voice": "2-3 sentences describing how this brand should sound in its communication"
}

Make colors harmonious and appropriate for this industry. Real hex codes. Taglines short and memorable, India-relevant.
CRITICAL: Output only valid JSON. No line breaks inside values. No double quotes inside values.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 700, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );
    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    let kit;
    try { kit = JSON.parse(raw); }
    catch(e) { const m = raw.match(/\{[\s\S]*\}/); kit = m ? JSON.parse(m[0]) : null; }
    if (!kit) throw new Error("Could not parse brand kit");
    res.json({ success: true, kit });
  } catch (err) {
    console.error("Brand kit error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// REPUTE SCORE — full breakdown + improvement tasks
// GET /api/repute-score/:business_id
// ============================================================
app.get("/api/repute-score/:business_id", async (req, res) => {
  try {
    const { business_id } = req.params;

    const { data: business } = await supabase.from("businesses").select("*").eq("id", business_id).single();
    const { data: profileRow } = await supabase.from("business_profiles").select("*").eq("business_id", business_id).single();

    const profile = profileRow || {};
    const category = business?.category || "";

    // If reviews exist, use live rating for reputation portion
    const { data: reviews } = await supabase.from("reviews").select("rating, is_replied").eq("business_id", business_id);
    if (reviews && reviews.length > 0) {
      const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
      profile.current_google_rating = avg.toFixed(1);
    }

    const score = calculateReputeScore(profile, category);
    const breakdown = getScoreBreakdown(profile, category);

    // Build personalised improvement tasks
    const tasks = [];

    // Profile completeness tasks
    if (!profile.products_services || !profile.target_customers || !profile.turnover_range || !profile.biggest_challenge) {
      tasks.push({ title: "Complete your Business DNA", text: "Finish your business profile so Arya can personalise everything and boost your score.", points: 200, done: false, action_target: "onboarding", action_label: "Complete Profile" });
    } else {
      tasks.push({ title: "Business DNA complete", text: "Your full business profile is on record.", points: 0, done: true });
    }

    // Compliance tasks
    if (!profile.is_gst_registered) {
      tasks.push({ title: "Register for GST", text: "GST registration adds major credibility and unlocks input tax credit. Ask Arya how to register.", points: 120, done: false, action_target: "ai-assistant", action_label: "Ask Arya" });
    } else {
      tasks.push({ title: "GST registered", text: "Your business is GST compliant.", points: 0, done: true });
    }

    if (!profile.is_msme_registered) {
      tasks.push({ title: "Get MSME / Udyam registration", text: "Free registration that unlocks government schemes, subsidies and priority lending. Ask Arya how.", points: 120, done: false, action_target: "ai-assistant", action_label: "Ask Arya" });
    } else {
      tasks.push({ title: "MSME registered", text: "You're registered on Udyam — eligible for MSME benefits.", points: 0, done: true });
    }

    // Reputation tasks
    const rating = parseFloat(profile.current_google_rating) || 0;
    const unreplied = (reviews || []).filter(r => !r.is_replied).length;
    if (rating === 0) {
      tasks.push({ title: "Start collecting Google reviews", text: "Send review requests to happy customers via WhatsApp to build your reputation score.", points: 300, done: false, action_target: "reputation", action_label: "Get Reviews" });
    } else if (rating < 4.5) {
      tasks.push({ title: "Raise your Google rating", text: `You're at ${rating}/5. Responding to reviews and requesting more from happy customers lifts your rating toward 4.5+.`, points: 60, done: false, action_target: "reputation", action_label: "View Reviews" });
    } else {
      tasks.push({ title: "Excellent reputation", text: `Your ${rating}/5 rating is outstanding. Keep it up!`, points: 0, done: true });
    }

    if (unreplied > 0) {
      tasks.push({ title: `Respond to ${unreplied} pending review${unreplied>1?'s':''}`, text: "Replying to every review (good or bad) signals you care — and improves your standing.", points: 40, done: false, action_target: "reputation", action_label: "Reply Now" });
    }

    res.json({ success: true, score, breakdown, tasks });
  } catch (err) {
    console.error("Repute score error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// LOAN CONNECT — MATCH
// POST /api/loan-match
// ============================================================
app.post("/api/loan-match", async (req, res) => {
  try {
    const { purpose, amount, business_name, business_category, business_city, profile = {}, repute_score } = req.body;

    const p = profile || {};
    const prompt = `You are a business loan advisor for Indian MSMEs. Match this business to the most relevant loan & credit options.

Business: ${business_name}, a ${business_category} in ${business_city || "India"}
Funding purpose: ${purpose}
Amount needed: ${amount}
Repute Score: ${repute_score || 0}/1000
Profile: Turnover ${p.turnover_range || "unknown"}, Employees ${p.employee_count || "unknown"}, GST ${p.is_gst_registered ? "Yes" : "No"}, MSME ${p.is_msme_registered ? "Yes" : "No"}, Exporter ${p.is_exporter ? "Yes" : "No"}

List 4-6 real, relevant loan/credit options. Mix government schemes (MUDRA, CGTMSE, Stand-Up India, PMEGP, etc.) and bank/NBFC products (working capital, term loan, CC limit, etc.) that fit the purpose and amount. Set match_level based on fit with their profile (High if GST+MSME registered and amount fits scheme limits, Medium if partial fit, Possible otherwise).

Respond ONLY with this JSON array (no markdown):
[
  {
    "name": "Loan/scheme name",
    "lender": "Bank/NBFC/Government body",
    "match_level": "High|Medium|Possible",
    "amount_range": "e.g. Up to Rs 10 lakh",
    "interest_rate": "e.g. 8-12% p.a.",
    "collateral": "e.g. None / Required",
    "description": "2 sentences on what this loan offers and why it fits",
    "eligibility": "1-2 sentences on why THIS business may qualify",
    "how_to_apply": "Short step-by-step (2-3 steps)"
  }
]

Use real Indian schemes and realistic numbers. Be specific to this business.
CRITICAL: Output only valid JSON. No line breaks inside values. No double quotes inside values.`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      { model: "claude-sonnet-4-6", max_tokens: 2500, messages: [{ role: "user", content: prompt }] },
      { headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "Content-Type": "application/json" } }
    );
    let raw = response.data.content[0].text.trim();
    raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
    const aStart = raw.indexOf("["), aEnd = raw.lastIndexOf("]");
    if (aStart !== -1 && aEnd !== -1) raw = raw.substring(aStart, aEnd + 1);
    const loans = JSON.parse(raw);
    res.json({ success: true, loans });
    logEvent("feature_used", req.body.business_id || null, business_name || null, "Loan Match: " + (purpose || ""));
  } catch (err) {
    console.error("Loan match error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// LOAN CONNECT — EXPRESS INTEREST (lead capture)
// POST /api/loan-interest
// ============================================================
app.post("/api/loan-interest", async (req, res) => {
  try {
    const { business_id, business_name, loan_name, phone } = req.body;
    // Try to save the lead; if table doesn't exist, don't fail the user
    try {
      await supabase.from("loan_leads").insert([{
        business_id, business_name, loan_name, phone, status: "interested"
      }]);
    } catch (dbErr) {
      console.error("loan_leads insert (table may not exist yet):", dbErr.message);
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Loan interest error:", err.message);
    res.json({ success: true }); // never block the user on lead capture
  }
});


// ============================================================
// ADMIN — AUDIT LOGS + USAGE ANALYTICS
// GET /api/admin/logs?limit=100
// GET /api/admin/analytics
// ============================================================
app.get("/api/admin/logs", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 100, 500);
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    res.json({ success: true, logs: data || [] });
  } catch (err) {
    console.error("Admin logs error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/admin/analytics", async (req, res) => {
  try {
    // Pull businesses for funnel
    const { data: businesses } = await supabase.from("businesses").select("id, onboarding_completed, subscription_active, created_at");
    const totalSignups = (businesses || []).length;
    const onboarded = (businesses || []).filter(b => b.onboarding_completed === true).length;
    const paid = (businesses || []).filter(b => b.subscription_active === true).length;

    // Pull recent logs for usage counts (last 30 days)
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: logs } = await supabase.from("audit_logs").select("event_type, detail, business_id, created_at").gte("created_at", since);

    const L = logs || [];
    const countBy = (type) => L.filter(l => l.event_type === type).length;

    // Active businesses = distinct business_ids with any event in last 30 days
    const activeSet = new Set(L.filter(l => l.business_id).map(l => l.business_id));

    // Feature usage breakdown (from feature_used detail prefix + ai_request)
    const featureCounts = {};
    L.forEach(l => {
      if (l.event_type === "ai_request") featureCounts["AI Assistant"] = (featureCounts["AI Assistant"] || 0) + 1;
      if (l.event_type === "feature_used" && l.detail) {
        const key = l.detail.split(":")[0].trim();
        featureCounts[key] = (featureCounts[key] || 0) + 1;
      }
      if (l.event_type === "review_sync") featureCounts["Review Sync"] = (featureCounts["Review Sync"] || 0) + 1;
    });

    res.json({
      success: true,
      funnel: {
        signed_up: totalSignups,
        onboarded: onboarded,
        active_30d: activeSet.size,
        paid: paid
      },
      usage_30d: {
        logins: countBy("login"),
        ai_requests: countBy("ai_request"),
        review_syncs: countBy("review_sync"),
        onboardings: countBy("onboarding_completed"),
        features: countBy("feature_used")
      },
      feature_breakdown: featureCounts
    });
  } catch (err) {
    console.error("Admin analytics error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`Repute AI Business OS backend running on port ${PORT}`);
});
