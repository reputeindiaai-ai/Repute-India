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
  }
};
