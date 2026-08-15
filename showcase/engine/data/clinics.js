/* Clinics & Doctors — problems→solutions + the three interactive apps.
   Palette ported from clinic.css (calm teal on white, light theme). */
window.DEMOS = window.DEMOS || {};
window.DEMOS.clinics = {
  name: 'Clinic',
  label: 'Clinics, Doctors & Dieticians',

  pages: [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['problems.html','Problems'], ['apps.html','The 3 Apps'], ['features.html','Features']
  ],

  theme: {
    bg:'#F8FAFA', bg2:'#FFFFFF',
    panel:'rgba(27,45,45,.035)', panel2:'rgba(27,45,45,.065)',
    line:'rgba(27,45,45,.12)', line2:'rgba(27,45,45,.21)',
    txt:'#1B2D2D', txt2:'rgba(27,45,45,.66)', txt3:'rgba(27,45,45,.46)',
    ac:'#1A8C8C', ac2:'#E0816A', acInk:'#FFFFFF', acGlow:'rgba(26,140,140,.24)',
    wash1:'rgba(26,140,140,.13)', wash2:'rgba(224,129,106,.10)',
    red:'#D6594C', amber:'#DD922F', green:'#2E9E6B',
    redBg:'rgba(214,89,76,.13)', amberBg:'rgba(221,146,47,.15)', greenBg:'rgba(46,158,107,.14)',
    font:"'Manrope',-apple-system,Segoe UI,sans-serif",
    fontBody:"'Inter',-apple-system,Segoe UI,sans-serif",
    fontUrl:'https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap'
  },

  problemsPage: {
    title: 'Every problem a clinic has.<br>And exactly what we <span class="ac">build for it.</span>',
    sub: 'Ask the doctor which of these costs him the most time or money — then open that screen.'
  },

  problems: [
    { p: 'No-shows leave paid-for time completely empty',
      detail: 'A booked slot goes empty with no warning. That time is gone, the staff are still paid, and the patient who needed it could not get in.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>No-show prediction</b> scores each appointment on history, day and booking gap, then confirms the risky ones on WhatsApp in advance.' },
        { where:'Patient app', w:'app', d:'One-tap confirm or reschedule. Most no-shows are people who forgot, not people who left.' },
        { where:'Clinic CRM', w:'crm', d:'Empty slots get offered automatically to the waiting list.' }
      ]},

    { p: 'Patients told "come back in three weeks" never come back',
      detail: 'The follow-up is where the outcome and the revenue both are. Nobody tracks it, so it simply does not happen.',
      fixes: [
        { where:'AI', w:'ai', d:'A <b>recall engine</b> tracks every patient due for a follow-up, review or annual check and invites them automatically.' },
        { where:'Patient app', w:'app', d:'The patient sees their next due date and can book it themselves.' },
        { where:'Clinic CRM', w:'crm', d:'A recall list every morning showing who is overdue and by how long.' }
      ]},

    { p: 'One unanswered bad review costs real footfall',
      detail: 'Patients choose a doctor by Google rating. A 3.8 with an angry unanswered complaint at the top is losing patients every single day.',
      fixes: [
        { where:'AI', w:'ai', d:'<b>Review recovery</b> reaches an unhappy patient before the review is posted.' },
        { where:'AI', w:'ai', d:'Drafts a careful, professional reply to every review — never defensive, never revealing anything private.' },
        { where:'Patient app', w:'app', d:'Happy patients get asked for a Google review at the right moment, not at random.' }
      ]},

    { p: 'The front desk is chaos and patients wait without knowing why',
      detail: 'Walk-ins, appointments and phone calls all at once. Patients sit for 40 minutes with no idea where they are in the queue.',
      fixes: [
        { where:'Clinic CRM', w:'crm', d:'A live queue — booked, arrived, in consultation, done — visible to the whole desk.' },
        { where:'Patient app', w:'app', d:'The patient sees their <b>live queue position</b> and expected time, so they wait at home, not in the corridor.' },
        { where:'AI', w:'ai', d:'Warns the desk when the doctor is running late so patients can be messaged before they arrive.' }
      ]},

    { p: 'Reports and prescriptions get lost',
      detail: 'Patients lose paper prescriptions, call the clinic for copies, and staff spend the day searching files and re-printing.',
      fixes: [
        { where:'Patient app', w:'app', d:'Every prescription, report and invoice, permanently in the patient\'s phone.' },
        { where:'Doctor app', w:'app', d:'The doctor sees the full history before the patient sits down — past visits, medicines, allergies.' },
        { where:'Clinic CRM', w:'crm', d:'Searchable records instead of a cupboard of files.' }
      ]},

    { p: 'Chronic patients drift away without anyone noticing',
      detail: 'A diabetic or BP patient should come every quarter for years. When they stop, nobody sees it — and their health and the clinic both suffer.',
      fixes: [
        { where:'AI', w:'ai', d:'Flags chronic patients who have missed their normal cycle, with the reminder already written.' },
        { where:'Patient app', w:'app', d:'Medicine and test reminders keep them engaged between visits.' },
        { where:'Clinic CRM', w:'crm', d:'Chronic-care register showing who is on track and who has vanished.' }
      ]},

    { p: 'Referring doctors are never tracked or thanked',
      detail: 'A handful of doctors send most of the referrals. The clinic has no idea who they are, so the relationships are never nurtured.',
      fixes: [
        { where:'Clinic CRM', w:'crm', d:'Every patient tagged with who referred them — and the totals per doctor.' },
        { where:'AI', w:'ai', d:'Flags a referring doctor whose flow has dropped, while the relationship can still be saved.' }
      ]},

    { p: 'Appointments are still taken over the phone, all day',
      detail: 'One person spends the whole day answering calls. After hours, the phone rings out and the patient goes to another clinic.',
      fixes: [
        { where:'Website', w:'', d:'Online booking that works at 11pm, when patients actually search.' },
        { where:'Patient app', w:'app', d:'Book, reschedule and cancel without a single phone call.' },
        { where:'Clinic CRM', w:'crm', d:'Everything lands in the same calendar — no double bookings.' }
      ]},

    { p: 'The doctor has no idea what the clinic actually earned',
      detail: 'Cash, card, UPI and insurance across three staff. The real number arrives weeks later, if at all.',
      fixes: [
        { where:'Clinic CRM', w:'crm', d:'Today\'s collection by payment mode, by doctor, by service — live.' },
        { where:'Clinic CRM', w:'crm', d:'Outstanding balances tracked with polite automatic reminders.' }
      ]},

    { p: 'Patients only hear from the clinic when they are ill',
      detail: 'No relationship between visits means no loyalty. The next time, they go wherever is nearest or cheapest.',
      fixes: [
        { where:'Patient app', w:'app', d:'Health tips, camp announcements and seasonal advice keep the clinic present all year.' },
        { where:'AI', w:'ai', d:'Writes the content for the clinic — in plain language, medically careful, never over-claiming.' }
      ]}
  ],

  appsPage: {
    title: 'Three apps. <span class="ac">One clinic.</span>',
    sub: 'Tap anything — these are working prototypes. Open the patient app, tap Reports, and show him what his patients would carry in their pocket.'
  },

  apps: {
    patient: {
      name: 'Patient App', icon: '📱',
      blurb: 'Booking without phoning, live queue position, and every prescription and report kept forever. This is what makes a patient come back to this clinic instead of the nearest one.',
      try: [
        'Tap "Book appointment" — "your patients stop calling your desk all day"',
        'Go back, tap "My reports" — "nobody ever loses a prescription again"',
        'Go back, tap "Live queue" — this screen alone wins over most doctors'
      ],
      points: [
        { t:'The desk stops being a call centre', d:'bookings come in while the clinic is closed.' },
        { t:'Follow-ups actually happen', d:'the patient is reminded and can book in two taps.' },
        { t:'Records are never lost', d:'which means fewer repeat tests and happier patients.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Hello Rakesh 👋', s:'Sanjeevani Clinic · Piplod', blocks:[
          { type:'note', text:'Your <b>3-month diabetes review</b> is due in 9 days. Dr. Sheth has Tuesday 11:30 am free.' },
          { type:'sec', text:'Quick actions' },
          { type:'rows', items:[
            { ic:'📅', nm:'Book appointment', sb:'Choose doctor, date and time', goto:'book' },
            { ic:'⏱️', nm:'Live queue', sb:'You are 3rd · about 22 minutes', goto:'queue' },
            { ic:'📄', nm:'My reports', sb:'Prescriptions, tests and invoices', goto:'reports' },
            { ic:'💊', nm:'My medicines', sb:'4 active · next refill in 6 days', goto:'meds' }
          ]},
          { type:'sec', text:'Upcoming' },
          { type:'rows', items:[
            { nm:'Diabetes review', sb:'Tuesday 11:30 am · Dr. Sheth', rt:'Confirm' }
          ]}
        ]},
        book: { t:'Book appointment', s:'Sanjeevani Clinic', blocks:[
          { type:'sec', text:'Choose a doctor' },
          { type:'rows', items:[
            { ic:'AS', nm:'Dr. Anil Sheth', sb:'Diabetology · your usual doctor', rt:'₹600' },
            { ic:'MP', nm:'Dr. Meera Patel', sb:'General physician', rt:'₹500' },
            { ic:'RK', nm:'Dr. Rohit Kaneria', sb:'Cardiology · visiting Tue/Thu', rt:'₹900' }
          ]},
          { type:'sec', text:'Tuesday · Dr. Sheth' },
          { type:'chips', items:['10:00','10:30','11:00','11:30 ✓','12:00','6:00','6:30'] },
          { type:'note', text:'Bring your last <b>HbA1c report</b> — or it is already in the app under My reports.' },
          { type:'btn', text:'Confirm Tuesday 11:30 am' }
        ]},
        queue: { t:'Live queue', s:'Tuesday · Dr. Sheth', blocks:[
          { type:'hero', v:'3rd', k:'Your position in the queue' },
          { type:'meter', label:'Estimated wait', right:'~22 min', pct:64 },
          { type:'rows', items:[
            { ic:'✅', nm:'Token 12', sb:'In consultation now', rt:'Now' },
            { ic:'⏳', nm:'Token 13', sb:'Waiting', rt:'~8 min' },
            { ic:'⏳', nm:'Token 14', sb:'Waiting', rt:'~15 min' },
            { ic:'🔵', nm:'Token 15 — you', sb:'Arrived 11:24 am', rt:'~22 min' }
          ]},
          { type:'note', text:'Patients wait <b>at home or in the car</b> instead of a crowded corridor. This one screen removes most of the daily complaints.' }
        ]},
        reports: { t:'My reports', s:'All your records', blocks:[
          { type:'chips', items:['All','Prescriptions','Lab tests','Invoices'] },
          { type:'rows', items:[
            { ic:'📄', nm:'Prescription · Dr. Sheth', sb:'14 May 2026 · diabetes review', rt:'View' },
            { ic:'🧪', nm:'HbA1c + lipid profile', sb:'14 May 2026 · Sanjeevani Lab', rt:'View' },
            { ic:'📄', nm:'Prescription · Dr. Patel', sb:'2 March 2026 · viral fever', rt:'View' },
            { ic:'🧪', nm:'Complete blood count', sb:'2 March 2026', rt:'View' },
            { ic:'🧾', nm:'Invoice · consultation', sb:'14 May 2026', rt:'₹600' }
          ]},
          { type:'note', text:'Never lost, never re-printed, never a phone call to the desk asking for a copy.' }
        ]},
        meds: { t:'My medicines', s:'4 active', blocks:[
          { type:'rows', items:[
            { ic:'💊', nm:'Metformin 500 mg', sb:'Twice daily after food', rt:'6 days left' },
            { ic:'💊', nm:'Glimepiride 1 mg', sb:'Once daily before breakfast', rt:'6 days left' },
            { ic:'💊', nm:'Atorvastatin 10 mg', sb:'Once daily at night', rt:'12 days left' },
            { ic:'💊', nm:'Vitamin D3', sb:'Weekly · Sunday', rt:'3 weeks left' }
          ]},
          { type:'note', text:'Reminder set for <b>6 days</b> before your medicines run out. Chronic patients who keep taking their medicines keep coming back.' },
          { type:'btn', text:'Request a refill' }
        ]}
      }
    },

    doctor: {
      name: 'Doctor App', icon: '🩺',
      blurb: 'The doctor opens this between patients. Today\'s list, the full history before the patient sits down, and who has not come back when they should have.',
      try: [
        'Tap a patient to show the full history appears before they walk in',
        'Go back, tap "Recalls due" — "this is the revenue you are losing today"'
      ],
      points: [
        { t:'Faster, safer consultations', d:'history, allergies and past medicines on one screen.' },
        { t:'Nothing is forgotten', d:'follow-ups are tracked by the system, not by memory.' },
        { t:'Works between patients', d:'designed for 30 seconds of attention, not 10 minutes.' }
      ],
      home: 'home',
      screens: {
        home: { t:'Good morning, Dr. Sheth', s:'Tuesday · 24 patients', blocks:[
          { type:'kpis', items:[ {v:'24',k:'Booked today'}, {v:'9',k:'Seen so far'} ]},
          { type:'sec', text:'Needs you' },
          { type:'rows', items:[
            { ic:'🔁', nm:'Recalls due', sb:'31 patients overdue for follow-up', rt:'31', goto:'recalls' },
            { ic:'📋', nm:'Today\'s list', sb:'24 booked · 9 done · 2 no-show risk', goto:'today' }
          ]},
          { type:'sec', text:'Next patient' },
          { type:'rows', items:[
            { ic:'RP', nm:'Rakesh Patel', sb:'Diabetes review · 3 months since last', goto:'patient' }
          ]}
        ]},
        today: { t:'Today\'s list', s:'24 booked', blocks:[
          { type:'rows', items:[
            { ic:'✅', nm:'10:00 · Sunita Joshi', sb:'BP review · done', rt:'Done' },
            { ic:'✅', nm:'10:30 · Amit Shah', sb:'Thyroid follow-up · done', rt:'Done' },
            { ic:'⏳', nm:'11:30 · Rakesh Patel', sb:'Diabetes review · next', rt:'Now', goto:'patient' },
            { ic:'⚠️', nm:'12:00 · Nilesh Rana', sb:'New patient · high no-show risk', rt:'Confirm' },
            { ic:'○', nm:'12:30 · Kiran Desai', sb:'Annual health check', rt:'—' },
            { ic:'○', nm:'6:00 · Falguni Shah', sb:'Diabetes · 3-month review', rt:'—' }
          ]},
          { type:'note', text:'Nilesh has missed <b>2 of his last 3</b> appointments. The desk has already been prompted to confirm him.' }
        ]},
        patient: { t:'Rakesh Patel', s:'52 · diabetic since 2019', back:'today', blocks:[
          { type:'note', text:'⚠️ <b>Allergic to sulfa drugs.</b> Last HbA1c 7.8 — up from 7.1 in February.' },
          { type:'kpis', items:[ {v:'7.8',k:'HbA1c (was 7.1)'}, {v:'138/88',k:'BP last visit'} ]},
          { type:'sec', text:'Current medicines' },
          { type:'rows', items:[
            { nm:'Metformin 500 mg', sb:'Twice daily · since 2019', rt:'Continue' },
            { nm:'Glimepiride 1 mg', sb:'Once daily · since Mar 2026', rt:'Review' },
            { nm:'Atorvastatin 10 mg', sb:'Once daily at night', rt:'Continue' }
          ]},
          { type:'sec', text:'Visit history' },
          { type:'rows', items:[
            { nm:'Diabetes review', sb:'14 May 2026 · HbA1c 7.1', rt:'—' },
            { nm:'Viral fever', sb:'2 March 2026 · Dr. Patel', rt:'—' },
            { nm:'Annual check', sb:'8 December 2025', rt:'—' }
          ]},
          { type:'btn', text:'Write prescription' }
        ]},
        recalls: { t:'Recalls due', s:'Tracked automatically', blocks:[
          { type:'note', text:'31 patients are <b>overdue for a follow-up</b> they were told to come back for. Each one is care not delivered and revenue not earned.' },
          { type:'rows', items:[
            { ic:'🔴', nm:'Bhavna Mehta', sb:'Diabetes · due 11 weeks ago', rt:'Overdue' },
            { ic:'🔴', nm:'Jayesh Solanki', sb:'BP review · due 9 weeks ago', rt:'Overdue' },
            { ic:'🔴', nm:'Asha Kapadia', sb:'Thyroid · due 8 weeks ago', rt:'Overdue' },
            { ic:'🟠', nm:'Manish Dave', sb:'Annual check · due 3 weeks ago', rt:'Due' },
            { ic:'🟠', nm:'Rina Gohil', sb:'Post-treatment review · 2 weeks', rt:'Due' }
          ]},
          { type:'chat', items:[
            { who:'ai', msg:'Dear Bhavnaben, this is Sanjeevani Clinic. Dr. Sheth had advised a diabetes review three months ago and we have not seen you since. Regular checks keep things under control — may we book you this week?' }
          ]},
          { type:'btn', text:'Send all reminders' }
        ]}
      }
    },

    owner: {
      name: 'Clinic CRM', icon: '🖥️', desktop: true,
      blurb: 'The screen the clinic runs on. Appointments, the live queue, patient records, money, recalls and reputation — all in one place instead of a register and three notebooks.',
      home: 'dash',
      screens: {
        dash: { t:'Dashboard', nav:'Dashboard', s:'Sanjeevani Clinic · Tuesday', blocks:[
          { type:'kpis', items:[
            {v:'₹94,200',k:'Collected this month'}, {v:'146',k:'Patients this week'},
            {v:'31',k:'Recalls overdue'}, {v:'4.3★',k:'Google rating'} ]},
          { type:'sec', text:'Patients · last 12 weeks' },
          { type:'bars', items:[62,68,59,74,71,78,73,84,80,88,85,92] },
          { type:'sec', text:'Needs attention' },
          { type:'rows', items:[
            { ic:'🔁', nm:'31 patients overdue for follow-up', sb:'Worth about ₹18,600 in consultations', rt:'Open', goto:'recalls' },
            { ic:'⚠️', nm:'2 appointments at high no-show risk', sb:'Today · confirm them now', rt:'Open' },
            { ic:'⭐', nm:'1 negative review unanswered', sb:'Posted 3 days ago', rt:'Open', goto:'reviews' },
            { ic:'💰', nm:'₹12,400 outstanding', sb:'9 patients', rt:'Open' }
          ]}
        ]},
        queue: { t:'Live queue', nav:'Queue', s:'Right now', blocks:[
          { type:'kpis', items:[ {v:'6',k:'Waiting'}, {v:'18 min',k:'Average wait'} ]},
          { type:'rows', items:[
            { ic:'🔵', nm:'Token 12 · Sunita Joshi', sb:'In consultation · Dr. Sheth', rt:'Now' },
            { ic:'⏳', nm:'Token 13 · Amit Shah', sb:'Arrived 11:02', rt:'~8 min' },
            { ic:'⏳', nm:'Token 14 · Nilesh Rana', sb:'Arrived 11:14', rt:'~15 min' },
            { ic:'⏳', nm:'Token 15 · Rakesh Patel', sb:'Arrived 11:24', rt:'~22 min' },
            { ic:'📱', nm:'Token 16 · Kiran Desai', sb:'Waiting at home · notified', rt:'~30 min' }
          ]},
          { type:'note', text:'Dr. Sheth is running <b>14 minutes late</b>. Patients arriving after 12:30 have been messaged automatically.' }
        ]},
        recalls: { t:'Recall engine', nav:'Recalls', s:'AI · runs every morning', blocks:[
          { type:'note', text:'Every patient due for a follow-up, annual check or chronic review — <b>found automatically</b>, invited automatically.' },
          { type:'kpis', items:[ {v:'31',k:'Overdue now'}, {v:'46',k:'Due in 30 days'} ]},
          { type:'rows', items:[
            { ic:'🔴', nm:'Diabetes reviews', sb:'12 patients overdue', rt:'₹7,200' },
            { ic:'🔴', nm:'BP reviews', sb:'9 patients overdue', rt:'₹5,400' },
            { ic:'🟠', nm:'Annual health checks', sb:'7 patients due', rt:'₹4,200' },
            { ic:'🟠', nm:'Post-treatment reviews', sb:'3 patients due', rt:'₹1,800' }
          ]},
          { type:'btn', text:'Send all recall reminders' }
        ]},
        patients: { t:'Patients', nav:'Patients', s:'2,480 registered', blocks:[
          { type:'chips', items:['All 2,480','Chronic 312','Overdue 31','New this month 64'] },
          { type:'rows', items:[
            { ic:'RP', nm:'Rakesh Patel', sb:'52 · diabetic · last visit 14 May', rt:'Due' },
            { ic:'BM', nm:'Bhavna Mehta', sb:'61 · diabetic · overdue 11 weeks', rt:'Overdue' },
            { ic:'SJ', nm:'Sunita Joshi', sb:'48 · hypertension · seen today', rt:'Active' },
            { ic:'KD', nm:'Kiran Desai', sb:'39 · annual check', rt:'Today' }
          ]}
        ]},
        reviews: { t:'Reputation', nav:'Reputation', s:'Google · 4.3★ from 186', blocks:[
          { type:'kpis', items:[ {v:'4.3★',k:'Current rating'}, {v:'186',k:'Total reviews'} ]},
          { type:'sec', text:'Needs a reply' },
          { type:'cards', items:[
            { t:'★★☆☆☆ — "Waited 50 minutes past my appointment time"', d:'3 days ago. AI has drafted an apology that acknowledges the wait, explains the emergency case that day, and offers a priority slot. Approve to post.' }
          ]},
          { type:'note', text:'An unanswered complaint sits at the top of your listing for months. A calm reply <b>often changes the rating</b> — and always changes what the next patient thinks.' },
          { type:'btn', text:'Approve and post reply' }
        ]},
        money: { t:'Money', nav:'Money', s:'August 2026', blocks:[
          { type:'kpis', items:[
            {v:'₹94,200',k:'Collected'}, {v:'₹12,400',k:'Outstanding'},
            {v:'₹640',k:'Average consultation'}, {v:'₹28,600',k:'Lab & procedures'} ]},
          { type:'sec', text:'By payment mode' },
          { type:'rows', items:[
            { nm:'UPI', sb:'58% of collections', rt:'₹54,600' },
            { nm:'Cash', sb:'27%', rt:'₹25,400' },
            { nm:'Card', sb:'15%', rt:'₹14,200' }
          ]}
        ]}
      }
    }
  }
};
