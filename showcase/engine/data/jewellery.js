/* Jewellery Showrooms — demo data
   Palette: ivory + deep maroon + gold (LIGHT theme, proving the engine
   is not locked to dark). Display font: Cormorant Garamond. */
window.DEMOS = window.DEMOS || {};
window.DEMOS.jewellery = {
  name: 'Jewellery Showroom',
  label: 'Jewellery Showrooms',
  heroTag: 'Live demo · Jewellery',

  theme: {
    bg:'#FBF7F0', bg2:'#FFFFFF',
    panel:'rgba(26,16,12,.030)', panel2:'rgba(26,16,12,.055)',
    line:'rgba(26,16,12,.11)', line2:'rgba(26,16,12,.20)',
    txt:'#1B120C', txt2:'rgba(27,18,12,.66)', txt3:'rgba(27,18,12,.45)',
    ac:'#8E2144', ac2:'#B8860B', acInk:'#FFF8EE', acGlow:'rgba(142,33,68,.24)',
    wash1:'rgba(184,134,11,.13)', wash2:'rgba(142,33,68,.08)',
    font:"'Cormorant Garamond',Georgia,serif",
    fontBody:"'Jost',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600&display=swap'
  },

  hero: {
    h1: 'They buy for<br>an occasion.<br><span class="ac">Know it first.</span>',
    lead: 'Jewellery is not bought on a whim — it is bought for a wedding, an anniversary, a birth, a festival. Every other showroom finds out afterwards. This one tells you a month before, and reminds you which customer buys what.',
    cta1: 'Open the Occasion Engine', cta2: 'See the website'
  },

  overview: {
    cards: [
      { ic:'🖥️', h:'The showroom website', p:'Collections, certifications, custom design and appointment booking — an online presence worthy of the name on your board.', link:'website.html', go:'Open website' },
      { ic:'🛰️', h:'The CRM', p:'Customers, purchase history, savings schemes, dues and daily rates — plus the Occasion Engine and high-value alerts.', link:'crm.html', go:'Open CRM' },
      { ic:'📱', h:'The customer app', p:'Scheme balance, new collections, certificates and appointment booking — a reason to stay in touch all year.', link:'app.html', go:'Open app screens' },
      { ic:'✨', h:'The AI Edge', p:'Occasion Engine, scheme drop-out prevention, high-value customer alerts and taste matching.', link:'features.html', go:'See the AI features' }
    ],
    kpis: [
      { n:3.4, dec:1, suffix:'×', l:'More repeat purchases from past customers' },
      { n:28, suffix:'%', l:'Fewer savings-scheme drop-outs' },
      { n:41, suffix:'%', l:'More customers reached before their occasion' },
      { n:9, suffix:' hrs', l:'Staff hours saved on registers weekly' }
    ]
  },

  website: {
    title: 'An online presence <span class="ac">worthy of the name</span> on your board.',
    sub: 'Families research for weeks before a wedding purchase. If your showroom looks small online, you are not on their list.',
    url: 'www.rajlaxmijewellers.in', brand: 'Rajlaxmi Jewellers',
    nav: ['Collections','Bridal','Custom design','Schemes','Visit us'], navCta: 'Book an appointment',
    heroTitle: 'Four generations of<br><span class="ac">trust,</span> in every piece.',
    heroSub: 'Hallmarked gold, certified diamonds and bridal sets crafted in our own workshop since 1948. Book a private appointment and let our family help yours.',
    heroCta: 'Book a private appointment', heroCta2: 'View bridal collection',
    stats: [
      { v:'1948', k:'Serving families since' }, { v:'BIS', k:'Hallmarked, always' },
      { v:'12,400+', k:'Families served' }, { v:'4.8★', k:'Google rating' }
    ],
    servicesLabel: 'What we are known for',
    services: [
      { ic:'💍', h:'Bridal collections', p:'Complete wedding sets designed with the family, crafted in our workshop, delivered on your date.', price:'Private appointments' },
      { ic:'✨', h:'Custom design', p:'Bring a photograph or an heirloom. Our karigars will design and make it exactly as you imagine it.', price:'Design consultation free' },
      { ic:'🪙', h:'Monthly savings scheme', p:'Save a fixed amount every month for eleven months. We add the twelfth — and you buy at the rate you locked.', price:'From ₹2,000 / month' }
    ],
    testimonial: {
      text: 'They called me a month before my daughter\'s wedding anniversary to say a new collection had come in her taste. No other showroom has ever remembered anything about my family.',
      who: 'Hasmukhbhai Shah, customer since 1997'
    }
  },

  crm: {
    title: 'Every customer, every occasion, <span class="ac">every scheme.</span>',
    sub: 'Registers cannot tell you whose anniversary is next month. This can.',
    appName: 'Rajlaxmi CRM',
    kpis: [
      { v:'₹42.6L', k:'Sales this month' },
      { v:'₹6.84L', k:'Scheme collections' },
      { v:'214', k:'Active scheme members' },
      { v:'₹7,412', k:'Gold rate · 22K / gram' }
    ],
    mainTitle: 'Occasions & follow-ups this month', mainTag: 'Sorted by date',
    rows: [
      { nm:'Hasmukhbhai Shah', sub:'Daughter\'s wedding anniversary · 12 Sep · buys bridal & diamond', pill:'Call this week', tone:'ac' },
      { nm:'Nirali Desai', sub:'Scheme instalment 8 of 12 missed · ₹5,000 · 14 days late', pill:'Scheme at risk', tone:'r' },
      { nm:'Paresh Modi', sub:'Son\'s engagement 3 Oct · enquired about sets last month', pill:'Hot · high value', tone:'ac' },
      { nm:'Falguni Trivedi', sub:'Anniversary 22 Sep · last bought ₹1.8L diamond pendant', pill:'Occasion soon', tone:'a' },
      { nm:'Bhavesh Patel', sub:'Custom order ready for delivery · balance ₹64,000', pill:'Ready · collect', tone:'g' },
      { nm:'Rekha Joshi', sub:'No purchase in 26 months · was a twice-yearly customer', pill:'Gone quiet', tone:'r' }
    ],
    footV:'₹42.6L', footK:'sales this month', footV2:'28', footK2:'occasions coming up',
    barsTitle: 'Sales · last 12 months',
    bars: [38,44,40,52,49,58,46,54,62,88,96,71],
    ai: {
      h: 'Occasion Engine',
      items: [
        { t:'28 family occasions in the next 30 days', d:'Anniversaries, birthdays and weddings across your customer base — with each family\'s buying history and budget beside them.' },
        { t:'Hasmukhbhai buys diamond, not plain gold', d:'Six of his last seven purchases were diamond. The new Solitaire collection matches his taste and his usual ₹1.5–2L range.' },
        { t:'9 scheme members likely to drop out', d:'They have missed one instalment and historically that is when people quit. A call this week keeps the scheme alive.' }
      ]
    },
    panels: [
      { h:'Savings schemes', tag:'214 active', rows:[
        { nm:'On track', sub:'187 members', pill:'Healthy', tone:'g' },
        { nm:'One instalment late', sub:'18 members', pill:'Follow up', tone:'a' },
        { nm:'At risk of dropping', sub:'9 members', pill:'Call today', tone:'r' }
      ]},
      { h:'Custom orders', rows:[
        { nm:'Bhavesh Patel', sub:'Bridal set · ready', pill:'Deliver', tone:'g' },
        { nm:'Sejal Amin', sub:'Necklace · at karigar', pill:'In making', tone:'a' },
        { nm:'Yash Bhatt', sub:'Ring resize · today', pill:'Today', tone:'ac' }
      ]}
    ]
  },

  app: {
    title: 'A reason to stay in touch <span class="ac">all year.</span>',
    sub: 'Not a shopping app — a relationship. Their scheme, their certificates, their occasions, and the collections that suit their taste.',
    why: 'Jewellery customers buy two or three times in a decade. The showroom they buy from is the one that stayed in touch in between. This is how you stay in touch without ever feeling like a salesman.',
    screens: [
      { t:'My savings scheme', s:'Instalment 8 of 12', cap:'The single best reason to open the app.',
        big:{ v:'₹40,000', k:'Saved so far' }, meter:67, meterLabel:'8 of 12 instalments · ₹5,000 monthly',
        rows:[
          { nm:'Next instalment', sb:'Due 5 September', rt:'Pay' },
          { nm:'Rate locked at', sb:'₹7,120 / gram · 22K', rt:'Saved' },
          { nm:'Bonus instalment', sb:'We add the 12th', rt:'₹5,000' }
        ]},
      { t:'New for you', s:'Chosen for your taste', cap:'Only pieces matching what they actually buy.',
        rows:[
          { nm:'Solitaire pendant set', sb:'Diamond · 18K rose gold', rt:'₹1.72L' },
          { nm:'Antique temple necklace', sb:'22K · bridal collection', rt:'₹3.40L' },
          { nm:'Everyday diamond studs', sb:'Certified · 0.5ct', rt:'₹48,000' },
          { nm:'Book a private viewing', sb:'Sunday slots open', rt:'Book' }
        ]},
      { t:'My purchases', s:'Certificates & history', cap:'Every certificate, never lost again.',
        rows:[
          { nm:'Diamond pendant', sb:'12 Nov 2024 · certificate', rt:'View' },
          { nm:'Bridal set', sb:'8 Feb 2022 · certificate', rt:'View' },
          { nm:'Gold bangles', sb:'19 Oct 2020 · hallmark', rt:'View' },
          { nm:'Free cleaning', sb:'Twice a year for you', rt:'Book' }
        ]}
    ]
  },

  features: {
    essentials: [
      { t:'Customers & purchase history', d:'Every family, everything they have ever bought, and what they paid — instantly searchable.' },
      { t:'Billing & GST', d:'Proper invoices, hallmark details, making charges and GST handled correctly every time.' },
      { t:'Savings schemes', d:'Members, instalments, balances and maturity — tracked automatically instead of in a register.' },
      { t:'Stock & designs', d:'Inventory by category, weight and purity, with what is moving and what is sitting.' },
      { t:'Custom orders', d:'Order to karigar to delivery, with stage tracking and balance due at every step.' },
      { t:'Daily rates & valuations', d:'Gold and silver rates updated daily, applied correctly across billing and schemes.' }
    ],
    edge: [
      { star:true, t:'Occasion Engine', d:'Learns every family\'s weddings, anniversaries and birthdays, then tells you a month before — with what that family buys and what they usually spend. This is the feature that sells the system.' },
      { t:'Taste matching', d:'Knows a customer buys diamond and not plain gold, temple and not contemporary — so you only call them when something actually suits them.' },
      { t:'Scheme drop-out prevention', d:'Flags the members who just missed an instalment, which is exactly when people quit a scheme. One call saves eleven months of collections.' },
      { t:'High-value customer alerts', d:'Your top 50 families get noticed the moment a matching piece arrives, before it goes on the floor.' },
      { t:'Gone-quiet radar', d:'A customer who came twice a year and has not come in two years is not gone — they are forgotten. This finds them.' },
      { t:'Festival campaign planner', d:'Knows the Indian wedding and festival calendar and prepares your campaigns weeks ahead, not the night before.' }
    ],
    killer: 'Jewellery is bought on <span class="ac">occasions</span>. Every other showroom finds out afterwards — ours tells you a month before.'
  },

  pages: [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['problems.html','Problems'], ['apps.html','The 3 Apps'],
    ['app.html','App screens'], ['features.html','Features']
  ],

  problemsPage: {
    title: 'Every problem a jeweller has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Ask him which of these he loses most business to — then open that screen.'
  },

  problems: [
    { p: 'Families buy for occasions and he finds out afterwards',
      detail: 'A wedding, an anniversary, a naming ceremony. The purchase happens somewhere else and he hears about it at the function.',
      fixes: [
        { where:'AI', w:'ai', d:'The <b>Occasion Engine</b> stores every family\'s dates and tells him a month before — with what that family buys and their usual budget.' },
        { where:'Owner CRM', w:'crm', d:'A running list of occasions in the next 30 days, sorted by what the family is worth.' },
        { where:'Customer app', w:'app', d:'Customers add their own family dates in exchange for a small reward.' }
      ]},

    { p: 'One purchase, then no relationship for years',
      detail: 'A family buys for a wedding and is never contacted again — until they need something and go wherever is convenient.',
      fixes: [
        { where:'Customer app', w:'app', d:'Their certificates, purchase history and scheme balance live in the app all year.' },
        { where:'AI', w:'ai', d:'A gone-quiet radar finds customers who used to buy twice a year and have not been in for two.' }
      ]},

    { p: 'Savings schemes are tracked in a register and members drop out',
      detail: 'Eleven-month schemes are excellent business, but one missed instalment usually means the customer quietly stops.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Every member, instalment and maturity date tracked automatically.' },
        { where:'AI', w:'ai', d:'Flags members who just missed one instalment — the exact moment people quit — so a call saves the scheme.' },
        { where:'Customer app', w:'app', d:'They see their balance and pay the instalment from the phone.' }
      ]},

    { p: 'Offers get shown to people who do not buy that kind of jewellery',
      detail: 'A diamond buyer gets a plain-gold message. A temple-jewellery family gets a contemporary collection. Everyone ignores everything.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Taste matching</b> learns what each family actually buys and only tells them about pieces that suit them.' },
        { where:'Customer app', w:'app', d:'A personal "new for you" feed instead of a mass broadcast.' }
      ]},

    { p: 'Custom orders slip and the customer chases him',
      detail: 'Design, karigar, polish, delivery — all tracked verbally. The customer calls three times and still does not know.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Custom orders with stage tracking, karigar assigned and balance due.' },
        { where:'Customer app', w:'app', d:'The customer sees the stage themselves and stops calling.' }
      ]},

    { p: 'Certificates and bills get lost, then the resale is disputed',
      detail: 'Years later a family cannot find the certificate, and an exchange or resale becomes an argument.',
      fixes: [
        { where:'Customer app', w:'app', d:'Every certificate, hallmark and invoice kept forever in their phone.' },
        { where:'Owner CRM', w:'crm', d:'The showroom has the same record, searchable in seconds.' }
      ]},

    { p: 'Staff cannot tell a first-time walk-in from a top customer',
      detail: 'A family that has spent ₹20 lakh over the years gets treated exactly like someone who wandered in.',
      fixes: [
        { where:'Staff app', w:'app', d:'The moment a customer is looked up, staff see their history, taste and value.' },
        { where:'Owner CRM', w:'crm', d:'Top-customer list so the best families always get the senior person.' }
      ]},

    { p: 'Festival and wedding seasons are prepared far too late',
      detail: 'Most of the year\'s business happens in a few weeks, and the planning starts when the season has already begun.',
      fixes: [
        { where:'AI', w:'ai', d:'Knows the wedding and festival calendar and prepares campaigns weeks ahead.' },
        { where:'Owner CRM', w:'crm', d:'Last season\'s numbers so stock and staffing are based on fact.' }
      ]}
  ],

  appsPage: {
    title: 'Three apps. <span class="ac">One showroom.</span>',
    sub: 'Tap anything — these are working prototypes. Open the customer app, tap My scheme, and show him why a customer would keep this on their phone.'
  },

  apps: {
    customer: {
      name: 'Customer App', icon: '💍',
      blurb: 'A reason for a family to stay connected between purchases that are years apart — their scheme, their certificates and pieces chosen for their taste.',
      try: [
        'Tap "My savings scheme" — "this alone stops members dropping out"',
        'Go back, tap "Chosen for you" — "only pieces they actually buy"',
        'Go back, tap "My purchases" — "no certificate is ever lost again"'
      ],
      points: [
        { t:'Schemes get completed', d:'a visible balance and a one-tap payment.' },
        { t:'Taste, not spam', d:'they only hear about pieces that suit them.' },
        { t:'Trust', d:'every certificate kept safely, forever.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Namaste, Hasmukhbhai 🙏', s:'Rajlaxmi Jewellers · since 1997', blocks:[
          { type:'kpis', items:[ {v:'₹40,000',k:'Scheme saved'}, {v:'12',k:'Purchases with us'} ]},
          { type:'note', text:'Your daughter\'s anniversary is on <b>12 September.</b> A new solitaire collection has arrived in her taste.' },
          { type:'rows', items:[
            { ic:'🪙', nm:'My savings scheme', sb:'Instalment 8 of 12', goto:'scheme' },
            { ic:'✨', nm:'Chosen for you', sb:'3 new pieces in your taste', goto:'foryou' },
            { ic:'📜', nm:'My purchases', sb:'Certificates and hallmarks', goto:'purchases' },
            { ic:'📅', nm:'Family occasions', sb:'2 coming up', goto:'occasions' }
          ]}
        ]},
        scheme: { t:'My savings scheme', s:'11+1 monthly scheme', blocks:[
          { type:'hero', v:'₹40,000', k:'Saved so far' },
          { type:'meter', label:'8 of 12 instalments', right:'67%', pct:67 },
          { type:'rows', items:[
            { nm:'Monthly instalment', sb:'Due on the 5th', rt:'₹5,000' },
            { nm:'Rate locked at', sb:'₹7,120 per gram · 22K', rt:'Locked' },
            { nm:'Our bonus instalment', sb:'We pay the 12th', rt:'₹5,000' },
            { nm:'Maturity', sb:'5 December 2026', rt:'₹60,000' }
          ]},
          { type:'note', text:'Gold is <b>₹7,412 today.</b> Your locked rate has already saved you about ₹1,640.' },
          { type:'btn', text:'Pay September instalment' }
        ]},
        foryou: { t:'Chosen for you', s:'Based on what you buy', blocks:[
          { type:'note', text:'You buy <b>diamond, not plain gold</b> — 6 of your last 7 purchases. These match.' },
          { type:'cards', items:[
            { t:'Solitaire pendant set · ₹1.72L', d:'18K rose gold, certified 0.9ct centre stone. In your usual range.' },
            { t:'Diamond bangles pair · ₹2.40L', d:'New arrival. Suits the set you bought in 2022.' },
            { t:'Everyday diamond studs · ₹48,000', d:'Certified 0.5ct. Popular as an anniversary gift.' }
          ]},
          { type:'btn', text:'Book a private viewing' }
        ]},
        purchases: { t:'My purchases', s:'12 purchases since 1997', blocks:[
          { type:'rows', items:[
            { nm:'Diamond pendant', sb:'12 Nov 2024 · certificate', rt:'₹1.84L' },
            { nm:'Bridal set', sb:'8 Feb 2022 · certificate', rt:'₹6.20L' },
            { nm:'Gold bangles', sb:'19 Oct 2020 · hallmark', rt:'₹2.40L' },
            { nm:'Diamond ring', sb:'3 Mar 2018 · certificate', rt:'₹1.10L' }
          ]},
          { type:'note', text:'Every certificate stored permanently. <b>Free cleaning and polishing twice a year</b> for you.' },
          { type:'btn', text:'Book free cleaning' }
        ]},
        occasions: { t:'Family occasions', s:'We will remind you', blocks:[
          { type:'rows', items:[
            { nm:'Daughter\'s wedding anniversary', sb:'12 September · in 4 weeks', rt:'Soon' },
            { nm:'Wife\'s birthday', sb:'3 January', rt:'—' },
            { nm:'Your wedding anniversary', sb:'22 November', rt:'—' }
          ]},
          { type:'note', text:'Add a date and get <b>500 reward points.</b> That is how the showroom quietly builds the occasion list.' },
          { type:'btn', text:'Add an occasion' }
        ]}
      }
    },

    staff: {
      name: 'Staff App', icon: '🧑‍💼',
      blurb: 'The floor staff look up a customer and instantly know who they are, what they buy, what they have spent and which occasion is coming — before the conversation starts.',
      try: [
        'Tap a customer to show the full history and taste appear instantly',
        'Go back, tap "Occasions this month" — "this is what your staff act on daily"'
      ],
      points: [
        { t:'Top customers get treated like it', d:'no more guessing who matters.' },
        { t:'Staff sell to taste', d:'they show the right pieces first.' },
        { t:'Nothing depends on memory', d:'even a new salesman looks like a veteran.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Good morning, Mehul', s:'Sales · Rajlaxmi Jewellers', blocks:[
          { type:'kpis', items:[ {v:'₹7,412',k:'Gold 22K today'}, {v:'28',k:'Occasions this month'} ]},
          { type:'rows', items:[
            { ic:'📅', nm:'Occasions this month', sb:'28 families · 6 this week', goto:'occ' },
            { ic:'🔍', nm:'Look up a customer', sb:'History, taste and value', goto:'cust' },
            { ic:'🔨', nm:'Custom orders', sb:'3 ready for delivery', goto:'orders' }
          ]},
          { type:'note', text:'<b>Hasmukhbhai Shah</b> is expected today — daughter\'s anniversary on 12 Sept. Diamond buyer, ₹1.5–2L range.' }
        ]},
        occ: { t:'Occasions this month', s:'28 families', blocks:[
          { type:'rows', items:[
            { ic:'🔴', nm:'Hasmukhbhai Shah', sb:'Daughter\'s anniversary · 12 Sep · diamond', rt:'₹1.8L avg', goto:'cust' },
            { ic:'🔴', nm:'Paresh Modi', sb:'Son\'s engagement · 3 Oct · bridal', rt:'₹4.2L avg' },
            { ic:'🟠', nm:'Falguni Trivedi', sb:'Anniversary · 22 Sep', rt:'₹90K avg' },
            { ic:'🟠', nm:'Kirit Panchal', sb:'Wife\'s birthday · 28 Sep', rt:'₹60K avg' }
          ]},
          { type:'note', text:'Call a month early, not a week. The family has usually decided <b>where</b> to buy long before what to buy.' }
        ]},
        cust: { t:'Hasmukhbhai Shah', s:'Customer since 1997', back:'occ', blocks:[
          { type:'kpis', items:[ {v:'₹11.5L',k:'Lifetime purchases'}, {v:'12',k:'Purchases'} ]},
          { type:'note', text:'Buys <b>diamond, not plain gold.</b> Prefers classic over contemporary. Usual range ₹1.5–2L. Decides with his wife present.' },
          { type:'sec', text:'Recent purchases' },
          { type:'rows', items:[
            { nm:'Diamond pendant', sb:'12 Nov 2024', rt:'₹1.84L' },
            { nm:'Bridal set', sb:'8 Feb 2022 · daughter\'s wedding', rt:'₹6.20L' },
            { nm:'Gold bangles', sb:'19 Oct 2020', rt:'₹2.40L' }
          ]},
          { type:'sec', text:'Show him' },
          { type:'cards', items:[
            { t:'Solitaire pendant set · ₹1.72L', d:'Exactly his range and taste. Arrived last week.' }
          ]}
        ]},
        orders: { t:'Custom orders', s:'9 in progress', blocks:[
          { type:'rows', items:[
            { ic:'🟢', nm:'Bhavesh Patel', sb:'Bridal set · ready · balance ₹64,000', rt:'Deliver' },
            { ic:'🟡', nm:'Sejal Amin', sb:'Necklace · at karigar · day 9 of 14', rt:'Making' },
            { ic:'🟡', nm:'Yash Bhatt', sb:'Ring resize · ready today', rt:'Today' },
            { ic:'🔵', nm:'Nirali Desai', sb:'Earrings · design approval pending', rt:'Design' }
          ]},
          { type:'btn', text:'Update a stage' }
        ]}
      }
    },

    owner: {
      name: 'Owner CRM', icon: '🖥️', desktop: true,
      blurb: 'Sales, schemes, occasions and custom orders on one screen — plus the Occasion Engine telling him which families are about to buy.',
      home: 'dash',
      screens: {
        dash: { t:'Dashboard', nav:'Dashboard', s:'Rajlaxmi Jewellers', blocks:[
          { type:'kpis', items:[
            {v:'₹42.6L',k:'Sales this month'}, {v:'₹6.84L',k:'Scheme collections'},
            {v:'214',k:'Active scheme members'}, {v:'28',k:'Occasions in 30 days'} ]},
          { type:'sec', text:'Sales · last 12 months' },
          { type:'bars', items:[38,44,40,52,49,58,46,54,62,88,96,71] },
          { type:'sec', text:'Needs attention' },
          { type:'rows', items:[
            { ic:'📅', nm:'28 family occasions in 30 days', sb:'Worth about ₹34L in likely purchases', rt:'Open', goto:'occ' },
            { ic:'🔴', nm:'9 scheme members about to drop out', sb:'Missed one instalment', rt:'Open', goto:'schemes' },
            { ic:'🔨', nm:'3 custom orders ready to deliver', sb:'₹1.4L balance to collect', rt:'Open' },
            { ic:'😶', nm:'46 customers gone quiet', sb:'Used to buy twice a year', rt:'Open' }
          ]}
        ]},
        occ: { t:'Occasion Engine', nav:'Occasions', s:'AI · next 30 days', blocks:[
          { type:'note', text:'Every family occasion coming up, with <b>what that family buys and what they usually spend.</b> This is the feature that sells the whole system.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Paresh Modi', sb:'Son\'s engagement · 3 Oct · bridal buyer', rt:'₹4.2L' },
            { ic:'🔴', nm:'Hasmukhbhai Shah', sb:'Daughter\'s anniversary · 12 Sep · diamond', rt:'₹1.8L' },
            { ic:'🟠', nm:'Falguni Trivedi', sb:'Anniversary · 22 Sep', rt:'₹90K' },
            { ic:'🟠', nm:'Kirit Panchal', sb:'Wife\'s birthday · 28 Sep', rt:'₹60K' },
            { ic:'🟠', nm:'Sneha Vora', sb:'Naming ceremony · 30 Sep', rt:'₹45K' }
          ]},
          { type:'note', text:'Reaching <b>28 families a month</b> before the occasion, at even a 20% conversion, is a different business.' }
        ]},
        schemes: { t:'Savings schemes', nav:'Schemes', s:'214 active members', blocks:[
          { type:'kpis', items:[ {v:'₹6.84L',k:'Collected this month'}, {v:'9',k:'At risk of dropping'} ]},
          { type:'rows', items:[
            { ic:'🟢', nm:'On track', sb:'187 members paying on time', rt:'Healthy' },
            { ic:'🟠', nm:'One instalment late', sb:'18 members', rt:'Follow up' },
            { ic:'🔴', nm:'About to drop out', sb:'9 members · missed 1, historically quit next', rt:'Call today' }
          ]},
          { type:'sec', text:'Call these today' },
          { type:'rows', items:[
            { nm:'Nirali Desai', sb:'Instalment 8 · 14 days late', rt:'₹5,000' },
            { nm:'Amit Shah', sb:'Instalment 5 · 11 days late', rt:'₹3,000' },
            { nm:'Rekha Joshi', sb:'Instalment 9 · 9 days late', rt:'₹10,000' }
          ]},
          { type:'note', text:'One call saves <b>eleven months</b> of collections plus the purchase at maturity.' }
        ]},
        customers: { t:'Customers', nav:'Customers', s:'12,400 families', blocks:[
          { type:'chips', items:['All 12,400','Top 50','Gone quiet 46','Scheme members 214'] },
          { type:'rows', items:[
            { ic:'HS', nm:'Hasmukhbhai Shah', sb:'₹11.5L lifetime · diamond buyer', rt:'Top 50' },
            { ic:'PM', nm:'Paresh Modi', sb:'₹18.2L lifetime · bridal', rt:'Top 50' },
            { ic:'RJ', nm:'Rekha Joshi', sb:'No purchase in 26 months', rt:'Quiet' },
            { ic:'FT', nm:'Falguni Trivedi', sb:'₹4.1L lifetime', rt:'Active' }
          ]}
        ]},
        orders: { t:'Custom orders', nav:'Custom orders', s:'9 in progress', blocks:[
          { type:'rows', items:[
            { ic:'🟢', nm:'Bhavesh Patel · bridal set', sb:'Ready · balance ₹64,000', rt:'Deliver' },
            { ic:'🟡', nm:'Sejal Amin · necklace', sb:'At karigar · day 9 of 14', rt:'Making' },
            { ic:'🟡', nm:'Yash Bhatt · ring resize', sb:'Ready today', rt:'Today' },
            { ic:'🔵', nm:'Nirali Desai · earrings', sb:'Awaiting design approval', rt:'Design' }
          ]},
          { type:'note', text:'The customer sees the same stages in their app — <b>and stops calling to ask.</b>' }
        ]}
      }
    }
  }
};
