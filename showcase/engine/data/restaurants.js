/* Restaurants & Cafes — problems→solutions + the three interactive apps.
   Palette ported from restaurant.css (cream / terracotta / forest, light theme). */
window.DEMOS = window.DEMOS || {};
window.DEMOS.restaurants = {
  name: 'Restaurant',
  label: 'Restaurants & Cafes',

  pages: [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['problems.html','Problems'], ['apps.html','The 3 Apps'], ['features.html','Features']
  ],

  theme: {
    bg:'#FBF7F0', bg2:'#FFFFFF',
    panel:'rgba(43,33,24,.035)', panel2:'rgba(43,33,24,.065)',
    line:'rgba(43,33,24,.12)', line2:'rgba(43,33,24,.22)',
    txt:'#2B2118', txt2:'rgba(43,33,24,.66)', txt3:'rgba(43,33,24,.46)',
    ac:'#C65D3B', ac2:'#2D4A3E', acInk:'#FFF8F1', acGlow:'rgba(198,93,59,.26)',
    wash1:'rgba(224,163,62,.16)', wash2:'rgba(45,74,62,.10)',
    red:'#CF4A3C', amber:'#D98A2B', green:'#3E8E5A',
    redBg:'rgba(207,74,60,.13)', amberBg:'rgba(217,138,43,.15)', greenBg:'rgba(62,142,90,.14)',
    font:"'Fraunces',Georgia,serif",
    fontBody:"'Inter',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap'
  },

  problemsPage: {
    title: 'Every problem a restaurant owner has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Ask him which one is eating his margin — then open that screen.'
  },

  problems: [
    { p: 'Hundreds eat here every month and he cannot contact one of them',
      detail: 'They come, they eat, they leave. No name, no number, no way to ever bring them back except hoping they remember.',
      fixes: [
        { where:'Customer app', w:'app', d:'A loyalty account tied to their phone number — built at the table or on the bill QR, in five seconds.' },
        { where:'Owner CRM', w:'crm', d:'A real <b>customer database</b>: who came, what they ordered, how often, how much they spend.' },
        { where:'AI', w:'ai', d:'Turns that list into visits — the right offer, to the right person, at the right time.' }
      ]},

    { p: 'Aggregators take 25–30% and own the customer',
      detail: 'Swiggy and Zomato bring orders but keep the relationship. He is renting customers he already fed once.',
      fixes: [
        { where:'Website', w:'', d:'Direct ordering and table booking on his own site — <b>zero commission.</b>' },
        { where:'Customer app', w:'app', d:'His own ordering channel with loyalty points that only work with him.' },
        { where:'AI', w:'ai', d:'Wins aggregator customers over to direct ordering with a better deal that still costs him less than 30%.' }
      ]},

    { p: 'A first-time customer never becomes a regular',
      detail: 'The difference between a struggling restaurant and a full one is repeat visits — and repeat is left entirely to chance.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Repeat-visit engine</b> — a well-timed WhatsApp a few days after a first visit converts far more than any advertisement.' },
        { where:'Customer app', w:'app', d:'Loyalty progress they can see: three more visits to a free dessert.' },
        { where:'Owner CRM', w:'crm', d:'First-time versus repeat split tracked every month, so he sees it improving.' }
      ]},

    { p: 'Tuesday night is dead and the staff are still paid',
      detail: 'Weekends overflow, midweek is empty. Rent, salaries and electricity do not care how many tables are full.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Slow-night filler</b> spots a quiet evening coming and offers it to customers who live nearby and eat midweek.' },
        { where:'Customer app', w:'app', d:'Midweek-only offers that never cannibalise the weekend rush.' },
        { where:'Owner CRM', w:'crm', d:'Covers by day and hour, so he can staff to reality instead of guessing.' }
      ]},

    { p: 'Google reviews decide tonight\'s footfall',
      detail: 'People choose a restaurant off their phone in ten seconds. One angry unanswered review at the top costs covers every night.',
      fixes: [
        { where:'AI', w:'ai', d:'Catches an unhappy guest <b>before</b> the review goes up — a bill-time check-in that flags problems early.' },
        { where:'AI', w:'ai', d:'Drafts a warm reply to every review in the restaurant\'s voice.' },
        { where:'Customer app', w:'app', d:'Asks happy guests for a Google review at exactly the right moment.' }
      ]},

    { p: 'Table bookings live in a diary and get double-booked',
      detail: 'Phone bookings on paper, walk-ins on top, and a family of eight turned away while two tables sit empty.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'A live table map — booked, seated, billing, free — visible to every staff member.' },
        { where:'Customer app', w:'app', d:'Guests book their own table and get a confirmation, with no phone call.' },
        { where:'AI', w:'ai', d:'Predicts no-shows on big-table bookings and confirms them in advance.' }
      ]},

    { p: 'He does not know which dishes actually make money',
      detail: 'The bestseller might have the worst margin. Without item-level numbers the menu is designed on instinct.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Item-wise sales and margin — what sells, what earns, and what does neither.' },
        { where:'AI', w:'ai', d:'Suggests menu changes: promote this, reprice that, drop the dish nobody orders.' }
      ]},

    { p: 'Offers are shouted at everyone and cheapen the brand',
      detail: 'A 30% banner reaches loyal customers who would have paid full price, and regulars start waiting for discounts.',
      fixes: [
        { where:'AI', w:'ai', d:'Targets only the people who need a nudge — lapsed guests and midweek diners — and protects full-price regulars.' },
        { where:'Owner CRM', w:'crm', d:'Every campaign measured: sent, redeemed, covers, revenue.' }
      ]},

    { p: 'Staff turnover takes all the knowledge out the door',
      detail: 'Who the regulars are, what they always order, which table they like — it lives with the captain who just resigned.',
      fixes: [
        { where:'Staff app', w:'app', d:'The regular is recognised the moment the booking is made — name, usual order, allergies, last visit.' },
        { where:'Owner CRM', w:'crm', d:'The knowledge belongs to the restaurant, not the waiter.' }
      ]},

    { p: 'Festival and season rushes are planned the night before',
      detail: 'Diwali, New Year, Valentine\'s and wedding season are a huge share of the year and get almost no preparation.',
      fixes: [
        { where:'AI', w:'ai', d:'Knows the Indian festival calendar and prepares campaigns and menus weeks ahead.' },
        { where:'Owner CRM', w:'crm', d:'Last year\'s numbers for the same festival, so he orders and staffs correctly.' }
      ]}
  ],

  appsPage: {
    title: 'Three apps. <span class="ac">One restaurant.</span>',
    sub: 'Tap anything — these are working prototypes. Open the customer app, tap Loyalty, and show him what owning his own customers looks like.'
  },

  apps: {
    customer: {
      name: 'Customer App', icon: '🍽️',
      blurb: 'His own ordering and loyalty channel — no commission to anyone. This is the difference between renting customers from an aggregator and owning them.',
      try: [
        'Tap "Order directly" — "every one of these saves you 30%"',
        'Go back, tap "My loyalty" — "this is what brings them back on a Tuesday"',
        'Go back, tap "Book a table" — "no more diary, no more double bookings"'
      ],
      points: [
        { t:'Zero commission', d:'a direct order is worth about 30% more than the same order on an aggregator.' },
        { t:'The customer list is his', d:'he can reach every guest tomorrow if he wants to.' },
        { t:'Loyalty that actually works', d:'visible progress beats a paper stamp card.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Welcome back, Jay 👋', s:'Saffron House · Ghod Dod Road', blocks:[
          { type:'kpis', items:[ {v:'740',k:'Loyalty points'}, {v:'3',k:'Visits to free dessert'} ]},
          { type:'note', text:'Midweek treat — <b>20% off Tuesday and Wednesday</b> this week, just for you.' },
          { type:'sec', text:'Quick actions' },
          { type:'rows', items:[
            { ic:'🛵', nm:'Order directly', sb:'No commission · faster delivery', goto:'order' },
            { ic:'🪑', nm:'Book a table', sb:'See live availability', goto:'table' },
            { ic:'🎁', nm:'My loyalty', sb:'740 points · Gold diner', goto:'loyalty' },
            { ic:'📖', nm:'My orders', sb:'Reorder your usual in one tap', goto:'orders' }
          ]}
        ]},
        order: { t:'Order directly', s:'Saffron House', blocks:[
          { type:'chips', items:['Starters','Main course','Breads','Biryani','Desserts'] },
          { type:'sec', text:'Your usuals' },
          { type:'rows', items:[
            { nm:'Paneer Tikka Masala', sb:'Ordered 7 times', rt:'₹340' },
            { nm:'Dal Makhani', sb:'Ordered 6 times', rt:'₹280' },
            { nm:'Butter Naan × 4', sb:'Every single time', rt:'₹200' },
            { nm:'Hyderabadi Veg Biryani', sb:'Ordered 4 times', rt:'₹380' }
          ]},
          { type:'note', text:'Ordering here instead of an aggregator saves the restaurant <b>₹360 on this order</b> — which is why you get the loyalty points.' },
          { type:'btn', text:'Reorder my usual · ₹820' }
        ]},
        table: { t:'Book a table', s:'Tonight', blocks:[
          { type:'chips', items:['2 guests','4 ✓','6','8+'] },
          { type:'sec', text:'Available tonight' },
          { type:'rows', items:[
            { nm:'7:00 pm', sb:'Garden seating', rt:'Available' },
            { nm:'7:30 pm', sb:'Indoor · AC', rt:'Available' },
            { nm:'8:00 pm', sb:'Fully booked', rt:'Waitlist' },
            { nm:'9:15 pm', sb:'Garden seating', rt:'Available' }
          ]},
          { type:'note', text:'You are a <b>Gold diner</b> — your table is held for 20 minutes instead of 10.' },
          { type:'btn', text:'Book 7:30 pm for 4' }
        ]},
        loyalty: { t:'My loyalty', s:'Gold diner', blocks:[
          { type:'hero', v:'740', k:'Points earned with Saffron House' },
          { type:'meter', label:'3 more visits to a free dessert platter', right:'7 of 10', pct:70 },
          { type:'sec', text:'How you earn' },
          { type:'rows', items:[
            { ic:'🍽️', nm:'Dine in or order direct', sb:'10 points per ₹100', rt:'+82' },
            { ic:'🤝', nm:'Bring a friend', sb:'First visit', rt:'+300' },
            { ic:'⭐', nm:'Leave a Google review', sb:'One time', rt:'+200' }
          ]},
          { type:'sec', text:'Redeem' },
          { type:'cards', items:[
            { t:'Free dessert platter', d:'1,000 points' },
            { t:'₹300 off your bill', d:'1,500 points' },
            { t:'Priority weekend table', d:'500 points' }
          ]},
          { type:'note', text:'Loyalty points only work <b>here.</b> That is the whole point — the aggregator cannot copy this.' }
        ]},
        orders: { t:'My orders', s:'12 orders', blocks:[
          { type:'rows', items:[
            { nm:'Paneer Tikka, Dal Makhani, Naan', sb:'2 August · delivered', rt:'₹820' },
            { nm:'Veg Biryani, Raita', sb:'19 July · dine in', rt:'₹520' },
            { nm:'Family thali × 4', sb:'4 July · dine in', rt:'₹1,760' },
            { nm:'Paneer Tikka, Butter Naan', sb:'21 June · delivered', rt:'₹540' }
          ]},
          { type:'btn', text:'Reorder from 2 August' }
        ]}
      }
    },

    staff: {
      name: 'Staff App', icon: '🧑‍🍳',
      blurb: 'For captains and the floor manager. Tonight\'s bookings, who the regulars are and what they always order, live table status and orders — so service feels personal even when the captain is new.',
      try: [
        'Tap a booking to show the guest\'s usual order and allergies appear',
        'Go back, tap "Live tables" — "no more shouting across the floor"'
      ],
      points: [
        { t:'Every guest feels known', d:'even by a captain who joined last week.' },
        { t:'No double bookings', d:'the table map is live and shared.' },
        { t:'Knowledge stays', d:'when a captain leaves, the regulars stay regulars.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Good evening, Imran', s:'Floor captain · Saffron House', blocks:[
          { type:'kpis', items:[ {v:'28',k:'Covers booked tonight'}, {v:'6',k:'Tables free now'} ]},
          { type:'sec', text:'Tonight' },
          { type:'rows', items:[
            { ic:'📖', nm:'Tonight\'s bookings', sb:'11 bookings · 3 are regulars', goto:'bookings' },
            { ic:'🪑', nm:'Live tables', sb:'14 of 20 occupied', goto:'tables' }
          ]},
          { type:'note', text:'<b>Jay Mehta</b> (Gold diner, 12 visits) booked 7:30. He always takes garden seating and orders paneer tikka.' }
        ]},
        bookings: { t:'Tonight\'s bookings', s:'11 bookings · 28 covers', blocks:[
          { type:'rows', items:[
            { ic:'⭐', nm:'7:30 · Jay Mehta', sb:'4 guests · Gold diner · 12 visits', rt:'Garden', goto:'guest' },
            { ic:'○', nm:'7:45 · Rohit Shah', sb:'2 guests · first visit', rt:'Indoor' },
            { ic:'⭐', nm:'8:00 · Ashaben Patel', sb:'6 guests · regular · birthday', rt:'Indoor' },
            { ic:'○', nm:'8:30 · Faisal Khan', sb:'2 guests', rt:'Garden' },
            { ic:'⚠️', nm:'9:00 · Corporate · 8 guests', sb:'No-show risk · confirm', rt:'Confirm' }
          ]}
        ]},
        guest: { t:'Jay Mehta', s:'Gold diner · 12 visits', back:'bookings', blocks:[
          { type:'kpis', items:[ {v:'₹9,840',k:'Spent with us'}, {v:'740',k:'Loyalty points'} ]},
          { type:'note', text:'Prefers <b>garden seating.</b> No onion in starters — family preference, not an allergy.' },
          { type:'sec', text:'What he always orders' },
          { type:'rows', items:[
            { nm:'Paneer Tikka Masala', sb:'7 of 12 visits', rt:'Usual' },
            { nm:'Dal Makhani', sb:'6 of 12 visits', rt:'Usual' },
            { nm:'Butter Naan × 4', sb:'Every visit', rt:'Always' }
          ]},
          { type:'note', text:'He is <b>3 visits from a free dessert.</b> Mention it — it works.' },
          { type:'btn', text:'Seat at garden table 6' }
        ]},
        tables: { t:'Live tables', s:'14 of 20 occupied', blocks:[
          { type:'rows', items:[
            { ic:'🟢', nm:'Table 1–4', sb:'Garden · free', rt:'Free' },
            { ic:'🔴', nm:'Table 5', sb:'Seated 7:10 · ordered', rt:'Main' },
            { ic:'🟡', nm:'Table 6', sb:'Reserved 7:30 · Jay Mehta', rt:'Held' },
            { ic:'🔴', nm:'Table 7–9', sb:'Seated · billing', rt:'Bill' },
            { ic:'🔴', nm:'Table 10–14', sb:'Seated · starters', rt:'Starters' },
            { ic:'🟢', nm:'Table 15–20', sb:'Indoor · free', rt:'Free' }
          ]},
          { type:'note', text:'Tables 7 to 9 are at billing — they will free up in about 10 minutes for the 8:00 booking.' }
        ]}
      }
    },

    owner: {
      name: 'Owner CRM', icon: '🖥️', desktop: true,
      blurb: 'The screen he checks at closing. Today\'s covers and revenue, which dishes actually earn, who has stopped coming, and what the reviews are doing to his footfall.',
      home: 'dash',
      screens: {
        dash: { t:'Dashboard', nav:'Dashboard', s:'Saffron House · Tuesday', blocks:[
          { type:'kpis', items:[
            {v:'₹4.62L',k:'Revenue this month'}, {v:'₹1.38L',k:'Saved vs aggregator'},
            {v:'1,840',k:'Customers in database'}, {v:'4.2★',k:'Google rating'} ]},
          { type:'sec', text:'Covers · last 12 weeks' },
          { type:'bars', items:[64,58,70,66,74,69,80,76,84,79,88,94] },
          { type:'sec', text:'Needs attention' },
          { type:'rows', items:[
            { ic:'🔴', nm:'214 customers have not returned in 90 days', sb:'They used to come monthly', rt:'Open', goto:'lapsed' },
            { ic:'📉', nm:'Tuesday & Wednesday only 38% full', sb:'About 46 empty covers a week', rt:'Open' },
            { ic:'⭐', nm:'2 reviews need a reply', sb:'1 is negative, 4 days old', rt:'Open' },
            { ic:'🍽️', nm:'3 dishes losing money', sb:'High sales, negative margin', rt:'Open', goto:'menu' }
          ]}
        ]},
        lapsed: { t:'Win-back', nav:'Win-back', s:'AI · updated daily', blocks:[
          { type:'note', text:'Customers who used to come regularly and have <b>gone quiet.</b> They already like the food — they just forgot.' },
          { type:'kpis', items:[ {v:'214',k:'Gone quiet'}, {v:'₹3.9L',k:'They used to spend a year'} ]},
          { type:'rows', items:[
            { ic:'🔴', nm:'Nikhil Amin', sb:'Came 2× a month · not seen in 14 weeks', rt:'₹1,240/visit' },
            { ic:'🔴', nm:'Sheetal Rao', sb:'Weekly regular · not seen in 11 weeks', rt:'₹860/visit' },
            { ic:'🟠', nm:'Vipul Shah', sb:'Monthly · 9 weeks', rt:'₹1,900/visit' },
            { ic:'🟠', nm:'Anita Bhatt', sb:'Family diner · 8 weeks', rt:'₹2,400/visit' }
          ]},
          { type:'chat', items:[
            { who:'ai', msg:'Hi Nikhilbhai! We have missed you at Saffron House 🙏 Our new Awadhi menu launched last month and we think you will love it. Your table on us this Wednesday — just reply and we will keep it ready.' }
          ]},
          { type:'btn', text:'Send win-back campaign' }
        ]},
        menu: { t:'Menu performance', nav:'Menu', s:'Item-wise sales & margin', blocks:[
          { type:'sec', text:'Your money-makers' },
          { type:'rows', items:[
            { ic:'🟢', nm:'Paneer Tikka Masala', sb:'412 orders · 68% margin', rt:'₹1.4L' },
            { ic:'🟢', nm:'Hyderabadi Biryani', sb:'318 orders · 61% margin', rt:'₹1.2L' },
            { ic:'🟢', nm:'Butter Naan', sb:'1,120 orders · 74% margin', rt:'₹56K' }
          ]},
          { type:'sec', text:'Losing you money' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Seafood platter', sb:'22 orders · 9% margin · high wastage', rt:'₹8K' },
            { ic:'🔴', nm:'Imported cheese board', sb:'8 orders · negative margin', rt:'-₹2K' },
            { ic:'🟠', nm:'Continental combo', sb:'31 orders · 18% margin', rt:'₹14K' }
          ]},
          { type:'note', text:'Dropping three dishes and repricing two would add about <b>₹34,000 a month</b> without a single extra customer.' }
        ]},
        customers: { t:'Customers', nav:'Customers', s:'1,840 in the database', blocks:[
          { type:'chips', items:['All 1,840','Regulars 386','Gone quiet 214','New this month 96'] },
          { type:'rows', items:[
            { ic:'JM', nm:'Jay Mehta', sb:'12 visits · ₹9,840 · Gold', rt:'Active' },
            { ic:'AP', nm:'Ashaben Patel', sb:'21 visits · ₹31,200 · Platinum', rt:'Active' },
            { ic:'NA', nm:'Nikhil Amin', sb:'26 visits · gone quiet 14 weeks', rt:'Lapsed' },
            { ic:'SR', nm:'Sheetal Rao', sb:'34 visits · gone quiet 11 weeks', rt:'Lapsed' }
          ]},
          { type:'note', text:'Before this, he had <b>zero</b> of these names. This list is the single most valuable thing we hand a restaurant.' }
        ]},
        money: { t:'Money', nav:'Money', s:'August 2026', blocks:[
          { type:'kpis', items:[
            {v:'₹4.62L',k:'Total revenue'}, {v:'₹2.84L',k:'Dine in'},
            {v:'₹1.12L',k:'Direct orders'}, {v:'₹66K',k:'Aggregators'} ]},
          { type:'note', text:'Direct orders are now <b>63% of all delivery.</b> At 28% commission, that shift alone saved ₹1.38 lakh this month.' },
          { type:'sec', text:'By day of week' },
          { type:'bars', items:[38,42,46,58,88,100,92] },
          { type:'text', text:'Monday to Sunday. Tuesday and Wednesday are the gap worth filling.' }
        ]}
      }
    }
  }
};
