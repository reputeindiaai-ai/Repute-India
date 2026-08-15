/* Gyms & Fitness — problems→solutions + the three interactive apps.
   Palette ported from gym.css so these pages sit seamlessly beside the
   existing bespoke gym demo. */
window.DEMOS = window.DEMOS || {};
window.DEMOS.gyms = {
  name: 'Gym',
  label: 'Gyms & Fitness Studios',

  pages: [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['problems.html','Problems'], ['apps.html','The 3 Apps'], ['features.html','Features']
  ],

  theme: {
    bg:'#0A0A0B', bg2:'#0D0D0F',
    panel:'rgba(255,255,255,.045)', panel2:'rgba(255,255,255,.075)',
    line:'rgba(255,255,255,.10)', line2:'rgba(255,255,255,.19)',
    txt:'#F5F6F2', txt2:'rgba(245,246,242,.66)', txt3:'rgba(245,246,242,.42)',
    ac:'#C5FF00', ac2:'#5B8CFF', acInk:'#0A0A0B', acGlow:'rgba(197,255,0,.34)',
    wash1:'rgba(197,255,0,.09)', wash2:'rgba(91,140,255,.07)',
    font:"'Archivo',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap'
  },

  /* ============ PROBLEMS → SOLUTIONS ============ */
  problemsPage: {
    title: 'Every problem a gym owner has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Do not read this out. Ask him which one is costing him most right now — then open that exact screen in the app.'
  },

  problems: [
    { p: 'Members join in January and quietly stop coming by March',
      detail: 'They do not cancel. They just stop. He only finds out when the renewal never happens — by then it is too late to save them.',
      fixes: [
        { where:'Member app', w:'app', d:'A <b>consistency streak</b> and reward points the member can see growing. Breaking a streak hurts — that is what pulls them back through the door.' },
        { where:'Member app', w:'app', d:'A <b>personal goal and progress report</b> they log into. A member watching their own weight and strength change does not quietly disappear.' },
        { where:'AI', w:'ai', d:'<b>Pre-Quit Detection</b> watches attendance rhythm and flags the member weeks before they quit — with a win-back message already written.' },
        { where:'Owner CRM', w:'crm', d:'The <b>Churn Radar</b> puts those at-risk members on the owner\'s home screen every morning, sorted by risk.' }
      ]},

    { p: 'Nobody knows what to do when they walk in',
      detail: 'A new member wanders between machines, gets no result in six weeks, and blames the gym. This is the single biggest reason beginners quit.',
      fixes: [
        { where:'Member app', w:'app', d:'<b>Today\'s workout, chosen by AI</b> — which body part, which exercises, how many sets, in what order. They open the app and just follow it.' },
        { where:'AI', w:'ai', d:'The plan <b>adapts weekly</b> to what they actually completed, their goal and their level. Not a printed sheet that never changes.' },
        { where:'Trainer app', w:'app', d:'The trainer sees the same plan and can override it for that member in two taps.' }
      ]},

    { p: 'Diet is where results are won, and the gym has no answer',
      detail: 'Owners say "eat clean" and lose the member to a dietician, or worse, the member sees no result and blames the training.',
      fixes: [
        { where:'Member app', w:'app', d:'A <b>fully customised AI diet plan</b> — Indian food, their budget, veg or non-veg, their goal, their calories. Meal by meal, every day.' },
        { where:'AI', w:'ai', d:'It <b>regenerates when their weight moves</b> or their goal changes. A dietician charges ₹3,000 a month for this.' },
        { where:'Owner CRM', w:'crm', d:'This becomes a <b>paid add-on the gym sells</b> — pure margin, no extra staff.' }
      ]},

    { p: 'Personal training is the real profit and it is sold by luck',
      detail: 'PT is the highest-margin thing in the gym, but nobody knows which member is ready to buy or when to ask.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>PT-Upsell Timing</b> names the members most likely to say yes this week, based on how they train and where they have plateaued.' },
        { where:'Trainer app', w:'app', d:'The trainer gets that list with a suggested opening line, and can log the sale on the spot.' },
        { where:'Owner CRM', w:'crm', d:'PT sales tracked per trainer, so the owner sees who actually sells and who does not.' }
      ]},

    { p: 'Renewals are chased by memory, or not at all',
      detail: 'The front desk remembers to call some people. The rest expire silently. Every expired member is a customer he already paid to acquire.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'A <b>renewal runway</b> showing every plan expiring in the next 60 days, with who has been contacted.' },
        { where:'AI', w:'ai', d:'Reminders go out automatically on WhatsApp before expiry — with the message written for that member.' },
        { where:'Member app', w:'app', d:'The member sees their own expiry date and can <b>renew and pay from the app</b>, without a conversation.' }
      ]},

    { p: 'Fees are pending and chasing them feels awkward',
      detail: 'Cash and part-payments tracked in a register. The owner does not actually know today, right now, how much money is outstanding.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Today\'s collection and total dues on the home screen — one number, always current.' },
        { where:'AI', w:'ai', d:'Polite automatic WhatsApp reminders before and after the due date. Nobody on staff has to make the call.' },
        { where:'Member app', w:'app', d:'Pay from the phone. Most pending fees are laziness, not shortage — remove the friction and they pay.' }
      ]},

    { p: 'Peak hours are packed, 2pm to 5pm is dead',
      detail: 'The gym is paying rent, electricity and trainer salaries for hours when nobody is there.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Dead-Slot Filler</b> picks the members whose routine could shift, and offers them the quiet hours with a small perk.' },
        { where:'Member app', w:'app', d:'They see how busy the gym is right now before they leave home.' }
      ]},

    { p: 'Trainers cannot be measured, so nobody improves',
      detail: 'The owner has no idea which trainer retains members and which one loses them, or who is actually on the floor.',
      fixes: [
        { where:'Trainer app', w:'app', d:'Every session, attendance and client note logged as it happens — not written up later.' },
        { where:'Owner CRM', w:'crm', d:'<b>Trainer performance</b>: clients retained, PT sold, sessions delivered, member ratings.' },
        { where:'AI', w:'ai', d:'Flags a trainer whose clients are dropping off faster than the gym average, before it costs real money.' }
      ]},

    { p: 'Announcements go into a WhatsApp group nobody reads',
      detail: 'Timing changes, holidays, new equipment, offers — half the members never see it, then complain.',
      fixes: [
        { where:'Member app', w:'app', d:'A <b>gym updates feed</b> with push notifications. Read receipts show who actually saw it.' },
        { where:'Owner CRM', w:'crm', d:'The owner posts once and it reaches every member, or just one batch.' }
      ]},

    { p: 'New enquiries walk in, take a trial, and are never followed up',
      detail: 'Someone visits, likes it, says "I will come back next week" — and nobody ever calls them again.',
      fixes: [
        { where:'Website', w:'', d:'Free-trial sign-ups come in from the website straight into the pipeline, day or night.' },
        { where:'Owner CRM', w:'crm', d:'A <b>trial pipeline</b> — every walk-in and enquiry with a next follow-up date that cannot be skipped.' },
        { where:'AI', w:'ai', d:'Scores which enquiry is most likely to join, so the desk calls the right person first.' }
      ]}
  ],

  /* ============ THE THREE APPS ============ */
  appsPage: {
    title: 'Three apps. <span class="ac">One system.</span>',
    sub: 'Tap anything — these are working prototypes, not pictures. Open the member app, tap Diet plan, and show him what his members would actually see.'
  },

  apps: {

    /* ---------- 1. MEMBER APP ---------- */
    member: {
      name: 'Member App', icon: '📱',
      blurb: 'What every member has on their phone. This is the thing that stops them drifting away — a goal they can see, a streak they do not want to break, and a plan for today.',
      try: [
        'Tap "Today\'s workout" — show him the AI picked the exercises',
        'Go back, tap "Diet plan" — this is the screen that sells the app',
        'Go back, tap "My progress" — "this is why your members stay"',
        'Go back, tap "Rewards" — "this is what stops them quitting"'
      ],
      points: [
        { t:'Opened daily', d:'workout, diet and streak give them a reason to open it every single day.' },
        { t:'Their name on his brand', d:'the app carries the gym\'s name and colours, not ours.' },
        { t:'Sells itself', d:'the diet plan alone is worth what a dietician charges monthly.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Hi Rohan 👋', s:'Iron Age Fitness · Vesu', blocks:[
          { type:'kpis', items:[ {v:'23 days',k:'Current streak'}, {v:'-4.2 kg',k:'Since joining'} ]},
          { type:'meter', label:'Goal · lose 8 kg', right:'52%', pct:52 },
          { type:'sec', text:'Today' },
          { type:'rows', items:[
            { ic:'🏋️', nm:'Today\'s workout', sb:'Push day · 6 exercises · 45 min', goto:'workout' },
            { ic:'🥗', nm:'Diet plan', sb:'1,850 kcal · 4 meals planned', goto:'diet' },
            { ic:'📈', nm:'My progress', sb:'Weight, strength, measurements', goto:'progress' },
            { ic:'🏅', nm:'Rewards', sb:'1,240 points · Silver tier', goto:'rewards' }
          ]},
          { type:'sec', text:'From the gym' },
          { type:'rows', items:[
            { ic:'📣', nm:'Gym updates', sb:'2 new · new leg press installed', goto:'updates' },
            { ic:'💳', nm:'My membership', sb:'Expires in 34 days', goto:'plan' }
          ]}
        ]},

        workout: { t:'Today · Push day', s:'Chosen for you by AI', blocks:[
          { type:'note', text:'You trained legs yesterday, so today is <b>chest, shoulders and triceps</b>. Your bench has stalled for 2 weeks — we have dropped the weight and added a set.' },
          { type:'rows', items:[
            { ic:'1', nm:'Barbell bench press', sb:'4 sets × 8 · 45 kg', rt:'Start' },
            { ic:'2', nm:'Incline dumbbell press', sb:'3 sets × 10 · 16 kg', rt:'—' },
            { ic:'3', nm:'Shoulder press', sb:'3 sets × 10 · 14 kg', rt:'—' },
            { ic:'4', nm:'Lateral raises', sb:'3 sets × 15 · 6 kg', rt:'—' },
            { ic:'5', nm:'Triceps pushdown', sb:'3 sets × 12 · 25 kg', rt:'—' },
            { ic:'6', nm:'Plank', sb:'3 × 45 seconds', rt:'—' }
          ]},
          { type:'text', text:'Tap any exercise to see how it is done, with a video and correct form.' },
          { type:'btn', text:'Mark workout complete' }
        ]},

        diet: { t:'Your diet plan', s:'Built by AI for your goal', blocks:[
          { type:'kpis', items:[ {v:'1,850',k:'kcal target'}, {v:'128 g',k:'Protein target'} ]},
          { type:'note', text:'Vegetarian · Gujarati home food · budget friendly. Regenerated on <b>Monday</b> because you lost 700 g last week.' },
          { type:'plan', items:[
            { t:'Breakfast · 8:00 am', c:'420 kcal', items:['2 methi thepla with curd','1 boiled egg white or 30 g paneer','1 glass buttermilk'] },
            { t:'Lunch · 1:30 pm', c:'620 kcal', items:['2 phulka (no ghee)','1 katori dal + 1 katori sabzi','Salad — cucumber, onion, tomato','1 katori curd'] },
            { t:'Pre-workout · 5:30 pm', c:'180 kcal', items:['1 banana','Black coffee, no sugar'] },
            { t:'Dinner · 8:30 pm', c:'630 kcal', items:['1 katori khichdi','150 g paneer bhurji','Mixed vegetable soup'] }
          ]},
          { type:'btn', text:'Swap a meal' }
        ]},

        progress: { t:'My progress', s:'12 weeks with Iron Age', blocks:[
          { type:'hero', v:'-4.2 kg', k:'78.6 kg today · started at 82.8 kg' },
          { type:'bars', items:[100,96,94,91,89,88,85,84,82,80,78,76] },
          { type:'sec', text:'Measurements' },
          { type:'rows', items:[
            { nm:'Chest', sb:'Was 102 cm', rt:'104 cm ▲' },
            { nm:'Waist', sb:'Was 94 cm', rt:'88 cm ▼' },
            { nm:'Arms', sb:'Was 33 cm', rt:'35 cm ▲' }
          ]},
          { type:'sec', text:'Strength' },
          { type:'rows', items:[
            { nm:'Bench press', sb:'Was 35 kg', rt:'45 kg ▲' },
            { nm:'Squat', sb:'Was 50 kg', rt:'70 kg ▲' },
            { nm:'Deadlift', sb:'Was 60 kg', rt:'85 kg ▲' }
          ]},
          { type:'note', text:'You are <b>52% to your goal</b>. At this rate you will hit 74 kg by 12 November.' }
        ]},

        rewards: { t:'Rewards', s:'Consistency pays', blocks:[
          { type:'hero', v:'23', k:'Day streak · your best is 31' },
          { type:'meter', label:'1,240 points · Silver tier', right:'Gold at 2,000', pct:62 },
          { type:'sec', text:'How you earn' },
          { type:'rows', items:[
            { ic:'✅', nm:'Attend a session', sb:'Every visit', rt:'+20' },
            { ic:'🔥', nm:'7-day streak bonus', sb:'Unbroken week', rt:'+100' },
            { ic:'🥗', nm:'Log your meals', sb:'Full day logged', rt:'+15' },
            { ic:'🤝', nm:'Refer a friend', sb:'They join', rt:'+500' }
          ]},
          { type:'sec', text:'Spend your points' },
          { type:'cards', items:[
            { t:'One free PT session', d:'800 points · most popular' },
            { t:'10% off your renewal', d:'1,500 points' },
            { t:'Free protein shake', d:'300 points' }
          ]},
          { type:'note', text:'A member on a streak <b>does not quit.</b> This screen is the retention engine — say that out loud.' }
        ]},

        updates: { t:'Gym updates', s:'Iron Age Fitness', blocks:[
          { type:'cards', items:[
            { t:'New leg press machine installed', d:'Today · the new plate-loaded press is on the main floor. Ask any trainer for a demo.' },
            { t:'Holiday timings — 15 August', d:'2 days ago · gym open 6am to 11am only.' },
            { t:'Zumba batch starts Monday', d:'4 days ago · 7pm, Tuesdays and Thursdays. 12 slots, first come first served.' },
            { t:'Diwali offer — 3 months free on annual', d:'1 week ago · renew before 30 October.' }
          ]},
          { type:'note', text:'The owner posts once from his CRM and every member gets it. No WhatsApp group, no missed messages.' }
        ]},

        plan: { t:'My membership', s:'Annual · Iron Age Fitness', blocks:[
          { type:'kpis', items:[ {v:'34 days',k:'Until expiry'}, {v:'₹18,000',k:'Annual plan'} ]},
          { type:'rows', items:[
            { nm:'Plan', sb:'Annual · gym + group classes', rt:'Active' },
            { nm:'Started', sb:'19 September 2025', rt:'—' },
            { nm:'Expires', sb:'18 September 2026', rt:'34 days' },
            { nm:'Personal training', sb:'Not active', rt:'Add' }
          ]},
          { type:'note', text:'Renew now and get <b>1 month free</b> plus 500 reward points.' },
          { type:'btn', text:'Renew — ₹18,000' }
        ]}
      }
    },

    /* ---------- 2. TRAINER APP ---------- */
    trainer: {
      name: 'Trainer App', icon: '🧑‍🏫',
      blurb: 'The floor staff get their own app. Their clients, today\'s sessions, who is slipping, and who is ready to buy personal training — with everything logged as it happens instead of written up later.',
      try: [
        'Tap "At risk" — show him the AI tells the trainer who to save',
        'Go back, tap a client to show their full history in one screen',
        'Go back, tap "PT opportunities" — "this is how your trainers sell"'
      ],
      points: [
        { t:'Accountability', d:'every session and check-in is logged the moment it happens.' },
        { t:'Trainers sell more', d:'they are told exactly who to approach and when.' },
        { t:'Owner sees everything', d:'it all flows straight into his CRM.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Good morning, Vikram', s:'Trainer · Iron Age Fitness', blocks:[
          { type:'kpis', items:[ {v:'7',k:'Sessions today'}, {v:'34',k:'Active clients'} ]},
          { type:'sec', text:'Needs you today' },
          { type:'rows', items:[
            { ic:'⚠️', nm:'At risk', sb:'4 clients slipping away', rt:'4', goto:'risk' },
            { ic:'💰', nm:'PT opportunities', sb:'3 ready to buy this week', rt:'3', goto:'pt' },
            { ic:'📋', nm:'Today\'s sessions', sb:'7 booked · 2 done', goto:'sessions' },
            { ic:'👥', nm:'My clients', sb:'34 active', goto:'clients' }
          ]},
          { type:'sec', text:'Your month' },
          { type:'kpis', items:[ {v:'₹14,200',k:'PT commission'}, {v:'91%',k:'Client retention'} ]}
        ]},

        risk: { t:'At risk', s:'Flagged by AI this morning', blocks:[
          { type:'note', text:'These four have <b>broken their normal rhythm.</b> A two-minute call today usually saves the membership.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Aarav Shah', sb:'Was 5×/week · not seen in 11 days', rt:'88%', goto:'client' },
            { ic:'🔴', nm:'Priya Nair', sb:'Was 4×/week · down to 1', rt:'74%' },
            { ic:'🟠', nm:'Karan Mehta', sb:'Missed 3 PT sessions', rt:'61%' },
            { ic:'🟠', nm:'Sneha Rao', sb:'Attendance halved this month', rt:'58%' }
          ]},
          { type:'text', text:'Tap Aarav to see his history and the message already written for him.' }
        ]},

        client: { t:'Aarav Shah', s:'Member since Jan 2026 · 88% quit risk', back:'risk', blocks:[
          { type:'kpis', items:[ {v:'11 days',k:'Since last visit'}, {v:'-1.8 kg',k:'Total progress'} ]},
          { type:'meter', label:'Attendance this month', right:'4 of 20', pct:20 },
          { type:'note', text:'Attendance fell off after his <b>bench press stalled</b> three weeks ago. Classic plateau drop-off — change his programme and he comes back.' },
          { type:'sec', text:'Suggested message' },
          { type:'chat', items:[
            { who:'ai', msg:'Hi Aarav! Vikram here from Iron Age. Noticed you have not been in for a bit — your bench had stalled and that is honestly the most frustrating phase. I have rebuilt your programme to break through it. Free session on me this week?' }
          ]},
          { type:'btn', text:'Send on WhatsApp' },
          { type:'sec', text:'History' },
          { type:'rows', items:[
            { nm:'Last workout', sb:'Push day · 4 Aug', rt:'45 kg' },
            { nm:'Plan expires', sb:'12 December 2026', rt:'Active' },
            { nm:'Personal training', sb:'Not taken', rt:'Offer' }
          ]}
        ]},

        pt: { t:'PT opportunities', s:'Timed by AI', blocks:[
          { type:'note', text:'These three are <b>most likely to say yes this week.</b> Approach them on the floor, not on WhatsApp.' },
          { type:'cards', items:[
            { t:'Rohan Desai · 23-day streak', d:'Consistent but plateaued on bench for 2 weeks. Say: "you have earned a jump — let me build you a proper strength block."' },
            { t:'Meera Joshi · new goal set', d:'Changed her goal to muscle gain 6 days ago and does not know where to start. Easiest yes on the floor today.' },
            { t:'Aditya Kumar · wedding in March', d:'Logged a target date. Time pressure makes this an easy conversation.' }
          ]},
          { type:'btn', text:'Log a PT sale' }
        ]},

        sessions: { t:'Today\'s sessions', s:'Thursday · 7 booked', blocks:[
          { type:'rows', items:[
            { ic:'✅', nm:'6:00 am · Rohan Desai', sb:'Push day · completed', rt:'Done' },
            { ic:'✅', nm:'7:00 am · Meera Joshi', sb:'Legs · completed', rt:'Done' },
            { ic:'⏳', nm:'10:00 am · Aditya Kumar', sb:'Full body · PT session', rt:'Next' },
            { ic:'○', nm:'11:00 am · Sneha Rao', sb:'Back & biceps', rt:'—' },
            { ic:'○', nm:'5:00 pm · Karan Mehta', sb:'Push day', rt:'—' },
            { ic:'○', nm:'6:30 pm · Group HIIT', sb:'12 booked', rt:'—' },
            { ic:'○', nm:'8:00 pm · Priya Nair', sb:'Assessment', rt:'—' }
          ]},
          { type:'btn', text:'Mark attendance' }
        ]},

        clients: { t:'My clients', s:'34 active', blocks:[
          { type:'chips', items:['All 34','On track 27','At risk 4','New 3'] },
          { type:'rows', items:[
            { ic:'RD', nm:'Rohan Desai', sb:'23-day streak · on track', rt:'92%' },
            { ic:'MJ', nm:'Meera Joshi', sb:'New goal set · muscle gain', rt:'88%' },
            { ic:'AS', nm:'Aarav Shah', sb:'Not seen in 11 days', rt:'12%', goto:'client' },
            { ic:'KM', nm:'Karan Mehta', sb:'Missed 3 PT sessions', rt:'39%' },
            { ic:'SR', nm:'Sneha Rao', sb:'Attendance halved', rt:'42%' },
            { ic:'AK', nm:'Aditya Kumar', sb:'PT · wedding March', rt:'95%' }
          ]}
        ]}
      }
    },

    /* ---------- 3. OWNER CRM ---------- */
    owner: {
      name: 'Owner CRM', icon: '🖥️', desktop: true,
      blurb: 'What the owner opens at 8am. Money, members, trainers and the Churn Radar in one place — click through the tabs and show him he can finally run the gym from one screen.',
      home: 'dash',
      screens: {
        dash: { t:'Dashboard', nav:'Dashboard', s:'Iron Age Fitness · Thursday', blocks:[
          { type:'kpis', items:[
            {v:'₹3.84L',k:'Collected this month'}, {v:'₹1.12L',k:'Dues pending'},
            {v:'412',k:'Active members'}, {v:'86',k:'New this month'} ]},
          { type:'sec', text:'Collection · last 12 weeks' },
          { type:'bars', items:[52,58,49,64,61,70,66,74,71,82,79,91] },
          { type:'sec', text:'Needs your attention' },
          { type:'rows', items:[
            { ic:'🔴', nm:'17 members at risk of quitting', sb:'Flagged by Churn Radar this morning', rt:'Open', goto:'churn' },
            { ic:'🟠', nm:'23 plans expiring in 30 days', sb:'₹3.2L of renewals at stake', rt:'Open', goto:'renew' },
            { ic:'💰', nm:'₹1.12L in pending dues', sb:'34 members · reminders sent automatically', rt:'Open', goto:'money' },
            { ic:'🆕', nm:'9 trial enquiries not followed up', sb:'From the website and walk-ins', rt:'Open' }
          ]}
        ]},

        churn: { t:'Churn Radar', nav:'Churn Radar', s:'AI · updated every morning', blocks:[
          { type:'note', text:'Every member whose pattern says they are about to quit — <b>ranked by risk</b>, with a win-back message already written for each one.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Aarav Shah', sb:'Was 5×/week · not seen in 11 days · bench plateau', rt:'88%' },
            { ic:'🔴', nm:'Priya Nair', sb:'Was 4×/week · down to 1 · no PT', rt:'74%' },
            { ic:'🔴', nm:'Nikhil Bhatt', sb:'Stopped logging diet · attendance halved', rt:'71%' },
            { ic:'🟠', nm:'Karan Mehta', sb:'Missed 3 PT sessions in a row', rt:'61%' },
            { ic:'🟠', nm:'Sneha Rao', sb:'Attendance halved this month', rt:'58%' },
            { ic:'🟠', nm:'Ritu Shah', sb:'Plan expires in 21 days · low attendance', rt:'54%' }
          ]},
          { type:'note', text:'Saving <b>15 members a month</b> at ₹1,500 each is ₹2.7 lakh a year. That is the whole ROI conversation.' }
        ]},

        members: { t:'Members', nav:'Members', s:'412 active', blocks:[
          { type:'chips', items:['All 412','On track 361','At risk 17','Expiring 23','Dues 34'] },
          { type:'rows', items:[
            { ic:'RD', nm:'Rohan Desai', sb:'Annual · expires 18 Sep · trainer Vikram', rt:'Active' },
            { ic:'MJ', nm:'Meera Joshi', sb:'Quarterly · expires 3 Nov · PT active', rt:'Active' },
            { ic:'AS', nm:'Aarav Shah', sb:'Annual · not seen 11 days', rt:'At risk' },
            { ic:'DM', nm:'Divya Mehta', sb:'Monthly · ₹18,000 due', rt:'Due' },
            { ic:'KM', nm:'Karan Mehta', sb:'Half-yearly · PT · expires 2 Oct', rt:'Active' },
            { ic:'SR', nm:'Sneha Rao', sb:'Monthly · attendance dropping', rt:'At risk' }
          ]}
        ]},

        money: { t:'Payments & dues', nav:'Money', s:'August 2026', blocks:[
          { type:'kpis', items:[
            {v:'₹3.84L',k:'Collected'}, {v:'₹1.12L',k:'Pending'},
            {v:'₹3.2L',k:'Renewals due 30 days'}, {v:'₹64,800',k:'PT revenue'} ]},
          { type:'sec', text:'Pending dues' },
          { type:'rows', items:[
            { ic:'DM', nm:'Divya Mehta', sb:'Annual · overdue 14 days · 2 reminders sent', rt:'₹18,000' },
            { ic:'RJ', nm:'Rahul Jain', sb:'Quarterly · overdue 8 days', rt:'₹6,500' },
            { ic:'PS', nm:'Pooja Shah', sb:'Monthly · due in 3 days', rt:'₹2,400' },
            { ic:'VT', nm:'Vivek Trivedi', sb:'PT package · overdue 21 days', rt:'₹12,000' }
          ]},
          { type:'note', text:'Reminders go out <b>automatically on WhatsApp</b> before and after the due date. Nobody on your desk makes an awkward call.' }
        ]},

        renew: { t:'Renewal runway', nav:'Renewals', s:'Next 60 days', blocks:[
          { type:'note', text:'₹3.2 lakh of renewals sitting in the next 30 days. <b>Every one of these is a customer you already paid to acquire.</b>' },
          { type:'rows', items:[
            { ic:'🟢', nm:'Rohan Desai', sb:'Annual · 34 days · 23-day streak', rt:'Safe' },
            { ic:'🟠', nm:'Ritu Shah', sb:'Annual · 21 days · low attendance', rt:'Call' },
            { ic:'🔴', nm:'Nikhil Bhatt', sb:'Half-yearly · 12 days · at risk', rt:'Urgent' },
            { ic:'🟢', nm:'Meera Joshi', sb:'Quarterly · 48 days · PT active', rt:'Safe' },
            { ic:'🟠', nm:'Karan Mehta', sb:'Half-yearly · 18 days · missed PT', rt:'Call' }
          ]}
        ]},

        trainers: { t:'Trainers', nav:'Trainers', s:'Performance this month', blocks:[
          { type:'rows', items:[
            { ic:'VK', nm:'Vikram Kadam', sb:'34 clients · 91% retention · ₹71,000 PT sold', rt:'Top' },
            { ic:'AN', nm:'Anjali Nair', sb:'28 clients · 88% retention · ₹52,000 PT sold', rt:'Good' },
            { ic:'SP', nm:'Suresh Patel', sb:'31 clients · 74% retention · ₹18,000 PT sold', rt:'Watch' },
            { ic:'FM', nm:'Farhan Momin', sb:'22 clients · 86% retention · ₹34,000 PT sold', rt:'Good' }
          ]},
          { type:'note', text:'Suresh loses clients <b>faster than the gym average.</b> Now you know — and you can coach him instead of guessing.' },
          { type:'sec', text:'Floor coverage today' },
          { type:'rows', items:[
            { nm:'6am – 11am', sb:'Vikram, Anjali', rt:'Covered' },
            { nm:'11am – 5pm', sb:'Suresh only', rt:'Thin' },
            { nm:'5pm – 10pm', sb:'All four', rt:'Peak' }
          ]}
        ]},

        updates: { t:'Send an update', nav:'Updates', s:'Reaches every member app', blocks:[
          { type:'text', text:'Post once. It appears in every member\'s app with a push notification — and you can see who actually read it.' },
          { type:'cards', items:[
            { t:'New leg press machine installed', d:'Sent today · 412 members · 318 read (77%)' },
            { t:'Holiday timings — 15 August', d:'Sent 2 days ago · 412 members · 366 read (89%)' },
            { t:'Zumba batch starts Monday', d:'Sent 4 days ago · 412 members · 289 read · 12 booked' }
          ]},
          { type:'btn', text:'Write a new update' }
        ]}
      }
    }
  }
};
