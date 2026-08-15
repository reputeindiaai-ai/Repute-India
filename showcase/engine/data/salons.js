/* Salons & Beauty — problems→solutions + the three interactive apps.
   Palette ported from salon.css (cream / plum / rose-gold, light theme). */
window.DEMOS = window.DEMOS || {};
window.DEMOS.salons = {
  name: 'Salon',
  label: 'Salons & Beauty',

  pages: [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['problems.html','Problems'], ['apps.html','The 3 Apps'], ['features.html','Features']
  ],

  theme: {
    bg:'#FBF5F1', bg2:'#FFFFFF',
    panel:'rgba(56,38,48,.035)', panel2:'rgba(56,38,48,.065)',
    line:'rgba(56,38,48,.12)', line2:'rgba(56,38,48,.22)',
    txt:'#382630', txt2:'rgba(56,38,48,.66)', txt3:'rgba(56,38,48,.46)',
    ac:'#5E3A47', ac2:'#C17A86', acInk:'#FFF6F2', acGlow:'rgba(94,58,71,.22)',
    wash1:'rgba(193,122,134,.16)', wash2:'rgba(176,137,106,.11)',
    red:'#C2685F', amber:'#C7944E', green:'#5C8C6F',
    redBg:'rgba(194,104,95,.13)', amberBg:'rgba(199,148,78,.15)', greenBg:'rgba(92,140,111,.14)',
    font:"'Cormorant Garamond',Georgia,serif",
    fontBody:"'Jost',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600&display=swap'
  },

  problemsPage: {
    title: 'Every problem a salon owner has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Ask her which one hurts most right now — then open that exact screen in the app.'
  },

  problems: [
    { p: 'A regular who came every month suddenly stops — and nobody notices',
      detail: 'She was in every four weeks for two years. It has now been ten weeks. Nobody at the desk has any way of knowing.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Lapsed-client radar</b> learns each client\'s natural visit rhythm and flags her the moment she breaks it — not six months later.' },
        { where:'Owner CRM', w:'crm', d:'Those clients sit on the owner\'s home screen every morning, with how much each one used to spend a year.' },
        { where:'AI', w:'ai', d:'A warm, personal WhatsApp is drafted for each — mentioning her usual service and stylist.' }
      ]},

    { p: 'Rebooking depends entirely on who is at the counter',
      detail: 'A good receptionist rebooks on the way out. A busy or new one forgets. Rebooking rate swings wildly and nobody tracks it.',
      fixes: [
        { where:'Client app', w:'app', d:'<b>One-tap rebook</b> — same service, same stylist, next slot. No phone call, no waiting for the desk.' },
        { where:'AI', w:'ai', d:'A nudge goes out at exactly the right point in her cycle — 3 weeks for a colour, 5 for a cut — not randomly.' },
        { where:'Owner CRM', w:'crm', d:'Rebooking rate tracked per stylist, so she can see who sends clients home with a next appointment.' }
      ]},

    { p: 'Prepaid packages expire unused, and the client feels cheated',
      detail: 'She paid for ten sessions, took four, and stopped. The salon kept the money but lost the client and the goodwill.',
      fixes: [
        { where:'Client app', w:'app', d:'Her <b>package balance</b> is always visible — sessions used, sessions left, expiry date.' },
        { where:'AI', w:'ai', d:'Automatic nudges when sessions are unused and the expiry is close. Money already collected, relationship saved.' },
        { where:'Owner CRM', w:'crm', d:'Every active package, what is unused, and what is about to expire — in one list.' }
      ]},

    { p: 'Weekends are packed, Tuesday afternoon is dead',
      detail: 'Empty chairs on a weekday are money that can never be recovered. The rent and the salaries are paid either way.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Quiet-hour filler</b> picks clients whose timing is flexible and offers them the dead slots with a small perk.' },
        { where:'Client app', w:'app', d:'Live slot availability — she can see Tuesday 2pm is open and book it herself at 11 at night.' },
        { where:'Owner CRM', w:'crm', d:'Chair utilisation by day and hour, so she knows exactly where the gaps are.' }
      ]},

    { p: 'No-shows and last-minute cancellations wreck the day',
      detail: 'A booked two-hour colour slot goes empty with no warning. That stylist earns nothing for two hours.',
      fixes: [
        { where:'AI', w:'ai', d:'Predicts which bookings are likely to be missed and confirms them on WhatsApp the day before.' },
        { where:'Client app', w:'app', d:'Reminders and easy reschedule — most no-shows are people who forgot, not people who left.' },
        { where:'Owner CRM', w:'crm', d:'No-show history per client, so repeat offenders can be asked for an advance.' }
      ]},

    { p: 'Nobody remembers what was done last time',
      detail: 'Which colour formula, which length, which products, which allergies. It lives in one stylist\'s memory — and she may leave.',
      fixes: [
        { where:'Stylist app', w:'app', d:'Full <b>client history</b> — every service, formula, product and note, on the stylist\'s phone before the client sits down.' },
        { where:'Client app', w:'app', d:'She sees her own history too, which builds real trust.' },
        { where:'Owner CRM', w:'crm', d:'The knowledge stays with the salon, not the stylist. This matters the day someone resigns.' }
      ]},

    { p: 'When a stylist leaves, her clients leave with her',
      detail: 'The relationship was with the person, not the salon. Half a stylist\'s book can walk out in a month.',
      fixes: [
        { where:'Client app', w:'app', d:'The relationship moves to the salon brand — bookings, packages, loyalty and history all live in the salon\'s app.' },
        { where:'Owner CRM', w:'crm', d:'Flags clients who only ever book one stylist, so the salon can introduce a second before it is a problem.' },
        { where:'AI', w:'ai', d:'If a stylist resigns, generates a warm handover message for each of her clients.' }
      ]},

    { p: 'Retail products sit on the shelf',
      detail: 'Shampoo, serum and treatment products are pure margin, but nobody knows who to offer what.',
      fixes: [
        { where:'Stylist app', w:'app', d:'Suggests the right product for that client\'s hair and last service, while she is still in the chair.' },
        { where:'Client app', w:'app', d:'Reorder her usual product from the app when it is due to run out.' },
        { where:'Owner CRM', w:'crm', d:'Retail sales tracked per stylist — it becomes a measurable, coachable number.' }
      ]},

    { p: 'Offers get blasted to everybody and mean nothing',
      detail: 'The same 20%-off message goes to all 400 clients. Regulars who would have paid full price get a discount, and the rest ignore it.',
      fixes: [
        { where:'AI', w:'ai', d:'Targets only the clients who <b>need</b> the nudge — lapsed, flexible timing, or overdue — and leaves loyal full-price clients alone.' },
        { where:'Owner CRM', w:'crm', d:'Campaigns by segment with results measured: sent, opened, booked, revenue.' }
      ]},

    { p: 'Google reviews decide who walks in, and nobody replies to them',
      detail: 'People pick a salon from their phone in ten seconds. A 3.9 rating with unanswered complaints is costing walk-ins every day.',
      fixes: [
        { where:'AI', w:'ai', d:'Catches an unhappy client before she posts, and asks delighted ones for a review at exactly the right moment.' },
        { where:'AI', w:'ai', d:'Drafts a warm reply to every review in the salon\'s voice — approved with one tap.' },
        { where:'Owner CRM', w:'crm', d:'Rating tracked over time, next to bookings, so the owner sees the link.' }
      ]}
  ],

  appsPage: {
    title: 'Three apps. <span class="ac">One salon.</span>',
    sub: 'Tap anything — these are working prototypes. Open the client app, tap Packages, and show her what her regulars would see.'
  },

  apps: {
    client: {
      name: 'Client App', icon: '💅',
      blurb: 'What her regulars keep on their phone. Booking without calling, their package balance, their history, and loyalty that makes leaving feel like a loss.',
      try: [
        'Tap "Book an appointment" — show her a client books at 11pm without calling the desk',
        'Go back, tap "My packages" — "this is why packages stop expiring unused"',
        'Go back, tap "My visits" — "your stylist knows her exact colour formula"',
        'Go back, tap "Rewards" — "this is what stops her trying the new salon down the road"'
      ],
      points: [
        { t:'Bookings without staff time', d:'the desk stops being a call centre.' },
        { t:'The salon owns the client', d:'not the individual stylist.' },
        { t:'Packages get used', d:'which means they get renewed.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Hello Ananya ✨', s:'Bloom Studio · Adajan', blocks:[
          { type:'kpis', items:[ {v:'4 left',k:'Facial package'}, {v:'2,340',k:'Loyalty points'} ]},
          { type:'note', text:'Your usual colour touch-up is due in <b>6 days</b>. Priya has Saturday 4pm free.' },
          { type:'sec', text:'Quick actions' },
          { type:'rows', items:[
            { ic:'📅', nm:'Book an appointment', sb:'Choose service, stylist and time', goto:'book' },
            { ic:'🎟️', nm:'My packages', sb:'Facial 4 of 10 · Hair spa 2 of 6', goto:'packages' },
            { ic:'📖', nm:'My visits', sb:'Every service and formula used', goto:'visits' },
            { ic:'🎁', nm:'Rewards', sb:'2,340 points · Gold member', goto:'rewards' }
          ]},
          { type:'sec', text:'Next appointment' },
          { type:'rows', items:[
            { nm:'Global colour touch-up', sb:'Saturday 4:00 pm · with Priya', rt:'₹3,200' }
          ]}
        ]},
        book: { t:'Book an appointment', s:'Bloom Studio', blocks:[
          { type:'chips', items:['Hair','Skin','Nails','Bridal','Spa'] },
          { type:'sec', text:'Popular services' },
          { type:'rows', items:[
            { nm:'Global colour touch-up', sb:'90 min · your usual', rt:'₹3,200' },
            { nm:'Hair spa treatment', sb:'60 min · 2 left in package', rt:'Package' },
            { nm:'Cut & blow dry', sb:'45 min', rt:'₹1,100' },
            { nm:'Clean-up facial', sb:'45 min · 4 left in package', rt:'Package' }
          ]},
          { type:'sec', text:'Saturday · with Priya' },
          { type:'chips', items:['11:00','12:30','2:00','4:00 ✓','5:30','7:00'] },
          { type:'note', text:'Priya is your usual stylist and knows your colour formula. <b>Radhika</b> is also free at 12:30.' },
          { type:'btn', text:'Confirm Saturday 4:00 pm' }
        ]},
        packages: { t:'My packages', s:'What you have already paid for', blocks:[
          { type:'meter', label:'Signature facial · 10 sessions', right:'6 used', pct:60 },
          { type:'rows', items:[
            { nm:'Sessions remaining', sb:'Valid until 12 December', rt:'4' },
            { nm:'You paid', sb:'₹9,000 for 10 · saved ₹3,000', rt:'₹900 each' }
          ]},
          { type:'sec', text:'Hair spa package' },
          { type:'meter', label:'Hair spa · 6 sessions', right:'4 used', pct:67 },
          { type:'note', text:'Your facial package expires in <b>7 weeks</b> with 4 sessions unused. That is ₹3,600 you have already paid for — shall we book them in?' },
          { type:'btn', text:'Book my next session' }
        ]},
        visits: { t:'My visits', s:'18 visits with Bloom', blocks:[
          { type:'rows', items:[
            { nm:'Global colour + hair spa', sb:'12 July · Priya', rt:'₹4,400' },
            { nm:'Signature facial', sb:'28 June · Radhika', rt:'Package' },
            { nm:'Cut & blow dry', sb:'14 June · Priya', rt:'₹1,100' },
            { nm:'Global colour touch-up', sb:'17 May · Priya', rt:'₹3,200' }
          ]},
          { type:'sec', text:'Your details on file' },
          { type:'rows', items:[
            { nm:'Colour formula', sb:'6.34 + 7.3 · 30 vol · 35 min', rt:'Saved' },
            { nm:'Hair type', sb:'Wavy, colour-treated, dry ends', rt:'—' },
            { nm:'Allergy note', sb:'Sensitive to ammonia-based bleach', rt:'⚠️' }
          ]},
          { type:'note', text:'This is why she never has to explain herself again — and why she will not start over somewhere else.' }
        ]},
        rewards: { t:'Rewards', s:'Gold member', blocks:[
          { type:'hero', v:'2,340', k:'Points · Gold tier' },
          { type:'meter', label:'Platinum at 3,000 points', right:'78%', pct:78 },
          { type:'sec', text:'How you earn' },
          { type:'rows', items:[
            { ic:'💇', nm:'Every visit', sb:'10 points per ₹100 spent', rt:'+320' },
            { ic:'🤝', nm:'Refer a friend', sb:'When she visits', rt:'+500' },
            { ic:'⭐', nm:'Leave a review', sb:'One time', rt:'+200' }
          ]},
          { type:'sec', text:'Redeem' },
          { type:'cards', items:[
            { t:'Free hair spa', d:'1,500 points · most popular' },
            { t:'20% off any colour service', d:'2,000 points' },
            { t:'Complimentary head massage', d:'600 points' }
          ]}
        ]}
      }
    },

    stylist: {
      name: 'Stylist App', icon: '✂️',
      blurb: 'Every stylist gets her own app — today\'s chair, each client\'s full history and formula before they sit down, who is overdue for a rebook, and her own earnings.',
      try: [
        'Tap a client to show her full colour formula and allergy note',
        'Go back, tap "Overdue for rebook" — "your stylists chase this, not you"',
        'Go back, tap "My earnings" — "this is what makes good stylists stay"'
      ],
      points: [
        { t:'No guesswork', d:'formula, history and allergies before the client sits down.' },
        { t:'Stylists rebook more', d:'they are told exactly who is overdue.' },
        { t:'Everything flows to the owner', d:'services, retail and rebookings logged as they happen.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Good morning, Priya', s:'Senior stylist · Bloom Studio', blocks:[
          { type:'kpis', items:[ {v:'8',k:'Appointments today'}, {v:'₹18,400',k:'Expected today'} ]},
          { type:'sec', text:'Needs you' },
          { type:'rows', items:[
            { ic:'⏰', nm:'Overdue for rebook', sb:'7 of your clients are past due', rt:'7', goto:'overdue' },
            { ic:'📋', nm:'Today\'s chair', sb:'8 booked · 3 done', goto:'today' },
            { ic:'💰', nm:'My earnings', sb:'Commission this month', goto:'earnings' }
          ]},
          { type:'sec', text:'Next client · 12:30' },
          { type:'rows', items:[
            { ic:'AN', nm:'Ananya Shah', sb:'Global colour touch-up · 90 min', goto:'client' }
          ]}
        ]},
        today: { t:'Today\'s chair', s:'Saturday · 8 booked', blocks:[
          { type:'rows', items:[
            { ic:'✅', nm:'10:00 · Meera Patel', sb:'Cut & blow dry · done', rt:'₹1,100' },
            { ic:'✅', nm:'11:00 · Sneha Joshi', sb:'Hair spa · package', rt:'Done' },
            { ic:'⏳', nm:'12:30 · Ananya Shah', sb:'Global colour · next', rt:'₹3,200', goto:'client' },
            { ic:'○', nm:'2:30 · Rekha Desai', sb:'Highlights + cut', rt:'₹5,400' },
            { ic:'○', nm:'4:30 · Nisha Vora', sb:'Keratin treatment', rt:'₹7,000' },
            { ic:'○', nm:'6:30 · Bridal trial', sb:'Kavya Mehta · 2 hrs', rt:'₹6,500' }
          ]},
          { type:'btn', text:'Mark 12:30 as started' }
        ]},
        client: { t:'Ananya Shah', s:'18 visits · client since 2023', back:'today', blocks:[
          { type:'note', text:'⚠️ <b>Sensitive to ammonia-based bleach.</b> Use the ammonia-free line.' },
          { type:'sec', text:'Her colour formula' },
          { type:'rows', items:[
            { nm:'Base', sb:'6.34 golden copper', rt:'40 g' },
            { nm:'Blend', sb:'7.3 golden', rt:'20 g' },
            { nm:'Developer', sb:'30 vol · 35 minutes', rt:'60 ml' }
          ]},
          { type:'sec', text:'Recent visits' },
          { type:'rows', items:[
            { nm:'Global colour + hair spa', sb:'12 July · you', rt:'₹4,400' },
            { nm:'Signature facial', sb:'28 June · Radhika', rt:'Package' },
            { nm:'Cut & blow dry', sb:'14 June · you', rt:'₹1,100' }
          ]},
          { type:'note', text:'Suggested retail: <b>colour-protect shampoo</b>. She last bought one 4 months ago — she is due.' },
          { type:'btn', text:'Log service & rebook' }
        ]},
        overdue: { t:'Overdue for rebook', s:'Flagged by AI', blocks:[
          { type:'note', text:'These clients have <b>broken their normal rhythm.</b> A two-line message today usually brings them back.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Kavita Rana', sb:'Every 4 weeks · last seen 11 weeks ago', rt:'₹4,100/yr' },
            { ic:'🔴', nm:'Dipti Shah', sb:'Every 6 weeks · last seen 14 weeks ago', rt:'₹6,800/yr' },
            { ic:'🟠', nm:'Hetal Modi', sb:'Every 5 weeks · 8 weeks ago', rt:'₹3,200/yr' },
            { ic:'🟠', nm:'Ritika Jain', sb:'Colour due 2 weeks ago', rt:'₹5,000/yr' }
          ]},
          { type:'chat', items:[
            { who:'ai', msg:'Hi Kavita! Priya from Bloom here 💕 It has been a while — your colour must be needing a touch-up by now. I have Saturday 4pm free if you would like it. Shall I hold it for you?' }
          ]},
          { type:'btn', text:'Send on WhatsApp' }
        ]},
        earnings: { t:'My earnings', s:'August 2026', blocks:[
          { type:'kpis', items:[ {v:'₹41,200',k:'Services this month'}, {v:'₹6,180',k:'Your commission'} ]},
          { type:'bars', items:[54,61,58,70,66,74,81,78,86,90,84,94] },
          { type:'sec', text:'Your numbers' },
          { type:'rows', items:[
            { nm:'Clients served', sb:'This month', rt:'96' },
            { nm:'Rebooking rate', sb:'Salon average 54%', rt:'71%' },
            { nm:'Retail sold', sb:'Commission 10%', rt:'₹8,400' },
            { nm:'Client rating', sb:'From 43 reviews', rt:'4.9★' }
          ]}
        ]}
      }
    },

    owner: {
      name: 'Owner CRM', icon: '🖥️', desktop: true,
      blurb: 'What she opens at 10am. Today\'s chairs, the money, the clients quietly drifting away, and how each stylist is really performing.',
      home: 'dash',
      screens: {
        dash: { t:'Dashboard', nav:'Dashboard', s:'Bloom Studio · Saturday', blocks:[
          { type:'kpis', items:[
            {v:'₹1.84L',k:'Revenue this month'}, {v:'₹42,600',k:'Package money unused'},
            {v:'386',k:'Active clients'}, {v:'68%',k:'Chair utilisation'} ]},
          { type:'sec', text:'Revenue · last 12 weeks' },
          { type:'bars', items:[58,64,55,71,68,76,70,82,79,88,84,93] },
          { type:'sec', text:'Needs your attention' },
          { type:'rows', items:[
            { ic:'🔴', nm:'23 regulars have gone quiet', sb:'Worth ₹1.9L a year between them', rt:'Open', goto:'lapsed' },
            { ic:'🟠', nm:'18 packages expiring unused', sb:'₹42,600 already collected', rt:'Open', goto:'packages' },
            { ic:'📉', nm:'Tue–Thu afternoons only 31% full', sb:'14 empty chair-hours a week', rt:'Open' },
            { ic:'⭐', nm:'4 new Google reviews', sb:'1 negative, unanswered', rt:'Open' }
          ]}
        ]},
        lapsed: { t:'Lapsed-client radar', nav:'Lapsed clients', s:'AI · updated daily', blocks:[
          { type:'note', text:'Clients who have <b>broken their own visit rhythm</b> — ranked by what they are worth a year.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Dipti Shah', sb:'Every 6 weeks · last seen 14 weeks ago · Priya', rt:'₹6,800' },
            { ic:'🔴', nm:'Nisha Vora', sb:'Every 5 weeks · last seen 12 weeks ago', rt:'₹6,200' },
            { ic:'🔴', nm:'Kavita Rana', sb:'Every 4 weeks · last seen 11 weeks ago', rt:'₹4,100' },
            { ic:'🟠', nm:'Hetal Modi', sb:'Every 5 weeks · 8 weeks ago', rt:'₹3,200' },
            { ic:'🟠', nm:'Ritika Jain', sb:'Colour overdue 2 weeks', rt:'₹5,000' }
          ]},
          { type:'note', text:'Bringing back <b>20 regulars a month</b> at ₹1,200 a visit is ₹2.9 lakh a year. That is the ROI conversation.' }
        ]},
        appointments: { t:'Appointments', nav:'Appointments', s:'Today · 34 booked', blocks:[
          { type:'kpis', items:[ {v:'34',k:'Booked today'}, {v:'3',k:'No-show risk'} ]},
          { type:'rows', items:[
            { ic:'PR', nm:'Priya · 8 appointments', sb:'Fully booked till 8pm', rt:'100%' },
            { ic:'RD', nm:'Radhika · 7 appointments', sb:'2:00 and 3:30 free', rt:'78%' },
            { ic:'SH', nm:'Shalini · 5 appointments', sb:'Afternoon mostly free', rt:'52%' },
            { ic:'MN', nm:'Manisha · 6 appointments', sb:'Nails · steady', rt:'71%' }
          ]},
          { type:'note', text:'<b>14 empty chair-hours</b> Tuesday to Thursday. The AI can fill these from your own client list.' },
          { type:'btn', text:'Fill quiet slots' }
        ]},
        packages: { t:'Packages', nav:'Packages', s:'112 active', blocks:[
          { type:'kpis', items:[ {v:'₹42,600',k:'Paid but unused'}, {v:'18',k:'Expiring in 60 days'} ]},
          { type:'rows', items:[
            { ic:'🔴', nm:'Ananya Shah', sb:'Facial · 4 unused · expires in 7 weeks', rt:'₹3,600' },
            { ic:'🔴', nm:'Reema Kapoor', sb:'Hair spa · 5 unused · expires in 5 weeks', rt:'₹4,000' },
            { ic:'🟠', nm:'Juhi Patel', sb:'Bridal prep · 3 unused', rt:'₹7,500' },
            { ic:'🟠', nm:'Sonal Amin', sb:'Facial · 6 unused', rt:'₹5,400' }
          ]},
          { type:'note', text:'A client who <b>uses her package renews it.</b> One who lets it expire never comes back — and tells people.' }
        ]},
        money: { t:'Money', nav:'Money', s:'August 2026', blocks:[
          { type:'kpis', items:[
            {v:'₹1.84L',k:'Services'}, {v:'₹38,400',k:'Retail products'},
            {v:'₹64,000',k:'Packages sold'}, {v:'₹1,180',k:'Average bill'} ]},
          { type:'sec', text:'Where the money came from' },
          { type:'rows', items:[
            { nm:'Hair services', sb:'52% of revenue', rt:'₹95,700' },
            { nm:'Skin & facial', sb:'24%', rt:'₹44,200' },
            { nm:'Bridal & packages', sb:'17%', rt:'₹31,300' },
            { nm:'Nails', sb:'7%', rt:'₹12,900' }
          ]}
        ]},
        staff: { t:'Stylists', nav:'Stylists', s:'Performance this month', blocks:[
          { type:'rows', items:[
            { ic:'PR', nm:'Priya', sb:'96 clients · 71% rebook · ₹8,400 retail', rt:'Top' },
            { ic:'RD', nm:'Radhika', sb:'81 clients · 62% rebook · ₹5,100 retail', rt:'Good' },
            { ic:'SH', nm:'Shalini', sb:'58 clients · 38% rebook · ₹900 retail', rt:'Watch' },
            { ic:'MN', nm:'Manisha', sb:'64 clients · 55% rebook · ₹2,200 retail', rt:'Good' }
          ]},
          { type:'note', text:'Shalini\'s clients <b>rebook at half the rate</b> of Priya\'s. Now it is a number you can coach, not a feeling.' }
        ]}
      }
    }
  }
};
