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
  }
};
