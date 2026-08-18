/* ============================================================
   ANANTAM REALTY OS — the screens
   Every module a builder runs today, rebuilt for property,
   with the AI layer on top. Illustrative sample data only.
   ============================================================ */
window.VIEWS = {};
(function(){
  'use strict';
  var V = window.VIEWS;
  function h(){ return window.H; }

  function head(title, sub, acts){
    return '<div class="vhead"><div><h1>' + title + '</h1>' +
      (sub ? '<div class="sb">' + sub + '</div>' : '') + '</div>' +
      (acts ? '<div class="acts">' + acts.map(function(a, i){
        return '<button class="btn btn-sm ' + (i === 0 ? 'btn-ac' : 'btn-line') + '">' + a + '</button>';
      }).join('') + '</div>' : '') + '</div>';
  }

  /* ================= DASHBOARD ================= */
  V.dashboard = function(){
    var H = h();
    var d = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var mons = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var kpis = H.kpi([
      { k:'Live leads', v:'112', t:'b', d:'<span class="up">▲ 18</span> vs last month' },
      { k:'Site visits this week', v:'38', t:'ac', d:'<span class="up">▲ 9</span> · 61% show rate' },
      { k:'Bookings this month', v:'₹6.84 Cr', t:'g', d:'<span class="up">▲ 22%</span> · 11 units' },
      { k:'Collections overdue', v:'₹1.37 Cr', t:'r', d:'<span class="down">7 buyers</span> past due date' }
    ]);
    var kpis2 = H.kpi([
      { k:'Units available', v:'54', d:'Across 3 projects · ₹68.2 Cr value' },
      { k:'On hold', v:'6', t:'a', d:'2 past the 72-hour rule' },
      { k:'Collected this month', v:'₹4.11 Cr', t:'g', d:'88% of demands raised' },
      { k:'Brokerage payable', v:'₹41.6 L', t:'b', d:'To 14 channel partners' }
    ]);

    var trend = H.chartCard('Activity over the last 6 months',
      [ { name:'Leads', data:[68,74,81,92,104,112] },
        { name:'Site visits', data:[22,26,31,29,36,38] },
        { name:'Bookings', data:[5,6,8,7,9,11] } ],
      ['Mar','Apr','May','Jun','Jul','Aug'], 'Smoothed area view', 'Area');

    var attention = H.card('Needs attention today', 'Ranked by AI booking probability',
      '<div class="card-b flush">' + H.table(
        ['Who / what', 'Detail', { t:'Score', num:true }, { t:'Status', num:true }],
        [
          [H.who('Nikunj Patel'), 'Skies · 3 BHK · ₹1.4–1.6 Cr · visited 2× · loan pre-approved', H.score(92), H.pill('Call before 12pm','g')],
          [H.who('Devang Bhatt'), 'Skies · 4 BHK · site visit tomorrow 12:30pm · confirmed', H.score(81), H.pill('Confirmed','g')],
          [H.who('Aliya Shaikh'), 'Business Park · showroom · via Skyline Realty (CP)', H.score(74), H.pill('Send cost sheet','b')],
          [H.two('Unit B-1104','Anantam Skies · Tower B'), 'Held 9 days for Mehul Trivedi · no token received', H.score(48), H.pill('Release hold','r')],
          [H.who('Jayesh Kansara'), 'Booked B-0703 · 3rd demand ₹18.4L overdue 22 days', '—', H.pill('Collection risk','r')],
          [H.two('99acres · Skies','Campaign since 12 Jul'), '41 leads · 3 site visits · ₹1,860 per visit', '—', H.pill('Cut spend','a')]
        ]) + '</div>');

    var arya = H.ai('Arya — your AI sales head', [
      { t:'Call Nikunj Patel before 12pm',
        d:'Opened the cost sheet 4 times last night and enquired at Sunrise Heights at 9:14am. Booking probability <b>92%</b> — the highest in your pipeline.',
        acts:['Call now','Open lead'] },
      { t:'Release the hold on B-1104',
        d:'Held 9 days with no token. Two live 3 BHK enquiries want this exact floor band. Release letter is drafted.',
        acts:['Release','Extend 24h'] },
      { t:'₹1.37 Cr of collections at risk',
        d:'4 buyers show the same pattern that preceded your last 6 defaults. Reminder ladder drafted in Gujarati, Hindi and English.',
        acts:['Approve & send','Review'] },
      { t:'Stop the 99acres Skies campaign',
        d:'₹1,860 per site visit against ₹640 on Meta. Move the budget and you get roughly <b>11 more visits</b> this month for the same money.',
        acts:['Shift budget','See report'] }
    ], 'Live');

    var todo = H.card('Today · 18 August', '6 tasks',
      '<div class="card-b">' + H.tl([
        { t:'10:00 · Sales review — Skies tower B', d:'Rahul, Priya, Kunal · closing plan for 6 hot leads' },
        { t:'11:30 · Site visit — Rachana Shah', d:'Greens 2 BHK · cab pickup from Adajan · unconfirmed' },
        { t:'12:30 · Site visit — Devang Bhatt', d:'Skies 4 BHK · with wife and father' },
        { t:'15:00 · Demand run — 18th slab certified', d:'32 buyers · ₹5.9 Cr of demands to raise' },
        { t:'16:30 · CP meeting — Skyline Realty', d:'Q3 brokerage slab and Skies inventory release' },
        { t:'18:00 · Approve brokerage payouts', d:'₹4.2 L to 3 partners · TDS applied' }
      ]) + '</div>');

    var inv = H.card('Live inventory', 'Real time',
      '<div class="card-b">' + H.meters([
        { t:'Anantam Skies · 178 units', r:'68% sold', p:68 },
        { t:'Anantam Greens · 96 units', r:'81% sold', p:81 },
        { t:'Business Park · 44 units', r:'39% sold', p:39 }
      ]) + '<div class="hr"></div>' +
      '<div style="display:flex;gap:14px;flex-wrap:wrap;font-size:.78rem">' +
        '<span>' + H.pill('54 available','g') + '</span><span>' + H.pill('6 on hold','a') + '</span>' +
        '<span>' + H.pill('118 booked','b') + '</span><span>' + H.pill('94 registered') + '</span>' +
      '</div></div>');

    return head('Hello Kushal 👋',
      'Welcome back. It is <b>' + days[d.getDay()] + ', ' + d.getDate() + ' ' + mons[d.getMonth()] +
      '</b> — here is everything that decides your month, on one screen.',
      ['Download APK', 'New lead', 'Raise demand']) +
      kpis + '<div class="mt">' + kpis2 + '</div>' +
      '<div class="split mt">' + trend + arya + '</div>' +
      '<div class="split mt">' + attention + '<div>' + todo + '<div class="mt">' + inv + '</div></div></div>' +
      '<p class="disc">Sample data shown. A real build carries your projects, your units, your buyers and your numbers.</p>';
  };

  /* ================= TASK & PROJECT ================= */
  V.taskboard = function(){
    var H = h();
    var cols = [
      { t:'To do', n:7, cards:[
        { t:'Raise 18th slab demands', d:'32 buyers · ₹5.9 Cr', p:['Finance','Today'], tone:'r' },
        { t:'Shoot February site photos', d:'Skies tower B · for buyer app', p:['Marketing'] },
        { t:'Renew RERA quarterly filing', d:'Greens phase 2 · due 30 Aug', p:['Compliance','5 days'], tone:'a' }
      ] },
      { t:'In progress', n:5, cards:[
        { t:'Close Nikunj Patel — B-1104', d:'Token expected today', p:['Rahul','Hot'], tone:'g' },
        { t:'CP agreement — Skyline Realty', d:'Q3 slab revision', p:['Legal'] }
      ] },
      { t:'Waiting on buyer', n:4, cards:[
        { t:'Jayesh Kansara payment', d:'₹18.4 L overdue 22 days', p:['Recovery'], tone:'r' },
        { t:'Bhavna Joshi loan file', d:'HDFC asked for ITR', p:['Finance'] }
      ] },
      { t:'Review', n:3, cards:[
        { t:'Agreement draft — A-0806', d:'Sent to advocate 16 Aug', p:['Legal'] },
        { t:'Business Park price revision', d:'₹64L → ₹67L entry', p:['MD approval'], tone:'a' }
      ] },
      { t:'Done', n:12, cards:[
        { t:'Registered C-0511', d:'Sanjay Modi · stamp duty paid', p:['Closed'], tone:'g' },
        { t:'Meta campaign relaunch', d:'₹640 per visit', p:['Marketing'] }
      ] }
    ];
    var board = '<div class="kan">' + cols.map(function(c){
      return '<div class="kcol"><h4>' + H.e(c.t) + '<span>' + c.n + '</span></h4>' +
        c.cards.map(function(k){
          return '<div class="kcard"><div class="t">' + H.e(k.t) + '</div>' +
            '<div class="d">' + H.e(k.d) + '</div><div class="f">' +
            k.p.map(function(p, i){ return H.pill(p, i === 1 ? (k.tone || 'b') : ''); }).join('') +
            '</div></div>';
        }).join('') + '</div>';
    }).join('') + '</div>';

    return head('Taskboard', 'Drag-style board across the whole company — sales, finance, legal, site and marketing in one place.',
      ['New task', 'Filter', 'My tasks only']) + board +
      '<div class="mt2">' + h().note('<b>What is new:</b> every task can be born from the CRM itself. A demand raised, a hold expiring, a snag logged by a buyer or an AI alert all create the task automatically — with the right owner and the right deadline. Nobody has to remember to type it in.') + '</div>';
  };

  V.tasks = function(){
    var H = h();
    var rows = [
      ['Raise 18th slab demands', 'Finance · Dhara Sanghvi', 'Today', H.pill('High','r'), '32 buyers · ₹5.9 Cr'],
      ['Close Nikunj Patel — B-1104', 'Sales · Rahul Mehta', 'Today', H.pill('High','r'), 'Token ₹1 L expected'],
      ['Chase Jayesh Kansara payment', 'Recovery · Vishal', 'Overdue 3 days', H.pill('Critical','r'), '₹18.4 L · 3rd demand'],
      ['CP agreement — Skyline Realty', 'Legal · Parth', '21 Aug', H.pill('Medium','a'), 'Q3 brokerage slab'],
      ['February site photos — Skies', 'Marketing · Meera', '22 Aug', H.pill('Medium','a'), 'For the buyer app'],
      ['RERA quarterly filing — Greens', 'Compliance · Parth', '30 Aug', H.pill('Medium','a'), 'Phase 2'],
      ['Business Park price revision', 'MD approval', '25 Aug', H.pill('Low'), '₹64L → ₹67L entry'],
      ['Bhavna Joshi loan file — ITR', 'Finance · Dhara Sanghvi', '20 Aug', H.pill('Medium','a'), 'HDFC query'],
      ['Snag closure — G-208 bathroom', 'Site · R. Makwana', '19 Aug', H.pill('High','r'), 'Raised by buyer in app']
    ].map(function(r){
      return [H.two(r[0], r[1]), r[2], r[3], r[4], '<button class="btn btn-line btn-sm">Open</button>'];
    });
    return head('Tasks', 'The same work as the board, in a list you can sort, filter and export.',
      ['New task', 'Export CSV']) +
      H.card('All open tasks', '9 of 31 shown',
        '<div class="card-b flush">' + H.table(['Task', 'Due', 'Priority', 'Detail', { t:'', num:true }], rows) + '</div>');
  };

  V.daily = function(){
    var H = h();
    return head('Daily View', 'What each person is actually doing today — the screen a sales head opens at 9am.',
      ['Today', 'Pick a date']) +
      H.kpi([
        { k:'Calls logged today', v:'64', t:'b', d:'Target 80 · 6 executives' },
        { k:'Site visits done', v:'3 of 5', t:'ac', d:'2 no-shows flagged yesterday' },
        { k:'Cost sheets sent', v:'11', t:'g', d:'4 opened more than twice' },
        { k:'Bookings today', v:'1', t:'g', d:'₹1.61 Cr · B-1204' }
      ]) +
      '<div class="split mt">' +
      H.card('Executive day — live', 'Auto-logged from the field app',
        '<div class="card-b flush">' + H.table(
          ['Executive', 'Calls', 'Visits', 'Cost sheets', { t:'Pipeline', num:true }, { t:'Now', num:true }],
          [
            [H.who('Rahul Mehta','Skies + Greens'), '18', '2', '4', '₹4.2 Cr', H.pill('On site','g')],
            [H.who('Priya Nair','Skies'), '14', '1', '3', '₹2.8 Cr', H.pill('On call','b')],
            [H.who('Kunal Doshi','Business Park'), '11', '0', '2', '₹1.9 Cr', H.pill('In office')],
            [H.who('Vishal Rathod','Recovery desk'), '13', '—', '—', '₹1.37 Cr due', H.pill('On call','b')],
            [H.who('Meera Thakkar','Marketing + inbound'), '8', '0', '2', '—', H.pill('In office')]
          ]) + '</div>') +
      H.ai('Arya reads the day', [
        { t:'Kunal has made no site visits in 6 days', d:'Business Park enquiries are being answered but not converted to visits. His visit-to-lead ratio has fallen from 34% to 9%.' },
        { t:'Rahul is your closer', d:'He converts 1 in 4 site visits. Route the high-score Skies leads to him — his queue has room for 3 more today.' },
        { t:'Call volume dips after 4pm', d:'Only 11% of calls happen after 4pm, yet 38% of answered calls happen then. There is a free hour of pipeline every day.' }
      ], 'Insight') + '</div>';
  };

  V.projects = function(){
    var H = h();
    return head('Projects', 'Not software projects — your actual buildings, with the money and the milestones attached.',
      ['New project', 'RERA filings']) +
      '<div class="grid g3">' +
      [
        { n:'Anantam Skies', l:'Vesu, Surat · 178 units · RERA PR/GJ/SURAT/2024/01847',
          p:62, s:'68% sold · ₹141 Cr booked', m:'Slab 21 of 34 cast · possession Dec 2027', tone:'g' },
        { n:'Anantam Greens', l:'Pal, Surat · 96 units · phase 2 · RERA PR/GJ/SURAT/2023/00914',
          p:88, s:'81% sold · ₹64 Cr booked', m:'Finishing stage · possession Mar 2027', tone:'g' },
        { n:'Anantam Business Park', l:'Ring Road, Surat · 44 units · RERA PR/GJ/SURAT/2025/02611',
          p:24, s:'39% sold · ₹22 Cr booked', m:'Excavation done · possession Jun 2029', tone:'a' }
      ].map(function(p){
        return H.card(p.n, null,
          '<div class="card-b"><div class="sb" style="color:var(--txt3);font-size:.76rem">' + H.e(p.l) + '</div>' +
          '<div class="mt">' + H.meters([{ t:'Construction', r:p.p + '%', p:p.p }]) + '</div>' +
          '<div class="mt" style="font-size:.82rem">' + H.e(p.s) + '</div>' +
          '<div style="font-size:.78rem;color:var(--txt3);margin-top:3px">' + H.e(p.m) + '</div>' +
          '<div class="mt">' + H.pill('On schedule', p.tone) + '</div></div>');
      }).join('') + '</div>' +
      '<div class="mt">' + H.chartCard('Construction spend vs collections · ₹ Cr',
        [ { name:'Collections', data:[3.1,3.4,3.0,3.8,3.6,4.11] },
          { name:'Construction spend', data:[2.6,2.9,3.2,3.1,3.4,3.5] } ],
        ['Mar','Apr','May','Jun','Jul','Aug'], 'The number that decides your cash position', 'Bar') + '</div>' +
      '<div class="mt">' + H.note('<b>Why this matters:</b> most builders only see this at year end from the accountant. Seeing collections track against construction spend every month is what stops a project funding itself out of your pocket.') + '</div>';
  };

  /* ================= CRM ================= */
  V.leads = function(){
    var H = h();
    var rows = [
      ['Nikunj Patel','+91 98•••• ••21','99acres','Skies · 3 BHK','₹1.4–1.6 Cr','Rahul Mehta',92,'Hot','g'],
      ['Devang Bhatt','+91 99•••• ••07','Website','Skies · 4 BHK','₹2.0–2.2 Cr','Rahul Mehta',81,'Visit booked','g'],
      ['Aliya Shaikh','+91 90•••• ••55','Skyline Realty (CP)','Business Park · showroom','₹60–70 L','Kunal Doshi',74,'Quotation','b'],
      ['Rachana Shah','+91 94•••• ••38','Meta Ads','Greens · 2 BHK','₹75–85 L','Priya Nair',66,'No-show risk','a'],
      ['Mehul Trivedi','+91 97•••• ••12','Walk-in','Skies · 3 BHK','₹1.5 Cr','Priya Nair',48,'Hold expiring','a'],
      ['Bhavna Joshi','+91 98•••• ••74','MagicBricks','Greens · 3 BHK','₹95 L–1.1 Cr','Priya Nair',57,'Loan pending','b'],
      ['Paresh Doshi','+91 96•••• ••90','99acres','Skies · 2 BHK','₹55–60 L','Rahul Mehta',31,'Below budget',''],
      ['Hitesh Ramani','+91 93•••• ••42','Skyline Realty (CP)','Skies · 3 BHK','₹1.4–1.7 Cr','Kunal Doshi',69,'New','b'],
      ['Sneha Kapadia','+91 91•••• ••63','Housing.com','Greens · 2 BHK','₹78–88 L','Meera Thakkar',44,'Nurture',''],
      ['Ronak Vaghela','+91 95•••• ••18','Referral · Hiren Vasani','Skies · 4 BHK','₹2.1 Cr','Rahul Mehta',77,'Visit booked','g']
    ].map(function(r){
      return [H.who(r[0], r[1]), H.e(r[2]), H.two(r[3], r[4]), H.e(r[5]), H.score(r[6]), H.pill(r[7], r[8])];
    });
    return head('Leads', 'Every enquiry from every portal, campaign, walk-in, referral and channel partner — in one queue, scored.',
      ['New lead', 'Import', 'Export CSV']) +
      H.kpi([
        { k:'Live leads', v:'112', t:'b', d:'18 new in the last 24 hours' },
        { k:'AI qualified', v:'34', t:'ac', d:'Score 70+ · worth calling today' },
        { k:'Answered in 30 sec', v:'96%', t:'g', d:'By the WhatsApp agent, day or night' },
        { k:'Untouched > 48 hrs', v:'3', t:'r', d:'Auto-escalated to the sales head' }
      ]) +
      '<div class="mt">' + H.chips(['All 112','Hot 34','New today 18','Site visit booked 9','Cold 27','Lost 14'], 0) + '</div>' +
      '<div class="mt">' + H.card('Lead queue', 'Sorted by AI booking probability',
        '<div class="card-b flush">' + H.table(
          ['Lead', 'Source', 'Interest / budget', 'Owner', { t:'Score', num:true }, { t:'Stage', num:true }], rows) +
        '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>The difference:</b> your current CRM stores a lead. This one answers it on WhatsApp within 30 seconds in the buyer\'s language, asks budget, configuration and possession timeline, checks live inventory and books the site visit — then hands your executive a qualified lead instead of a phone number.') + '</div>';
  };

  V.prospects = function(){
    var H = h();
    var rows = [
      ['Nikunj Patel','Skies B-1104 · 3 BHK','2 site visits · loan pre-approved ₹94 L','₹1.58 Cr','Closing', 92,'g'],
      ['Devang Bhatt','Skies B-1604 · 4 BHK','1 visit · returning with family Sunday','₹2.14 Cr','Negotiation', 81,'g'],
      ['Ronak Vaghela','Skies A-0806 · 4 BHK','Referral · visit booked 21 Aug','₹2.11 Cr','Site visit', 77,'b'],
      ['Aliya Shaikh','Business Park Shop 12','CP lead · cost sheet opened 3×','₹68.4 L','Quotation', 74,'b'],
      ['Hitesh Ramani','Skies B-1204 · 3 BHK','CP claim valid to 18 Nov','₹1.61 Cr','Qualified', 69,'b'],
      ['Bhavna Joshi','Greens G-406 · 3 BHK','HDFC asked for ITR · file pending','₹1.02 Cr','Loan stage', 57,'a']
    ].map(function(r){
      return [H.who(r[0]), H.two(r[1], r[2]), r[3], H.pill(r[4], r[6]), H.score(r[5])];
    });
    return head('Prospects', 'Leads that have become real — a unit identified, a price discussed, a decision coming.',
      ['New prospect', 'Export CSV']) +
      H.kpi([
        { k:'Active prospects', v:'26', t:'b', d:'₹31.4 Cr of pipeline value' },
        { k:'In closing', v:'6', t:'g', d:'₹9.8 Cr · decision within 14 days' },
        { k:'Average days to close', v:'41', d:'Down from 58 last quarter' },
        { k:'Win rate', v:'23%', t:'ac', d:'Industry average is 11–14%' }
      ]) +
      '<div class="mt">' + H.card('Pipeline', 'Value-weighted',
        '<div class="card-b flush">' + H.table(
          ['Prospect', 'Unit / status', { t:'Value', num:true }, { t:'Stage', num:true }, { t:'Score', num:true }], rows) +
        '</div>') + '</div>';
  };

  V.visits = function(){
    var H = h();
    var rows = [
      ['Rachana Shah','Greens · 2 BHK','Tomorrow 11:00am','Priya Nair','Cab from Adajan', H.pill('Unconfirmed','a'), '38%'],
      ['Devang Bhatt','Skies · 4 BHK','Tomorrow 12:30pm','Rahul Mehta','Self · with family', H.pill('Confirmed','g'), '91%'],
      ['Aliya Shaikh','Business Park','Tomorrow 4:00pm','Kunal Doshi','CP: Skyline Realty', H.pill('Confirmed','g'), '84%'],
      ['Ronak Vaghela','Skies · 4 BHK','21 Aug 11:00am','Rahul Mehta','Self', H.pill('Confirmed','g'), '88%'],
      ['Sneha Kapadia','Greens · 2 BHK','21 Aug 5:30pm','Meera Thakkar','Cab from Vesu', H.pill('At risk','r'), '24%'],
      ['Hitesh Ramani','Skies · 3 BHK','22 Aug 10:30am','Kunal Doshi','CP: Skyline Realty', H.pill('Confirmed','g'), '79%']
    ].map(function(r){
      return [H.who(r[0]), H.two(r[1], r[4]), r[2], r[3], r[5], '<b>' + r[6] + '</b>'];
    });
    return head('Site Visits <span class="pill ac" style="vertical-align:middle;font-size:.6rem">NEW</span>',
      'The single most important number in real estate sales — and the one nobody measures properly.',
      ['Schedule visit', 'Cab roster', 'Export CSV']) +
      H.kpi([
        { k:'Scheduled this week', v:'38', t:'b', d:'6 tomorrow' },
        { k:'Show rate', v:'61%', t:'a', d:'<span class="up">▲ 14%</span> since the no-show shield' },
        { k:'Visit → booking', v:'1 in 4.3', t:'g', d:'Rahul closes 1 in 3.1' },
        { k:'Predicted no-shows', v:'2', t:'r', d:'Being reconfirmed automatically' }
      ]) +
      '<div class="split mt">' +
      H.card('Upcoming visits', 'With AI show probability',
        '<div class="card-b flush">' + H.table(
          ['Buyer', 'Project / pickup', 'When', 'Executive', 'Status', { t:'Will show', num:true }], rows) + '</div>') +
      H.ai('No-show shield', [
        { t:'Sneha Kapadia will probably not come', d:'24% show probability — booked 9 days ahead, has not opened the last two messages, and cancelled once before. Reconfirm now or offer Sunday.',
          acts:['Reconfirm on WhatsApp','Reschedule'] },
        { t:'Rachana Shah is unconfirmed', d:'38% probability. Cab is booked from Adajan. A voice call converts these 3× better than a message at this stage.',
          acts:['Call now','Send cab details'] },
        { t:'Sunday slots are your gold', d:'Sunday visits convert at 34% against 19% on weekdays — but you only run 4 slots. Adding 2 more is worth roughly 1 extra booking a month.' }
      ], 'Predictive') + '</div>' +
      '<div class="mt">' + H.note('<b>After the visit:</b> your executive speaks a voice note into the field app. AI transcribes it in Gujarati, Hindi or English, extracts the real objection, updates the budget, logs the competitor and schedules the follow-up — without anyone typing a word into the CRM.') + '</div>';
  };

  V.quotations = function(){
    var H = h();
    var rows = [
      ['QT-2026-0418','Nikunj Patel','Skies B-1104 · 3 BHK','₹1,58,55,675','18 Aug', H.pill('Opened 4×','g'), 'Rahul Mehta'],
      ['QT-2026-0417','Aliya Shaikh','Business Park Shop 12','₹68,42,000','17 Aug', H.pill('Opened 3×','g'), 'Kunal Doshi'],
      ['QT-2026-0416','Ronak Vaghela','Skies A-0806 · 4 BHK','₹2,11,40,000','16 Aug', H.pill('Sent','b'), 'Rahul Mehta'],
      ['QT-2026-0415','Bhavna Joshi','Greens G-406 · 3 BHK','₹1,02,18,400','14 Aug', H.pill('Negotiating','a'), 'Priya Nair'],
      ['QT-2026-0414','Sneha Kapadia','Greens G-304 · 2 BHK','₹82,40,000','12 Aug', H.pill('Not opened',''), 'Meera Thakkar'],
      ['QT-2026-0413','Paresh Doshi','Skies C-0402 · 2 BHK','₹94,10,000','09 Aug', H.pill('Lost','r'), 'Rahul Mehta']
    ].map(function(r){ return [ '<b>' + r[0] + '</b>', H.who(r[1]), r[2], r[3], r[4], r[5], r[6] ]; });

    var sheet = H.card('Cost sheet · QT-2026-0418', 'Skies B-1104 · 3 BHK · 1,845 sq ft',
      '<div class="card-b flush">' + H.table(['Component', 'Basis', { t:'Amount', num:true }], [
        ['Base rate','1,845 sq ft × ₹7,100','₹1,30,99,500'],
        ['Floor rise','11 floors × ₹35 / sq ft','₹7,10,325'],
        ['PLC — east + sunset deck','Preferential location charge','₹4,61,250'],
        ['Covered parking','2 slots','₹4,00,000'],
        ['Club & infrastructure','One-time membership','₹3,50,000'],
        ['Less: launch benefit','Applied 18 Aug','<span style="color:var(--green)">− ₹8,00,000</span>'],
        ['<b>Agreement value</b>','','<b>₹1,42,21,075</b>'],
        ['GST @ 5%','On agreement value','₹7,50,600'],
        ['Stamp duty & registration','Gujarat · 4.9% + 1%','₹8,84,000'],
        ['<b>All-inclusive</b>','Nothing added later','<b style="color:var(--ac)">₹1,58,55,675</b>']
      ]) + '</div>');

    return head('Quotations', 'In property a quotation is a cost sheet — and getting it wrong is how builders lose trust and money.',
      ['New cost sheet', 'Templates', 'Export CSV']) +
      H.kpi([
        { k:'Sent this month', v:'47', t:'b', d:'Average build time 20 seconds' },
        { k:'Opened 3+ times', v:'11', t:'g', d:'The strongest buying signal there is' },
        { k:'Converted', v:'11', t:'ac', d:'23% of quotations sent' },
        { k:'Average value', v:'₹1.24 Cr', d:'Across all three projects' }
      ]) +
      '<div class="split mt">' +
      H.card('Recent quotations', 'Open-tracking is on',
        '<div class="card-b flush">' + H.table(
          ['Number', 'Buyer', 'Unit', { t:'Value', num:true }, 'Date', 'Status', 'Owner'], rows) + '</div>') +
      '<div>' + sheet + '<div class="mt">' + H.note('<b>1% TDS (₹1,58,557)</b> under section 194-IA is flagged automatically on every sale above ₹50 lakh — one of the most commonly missed compliance steps in Indian property.') + '</div></div>' +
      '</div>';
  };

  V.bookings = function(){
    var H = h();
    var rows = [
      ['BK-2026-0092','Nikunj Patel','Skies B-1104','₹1.58 Cr','18 Aug 2026','CLP · 9 milestones', H.pill('Token received','g'),'Rahul Mehta'],
      ['BK-2026-0091','Jayesh Kansara','Skies B-0703','₹1.51 Cr','02 Jun 2026','CLP · 9 milestones', H.pill('Payment overdue','r'),'Priya Nair'],
      ['BK-2026-0090','Hiren Vasani','Skies A-0904','₹1.72 Cr','12 Dec 2025','Down payment', H.pill('Registered','b'),'Rahul Mehta'],
      ['BK-2026-0089','Sanjay Modi','Greens C-0511','₹88.4 L','03 Aug 2025','CLP · 7 milestones', H.pill('Registered','b'),'Priya Nair'],
      ['BK-2026-0088','Bhargav Zaveri','Greens G-208','₹79.2 L','19 Nov 2025','Flexi', H.pill('Possession due','a'),'Meera Thakkar'],
      ['BK-2026-0087','Aliya Shaikh','Business Park Shop 12','₹68.4 L','04 Aug 2026','Down payment', H.pill('Agreement pending','a'),'Kunal Doshi']
    ].map(function(r){
      return ['<b>' + r[0] + '</b>', H.who(r[1]), r[2], r[3], r[4], r[5], r[6], r[7]];
    });
    return head('Bookings', 'What your current CRM calls Orders. In property it is the moment a unit stops being inventory and becomes a relationship.',
      ['New booking', 'Booking form', 'Export CSV']) +
      H.kpi([
        { k:'Bookings this month', v:'11', t:'g', d:'₹6.84 Cr of value' },
        { k:'Awaiting agreement', v:'4', t:'a', d:'2 past the 30-day norm' },
        { k:'Registered', v:'94', t:'b', d:'Documentation fully closed' },
        { k:'Cancellations YTD', v:'3', t:'r', d:'1.9% · industry norm is 5–7%' }
      ]) +
      '<div class="mt">' + H.card('All bookings', 'Full audit trail on every row',
        '<div class="card-b flush">' + H.table(
          ['Number', 'Buyer', 'Unit', { t:'Value', num:true }, 'Booked on', 'Payment plan', 'Status', 'Owner'], rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>Auto-generated on booking:</b> booking form, allotment letter, welcome kit, the buyer app login, the payment schedule and the channel-partner brokerage entry — all created from this one record, in your format, with nothing retyped.') + '</div>';
  };

  V.invoices = function(){
    var H = h();
    var rows = [
      ['INV-2026-0311','Nikunj Patel','Booking amount · B-1104','₹11,00,000','₹55,000','18 Aug', H.pill('Paid','g')],
      ['INV-2026-0310','Jayesh Kansara','3rd demand · 18th slab · B-0703','₹18,40,000','₹92,000','27 Jul', H.pill('Overdue 22d','r')],
      ['INV-2026-0309','Aliya Shaikh','Booking amount · Shop 12','₹6,84,000','₹41,040','04 Aug', H.pill('Paid','g')],
      ['INV-2026-0308','Bhavna Joshi','On agreement · G-406','₹15,32,760','₹76,638','29 Jul', H.pill('Part paid','a')],
      ['INV-2026-0307','Bhargav Zaveri','Possession demand · G-208','₹12,40,000','₹62,000','21 Jul', H.pill('Overdue 28d','r')],
      ['INV-2026-0306','Hiren Vasani','Final · A-0904','₹28,70,000','₹1,43,500','12 Jul', H.pill('Paid','g')]
    ].map(function(r){
      return ['<b>' + r[0] + '</b>', H.who(r[1]), r[2], r[3], r[4], r[5], r[6],
        '<button class="btn btn-line btn-sm">Receipt</button>'];
    });
    return head('Invoices', 'GST-compliant demand letters and receipts, raised from real construction milestones — not from memory.',
      ['Raise demand run', 'New invoice', 'Export CSV']) +
      H.kpi([
        { k:'Raised this month', v:'₹4.67 Cr', t:'b', d:'38 invoices' },
        { k:'Collected', v:'₹4.11 Cr', t:'g', d:'88% of demands raised' },
        { k:'Overdue', v:'₹1.37 Cr', t:'r', d:'7 buyers · oldest 28 days' },
        { k:'GST payable', v:'₹23.4 L', t:'a', d:'Filed by the 20th' }
      ]) +
      '<div class="mt">' + H.card('Invoices', 'Every one carries a receipt and a ledger entry',
        '<div class="card-b flush">' + H.table(
          ['Number', 'Buyer', 'Against', { t:'Amount', num:true }, { t:'GST', num:true }, 'Raised', 'Status', { t:'', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>The demand run:</b> mark the 18th slab certified and every buyer on the construction-linked plan gets their demand letter, ledger and payment link at once — 32 invoices, ₹5.9 Cr, in one click instead of three days of typing.') + '</div>';
  };

  V.recovery = function(){
    var H = h();
    var rows = [
      ['Jayesh Kansara','Skies B-0703','₹18,40,000','22 days','₹40,480','2 sent, both ignored', H.pill('High risk','r'), 87],
      ['Bhargav Zaveri','Greens G-208','₹12,40,000','28 days','₹34,720','3 sent · promised 25 Aug', H.pill('High risk','r'), 79],
      ['Bhavna Joshi','Greens G-406','₹7,66,380','9 days','₹7,663','Loan disbursement awaited', H.pill('Explained','a'), 41],
      ['Rutvik Shah','Skies C-1102','₹15,80,000','6 days','₹4,740','1 sent · opened', H.pill('Watch','a'), 55],
      ['Nilesh Bhagat','Greens G-112','₹9,20,000','4 days','₹1,840','Reminder scheduled', H.pill('Watch','a'), 38],
      ['Falguni Mehta','Skies A-0705','₹21,10,000','2 days','—','Auto reminder sent', H.pill('New',''), 22]
    ].map(function(r){
      return [H.who(r[0], r[1]), r[2], r[3], r[4], r[5], r[6], H.score(r[7])];
    });
    return head('Recovery', 'The module that pays for the whole system. Money booked on paper is not money in the bank.',
      ['Run reminder ladder', 'Interest workings', 'Export CSV']) +
      H.kpi([
        { k:'Total overdue', v:'₹1.37 Cr', t:'r', d:'7 buyers' },
        { k:'Interest chargeable', v:'₹1.24 L', t:'a', d:'Most builders never bill this' },
        { k:'Recovered this month', v:'₹64.2 L', t:'g', d:'From 9 overdue accounts' },
        { k:'Average days late', v:'12', d:'Was 27 before the reminder ladder' }
      ]) +
      '<div class="split mt">' +
      H.card('Overdue accounts', 'With AI default risk',
        '<div class="card-b flush">' + H.table(
          ['Buyer / unit', { t:'Amount', num:true }, 'Late by', { t:'Interest', num:true }, 'Reminders', 'Status', { t:'Risk', num:true }], rows) + '</div>') +
      H.ai('Collections radar', [
        { t:'Jayesh Kansara — act this week', d:'87% default risk. Same pattern as your last 6 defaults: two ignored reminders, no app login for 31 days, and a loan disbursement that stalled. Legal notice draft is ready if the call fails.',
          acts:['Call now','Draft notice'] },
        { t:'Reminder ladder drafted', d:'Day 3 gentle WhatsApp → day 7 call task → day 14 formal letter with interest → day 21 escalation. Written in Gujarati, Hindi and English. Approve once and it runs itself.',
          acts:['Approve & run','Edit ladder'] },
        { t:'₹1.24 L of interest is being left on the table', d:'Your agreement allows 18% per annum on delayed payments. It has been charged in 2 of 14 eligible cases this year — usually because nobody calculated it.' }
      ], 'Predictive') + '</div>';
  };

  V.contract = function(){
    var H = h();
    var rows = [
      ['Agreement to Sale','Nikunj Patel · B-1104','Drafted 18 Aug','Advocate review', H.pill('In progress','a'),'₹1.42 Cr'],
      ['Agreement to Sale','Ronak Vaghela · A-0806','Awaiting token','Not started', H.pill('Pending',''),'₹2.11 Cr'],
      ['Sale Deed','Hiren Vasani · A-0904','Registered 12 Dec 2025','Closed', H.pill('Registered','g'),'₹1.72 Cr'],
      ['CP Agreement','Skyline Realty','Q3 slab revision','MD signature', H.pill('In progress','a'),'2% + 0.5%'],
      ['CP Agreement','Grihasthan Consultants','Signed 04 Apr 2026','Active', H.pill('Active','g'),'2%'],
      ['Contractor Agreement','Sagar Infra · Tower B','Signed 11 Jan 2025','Active', H.pill('Active','g'),'₹38.4 Cr'],
      ['Maintenance Agreement','Greens society handover','Draft','Legal', H.pill('Draft',''),'₹2.40/sq ft']
    ].map(function(r){ return [ H.two(r[0], r[1]), r[2], r[3], r[4], r[5] ]; });
    return head('Contract', 'Every agreement in the business, with its stage, its owner and its expiry — instead of a folder nobody opens.',
      ['New contract', 'Templates', 'Export CSV']) +
      H.kpi([
        { k:'Active contracts', v:'38', t:'b', d:'Across buyers, CPs and contractors' },
        { k:'Awaiting signature', v:'5', t:'a', d:'2 older than 30 days' },
        { k:'Expiring in 60 days', v:'3', t:'r', d:'Auto-reminders scheduled' },
        { k:'Registered sale deeds', v:'94', t:'g', d:'All indexed and searchable' }
      ]) +
      '<div class="mt">' + H.card('Contracts', 'Templates auto-fill from the booking record',
        '<div class="card-b flush">' + H.table(
          ['Contract / party', 'Stage', 'With', 'Status', { t:'Value', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>Document generator:</b> booking form, allotment letter, agreement to sale, demand letter, receipt, NOC, cancellation letter and possession letter — all generated pre-filled from the buyer and unit record, in your own format and language.') + '</div>';
  };

  V.partners = function(){
    var H = h();
    var rows = [
      ['Skyline Realty','GJ/CP/2023/0912','34','19','7','21%','₹18.4 L','₹4.2 L', 92,'g'],
      ['Grihasthan Consultants','GJ/CP/2024/1188','28','14','5','18%','₹12.1 L','₹0','', 78,'g'],
      ['Surat Property Hub','GJ/CP/2022/0641','61','12','3','5%','₹7.4 L','₹1.1 L', 34,'a'],
      ['Vraj Realtors','GJ/CP/2025/1902','19','9','3','16%','₹6.8 L','₹0', 71,'g'],
      ['Anmol Estates','GJ/CP/2024/1455','44','6','1','2%','₹2.2 L','₹0', 18,'r']
    ].map(function(r){
      return [H.two(r[0], 'RERA ' + r[1]), r[2], r[3], r[4], '<b>' + r[5] + '</b>', r[6], r[7], H.score(r[8])];
    });
    return head('Channel Partners <span class="pill ac" style="vertical-align:middle;font-size:.6rem">NEW</span>',
      'Brokers bring you clients when they trust your inventory and your payouts. This is how you earn both — and end the ownership arguments.',
      ['Register a CP', 'Release payouts', 'Export CSV']) +
      H.kpi([
        { k:'Registered partners', v:'41', t:'b', d:'14 active this quarter' },
        { k:'Bookings via CPs', v:'34%', t:'ac', d:'₹2.31 Cr of this month' },
        { k:'Brokerage payable', v:'₹41.6 L', t:'a', d:'₹4.2 L due this week' },
        { k:'Lead disputes', v:'0', t:'g', d:'Settled by timestamp, not argument' }
      ]) +
      '<div class="split mt">' +
      H.card('Partner performance', 'Truth score, not lead count',
        '<div class="card-b flush">' + H.table(
          ['Partner', { t:'Leads', num:true }, { t:'Visits', num:true }, { t:'Bookings', num:true },
           { t:'Conv.', num:true }, { t:'Earned', num:true }, { t:'Pending', num:true }, { t:'Score', num:true }], rows) + '</div>') +
      H.ai('Partner truth score', [
        { t:'Anmol Estates is costing you time', d:'44 leads, 1 booking. Their leads consume 9% of your team\'s calling hours and return 2% of bookings. Move them to self-service inventory access only.',
          acts:['Restrict access','See leads'] },
        { t:'Skyline Realty has earned the next launch', d:'21% conversion and a 34-day average close against a 51-day partner average. Give them first access to Business Park phase 2.',
          acts:['Grant early access'] },
        { t:'Surat Property Hub floods, does not convert', d:'61 leads, 5% conversion. 38 of those leads had already enquired directly — the first-claim rule caught every one of them automatically.' }
      ], 'Insight') + '</div>' +
      '<div class="mt">' + H.note('<b>The first-claim rule:</b> when a CP submits a client, the system checks the mobile number against every existing enquiry and stamps the claim with a date and time. Valid for 90 days. The argument about "my client" is settled before it starts — this alone is why good brokers prefer one builder over another.') + '</div>';
  };

})();
