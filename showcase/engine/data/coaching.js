/* Coaching Classes & Institutes — demo data
   Palette: deep academic navy + warm gold. Display font: Sora. */
window.DEMOS = window.DEMOS || {};
window.DEMOS.coaching = {
  name: 'Coaching Institute',
  label: 'Coaching Classes & Institutes',
  heroTag: 'Live demo · Education',

  theme: {
    bg:'#080A14', bg2:'#0C0F1C',
    panel:'rgba(255,255,255,.045)', panel2:'rgba(255,255,255,.075)',
    line:'rgba(255,255,255,.10)', line2:'rgba(255,255,255,.19)',
    txt:'#F4F5FA', txt2:'rgba(244,245,250,.66)', txt3:'rgba(244,245,250,.42)',
    ac:'#F5B841', ac2:'#6C8CFF', acInk:'#0A0C16', acGlow:'rgba(245,184,65,.34)',
    wash1:'rgba(245,184,65,.10)', wash2:'rgba(108,140,255,.08)',
    font:"'Sora',-apple-system,Segoe UI,sans-serif",
    fontBody:"'Inter',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
  },

  hero: {
    h1: 'Fill the batches.<br>Collect the fees.<br><span class="ac">Keep every student.</span>',
    lead: 'Most institute software is a fee register with a login. This one runs admissions, batches, attendance and fees — and warns you which student is about to drop out, weeks before they stop coming.',
    cta1: 'Open the Drop-off Radar', cta2: 'See the website'
  },

  overview: {
    cards: [
      { ic:'🖥️', h:'The institute website', p:'Courses, faculty, results and fees — built to turn a parent\'s Google search into an admission enquiry.', link:'website.html', go:'Open website' },
      { ic:'🛰️', h:'The CRM', p:'Admissions pipeline, batches, attendance, fee collection and dues — plus the Drop-off Radar and enquiry scoring.', link:'crm.html', go:'Open CRM' },
      { ic:'📱', h:'The parent & student app', p:'Attendance, test scores, fee status, notices and doubt requests — the thing that keeps parents trusting you.', link:'app.html', go:'Open app screens' },
      { ic:'✨', h:'The AI Edge', p:'Drop-off Radar, automatic fee follow-ups, enquiry scoring and parent-sentiment alerts — no institute software does this.', link:'features.html', go:'See the AI features' }
    ],
    kpis: [
      { n:31, suffix:'%', l:'Fewer mid-term drop-outs caught early' },
      { n:24, suffix:' days', l:'Faster fee collection on average' },
      { n:2.1, dec:1, suffix:'×', l:'More enquiries converted to admissions' },
      { n:14, suffix:' hrs', l:'Office hours saved every week' }
    ]
  },

  website: {
    title: 'The page a parent judges you by — <span class="ac">in ten seconds.</span>',
    sub: 'Parents decide from their phone, at night, comparing you against three other institutes. This is built to win that comparison.',
    url: 'www.vidyapathacademy.in', brand: 'Vidya Path Academy',
    nav: ['Courses','Faculty','Results','Fees','Contact'], navCta: 'Book a free demo class',
    heroTitle: 'Where serious students<br>become <span class="ac">rank holders.</span>',
    heroSub: 'JEE, NEET and Foundation batches in Surat. Small batches, senior faculty, and a parent portal that shows you exactly how your child is doing — every single week.',
    heroCta: 'Book a free demo class', heroCta2: 'Download prospectus',
    stats: [
      { v:'1,840+', k:'Students taught' }, { v:'96', k:'Selections last year' },
      { v:'18 yrs', k:'Teaching experience' }, { v:'1:22', k:'Faculty to student ratio' }
    ],
    servicesLabel: 'Our programmes',
    services: [
      { ic:'🎯', h:'JEE Main & Advanced', p:'Two-year and one-year batches with weekly tests, doubt sessions and full-length mock papers.', price:'₹78,000 / year' },
      { ic:'🩺', h:'NEET Preparation', p:'Biology-heavy programme with NCERT mastery, daily practice papers and personal mentoring.', price:'₹72,000 / year' },
      { ic:'📚', h:'Foundation (8th–10th)', p:'Builds the base early — school syllabus plus olympiad and entrance-exam foundation.', price:'₹38,000 / year' }
    ],
    testimonial: {
      text: 'What changed everything for us was the parent app. I could see my daughter\'s attendance and test scores every week instead of waiting for a parents\' meeting. No other class in Surat does this.',
      who: 'Meenaben Patel, parent of a 2025 NEET qualifier'
    }
  },

  crm: {
    title: 'Admissions, attendance and fees — <span class="ac">on one screen.</span>',
    sub: 'This is what the office staff opens at 8am. Everything that decides your month is on it.',
    appName: 'Vidya Path CRM',
    kpis: [
      { v:'₹4.812L', k:'Fees collected this month' },
      { v:'₹1.94L', k:'Dues pending', color:'var(--red)' },
      { v:'38', k:'New admissions' },
      { v:'92%', k:'Attendance today' }
    ],
    mainTitle: 'Needs attention today', mainTag: 'Auto-sorted by urgency',
    rows: [
      { nm:'Aarav Shah', sub:'JEE 2-Year · Batch A · absent 6 of last 8 classes', pill:'Drop-off risk', tone:'r' },
      { nm:'Diya Mehta', sub:'NEET · fee instalment overdue 21 days · ₹24,000', pill:'Fee overdue', tone:'r' },
      { nm:'Rohan Desai', sub:'Foundation 10th · test scores falling 3 tests in a row', pill:'Needs mentor', tone:'a' },
      { nm:'Ishita Joshi', sub:'Enquiry · attended demo class, no follow-up in 4 days', pill:'Hot enquiry', tone:'ac' },
      { nm:'Kabir Trivedi', sub:'JEE 1-Year · instalment due in 3 days · ₹19,500', pill:'Due soon', tone:'a' },
      { nm:'Ananya Rao', sub:'NEET · perfect attendance, top 5 in last 4 tests', pill:'Ask for referral', tone:'g' }
    ],
    footV:'₹4.81L', footK:'collected this month', footV2:'38', footK2:'new admissions',
    barsTitle: 'Fee collection · last 12 weeks',
    bars: [42,55,48,63,58,71,66,79,74,85,81,94],
    ai: {
      h: 'Drop-off Radar',
      items: [
        { t:'Aarav Shah · 88% likely to drop out', d:'Attendance fell from 96% to 41% in three weeks and he has skipped the last two tests. Call the parent this week — a WhatsApp is already drafted.' },
        { t:'4 students showing early warning signs', d:'Attendance slipping but not critical yet. A single call now usually saves the admission.' },
        { t:'Best time to call Diya\'s parents: after 7pm', d:'Based on when this family has answered before. Small thing — doubles your pickup rate.' }
      ]
    },
    panels: [
      { h:'Admission enquiries', tag:'Scored by AI', rows:[
        { nm:'Ishita Joshi', sub:'NEET · attended demo', pill:'92% likely', tone:'g' },
        { nm:'Vivaan Kapoor', sub:'JEE · called twice', pill:'71% likely', tone:'a' },
        { nm:'Sara Shaikh', sub:'Foundation · walk-in', pill:'44% likely', tone:'' }
      ]},
      { h:'Today\'s batches', rows:[
        { nm:'JEE Batch A · 8:00 am', sub:'Physics · Prof. Nair', pill:'Done', tone:'g' },
        { nm:'NEET Batch B · 11:00 am', sub:'Biology · Dr. Sheth', pill:'Running', tone:'ac' },
        { nm:'Foundation · 4:30 pm', sub:'Maths · Mr. Vyas', pill:'Upcoming', tone:'' }
      ]}
    ]
  },

  app: {
    title: 'The reason parents <span class="ac">trust you</span> and stay.',
    sub: 'Most institutes talk to parents twice a year. This talks to them every week — and it costs the office nothing.',
    why: 'A parent who can see attendance, test scores and fee status on their phone does not lie awake wondering. Parents who feel informed re-enrol, and they tell other parents. That is how an institute grows without advertising.',
    screens: [
      { t:'Aarav\'s progress', s:'JEE 2-Year · Batch A', cap:'What the parent opens first.',
        big:{ v:'87%', k:'Attendance this month' }, meter:74, meterLabel:'Course completed · 74%',
        rows:[
          { nm:'Physics', sb:'Last test · 68/100', rt:'▲ 12' },
          { nm:'Chemistry', sb:'Last test · 74/100', rt:'▲ 6' },
          { nm:'Mathematics', sb:'Last test · 55/100', rt:'▼ 9' }
        ]},
      { t:'Fees', s:'Instalment 3 of 4', cap:'No awkward reminder calls needed.',
        big:{ v:'₹19,500', k:'Due on 5 September' },
        rows:[
          { nm:'Instalment 1', sb:'Paid · 12 Apr', rt:'₹19,500' },
          { nm:'Instalment 2', sb:'Paid · 10 Jul', rt:'₹19,500' },
          { nm:'Instalment 3', sb:'Due 5 Sep', rt:'Pay now' },
          { nm:'Instalment 4', sb:'Due 5 Dec', rt:'₹19,500' }
        ]},
      { t:'Notices & doubts', s:'From the institute', cap:'Everything in one place, not a WhatsApp group.',
        rows:[
          { nm:'Mock test on Sunday', sb:'Full syllabus · 9am · report 8:45', rt:'New' },
          { nm:'Doubt session added', sb:'Organic Chemistry · Friday 6pm', rt:'New' },
          { nm:'Your doubt was answered', sb:'Prof. Nair replied · Rotational motion', rt:'Open' },
          { nm:'Parents meeting', sb:'Saturday 11am · Batch A', rt:'RSVP' }
        ]}
    ]
  },

  features: {
    essentials: [
      { t:'Admissions & enquiries', d:'Every enquiry captured from the website, phone and walk-ins — with follow-ups nobody forgets.' },
      { t:'Batches & timetable', d:'Batches, subjects, faculty allocation and the daily timetable, all in one place.' },
      { t:'Attendance', d:'Marked in seconds per batch, visible instantly to parents. No registers.' },
      { t:'Fees & instalments', d:'Instalment plans, receipts, dues and daily collection reports — no more register-keeping.' },
      { t:'Tests & results', d:'Test scores per student, subject-wise trends, and rank comparison across the batch.' },
      { t:'Staff & faculty', d:'Faculty allocation, class load, salary records and performance across batches.' }
    ],
    edge: [
      { star:true, t:'Drop-off Radar', d:'Watches attendance, test scores and fee behaviour together, and names the students most likely to leave — weeks before they stop coming. With the parent message already drafted.' },
      { t:'Automatic fee follow-up', d:'Polite WhatsApp reminders go out on a schedule before and after the due date. Your staff never has to make an awkward call again.' },
      { t:'Enquiry scoring', d:'Tells your counsellor which parent is most likely to admit their child, so the best enquiry gets called first instead of last.' },
      { t:'Parent-sentiment alerts', d:'Spots parents who have gone quiet or unhappy — before it becomes a withdrawal and a bad word-of-mouth review.' },
      { t:'Referral timing', d:'Identifies your happiest parents at their happiest moment — right after a good result — and asks them for a referral then.' },
      { t:'Batch-fill forecasting', d:'Predicts which batches will fill and which will run empty next term, while you can still do something about it.' }
    ],
    killer: 'Every institute software tells you who <span class="ac">paid</span>. Ours tells you which student is about to <span class="ac">leave</span> — and hands you the message that keeps them.'
  },

  pages: [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['problems.html','Problems'], ['apps.html','The 3 Apps'],
    ['app.html','App screens'], ['features.html','Features']
  ],

  problemsPage: {
    title: 'Every problem an institute owner has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Ask him which one is costing him the most this term — then open that screen.'
  },

  problems: [
    { p: 'Students stop attending and nobody notices until they do not re-enrol',
      detail: 'Attendance quietly falls from daily to twice a week to nothing. Three weeks later somebody wonders where he went.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Drop-off Radar</b> watches attendance, test scores and fee behaviour together and names the students most likely to leave, weeks early.' },
        { where:'Owner CRM', w:'crm', d:'Those students sit on the owner\'s home screen every morning, with the parent message already drafted.' },
        { where:'Parent app', w:'app', d:'Parents see falling attendance themselves — most of the time they fix it before you have to call.' }
      ]},

    { p: 'Half the staff\'s month goes on chasing fees',
      detail: 'Calling parents one by one about pending instalments, feeling awkward, and still collecting late.',
      fixes: [
        { where:'AI', w:'ai', d:'Polite WhatsApp reminders go out automatically before and after the due date.' },
        { where:'Parent app', w:'app', d:'Parents see the exact amount and due date and pay from the phone. Most delays are inconvenience, not shortage.' },
        { where:'Owner CRM', w:'crm', d:'Live collection and dues — he finally knows the real number without asking anyone.' }
      ]},

    { p: 'Parents hear nothing until the results come out',
      detail: 'No attendance, no progress, no contact. By the time a parent is unhappy, the decision to switch institutes is already made.',
      fixes: [
        { where:'Parent app', w:'app', d:'Attendance, test scores, subject-wise trends and notices — visible every week.' },
        { where:'AI', w:'ai', d:'Flags parents who have gone quiet or unhappy before it becomes a withdrawal.' },
        { where:'Owner CRM', w:'crm', d:'One notice reaches every parent, with read receipts.' }
      ]},

    { p: 'Admission enquiries are never followed up properly',
      detail: 'A parent enquires, gets one call, and is forgotten. Admission season is won or lost on follow-up, not on advertising.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Every enquiry with a next follow-up date that cannot be skipped.' },
        { where:'AI', w:'ai', d:'<b>Enquiry scoring</b> tells the counsellor which parent is most likely to admit, so the best lead is called first.' },
        { where:'Website', w:'', d:'Enquiries from the website land straight in the pipeline, day or night.' }
      ]},

    { p: 'Nobody knows which teacher actually produces results',
      detail: 'Batch performance, attendance and student retention vary hugely by teacher, and none of it is measured.',
      fixes: [
        { where:'Teacher app', w:'app', d:'Attendance and test marks entered as they happen, not written up later.' },
        { where:'Owner CRM', w:'crm', d:'Teacher-wise results, attendance and student retention — a number he can coach with.' }
      ]},

    { p: 'Doubts go unanswered and students quietly disengage',
      detail: 'A student stuck on a topic stops participating, then stops coming. Nobody knew he was stuck.',
      fixes: [
        { where:'Student app', w:'app', d:'Ask a doubt from the app with a photo. It reaches the right teacher with a deadline.' },
        { where:'Teacher app', w:'app', d:'A doubt queue the teacher clears between classes.' },
        { where:'AI', w:'ai', d:'Flags topics where many students are stuck — usually a teaching gap, not a student problem.' }
      ]},

    { p: 'Test results sit in a register and teach nobody anything',
      detail: 'Marks are announced, written down, and never analysed. Weak areas repeat year after year.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Subject and chapter-wise analysis across every batch.' },
        { where:'Parent app', w:'app', d:'Parents see rank, trend and where their child is weak — in plain language.' },
        { where:'AI', w:'ai', d:'Suggests which chapters to revise for which batch, based on where marks are actually being lost.' }
      ]},

    { p: 'Every batch is planned on guesswork',
      detail: 'He does not know until enrolment closes whether a batch will fill or run half empty at a loss.',
      fixes: [
        { where:'Owner CRM', w:'crm', d:'Batch fill rates against last year, with revenue per batch.' },
        { where:'AI', w:'ai', d:'Forecasts which batches will fill and which will not, while there is still time to act.' }
      ]}
  ],

  appsPage: {
    title: 'Three apps. <span class="ac">One institute.</span>',
    sub: 'Tap anything — these are working prototypes. Open the parent app, tap Progress, and show him what a parent would see every week.'
  },

  apps: {
    parent: {
      name: 'Parent & Student App', icon: '📱',
      blurb: 'The single biggest reason parents stay and refer. Attendance, test scores, fees and notices — every week, without anyone in the office making a call.',
      try: [
        'Tap "Progress" — "this is what a parent sees every week"',
        'Go back, tap "Fees" — "this is why your collections come in on time"',
        'Go back, tap "Ask a doubt" — "this is why the student stays engaged"'
      ],
      points: [
        { t:'Parents feel informed', d:'informed parents re-enrol and refer other parents.' },
        { t:'Fees come in faster', d:'paying is two taps instead of a trip to the office.' },
        { t:'Students stay engaged', d:'doubts get answered instead of building up.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Aarav Shah', s:'JEE 2-Year · Batch A', blocks:[
          { type:'kpis', items:[ {v:'87%',k:'Attendance'}, {v:'Rank 12',k:'Of 64 in batch'} ]},
          { type:'meter', label:'Course completed', right:'74%', pct:74 },
          { type:'sec', text:'Quick actions' },
          { type:'rows', items:[
            { ic:'📈', nm:'Progress', sb:'Test scores and subject trends', goto:'progress' },
            { ic:'💳', nm:'Fees', sb:'Instalment 3 due 5 September', goto:'fees' },
            { ic:'❓', nm:'Ask a doubt', sb:'2 answered this week', goto:'doubt' },
            { ic:'📣', nm:'Notices', sb:'Mock test on Sunday', goto:'notices' }
          ]},
          { type:'note', text:'Maths has dropped for <b>3 tests in a row.</b> Prof. Vyas has added him to Friday\'s extra doubt session.' }
        ]},
        progress: { t:'Progress', s:'Last 6 tests', blocks:[
          { type:'bars', items:[62,68,64,71,66,58] },
          { type:'sec', text:'Subject-wise' },
          { type:'rows', items:[
            { nm:'Physics', sb:'Last test 68/100 · batch avg 61', rt:'▲ 12' },
            { nm:'Chemistry', sb:'Last test 74/100 · batch avg 66', rt:'▲ 6' },
            { nm:'Mathematics', sb:'Last test 55/100 · batch avg 64', rt:'▼ 9' }
          ]},
          { type:'note', text:'Weak chapters in Maths: <b>Rotational motion, Definite integrals.</b> Revision material has been shared.' },
          { type:'sec', text:'Attendance' },
          { type:'meter', label:'This month', right:'87%', pct:87 }
        ]},
        fees: { t:'Fees', s:'Instalment 3 of 4', blocks:[
          { type:'hero', v:'₹19,500', k:'Due on 5 September' },
          { type:'rows', items:[
            { nm:'Instalment 1', sb:'Paid · 12 April', rt:'₹19,500' },
            { nm:'Instalment 2', sb:'Paid · 10 July', rt:'₹19,500' },
            { nm:'Instalment 3', sb:'Due 5 September', rt:'Pay now' },
            { nm:'Instalment 4', sb:'Due 5 December', rt:'₹19,500' }
          ]},
          { type:'note', text:'Receipts are issued instantly and stored here forever. No paper, no trips to the office.' },
          { type:'btn', text:'Pay ₹19,500' }
        ]},
        doubt: { t:'Ask a doubt', s:'Answered within 24 hours', blocks:[
          { type:'chat', items:[
            { who:'me', msg:'Sir, I am not understanding angular momentum conservation when the axis shifts.' },
            { who:'ai', msg:'Good question Aarav. Think of it this way — angular momentum is conserved only about a fixed axis with no external torque. When the axis shifts, you must recompute. I have added a 6-minute explanation and 3 practice sums to your material. — Prof. Nair' }
          ]},
          { type:'rows', items:[
            { nm:'Organic Chemistry · nomenclature', sb:'Answered 2 days ago', rt:'View' },
            { nm:'Definite integrals · by parts', sb:'Answered 5 days ago', rt:'View' }
          ]},
          { type:'btn', text:'Ask a new doubt' }
        ]},
        notices: { t:'Notices', s:'Vidya Path Academy', blocks:[
          { type:'cards', items:[
            { t:'Full-syllabus mock test — Sunday', d:'Today · 9:00 am, report by 8:45. Bring your own stationery and admit card.' },
            { t:'Extra doubt session — Organic Chemistry', d:'2 days ago · Friday 6pm with Prof. Nair. Optional but recommended for Batch A.' },
            { t:'Parents meeting — Saturday 11am', d:'4 days ago · Batch A only. Individual 10-minute slots, book in the app.' },
            { t:'Diwali break — 20 to 24 October', d:'1 week ago · classes resume 25 October.' }
          ]}
        ]}
      }
    },

    teacher: {
      name: 'Teacher App', icon: '🧑‍🏫',
      blurb: 'Faculty mark attendance in seconds, enter test marks from their phone, clear the doubt queue between classes, and see which students are slipping in their batch.',
      try: [
        'Tap "Mark attendance" — "30 seconds instead of a register"',
        'Go back, tap "Students slipping" — "your teachers catch it before you do"'
      ],
      points: [
        { t:'No registers', d:'attendance and marks entered as they happen.' },
        { t:'Teachers catch drop-offs first', d:'they see their own batch\'s warning signs.' },
        { t:'Doubts get cleared', d:'a queue with a deadline, not a pile of paper.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Good morning, Prof. Nair', s:'Physics · 3 batches', blocks:[
          { type:'kpis', items:[ {v:'3',k:'Classes today'}, {v:'7',k:'Doubts pending'} ]},
          { type:'sec', text:'Today' },
          { type:'rows', items:[
            { ic:'✅', nm:'Mark attendance', sb:'JEE Batch A · 8:00 am', goto:'attend' },
            { ic:'⚠️', nm:'Students slipping', sb:'4 in your batches', rt:'4', goto:'slip' },
            { ic:'❓', nm:'Doubt queue', sb:'7 waiting · oldest 1 day', goto:'doubts' }
          ]},
          { type:'sec', text:'Your batches' },
          { type:'rows', items:[
            { nm:'JEE Batch A', sb:'64 students · avg 66%', rt:'8:00 am' },
            { nm:'JEE Batch B', sb:'58 students · avg 61%', rt:'11:00 am' },
            { nm:'Foundation 10th', sb:'42 students · avg 72%', rt:'4:30 pm' }
          ]}
        ]},
        attend: { t:'Mark attendance', s:'JEE Batch A · 8:00 am', blocks:[
          { type:'kpis', items:[ {v:'58',k:'Present'}, {v:'6',k:'Absent'} ]},
          { type:'rows', items:[
            { ic:'✅', nm:'Aarav Shah', sb:'87% this month', rt:'Present' },
            { ic:'✅', nm:'Diya Mehta', sb:'94% this month', rt:'Present' },
            { ic:'❌', nm:'Rohan Desai', sb:'62% · 3rd absence this week', rt:'Absent' },
            { ic:'✅', nm:'Ananya Rao', sb:'100% this month', rt:'Present' },
            { ic:'❌', nm:'Kabir Trivedi', sb:'71% this month', rt:'Absent' }
          ]},
          { type:'note', text:'Parents of absent students are notified <b>automatically</b> within the hour. No phone calls from the office.' },
          { type:'btn', text:'Submit attendance' }
        ]},
        slip: { t:'Students slipping', s:'In your batches', blocks:[
          { type:'note', text:'Flagged by the Drop-off Radar. <b>A word from the teacher works better than a call from the office.</b>' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Rohan Desai', sb:'Attendance 96% → 62% in 3 weeks', rt:'88%' },
            { ic:'🔴', nm:'Kabir Trivedi', sb:'Marks falling 3 tests running', rt:'74%' },
            { ic:'🟠', nm:'Aarav Shah', sb:'Maths dropping · attendance dipping', rt:'61%' },
            { ic:'🟠', nm:'Sara Shaikh', sb:'Stopped asking doubts entirely', rt:'54%' }
          ]},
          { type:'btn', text:'Flag to the office' }
        ]},
        doubts: { t:'Doubt queue', s:'7 waiting', blocks:[
          { type:'rows', items:[
            { ic:'🔴', nm:'Aarav Shah · Rotational motion', sb:'Waiting 1 day', rt:'Answer' },
            { ic:'🟠', nm:'Diya Mehta · Thermodynamics', sb:'Waiting 6 hours', rt:'Answer' },
            { ic:'🟠', nm:'Ishita Joshi · Optics', sb:'Waiting 4 hours', rt:'Answer' },
            { ic:'○', nm:'Kabir Trivedi · Electrostatics', sb:'Waiting 2 hours', rt:'Answer' }
          ]},
          { type:'note', text:'<b>3 students</b> asked about rotational motion this week. That is a teaching gap, not a student problem — worth re-covering in class.' }
        ]}
      }
    },

    owner: {
      name: 'Owner CRM', icon: '🖥️', desktop: true,
      blurb: 'What the owner opens at 8am. Fees, admissions, attendance, the Drop-off Radar and teacher performance — the whole institute on one screen.',
      home: 'dash',
      screens: {
        dash: { t:'Dashboard', nav:'Dashboard', s:'Vidya Path Academy', blocks:[
          { type:'kpis', items:[
            {v:'₹4.81L',k:'Fees collected'}, {v:'₹1.94L',k:'Dues pending'},
            {v:'38',k:'New admissions'}, {v:'92%',k:'Attendance today'} ]},
          { type:'sec', text:'Fee collection · last 12 weeks' },
          { type:'bars', items:[42,55,48,63,58,71,66,79,74,85,81,94] },
          { type:'sec', text:'Needs attention' },
          { type:'rows', items:[
            { ic:'🔴', nm:'9 students at risk of dropping out', sb:'Flagged this morning', rt:'Open', goto:'risk' },
            { ic:'💰', nm:'₹1.94L in pending fees', sb:'31 students · reminders running', rt:'Open', goto:'fees' },
            { ic:'🆕', nm:'14 enquiries not followed up', sb:'Oldest is 6 days old', rt:'Open', goto:'admissions' },
            { ic:'📉', nm:'Foundation batch only 61% full', sb:'Term starts in 3 weeks', rt:'Open' }
          ]}
        ]},
        risk: { t:'Drop-off Radar', nav:'Drop-off Radar', s:'AI · every morning', blocks:[
          { type:'note', text:'Students whose <b>attendance, marks and fee behaviour together</b> say they are about to leave. Each fee lost is a full year of revenue.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Rohan Desai', sb:'Attendance 96% → 62% · missed 2 tests', rt:'88%' },
            { ic:'🔴', nm:'Kabir Trivedi', sb:'Marks falling · fee overdue 21 days', rt:'81%' },
            { ic:'🔴', nm:'Sara Shaikh', sb:'Stopped asking doubts · attendance dipping', rt:'74%' },
            { ic:'🟠', nm:'Aarav Shah', sb:'Maths dropping 3 tests running', rt:'61%' }
          ]},
          { type:'note', text:'Saving <b>9 students at ₹78,000 a year</b> is ₹7 lakh. That is the entire ROI conversation in one screen.' }
        ]},
        fees: { t:'Fees', nav:'Fees', s:'August 2026', blocks:[
          { type:'kpis', items:[ {v:'₹4.81L',k:'Collected'}, {v:'₹1.94L',k:'Pending'} ]},
          { type:'rows', items:[
            { ic:'DM', nm:'Diya Mehta', sb:'Overdue 21 days · 2 reminders sent', rt:'₹24,000' },
            { ic:'KT', nm:'Kabir Trivedi', sb:'Overdue 14 days', rt:'₹19,500' },
            { ic:'RD', nm:'Rohan Desai', sb:'Overdue 9 days', rt:'₹9,500' },
            { ic:'AS', nm:'Aarav Shah', sb:'Due in 3 days', rt:'₹19,500' }
          ]},
          { type:'note', text:'Reminders go out on schedule <b>without anyone making a call.</b> Collections come in about 24 days faster.' }
        ]},
        admissions: { t:'Admissions', nav:'Admissions', s:'Enquiry pipeline', blocks:[
          { type:'kpis', items:[ {v:'46',k:'Open enquiries'}, {v:'38',k:'Admitted this month'} ]},
          { type:'rows', items:[
            { ic:'🟢', nm:'Ishita Joshi', sb:'NEET · attended demo class', rt:'92%' },
            { ic:'🟢', nm:'Vivaan Kapoor', sb:'JEE · called twice · parent keen', rt:'78%' },
            { ic:'🟠', nm:'Sara Shaikh', sb:'Foundation · walk-in', rt:'44%' },
            { ic:'🔴', nm:'Manav Trivedi', sb:'No follow-up in 6 days', rt:'Chase' }
          ]},
          { type:'note', text:'Scored by AI so the counsellor calls the <b>most likely admission first</b>, not whoever enquired first.' }
        ]},
        teachers: { t:'Faculty', nav:'Faculty', s:'Performance this term', blocks:[
          { type:'rows', items:[
            { ic:'PN', nm:'Prof. Nair · Physics', sb:'3 batches · avg 66% · 94% retention', rt:'Top' },
            { ic:'DS', nm:'Dr. Sheth · Biology', sb:'2 batches · avg 71% · 91% retention', rt:'Top' },
            { ic:'MV', nm:'Mr. Vyas · Maths', sb:'3 batches · avg 58% · 79% retention', rt:'Watch' },
            { ic:'RK', nm:'Ms. Kaur · Chemistry', sb:'2 batches · avg 68% · 88% retention', rt:'Good' }
          ]},
          { type:'note', text:'Maths marks are <b>10 points below</b> the other subjects across every batch. Now it is visible, and coachable.' }
        ]}
      }
    }
  }
};
