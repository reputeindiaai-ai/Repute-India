/* Real Estate — Developers, Builders & Property Consultants
   Palette: deep emerald-black + champagne brass. Display font: Playfair Display.
   Front-end demo data only. No backend, no real customers. */
window.DEMOS = window.DEMOS || {};
window.DEMOS.realestate = {
  name: 'Real Estate',
  label: 'Real Estate · Developers & Property Consultants',
  heroTag: 'Live demo · Real Estate',

  theme: {
    bg:'#050D0A', bg2:'#0A1712',
    panel:'rgba(255,255,255,.042)', panel2:'rgba(255,255,255,.072)',
    line:'rgba(228,216,192,.11)', line2:'rgba(228,216,192,.21)',
    txt:'#F4F1E9', txt2:'rgba(244,241,233,.66)', txt3:'rgba(244,241,233,.42)',
    ac:'#C9A96A', ac2:'#5FBF9B', acInk:'#07120E', acGlow:'rgba(201,169,106,.34)',
    wash1:'rgba(201,169,106,.11)', wash2:'rgba(95,191,155,.07)',
    font:"'Playfair Display',Georgia,serif",
    fontBody:"'Inter',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
  },

  pages: [
    ['index.html','Overview'],
    ['problems.html','Problems → Fixes'],
    ['website.html','Website'],
    ['crm-live.html','The CRM'],
    ['apps.html','Apps'],
    ['features.html','AI Features']
  ],

  hero: {
    h1: 'Every enquiry answered.<br>Every unit accounted for.<br><span class="ac">Every rupee collected.</span>',
    lead: 'You already have a CRM. It records what happened yesterday. This one answers the portal lead in 30 seconds, tells you which buyer will actually book, which unit is going stale, and which payment is about to bounce — before it costs you a sale.',
    cta1: 'Open the full CRM', cta2: 'See the website'
  },

  overview: {
    cards: [
      { ic:'🛰️', h:'The complete CRM', p:'Every module you use today — Leads, Prospects, Quotations, Orders, Invoices, Recovery, Contracts, Tasks, Reports, HR, Masters — rebuilt for property, with an AI layer on top. Click through all of it.', link:'crm-live.html', go:'Open the live CRM' },
      { ic:'🏛️', h:'The developer website', p:'Project pages, floor plans, live availability, virtual walkthrough and an enquiry form that drops straight into the CRM and onto your sales head\'s phone.', link:'website.html', go:'Open website' },
      { ic:'📱', h:'Three mobile apps', p:'A buyer app, a sales-executive field app and a channel-partner app — all working prototypes you can tap through.', link:'apps.html', go:'Open the apps' },
      { ic:'✨', h:'The AI Edge', p:'30-second WhatsApp lead response, call intelligence, booking prediction, stale-inventory alerts and a collections radar. This is the part no other builder in your city has.', link:'features.html', go:'See the AI features' }
    ],
    kpis: [
      { n:30, suffix:' sec', l:'Average first reply to a portal lead' },
      { n:2.4, dec:1, suffix:'×', l:'More enquiries converted to site visits' },
      { n:41, suffix:'%', l:'Fewer missed collection milestones' },
      { n:19, suffix:' hrs', l:'Sales-team hours saved every week' }
    ]
  },

  website: {
    title: 'The page a buyer judges you by — <span class="ac">before they ever call.</span>',
    sub: 'A ₹1.2 crore decision starts on a phone at 11pm. This is built to survive that comparison against every other builder in the city.',
    url: 'www.anantamgroup.in', brand: 'ANANTAM GROUP',
    nav: ['Projects','Residences','Commercial','About','Contact'], navCta: 'Book a site visit',
    heroTitle: 'Addresses built to be<br><span class="ac">handed down.</span>',
    heroSub: 'Premium residences and commercial spaces across Surat, Vadodara and Ahmedabad. RERA registered. Delivered on time, every time, since 2004.',
    heroCta: 'Book a site visit', heroCta2: 'Download brochure',
    stats: [
      { v:'21 yrs', k:'Building since 2004' },
      { v:'4,200+', k:'Families settled' },
      { v:'11', k:'Projects delivered' },
      { v:'100%', k:'On-time possession' }
    ],
    servicesLabel: 'Live projects',
    services: [
      { ic:'🏙️', h:'Anantam Skies — Vesu, Surat', p:'3 & 4 BHK sky residences with private deck, club floor, sunset-facing balconies. 68% sold. Possession Dec 2027.', price:'₹1.42 Cr onwards' },
      { ic:'🌿', h:'Anantam Greens — Pal, Surat', p:'2 & 3 BHK garden homes wrapped around a 1.4-acre central green. RERA delivered phase 1, phase 2 open.', price:'₹78 Lakh onwards' },
      { ic:'🏢', h:'Anantam Business Park — Ring Road', p:'Grade-A offices and showrooms with double-height frontage, 3-level parking and a leasing desk on site.', price:'₹64 Lakh onwards' }
    ],
    testimonial: {
      text: 'I enquired at eleven at night on the website and got a proper reply — actual unit options in my budget with prices — inside a minute. Nobody else replied before the next afternoon. That is why I visited them first, and that is where I booked.',
      who: 'Nikunj Patel, booked a 3 BHK at Anantam Skies'
    }
  },

  crm: {
    title: 'The whole business — <span class="ac">on one screen.</span>',
    sub: 'Leads, site visits, live unit inventory, collections and brokerage — plus the AI panel that tells your sales head what to do before 10am.',
    appName: 'Anantam Realty OS',
    kpis: [
      { v:'₹6.84 Cr', k:'Bookings this month' },
      { v:'₹1.37 Cr', k:'Collections overdue', color:'var(--red)' },
      { v:'112', k:'Live leads' },
      { v:'38', k:'Site visits this week' }
    ],
    mainTitle: 'Needs attention today', mainTag: 'Ranked by AI booking probability',
    rows: [
      { nm:'Nikunj Patel', sub:'Skies · 3 BHK · ₹1.4–1.6 Cr · visited twice · loan pre-approved', pill:'92 · hot', tone:'g' },
      { nm:'Rachana Shah', sub:'Greens · 2 BHK · site visit tomorrow 11am · no confirmation yet', pill:'No-show risk', tone:'a' },
      { nm:'Unit B-1104, Skies', sub:'Held 9 days for Mehul Trivedi · no token received · blocking a live enquiry', pill:'Release hold', tone:'r' },
      { nm:'Jayesh Kansara', sub:'Booked B-0703 · 3rd demand ₹18.4L overdue 22 days · 2 reminders ignored', pill:'Collection risk', tone:'r' },
      { nm:'99acres · Skies campaign', sub:'41 leads · 3 site visits · ₹1,860 cost per visit · worst of 5 sources', pill:'Cut spend', tone:'a' }
    ],
    footV:'₹6.84 Cr', footK:'booked this month', footV2:'₹4.11 Cr', footK2:'collected this month',
    barsTitle: 'Collections · last 12 weeks',
    bars: [38,46,44,58,52,64,61,73,69,80,76,91],
    ai: {
      h: 'Arya — your AI sales head',
      items: [
        { t:'Call Nikunj Patel before 12pm', d:'Visited twice, loan pre-approved, opened the cost sheet 4 times last night. Booking probability 92%. He has also enquired at Sunrise Heights — move today.' },
        { t:'Release the hold on B-1104', d:'Held 9 days, no token. Two live 3 BHK enquiries are waiting for this exact floor band. Auto-release is drafted, waiting for your one tap.' },
        { t:'₹1.37 Cr collection at risk', d:'4 buyers are showing the same pattern that preceded the last 6 defaults. Reminder ladder drafted in Gujarati, English and Hindi — approve to send.' },
        { t:'Stop the 99acres Skies campaign', d:'₹1,860 per site visit against ₹640 on Meta. Shift the budget and you get roughly 11 more visits this month for the same money.' }
      ]
    },
    panels: [
      { h:'Live inventory · Anantam Skies', tag:'Real time',
        rows: [
          { nm:'Available', sub:'54 units · ₹68.2 Cr value', pill:'54', tone:'g' },
          { nm:'On hold', sub:'6 units · 2 past the 72-hour rule', pill:'6', tone:'a' },
          { nm:'Booked', sub:'118 units · ₹141 Cr', pill:'118' },
          { nm:'Registered', sub:'94 units · documentation closed', pill:'94' }
        ] },
      { h:'Site visits · tomorrow', tag:'6 scheduled',
        rows: [
          { nm:'Rachana Shah · 11:00am', sub:'Greens · 2 BHK · cab pickup from Adajan', pill:'Unconfirmed', tone:'a' },
          { nm:'Devang Bhatt · 12:30pm', sub:'Skies · 4 BHK · with wife and father', pill:'Confirmed', tone:'g' },
          { nm:'Aliya Shaikh · 4:00pm', sub:'Business Park · showroom · CP: Skyline Realty', pill:'Confirmed', tone:'g' }
        ] }
    ]
  },

  app: {
    title: 'The reason a buyer <span class="ac">stops worrying</span> — and starts referring.',
    sub: 'From booking to possession is three years of silence for most buyers. This is what turns that silence into trust.',
    why: 'A buyer who can see their payment schedule, their documents and this month\'s construction photos on their phone does not call your office in a panic — and does not tell fifteen people you went quiet on them. Referrals are the cheapest leads in real estate, and this is how you earn them.',
    screens: [
      { t:'My home', s:'Anantam Skies · B-1104',
        big:{ v:'62%', k:'Construction complete' }, meter:62, meterLabel:'Slab 21 of 34 cast · on schedule for Dec 2027',
        rows:[
          { nm:'Total consideration', sb:'Agreement value + GST + charges', rt:'₹1.58 Cr' },
          { nm:'Paid so far', sb:'5 of 9 milestones cleared', rt:'₹94.6 L' },
          { nm:'Next demand', sb:'On 18th floor slab · est. 12 Mar', rt:'₹18.4 L' }
        ], cap:'Everything a buyer used to phone your office about.' },
      { t:'Payments', s:'Construction-linked plan',
        rows:[
          { nm:'Booking amount', sb:'Paid 14 Aug 2025 · receipt', rt:'✓ ₹11.0 L' },
          { nm:'On agreement', sb:'Paid 02 Oct 2025 · receipt', rt:'✓ ₹23.7 L' },
          { nm:'On plinth', sb:'Paid 19 Jan 2026 · receipt', rt:'✓ ₹15.8 L' },
          { nm:'On 12th slab', sb:'Paid 27 May 2026 · receipt', rt:'✓ ₹15.8 L' },
          { nm:'On 18th slab', sb:'Due 12 Mar · pay by UPI or NEFT', rt:'₹18.4 L' },
          { nm:'On possession', sb:'Final · includes registration', rt:'₹28.7 L' }
        ], cap:'Every receipt, every demand, downloadable. No more "please send the ledger."' },
      { t:'Progress & documents', s:'Updated 6 days ago',
        rows:[
          { nm:'February site photos', sb:'14 photos · 18th slab shuttering', rt:'View' },
          { nm:'Allotment letter', sb:'Signed 14 Aug 2025', rt:'PDF' },
          { nm:'Agreement to sale', sb:'Registered 02 Oct 2025', rt:'PDF' },
          { nm:'RERA certificate', sb:'PR/GJ/SURAT/2024/01847', rt:'PDF' },
          { nm:'Home loan · HDFC', sb:'Disbursed ₹68L of ₹94L sanctioned', rt:'Track' },
          { nm:'Raise a request', sb:'Snag, query or document copy', rt:'Open' }
        ], cap:'The trust builder. This is what stops the 9pm WhatsApp to your MD.' }
    ]
  },

  features: {
    essentials: [
      { t:'Every module you run today', d:'Leads, Prospects, Quotations, Orders, Invoices, Recovery, Contracts, Taskboard, Daily View, Projects, GST, Bank, HR attendance and all 16 master lists — nothing dropped, everything rebuilt for property.' },
      { t:'Live unit inventory', d:'Project → tower → floor → unit, with Available / Held / Booked / Registered status updating the second anyone acts. Two people can never sell the same flat again.' },
      { t:'Cost sheet in 20 seconds', d:'Pick a unit, pick a payment plan — base rate, floor rise, PLC, parking, club, GST, stamp duty and registration calculated and sent as a branded PDF on WhatsApp.' },
      { t:'Site visit scheduling', d:'Slots, cab pickup, which executive, who came along, and the outcome captured on the spot from the phone — including a voice note that writes itself into the CRM.' },
      { t:'Construction-linked collections', d:'Tie demands to real milestones. When a slab is marked cast, every buyer on that plan gets their demand letter, ledger and reminder ladder automatically.' },
      { t:'Channel partner ledger', d:'CP registration, lead tagging with a fair first-claim rule, brokerage slabs, TDS, invoices raised and payouts released — the whole broker relationship, without argument.' },
      { t:'Documents on tap', d:'Booking form, allotment letter, agreement to sale, demand letter, receipt, NOC, possession letter — generated pre-filled from the record, in your format.' },
      { t:'Reports that answer questions', d:'Every report you have today — lead, quotation, invoice, order, task, attendance — with date range, group-by, five chart styles, CSV and print. Plus builder reports: source ROI, unit ageing, collection efficiency.' },
      { t:'Compliance built in', d:'RERA IDs on every project, GST on every invoice, 1% TDS on sales above ₹50 lakh flagged automatically, and an audit trail on who changed what.' }
    ],
    edge: [
      { t:'30-second WhatsApp lead reply', star:true, d:'The moment a lead lands from 99acres, MagicBricks, Housing, Meta or your website — day or night — AI replies on WhatsApp in their language, asks budget, configuration and possession timeline, checks live inventory, and books the site visit into the executive\'s calendar. 78% of buyers go with whoever replied first.' },
      { t:'AI booking probability', d:'Every lead scored 0–100 on budget fit, urgency, site-visit behaviour, cost-sheet opens and reply speed — so a 9-person team spends today on the 12 people who will actually book, not on all 112.' },
      { t:'Call intelligence', d:'Sales calls in Gujarati, Hindi or English are transcribed, summarised and filed to the right lead automatically — with the buyer\'s real objection extracted and the executive\'s pitch quality scored. No more "I already told him."' },
      { t:'No-show shield', d:'Predicts which of tomorrow\'s site visits will not turn up, and nudges, reconfirms or reschedules before the executive wastes his Sunday standing at the gate.' },
      { t:'Stale inventory radar', d:'Flags the units nobody is asking about, explains why (floor band, view, price per sq ft against the neighbouring tower) and suggests the exact incentive that will move them.' },
      { t:'Collections radar', d:'Learns the pattern that came before every past default and warns you weeks ahead — with the reminder ladder already drafted in the buyer\'s language.' },
      { t:'AI matchmaker', d:'A buyer says "3 BHK, east facing, under ₹1.5 Cr, possession within 2 years". It searches every unit across every project and resale stock and returns the four that actually fit, with cost sheets attached.' },
      { t:'Channel partner truth score', d:'Separates the brokers who send bookings from the brokers who only send noise — conversion, quality, payout earned and time to close, per partner.' },
      { t:'Owner\'s 8am briefing', d:'One WhatsApp message every morning: yesterday\'s leads, visits, bookings and collections, what is at risk today, and the three things to fix. Read it in the car.' },
      { t:'Post-possession reputation engine', d:'This is our home ground. Every handover triggers a Google review request at the right moment, sentiment is read, and negatives reach you before they reach the internet.' }
    ],
    killer: 'Every real estate CRM tells you what your team <span class="ac">did</span>. This one answers the buyer at midnight, tells you who is <span class="ac">going to book</span>, and collects the money before it goes bad.'
  },

  problemsPage: {
    title: 'Every problem a builder has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Ask him which of these cost him the most this year — then open that exact screen in the CRM.'
  },

  problems: [
    { p: 'Portal leads go cold before anyone calls them.',
      detail: 'You pay ₹700–₹2,000 for a lead on 99acres or Meta. It lands at 10:40pm. Somebody calls at 4pm the next day. By then the buyer has spoken to three other builders. Roughly 8 out of 10 paid leads are wasted this way — not by bad selling, by slow replying.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>30-second WhatsApp reply</b> — AI answers instantly in their language, qualifies budget, configuration and timeline, and books the site visit into the executive\'s calendar. Works at 2am.' },
        { where:'CRM', w:'crm', d:'Every portal, every campaign and the website feed into one <b>Leads</b> module with the source tagged, so nothing sits in a WhatsApp group.' },
        { where:'App', w:'app', d:'The executive gets the qualified lead with a summary on his phone — not a name and a number.' }
      ] },

    { p: 'Two executives sell the same flat. Or hold it for a friend for two weeks.',
      detail: 'Availability lives in an Excel sheet that one person updates. Units get "held" verbally and never released, so live enquiries are told a floor is gone when it is not. Every builder has had the embarrassing phone call.',
      fixes: [
        { where:'CRM', w:'crm', d:'<b>Live inventory</b> — project → tower → floor → unit, colour-coded Available / Held / Booked / Registered, updating instantly for everyone.' },
        { where:'CRM', w:'crm', d:'<b>72-hour hold rule</b> with token tracking — an unpaid hold auto-expires and the unit goes back on sale, with the sales head notified.' },
        { where:'AI', w:'ai', d:'Arya flags a held unit the moment a live enquiry wants that exact floor band — so you release it instead of losing the buyer.' }
      ] },

    { p: 'Nobody can tell you which lead is actually going to book.',
      detail: 'The pipeline says 112 live leads. Your sales head cannot tell you which 12 matter, so the team spreads effort evenly across people who were never going to buy — and the one buyer who was ready books with somebody else.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Booking probability 0–100</b> on every lead, from budget fit, visit history, cost-sheet opens, reply speed and loan status.' },
        { where:'AI', w:'ai', d:'<b>Call intelligence</b> transcribes and summarises every call, extracts the real objection, and files it to the lead automatically.' },
        { where:'CRM', w:'crm', d:'The day list is auto-ranked. The team opens the CRM and the first ten rows are the ten calls that matter.' }
      ] },

    { p: 'Sunday site visits, and half of them never turn up.',
      detail: 'Six visits scheduled, three arrive. Executives lose their weekend, the site team stands around, and nobody logged why the other three vanished — so it happens again next Sunday.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>No-show shield</b> predicts who will not come and reconfirms or reschedules them the evening before.' },
        { where:'App', w:'app', d:'Executive checks in at the site from his phone, records the outcome and speaks a voice note — AI writes the follow-up plan into the CRM.' },
        { where:'CRM', w:'crm', d:'Visit-to-booking ratio per executive, per project and per source — so you know who can actually close on site.' }
      ] },

    { p: 'Collections slip and nobody notices until it is a crore.',
      detail: 'Demands are raised when someone remembers. Reminders are ad-hoc. Interest on delay is rarely charged. The money is booked on paper but sitting in the buyer\'s account, and your working capital is funding their delay.',
      fixes: [
        { where:'CRM', w:'crm', d:'<b>Construction-linked demands</b> — mark a slab cast and every buyer on that plan gets a demand letter, ledger and receipt trail automatically.' },
        { where:'AI', w:'ai', d:'<b>Collections radar</b> learns what came before past defaults and warns you weeks ahead, with the reminder ladder pre-drafted in the buyer\'s language.' },
        { where:'App', w:'app', d:'Buyer sees the schedule, the next demand and pays by UPI from the app. Receipt issued instantly.' }
      ] },

    { p: 'Channel partners argue about who brought the lead — and when they get paid.',
      detail: 'A broker walks in with a client who already enquired online last month. Now there is a fight. Brokerage slabs are informal, invoices sit in a drawer, and payouts get delayed — so the good brokers stop bringing you clients.',
      fixes: [
        { where:'CRM', w:'crm', d:'<b>Channel partner module</b> — registration, RERA ID, lead tagging with a dated first-claim rule that settles the argument with a timestamp.' },
        { where:'CRM', w:'crm', d:'Brokerage slabs, TDS, invoice raised, payout released and outstanding — a clean ledger per partner.' },
        { where:'AI', w:'ai', d:'<b>Partner truth score</b> shows which CPs actually convert, so you spend your inventory access and incentives on the right ones.' }
      ] },

    { p: 'After booking, the buyer goes into three years of silence.',
      detail: 'Payment made, agreement signed, and then nothing until possession. Buyers call the office for their ledger, for photos, for a document copy. Your team becomes a call centre, and buyers who feel ignored never refer anyone.',
      fixes: [
        { where:'App', w:'app', d:'<b>Buyer app</b> — construction progress with monthly photos, full payment ledger, every document, loan tracking and a request desk.' },
        { where:'CRM', w:'crm', d:'Post-sale pipeline: agreement → registration → loan disbursement → possession → snag closure, with owners on each step.' },
        { where:'AI', w:'ai', d:'At possession, AI asks for the Google review at the right moment and reads the sentiment — reputation is what we do best.' }
      ] },

    { p: 'You cannot prove which marketing rupee worked.',
      detail: 'You spend on 99acres, MagicBricks, Housing, Meta, hoardings and newspaper. At month end nobody can say what a booking cost from each. So budget is decided on feel, and the worst-performing channel usually survives longest.',
      fixes: [
        { where:'CRM', w:'crm', d:'<b>Source ROI report</b> — spend, leads, site visits, bookings, cost per visit and cost per booking for every source, side by side.' },
        { where:'AI', w:'ai', d:'Arya tells you plainly which campaign to cut this week and what the money buys if you move it.' },
        { where:'CRM', w:'crm', d:'UTM and call-tracking numbers per campaign, so attribution is measured, not argued.' }
      ] }
  ],

  appsPage: {
    title: 'Three apps. <span class="ac">One property business.</span>',
    sub: 'These are working prototypes — tap anything. Open the buyer app, tap Payments, and show him what his buyers would stop phoning the office about.'
  },

  apps: {
    buyer: {
      name: 'Buyer App', icon: '🏠', home: 'home',
      blurb: 'What every buyer gets the day they book — and the reason they refer two more.',
      try: [
        'Open Payments — show the full ledger and the next demand with a UPI button.',
        'Tap Progress — monthly site photos and the slab count, so nobody has to call the office.',
        'Tap Documents — allotment letter, agreement, RERA certificate, all in their pocket.'
      ],
      points: [
        { t:'Kills the panic calls', d:'ledger, receipts, documents and progress are all self-serve.' },
        { t:'Earns referrals', d:'a buyer who feels informed brings you the cheapest leads you will ever get.' },
        { t:'Collects faster', d:'the demand arrives with a pay button, not a phone call.' }
      ],
      screens: {
        home: { t:'Anantam Skies', s:'Unit B-1104 · 3 BHK · 1,845 sq ft', nav:'Home', blocks:[
          { type:'hero', v:'62%', k:'Construction complete · Dec 2027 possession' },
          { type:'meter', label:'Slab 21 of 34 cast', right:'On schedule', pct:62 },
          { type:'kpis', items:[ {v:'₹1.58 Cr',k:'Total value'}, {v:'₹94.6 L',k:'Paid'}, {v:'₹18.4 L',k:'Next due'} ] },
          { type:'sec', text:'Quick actions' },
          { type:'rows', items:[
            { ic:'💳', nm:'Payments & ledger', sb:'Next demand due 12 Mar', rt:'₹18.4 L', goto:'pay' },
            { ic:'📸', nm:'Construction progress', sb:'14 new photos this month', rt:'New', goto:'prog' },
            { ic:'📄', nm:'My documents', sb:'Allotment, agreement, RERA', goto:'docs' },
            { ic:'🏦', nm:'Home loan tracking', sb:'HDFC · ₹68L of ₹94L disbursed', goto:'loan' },
            { ic:'🛠️', nm:'Raise a request', sb:'Snag, query or document copy', goto:'req' },
            { ic:'🎁', nm:'Refer & earn', sb:'₹50,000 on every booking', goto:'ref' }
          ] }
        ] },
        pay: { t:'Payments', s:'Construction-linked plan', nav:'Payments', blocks:[
          { type:'kpis', items:[ {v:'₹94.6 L',k:'Paid'}, {v:'₹63.4 L',k:'Balance'}, {v:'5 of 9',k:'Milestones'} ] },
          { type:'note', text:'<b>₹18.4 L due on 12 March</b> — raised on the 18th slab being cast. Pay by UPI, NEFT or cheque. Receipt is issued the same day.' },
          { type:'btn', text:'Pay ₹18,40,000 by UPI' },
          { type:'sec', text:'Full ledger' },
          { type:'rows', items:[
            { nm:'Booking amount', sb:'14 Aug 2025', rt:'✓ ₹11.0 L' },
            { nm:'On agreement', sb:'02 Oct 2025', rt:'✓ ₹23.7 L' },
            { nm:'On plinth', sb:'19 Jan 2026', rt:'✓ ₹15.8 L' },
            { nm:'On 8th slab', sb:'11 Apr 2026', rt:'✓ ₹15.8 L' },
            { nm:'On 12th slab', sb:'27 May 2026', rt:'✓ ₹15.8 L' },
            { nm:'On 18th slab', sb:'Due 12 Mar 2027', rt:'₹18.4 L' },
            { nm:'On 24th slab', sb:'Estimated Aug 2027', rt:'₹18.4 L' },
            { nm:'On possession', sb:'Includes registration', rt:'₹28.7 L' }
          ] },
          { type:'text', text:'Every payment carries a downloadable receipt and a GST-compliant invoice. Interest on delay, if any, is shown separately — never buried.' }
        ] },
        prog: { t:'Construction progress', s:'Updated 6 days ago', nav:'Progress', blocks:[
          { type:'meter', label:'Structure', right:'62%', pct:62 },
          { type:'meter', label:'Plumbing & electrical', right:'34%', pct:34 },
          { type:'meter', label:'Finishing & club house', right:'12%', pct:12 },
          { type:'sec', text:'This month on site' },
          { type:'cards', items:[
            { t:'18th slab shuttering complete', d:'14 photos · 06 Feb · verified by site engineer R. Solanki' },
            { t:'Club house excavation started', d:'6 photos · 28 Jan · ahead of schedule by 9 days' },
            { t:'Tower B lift shaft cast to 16th', d:'4 photos · 21 Jan' }
          ] },
          { type:'note', text:'Possession target <b>December 2027</b>. If a milestone slips by more than 30 days you are told here first — not at handover.' }
        ] },
        docs: { t:'My documents', s:'All originals, always available', nav:'Docs', blocks:[
          { type:'rows', items:[
            { ic:'📄', nm:'Allotment letter', sb:'Issued 14 Aug 2025', rt:'PDF' },
            { ic:'📄', nm:'Agreement to sale', sb:'Registered 02 Oct 2025', rt:'PDF' },
            { ic:'📄', nm:'Payment receipts (5)', sb:'All milestones paid', rt:'PDF' },
            { ic:'📄', nm:'RERA certificate', sb:'PR/GJ/SURAT/2024/01847', rt:'PDF' },
            { ic:'📄', nm:'Approved floor plan', sb:'Unit B-1104 · 1,845 sq ft', rt:'PDF' },
            { ic:'📄', nm:'Cost sheet', sb:'Base + floor rise + PLC + GST', rt:'PDF' },
            { ic:'📄', nm:'TDS 26QB acknowledgement', sb:'1% on ₹1.58 Cr · filed', rt:'PDF' }
          ] },
          { type:'text', text:'No more phoning the office for a copy of your own agreement.' }
        ] },
        loan: { t:'Home loan', s:'HDFC Bank · sanctioned ₹94 L', nav:'Loan', blocks:[
          { type:'hero', v:'₹68 L', k:'Disbursed of ₹94 L sanctioned' },
          { type:'meter', label:'Disbursement against milestones', right:'72%', pct:72 },
          { type:'rows', items:[
            { nm:'Sanction letter', sb:'Issued 26 Sep 2025', rt:'PDF' },
            { nm:'Disbursement 1', sb:'On agreement · 08 Oct 2025', rt:'₹23.7 L' },
            { nm:'Disbursement 2', sb:'On plinth · 22 Jan 2026', rt:'₹15.8 L' },
            { nm:'Disbursement 3', sb:'On 12th slab · 30 May 2026', rt:'₹28.5 L' },
            { nm:'Next request', sb:'On 18th slab · auto-raised', rt:'Pending' }
          ] },
          { type:'note', text:'Our finance desk raises the disbursement request with your bank the day the milestone is certified — you do not chase anybody.' }
        ] },
        req: { t:'Raise a request', s:'Answered within one working day', nav:'Requests', blocks:[
          { type:'chips', items:['Snag / defect','Document copy','Payment query','Change request','Possession','Other'] },
          { type:'sec', text:'Your open requests' },
          { type:'rows', items:[
            { nm:'Copy of stamped agreement', sb:'Raised 04 Feb · assigned to Priya (CRM desk)', rt:'In progress' },
            { nm:'Query on floor rise charge', sb:'Raised 22 Jan · resolved 23 Jan', rt:'Closed' }
          ] },
          { type:'note', text:'Every request has an owner and a clock on it. You always know who is handling it and since when.' }
        ] },
        ref: { t:'Refer & earn', s:'₹50,000 on every booking', nav:'Refer', blocks:[
          { type:'hero', v:'₹1,00,000', k:'Earned from 2 successful referrals' },
          { type:'rows', items:[
            { nm:'Hiren Vasani', sb:'Booked A-0904 · paid 12 Dec 2026', rt:'✓ ₹50,000' },
            { nm:'Sanjay Modi', sb:'Booked C-0511 · paid 03 Aug 2026', rt:'✓ ₹50,000' },
            { nm:'Ketan Dave', sb:'Site visit done · decision pending', rt:'In pipeline' }
          ] },
          { type:'btn', text:'Refer someone on WhatsApp' },
          { type:'text', text:'Referred buyers close 3× faster and cost you nothing in advertising. This screen is why they get referred.' }
        ] }
      }
    },

    exec: {
      name: 'Sales Executive App', icon: '🎯', home: 'day',
      blurb: 'What the field team opens at 9am — ranked by who is actually going to book.',
      try: [
        'Open My day — show that the list is AI-ranked, not alphabetical.',
        'Tap the Nikunj Patel lead — the whole history, the objection, and the next line to say.',
        'Tap Inventory — live availability, so he never promises a flat that is gone.',
        'Tap Cost sheet — a full priced quotation on WhatsApp in 20 seconds.'
      ],
      points: [
        { t:'Ranked, not random', d:'the first ten rows are the ten calls worth making today.' },
        { t:'Never oversells', d:'live inventory in his hand at the site.' },
        { t:'Kills paperwork', d:'a voice note after the visit becomes the CRM entry.' }
      ],
      screens: {
        day: { t:'My day', s:'Tuesday 18 · Rahul Mehta · Skies + Greens', nav:'My day', blocks:[
          { type:'kpis', items:[ {v:'14',k:'Follow-ups'}, {v:'3',k:'Site visits'}, {v:'₹94 L',k:'In closing'} ] },
          { type:'note', text:'<b>Arya:</b> Call Nikunj Patel before 12pm. He opened the cost sheet 4 times last night and enquired at Sunrise Heights this morning. Booking probability <b>92%</b>.' },
          { type:'sec', text:'Ranked by booking probability' },
          { type:'rows', items:[
            { ic:'92', nm:'Nikunj Patel', sb:'Skies · 3 BHK · visited 2× · loan approved', rt:'Call now', goto:'lead' },
            { ic:'81', nm:'Devang Bhatt', sb:'Skies · 4 BHK · visit tomorrow 12:30', rt:'Confirm' },
            { ic:'74', nm:'Aliya Shaikh', sb:'Business Park · showroom · CP lead', rt:'Cost sheet', goto:'cost' },
            { ic:'66', nm:'Rachana Shah', sb:'Greens · 2 BHK · visit unconfirmed', rt:'No-show risk' },
            { ic:'48', nm:'Mehul Trivedi', sb:'Hold on B-1104 expiring · no token', rt:'Chase' },
            { ic:'31', nm:'Paresh Doshi', sb:'Budget ₹60L · below Skies entry price', rt:'Move to Greens' }
          ] },
          { type:'sec', text:'Tools' },
          { type:'rows', items:[
            { ic:'🏢', nm:'Live inventory', sb:'Availability across 3 projects', goto:'inv' },
            { ic:'🧾', nm:'Build a cost sheet', sb:'Priced quotation in 20 seconds', goto:'cost' },
            { ic:'📍', nm:'Site visit check-in', sb:'2 visits scheduled today', goto:'visit' }
          ] }
        ] },
        lead: { t:'Nikunj Patel', s:'Booking probability 92 · Skies 3 BHK', nav:'Lead', back:'day', blocks:[
          { type:'hero', v:'92', k:'AI booking probability · highest in your pipeline' },
          { type:'kpis', items:[ {v:'₹1.4–1.6 Cr',k:'Budget'}, {v:'2',k:'Site visits'}, {v:'4',k:'Cost sheet opens'} ] },
          { type:'note', text:'<b>Real objection (from call intelligence):</b> not price — he is worried about the December 2027 possession date because his current rent agreement ends March 2027. Offer the rent-free transition scheme. Nobody had written this down.' },
          { type:'sec', text:'What happened so far' },
          { type:'rows', items:[
            { nm:'Enquiry from 99acres', sb:'02 Feb 10:41pm · AI replied in 28 seconds', rt:'Source' },
            { nm:'Site visit 1', sb:'08 Feb · came with wife · liked B-1104 view', rt:'Done' },
            { nm:'Cost sheet sent', sb:'08 Feb · opened 4× on 17 Feb 11:20pm', rt:'Hot' },
            { nm:'Call · 6 min 12 sec', sb:'11 Feb · transcript + summary filed', rt:'Play' },
            { nm:'Site visit 2', sb:'15 Feb · brought father · asked about loan', rt:'Done' },
            { nm:'Loan pre-approval', sb:'HDFC ₹94 L · 17 Feb', rt:'Cleared' }
          ] },
          { type:'sec', text:'Arya suggests' },
          { type:'cards', items:[
            { t:'Say this on the call', d:'"Sir, on possession — we can structure your last two milestones so you are not paying rent and EMI together. Let me show you the numbers."' },
            { t:'Hold B-1104 for 48 hours', d:'Token ₹1 lakh. He has seen this exact unit twice; nothing else in the tower has that view.' },
            { t:'Competitor alert', d:'He enquired at Sunrise Heights at 9:14am today. Move before their team calls him.' }
          ] },
          { type:'btn', text:'Call Nikunj now' }
        ] },
        inv: { t:'Live inventory', s:'Updated 4 seconds ago', nav:'Inventory', back:'day', blocks:[
          { type:'chips', items:['Anantam Skies','Anantam Greens','Business Park'] },
          { type:'kpis', items:[ {v:'54',k:'Available'}, {v:'6',k:'On hold'}, {v:'118',k:'Booked'} ] },
          { type:'sec', text:'Anantam Skies · Tower B · 3 BHK' },
          { type:'rows', items:[
            { nm:'B-1104 · 11th floor', sb:'1,845 sq ft · east · sunset deck', rt:'₹1.58 Cr' },
            { nm:'B-1204 · 12th floor', sb:'1,845 sq ft · east · higher floor rise', rt:'₹1.61 Cr' },
            { nm:'B-0904 · 9th floor', sb:'HELD for Mehul Trivedi · expires today', rt:'On hold' },
            { nm:'B-1404 · 14th floor', sb:'1,845 sq ft · east · club level', rt:'₹1.67 Cr' },
            { nm:'B-0704 · 7th floor', sb:'BOOKED · Jayesh Kansara', rt:'Booked' }
          ] },
          { type:'note', text:'Green means you can promise it. Amber means somebody is holding it and the clock is running. Red means it is gone. No Excel sheet, no phone call to the office.' }
        ] },
        cost: { t:'Cost sheet', s:'B-1104 · 3 BHK · 1,845 sq ft', nav:'Cost sheet', back:'day', blocks:[
          { type:'rows', items:[
            { nm:'Base rate', sb:'1,845 sq ft × ₹7,100', rt:'₹1,30,99,500' },
            { nm:'Floor rise', sb:'11 floors × ₹35/sq ft', rt:'₹7,10,325' },
            { nm:'PLC · east + deck', sb:'Preferential location charge', rt:'₹4,61,250' },
            { nm:'Covered parking', sb:'2 slots', rt:'₹4,00,000' },
            { nm:'Club & infra', sb:'One-time membership', rt:'₹3,50,000' },
            { nm:'GST @ 5%', sb:'On agreement value', rt:'₹7,50,600' },
            { nm:'Stamp duty & registration', sb:'Gujarat · 4.9% + 1%', rt:'₹8,84,000' },
            { nm:'Less: launch benefit', sb:'Applied 18 Feb', rt:'− ₹8,00,000' }
          ] },
          { type:'hero', v:'₹1,58,55,675', k:'All-inclusive · nothing hidden later' },
          { type:'note', text:'<b>1% TDS (₹1,58,557)</b> is payable by the buyer under section 194-IA and flagged automatically — one of the most common compliance misses in Indian property sales.' },
          { type:'btn', text:'Send branded PDF on WhatsApp' }
        ] },
        visit: { t:'Site visit check-in', s:'Anantam Skies · 12:30pm', nav:'Visit', back:'day', blocks:[
          { type:'rows', items:[
            { nm:'Devang Bhatt', sb:'4 BHK · came with wife and father', rt:'Arrived' },
            { nm:'Units shown', sb:'B-1404, B-1604, sample flat', rt:'3' },
            { nm:'Time on site', sb:'Checked in 12:34 · still on site', rt:'52 min' }
          ] },
          { type:'sec', text:'Speak your notes — AI writes the CRM entry' },
          { type:'note', text:'🎙️ <b>Recorded:</b> "Family liked the 16th floor, wife wants a bigger kitchen, father asked about possession and loan. Budget stretch possible to 1.75. They are comparing with Shalin Elite."' },
          { type:'sec', text:'Arya filed this automatically' },
          { type:'cards', items:[
            { t:'Objection captured', d:'Kitchen size — send the B-1604 modified layout tonight.' },
            { t:'Budget updated', d:'₹1.6 Cr → ₹1.75 Cr. Two more units now qualify.' },
            { t:'Competitor logged', d:'Shalin Elite. Comparison sheet attached to the follow-up.' },
            { t:'Follow-up scheduled', d:'Call tomorrow 11am. Reminder set. Nothing typed by hand.' }
          ] }
        ] }
      }
    },

    cp: {
      name: 'Channel Partner App', icon: '🤝', home: 'cphome',
      blurb: 'Brokers bring you clients when they trust the inventory and the payout. This is how you earn both.',
      try: [
        'Tap Add a client — show the timestamped first-claim rule that ends every ownership argument.',
        'Open My earnings — brokerage, TDS, invoice raised, payout released, all visible.',
        'Open Inventory access — the CP sees only what you allow, priced at your CP rate.'
      ],
      points: [
        { t:'Ends lead disputes', d:'a dated first-claim rule settles it with a timestamp, not a shouting match.' },
        { t:'Attracts the good brokers', d:'transparent payouts are the number one reason CPs prefer one builder over another.' },
        { t:'Shows you the truth', d:'you learn which partners actually convert.' }
      ],
      screens: {
        cphome: { t:'Skyline Realty', s:'Registered CP · RERA GJ/CP/2023/0912', nav:'Home', blocks:[
          { type:'hero', v:'₹18.4 L', k:'Brokerage earned this financial year' },
          { type:'kpis', items:[ {v:'34',k:'Leads sent'}, {v:'7',k:'Bookings'}, {v:'21%',k:'Conversion'} ] },
          { type:'rows', items:[
            { ic:'➕', nm:'Add a client', sb:'Timestamped claim, instantly', goto:'add' },
            { ic:'🏢', nm:'Inventory access', sb:'Live availability at CP rates', goto:'cpinv' },
            { ic:'💰', nm:'My earnings', sb:'₹4.2 L payout pending', goto:'earn' },
            { ic:'📊', nm:'My performance', sb:'You rank 2nd of 41 partners', goto:'perf' }
          ] }
        ] },
        add: { t:'Add a client', s:'Claim is stamped the second you submit', nav:'Add', back:'cphome', blocks:[
          { type:'rows', items:[
            { nm:'Client name', sb:'Hitesh Ramani', rt:'Entered' },
            { nm:'Mobile', sb:'+91 98•••• ••42', rt:'Verified' },
            { nm:'Interested in', sb:'Anantam Skies · 3 BHK', rt:'Selected' },
            { nm:'Budget', sb:'₹1.4 – 1.7 Cr', rt:'Selected' }
          ] },
          { type:'note', text:'<b>Claim check passed.</b> This mobile number has no prior enquiry on record. Your claim is valid for 90 days from 18 Feb, 2:57pm. If the client had already enquired directly, you would be told right now — not after the booking.' },
          { type:'btn', text:'Submit claim' },
          { type:'text', text:'This single screen removes the most common fight in Indian real estate sales.' }
        ] },
        cpinv: { t:'Inventory access', s:'What Anantam has released to you', nav:'Inventory', back:'cphome', blocks:[
          { type:'chips', items:['Skies · 12 units','Greens · 27 units','Business Park · 9 units'] },
          { type:'rows', items:[
            { nm:'B-1204 · 3 BHK', sb:'1,845 sq ft · east · 12th floor', rt:'₹1.61 Cr' },
            { nm:'B-1404 · 3 BHK', sb:'1,845 sq ft · club level', rt:'₹1.67 Cr' },
            { nm:'A-0806 · 4 BHK', sb:'2,410 sq ft · corner · double deck', rt:'₹2.14 Cr' },
            { nm:'G-304 · 2 BHK', sb:'Greens · 1,120 sq ft · garden facing', rt:'₹82.4 L' }
          ] },
          { type:'note', text:'Brokerage on Skies: <b>2% + 0.5% bonus</b> above 3 bookings a quarter. You are at 3 — the bonus slab is live.' }
        ] },
        earn: { t:'My earnings', s:'FY 2026–27', nav:'Earnings', back:'cphome', blocks:[
          { type:'kpis', items:[ {v:'₹18.4 L',k:'Earned'}, {v:'₹14.2 L',k:'Paid out'}, {v:'₹4.2 L',k:'Pending'} ] },
          { type:'rows', items:[
            { nm:'Nikunj Patel · B-1104', sb:'Booked 18 Feb · invoice raised', rt:'₹3.17 L' },
            { nm:'Aliya Shaikh · Shop 12', sb:'Booked 04 Feb · payout 28 Feb', rt:'₹1.03 L' },
            { nm:'Hiren Vasani · A-0904', sb:'Paid 12 Jan · TDS ₹5,240 deducted', rt:'✓ ₹5.24 L' },
            { nm:'Sanjay Modi · C-0511', sb:'Paid 03 Dec', rt:'✓ ₹4.81 L' },
            { nm:'Ketan Dave · G-208', sb:'Paid 19 Nov', rt:'✓ ₹4.15 L' }
          ] },
          { type:'note', text:'Payout releases automatically once the buyer clears their agreement milestone. No follow-up calls to the accounts department.' }
        ] },
        perf: { t:'My performance', s:'Against 41 registered partners', nav:'Performance', back:'cphome', blocks:[
          { type:'hero', v:'#2', k:'Partner rank · by bookings converted' },
          { type:'bars', items:[32,45,38,56,49,62,58,71,66,78,74,88] },
          { type:'rows', items:[
            { nm:'Leads sent', sb:'34 this year', rt:'34' },
            { nm:'Site visits done', sb:'19 of 34 leads visited', rt:'56%' },
            { nm:'Bookings', sb:'7 · best in the 2–3 BHK segment', rt:'21%' },
            { nm:'Average time to close', sb:'Partner average is 51 days', rt:'34 days' }
          ] },
          { type:'note', text:'Builders reward the partners they can measure. This screen is how you get first access to a new launch.' }
        ] }
      }
    }
  }
};
