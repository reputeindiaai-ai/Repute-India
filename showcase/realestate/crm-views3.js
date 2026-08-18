/* ============================================================
   ANANTAM REALTY OS — Account, Reports, HR, Masters, Support
   ============================================================ */
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
  function nu(){ return '<span class="pill ac" style="vertical-align:middle;font-size:.6rem">NEW</span>'; }

  /* ================= ACCOUNT ================= */
  V.gst = function(){
    var H = h();
    return head('GST', 'Property has its own GST traps — 5% on under-construction, nil on ready, and reverse charge on some contractor bills. This keeps them straight.',
      ['File GSTR-1', 'Reconcile 2B', 'Export CSV']) +
      H.kpi([
        { k:'Output GST this month', v:'₹23.4 L', t:'b', d:'On ₹4.67 Cr of demands' },
        { k:'Input credit available', v:'₹8.1 L', t:'g', d:'Contractor and material bills' },
        { k:'Net payable', v:'₹15.3 L', t:'a', d:'Due by the 20th' },
        { k:'Mismatches in 2B', v:'2', t:'r', d:'₹1.4 L · both contractors' }
      ]) +
      '<div class="mt">' + H.card('GST summary · August 2026', 'GSTIN 24AABCA1234F1Z5',
        '<div class="card-b flush">' + H.table(
          ['Head', 'Basis', { t:'Taxable', num:true }, { t:'Rate', num:true }, { t:'GST', num:true }],
          [
            ['Residential · under construction', 'Anantam Skies demands', '₹3,84,00,000', '5%', '₹19,20,000'],
            ['Residential · under construction', 'Anantam Greens demands', '₹52,00,000', '5%', '₹2,60,000'],
            ['Commercial · under construction', 'Business Park demands', '₹26,80,000', '12%', '₹3,21,600'],
            ['Less: input credit', 'Contractor & material bills', '—', '—', '<span style="color:var(--green)">− ₹8,10,000</span>'],
            ['<b>Net payable</b>', 'Due 20 September', '', '', '<b style="color:var(--ac)">₹15,31,600</b>']
          ]) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>Also tracked automatically:</b> 1% TDS under section 194-IA on every sale above ₹50 lakh (the buyer\'s obligation, but your problem when it is missed), TDS on brokerage under 194-H, and stamp duty at Gujarat rates on each agreement.') + '</div>';
  };

  V.bank = function(){
    var H = h();
    return head('BankAccount', 'Including the RERA-designated account — where 70% of every collection legally has to sit.',
      ['Reconcile', 'Add account', 'Export CSV']) +
      H.kpi([
        { k:'RERA escrow · Skies', v:'₹9.42 Cr', t:'g', d:'70% of collections · compliant' },
        { k:'Operating account', v:'₹1.86 Cr', t:'b', d:'Current account · HDFC' },
        { k:'Unreconciled entries', v:'6', t:'a', d:'₹4.1 L · matched by AI, awaiting sign-off' },
        { k:'Auto-matched receipts', v:'94%', t:'ac', d:'UPI and NEFT matched to demands' }
      ]) +
      '<div class="mt">' + H.card('Accounts', 'Every collection lands in the right one',
        '<div class="card-b flush">' + H.table(
          ['Account', 'Bank / purpose', { t:'Balance', num:true }, { t:'Status', num:true }],
          [
            [H.two('Skies RERA Escrow','A/c ••••4187 · designated'), 'HDFC · 70% of Skies collections', '₹9,42,10,400', H.pill('Compliant','g')],
            [H.two('Greens RERA Escrow','A/c ••••2290 · designated'), 'HDFC · 70% of Greens collections', '₹3,18,66,000', H.pill('Compliant','g')],
            [H.two('Operating account','A/c ••••7741'), 'HDFC current · day to day', '₹1,86,40,220', H.pill('Active','b')],
            [H.two('Brokerage payouts','A/c ••••5503'), 'ICICI · CP settlements', '₹48,20,000', H.pill('Active','b')],
            [H.two('Payroll','A/c ••••8814'), 'SBI · salaries and incentives', '₹22,60,000', H.pill('Active','b')]
          ]) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>Why the escrow line matters:</b> RERA requires 70% of every buyer collection to sit in a designated account for that project. Builders get into trouble here not through intent but through bookkeeping. The split happens on receipt, automatically, and is visible on this screen at all times.') + '</div>';
  };

  V.payouts = function(){
    var H = h();
    var rows = [
      ['Skyline Realty','Nikunj Patel · B-1104','₹3,17,100','₹15,855','₹3,01,245','Agreement stage', h().pill('Due 28 Aug','a')],
      ['Skyline Realty','Aliya Shaikh · Shop 12','₹1,02,600','₹5,130','₹97,470','Booking done', h().pill('Due 28 Aug','a')],
      ['Vraj Realtors','Hitesh Ramani · B-1204','₹1,61,000','₹8,050','₹1,52,950','Token received', h().pill('On hold','')],
      ['Grihasthan Consultants','Ronak Vaghela · A-0806','₹4,22,800','₹21,140','₹4,01,660','Awaiting agreement', h().pill('Scheduled','b')],
      ['Skyline Realty','Hiren Vasani · A-0904','₹5,24,000','₹26,200','₹4,97,800','Registered', h().pill('Paid','g')],
      ['Surat Property Hub','Sneha Kapadia · G-304','₹1,64,800','₹8,240','₹1,56,560','Registered', h().pill('Paid','g')]
    ].map(function(r){ return [ h().two(r[0], r[1]), r[2], r[3], r[4], r[5], r[6] ]; });

    return head('Brokerage Payouts ' + nu(),
      'The reason good brokers keep bringing you buyers — or quietly stop.',
      ['Release payouts', 'Slab settings', 'Export CSV']) +
      h().kpi([
        { k:'Payable', v:'₹41.6 L', t:'a', d:'To 14 partners' },
        { k:'Due this week', v:'₹4.2 L', t:'r', d:'3 partners · approve today' },
        { k:'Paid YTD', v:'₹1.42 Cr', t:'g', d:'Average 6 days after milestone' },
        { k:'TDS deducted', v:'₹7.1 L', t:'b', d:'Section 194-H · filed quarterly' }
      ]) +
      '<div class="mt">' + h().card('Brokerage ledger', 'Released automatically once the buyer clears the linked milestone',
        '<div class="card-b flush">' + h().table(
          ['Partner / deal', { t:'Brokerage', num:true }, { t:'TDS', num:true }, { t:'Net', num:true }, 'Trigger', { t:'Status', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + h().note('<b>No more follow-up calls to accounts.</b> The partner sees this same ledger in their own app — what is earned, what is deducted, what is released and when. Transparency here is the cheapest way to get first call on a broker\'s next client.') + '</div>';
  };

  /* ================= REPORTS ================= */
  var REPORTS = {
    create: {
      t:'Create report', s:'Build any report you want from any module — then save it and it runs itself every Monday.',
      kpi:[ { k:'Saved reports', v:'23', t:'b', d:'11 scheduled' },
            { k:'Scheduled to WhatsApp', v:'6', t:'ac', d:'To you and the sales head' },
            { k:'Modules available', v:'14', d:'Every module in this system' },
            { k:'Export formats', v:'CSV, PDF', d:'And print' } ],
      cols:['Saved report','Module','Group by','Schedule','Recipients'],
      rows:[
        ['Weekly sales review','Bookings','Executive','Every Monday 8am','MD, sales head'],
        ['Collections at risk','Recovery','Days overdue','Daily 9am','MD, accounts'],
        ['Source ROI','Marketing','Source','Every Monday 8am','MD, marketing'],
        ['Unit ageing','Inventory','Configuration','1st of month','MD'],
        ['CP performance','Channel partners','Partner','Monthly','MD, sales head'],
        ['Attendance summary','HR','Employee','Monthly','HR, MD']
      ],
      chart:{ t:'Report runs this month', s:[{ name:'Runs', data:[14,19,22,26,31,38] }], l:['Mar','Apr','May','Jun','Jul','Aug'], d:'Bar' },
      group:'Module'
    },
    lead: {
      t:'Lead report', s:'Where your leads come from, who owns them, and what actually happens to them.',
      kpi:[ { k:'Leads in period', v:'531', t:'b', d:'Across 5 sources' },
            { k:'Converted to visits', v:'182', t:'ac', d:'34%' },
            { k:'Converted to bookings', v:'42', t:'g', d:'7.9%' },
            { k:'Cost per booking', v:'₹41,200', t:'a', d:'Blended across sources' } ],
      cols:['Source','Leads','Contacted','Site visits','Bookings','Conversion','Spend','Cost / booking'],
      rows:[
        ['Meta Ads','184','181','71','16','8.7%','₹4,10,000','₹25,625'],
        ['99acres','142','139','38','8','5.6%','₹5,90,000','₹73,750'],
        ['MagicBricks','88','86','24','5','5.7%','₹2,80,000','₹56,000'],
        ['Website (organic)','54','54','23','6','11.1%','₹40,000','₹6,667'],
        ['Channel partners','41','41','19','5','12.2%','₹0','Brokerage only'],
        ['Referrals','22','22','7','2','9.1%','₹1,00,000','₹50,000']
      ],
      chart:{ t:'Leads by source', s:[{ name:'Leads', data:[184,142,88,54,41,22], labels:['Meta','99acres','MagicBricks','Website','CPs','Referral'] }],
              l:['Meta','99acres','MagicBricks','Website','CPs','Referral'], d:'Bar' },
      group:'Source',
      note:'<b>Read the last column, not the first.</b> 99acres gives you the second-most leads and the most expensive bookings. Website and channel-partner leads convert twice as well and cost a fraction. This one table is usually worth ₹2–3 lakh a month to a builder.'
    },
    quotation: {
      t:'Quotation report', s:'Cost sheets sent, opened, negotiated and won — with open-tracking, so you can see intent.',
      kpi:[ { k:'Quotations sent', v:'214', t:'b', d:'In the period' },
            { k:'Opened at least once', v:'187', t:'g', d:'87%' },
            { k:'Opened 3+ times', v:'46', t:'ac', d:'The real buying signal' },
            { k:'Converted', v:'42', t:'g', d:'19.6% of sent' } ],
      cols:['Executive','Sent','Opened','Opened 3+','Converted','Conversion','Avg value'],
      rows:[
        ['Rahul Mehta','68','63','19','18','26.5%','₹1.54 Cr'],
        ['Priya Nair','54','48','12','11','20.4%','₹1.08 Cr'],
        ['Kunal Doshi','41','34','7','5','12.2%','₹78 L'],
        ['Meera Thakkar','29','25','5','4','13.8%','₹84 L'],
        ['AI (auto-sent)','22','17','3','4','18.2%','₹1.21 Cr']
      ],
      chart:{ t:'Quotation conversion by executive', s:[{ name:'Sent', data:[68,54,41,29,22] }, { name:'Converted', data:[18,11,5,4,4] }],
              l:['Rahul','Priya','Kunal','Meera','AI'], d:'Bar' },
      group:'Executive'
    },
    invoice: {
      t:'Invoice report', s:'What was demanded, what came in, and what is still sitting with the buyer.',
      kpi:[ { k:'Demanded in period', v:'₹28.4 Cr', t:'b', d:'214 invoices' },
            { k:'Collected', v:'₹24.9 Cr', t:'g', d:'87.7%' },
            { k:'Outstanding', v:'₹3.5 Cr', t:'r', d:'From 31 buyers' },
            { k:'Average collection days', v:'14', t:'a', d:'Was 27 last year' } ],
      cols:['Month','Invoices','Demanded','Collected','Outstanding','Efficiency'],
      rows:[
        ['March 2026','32','₹4.10 Cr','₹3.72 Cr','₹38 L','90.7%'],
        ['April 2026','36','₹4.64 Cr','₹4.11 Cr','₹53 L','88.6%'],
        ['May 2026','34','₹4.42 Cr','₹4.02 Cr','₹40 L','91.0%'],
        ['June 2026','38','₹5.01 Cr','₹4.38 Cr','₹63 L','87.4%'],
        ['July 2026','36','₹5.56 Cr','₹4.55 Cr','₹1.01 Cr','81.8%'],
        ['August 2026','38','₹4.67 Cr','₹4.11 Cr','₹56 L','88.0%']
      ],
      chart:{ t:'Demanded vs collected · ₹ Cr', s:[{ name:'Demanded', data:[4.10,4.64,4.42,5.01,5.56,4.67] }, { name:'Collected', data:[3.72,4.11,4.02,4.38,4.55,4.11] }],
              l:['Mar','Apr','May','Jun','Jul','Aug'], d:'Area' },
      group:'Month'
    },
    order: {
      t:'Order report', s:'Your bookings — by project, by executive, by month, by payment plan.',
      kpi:[ { k:'Bookings in period', v:'42', t:'g', d:'₹52.1 Cr of value' },
            { k:'Cancellations', v:'3', t:'r', d:'1.9% · industry norm 5–7%' },
            { k:'Average ticket', v:'₹1.24 Cr', t:'b', d:'Up from ₹1.08 Cr' },
            { k:'Best month', v:'July', t:'ac', d:'11 bookings · ₹13.8 Cr' } ],
      cols:['Project','Bookings','Value','Avg ticket','Via CP','Cancellations'],
      rows:[
        ['Anantam Skies','24','₹34.8 Cr','₹1.45 Cr','8','2'],
        ['Anantam Greens','13','₹11.6 Cr','₹89 L','4','1'],
        ['Anantam Business Park','5','₹5.7 Cr','₹1.14 Cr','2','0']
      ],
      chart:{ t:'Bookings by month', s:[{ name:'Bookings', data:[5,6,8,7,9,11] }, { name:'Value ₹ Cr', data:[5.8,7.1,9.4,8.6,13.8,6.84] }],
              l:['Mar','Apr','May','Jun','Jul','Aug'], d:'Line' },
      group:'Project'
    },
    task: {
      t:'Task report', s:'Who is finishing their work and who is quietly not — across every department.',
      kpi:[ { k:'Tasks in period', v:'418', t:'b', d:'Across 6 departments' },
            { k:'Completed on time', v:'82%', t:'g', d:'Target is 85%' },
            { k:'Overdue now', v:'11', t:'r', d:'4 of them critical' },
            { k:'Auto-created by system', v:'196', t:'ac', d:'47% · nobody typed them' } ],
      cols:['Employee','Assigned','Completed','On time','Overdue','On-time rate'],
      rows:[
        ['Rahul Mehta','88','84','79','2','89.8%'],
        ['Priya Nair','76','71','62','3','81.6%'],
        ['Vishal Rathod','64','61','54','1','84.4%'],
        ['Dhara Sanghvi','71','66','55','3','77.5%'],
        ['Kunal Doshi','58','49','38','2','65.5%'],
        ['Meera Thakkar','61','57','51','0','83.6%']
      ],
      chart:{ t:'On-time completion by employee', s:[{ name:'On time %', data:[90,82,84,78,66,84] }],
              l:['Rahul','Priya','Vishal','Dhara','Kunal','Meera'], d:'Bar' },
      group:'Employee'
    },
    attendance: {
      t:'Attendance report', s:'The report you already run today — same shape, same filters, same exports.',
      kpi:[ { k:'Employees', v:'14', t:'b', d:'Office and site' },
            { k:'Total hours', v:'2,184.40', d:'In the period' },
            { k:'Complete days', v:'241', t:'g', d:'Of 252 working days' },
            { k:'Field check-ins', v:'188', t:'ac', d:'GPS-stamped from the app' } ],
      cols:['Employee','Department','Punches','Complete days','Hours','Field visits'],
      rows:[
        ['Rahul Mehta','Sales','22','21','172.40','41'],
        ['Priya Nair','Sales','22','20','164.10','33'],
        ['Kunal Doshi','Sales','21','19','151.76','18'],
        ['Vishal Rathod','Recovery','22','22','176.20','6'],
        ['Dhara Sanghvi','Accounts','22','21','168.90','0'],
        ['Parth Gandhi','Accounts','20','18','142.76','2'],
        ['Meera Thakkar','Marketing','22','20','158.30','9'],
        ['R. Makwana','Site','24','23','193.50','79']
      ],
      chart:{ t:'Hours by employee', s:[{ name:'Hours', data:[172,164,152,176,169,143,158,194] }],
              l:['Rahul','Priya','Kunal','Vishal','Dhara','Parth','Meera','Makwana'], d:'Bar' },
      group:'Employee',
      note:'<b>What is added:</b> a sales executive\'s attendance now includes GPS-stamped site-visit check-ins from the field app. You can finally tell the difference between someone who was out of office and someone who was out selling.'
    },
    roi: {
      t:'Source ROI report ' + '<span class="pill ac" style="font-size:.6rem">NEW</span>',
      s:'The report that decides your marketing budget — spend against site visits and bookings, per source.',
      kpi:[ { k:'Total spend', v:'₹14.2 L', t:'b', d:'In the period' },
            { k:'Cost per site visit', v:'₹780', t:'ac', d:'Blended · Meta ₹640, 99acres ₹1,860' },
            { k:'Cost per booking', v:'₹41,200', t:'a', d:'Against ₹1.24 Cr average ticket' },
            { k:'Best source', v:'Website', t:'g', d:'11.1% conversion, ₹6,667 per booking' } ],
      cols:['Source','Spend','Leads','Cost / lead','Site visits','Cost / visit','Bookings','Cost / booking'],
      rows:[
        ['Meta Ads','₹4,10,000','184','₹2,228','71','₹5,775','16','₹25,625'],
        ['99acres','₹5,90,000','142','₹4,155','38','₹15,526','8','₹73,750'],
        ['MagicBricks','₹2,80,000','88','₹3,182','24','₹11,667','5','₹56,000'],
        ['Website (SEO)','₹40,000','54','₹741','23','₹1,739','6','₹6,667'],
        ['Referrals','₹1,00,000','22','₹4,545','7','₹14,286','2','₹50,000'],
        ['Channel partners','₹0','41','₹0','19','₹0','5','Brokerage only']
      ],
      chart:{ t:'Cost per booking by source · ₹', s:[{ name:'Cost per booking', data:[25625,73750,56000,6667,50000,41200] }],
              l:['Meta','99acres','MagicBricks','Website','Referral','Blended'], d:'Bar' },
      group:'Source',
      note:'<b>Arya\'s reading:</b> cut ₹2 L a month from 99acres, move ₹1.4 L to Meta and ₹60,000 to website SEO. On the same total spend you should get roughly 11 more site visits and 2 more bookings a month. That is ₹2.4 Cr of extra bookings a year from a budget reshuffle, not a bigger budget.'
    },
    collection: {
      t:'Collection efficiency ' + '<span class="pill ac" style="font-size:.6rem">NEW</span>',
      s:'How fast money actually reaches your bank after you demand it — the number that decides whether a project funds itself.',
      kpi:[ { k:'Collection efficiency', v:'88%', t:'g', d:'Of demands raised in the period' },
            { k:'Average days to pay', v:'14', t:'a', d:'Was 27 before the reminder ladder' },
            { k:'Overdue', v:'₹1.37 Cr', t:'r', d:'7 buyers' },
            { k:'Interest chargeable', v:'₹1.24 L', t:'b', d:'Billed in 2 of 14 eligible cases' } ],
      cols:['Ageing bucket','Buyers','Amount','% of overdue','Recovered last month','Risk'],
      rows:[
        ['0–7 days','3','₹46,10,000','34%','₹31,20,000','Low'],
        ['8–15 days','2','₹23,46,380','17%','₹18,40,000','Medium'],
        ['16–30 days','2','₹30,80,000','22%','₹14,60,000','High'],
        ['31–60 days','0','₹0','0%','₹0','—'],
        ['Over 60 days','0','₹0','0%','₹0','—'],
        ['Loan-linked delays','1','₹7,66,380','6%','₹0','Explained']
      ],
      chart:{ t:'Collection efficiency by month · %', s:[{ name:'Efficiency', data:[91,89,91,87,82,88] }],
              l:['Mar','Apr','May','Jun','Jul','Aug'], d:'Line' },
      group:'Ageing bucket'
    },
    ageing: {
      t:'Unit ageing report ' + '<span class="pill ac" style="font-size:.6rem">NEW</span>',
      s:'How long each unsold unit has been sitting — where your money is quietly locked up.',
      kpi:[ { k:'Available units', v:'54', t:'b', d:'₹68.2 Cr of value' },
            { k:'Average days on market', v:'74', t:'a', d:'Was 91 last quarter' },
            { k:'Over 120 days', v:'9', t:'r', d:'₹6.1 Cr locked up' },
            { k:'Sold within 30 days', v:'18', t:'g', d:'Mostly Greens 2 BHK' } ],
      cols:['Configuration','Available','0–30 days','31–90','91–120','Over 120','Avg days'],
      rows:[
        ['Skies 3 BHK','12','4','6','2','0','62'],
        ['Skies 4 BHK','7','1','2','2','2','98'],
        ['Skies 2 BHK','9','4','4','1','0','41'],
        ['Greens 2 BHK','6','3','3','0','0','34'],
        ['Greens 3 BHK','5','1','2','1','1','71'],
        ['Business Park showroom','9','0','1','2','6','126'],
        ['Business Park office','6','1','2','2','1','88']
      ],
      chart:{ t:'Average days on market by configuration', s:[{ name:'Days', data:[62,98,41,34,71,126,88] }],
              l:['Skies 3BHK','Skies 4BHK','Skies 2BHK','Greens 2BHK','Greens 3BHK','BP shop','BP office'], d:'Bar' },
      group:'Configuration',
      note:'<b>₹6.1 Cr is sitting in 9 units that nobody has asked about in two months.</b> That is not a sales problem — it is a pricing and positioning problem, and it is invisible in every CRM that only counts what sold.'
    }
  };

  V.report = function(key){
    var H = h(), R = REPORTS[key] || REPORTS.lead;
    var cols = R.cols.map(function(c, i){ return i === 0 ? c : { t:c, num:true }; });
    var rows = R.rows.map(function(r){
      return r.map(function(c, i){ return i === 0 ? '<b>' + c + '</b>' : c; });
    });
    return head(R.t, R.s, ['Run report', 'Save & schedule', 'Export CSV', 'Print']) +
      H.kpi(R.kpi) +
      '<div class="mt">' + H.card('', null, H.filterbar(R.group) +
        '<div class="card-b flush">' + H.table(cols, rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.chartCard(R.chart.t, R.chart.s, R.chart.l, 'Bar · Line · Area · Pie · Donut', R.chart.d) + '</div>' +
      (R.note ? '<div class="mt">' + H.note(R.note) + '</div>' : '') +
      '<p class="disc">Every report carries the same controls you use today — date range, group by, CSV, print and five chart styles — and any of them can be scheduled to your WhatsApp every Monday morning.</p>';
  };

  /* ================= HR ================= */
  V.attendance = function(){ return V.report('attendance'); };

  V.team = function(){
    var H = h();
    var rows = [
      ['Rahul Mehta','Senior Sales Consultant','Skies + Greens','18','₹4.2 Cr','26.5%','₹1,84,000'],
      ['Priya Nair','Sales Consultant','Skies','11','₹2.8 Cr','20.4%','₹1,12,000'],
      ['Kunal Doshi','Sales Consultant','Business Park','5','₹1.9 Cr','12.2%','₹58,000'],
      ['Meera Thakkar','Marketing & Inbound','All projects','4','₹84 L','13.8%','₹42,000'],
      ['Vishal Rathod','Recovery Executive','All projects','—','₹64.2 L recovered','—','₹36,000'],
      ['Dhara Sanghvi','Accounts','All projects','—','—','—','—'],
      ['Parth Gandhi','Accounts & Compliance','All projects','—','—','—','—'],
      ['R. Makwana','Site Engineer','Skies tower B','—','—','—','—']
    ].map(function(r){ return [ H.who(r[0], r[1]), r[2], r[3], r[4], r[5], r[6] ]; });
    return head('Team', 'Who does what, and what each of them actually brought in.',
      ['Add employee', 'Roles & access', 'Export CSV']) +
      H.kpi([
        { k:'Team size', v:'14', t:'b', d:'8 office · 6 site' },
        { k:'Sales team', v:'4', t:'ac', d:'38 bookings between them YTD' },
        { k:'Revenue per consultant', v:'₹2.4 Cr', t:'g', d:'Rolling 12 months' },
        { k:'Attrition YTD', v:'1', d:'Against 3 last year' }
      ]) +
      '<div class="mt">' + H.card('The team', 'Access is role-based — a consultant cannot see another consultant\'s pipeline',
        '<div class="card-b flush">' + H.table(
          ['Person', 'Projects', { t:'Bookings', num:true }, { t:'Value', num:true },
           { t:'Conversion', num:true }, { t:'Incentive due', num:true }], rows) + '</div>') + '</div>';
  };

  V.incentives = function(){
    var H = h();
    var rows = [
      ['Rahul Mehta','18 bookings · ₹4.2 Cr','0.4% + slab bonus','₹1,68,000','₹16,000','₹1,84,000', h().pill('Due 31 Aug','a')],
      ['Priya Nair','11 bookings · ₹2.8 Cr','0.4%','₹1,12,000','₹0','₹1,12,000', h().pill('Due 31 Aug','a')],
      ['Kunal Doshi','5 bookings · ₹1.9 Cr','0.3% (below target)','₹57,000','₹1,000','₹58,000', h().pill('Due 31 Aug','a')],
      ['Meera Thakkar','4 bookings · ₹84 L','0.5% inbound','₹42,000','₹0','₹42,000', h().pill('Due 31 Aug','a')],
      ['Vishal Rathod','₹64.2 L recovered','0.5% of recovery','₹32,100','₹3,900','₹36,000', h().pill('Due 31 Aug','a')]
    ].map(function(r){ return [ h().who(r[0], r[1]), r[2], r[3], r[4], '<b>' + r[5] + '</b>', r[6] ]; });
    return head('Incentives ' + nu(),
      'Calculated from the bookings and collections that are already in the system — so nobody has to argue about a spreadsheet at month end.',
      ['Approve all', 'Slab settings', 'Export CSV']) +
      h().kpi([
        { k:'Payable this month', v:'₹4.32 L', t:'a', d:'5 people' },
        { k:'Paid YTD', v:'₹28.6 L', t:'g', d:'Never late' },
        { k:'Top earner', v:'Rahul Mehta', t:'ac', d:'₹1.84 L this month' },
        { k:'Disputes', v:'0', t:'g', d:'The workings are visible to each person' }
      ]) +
      '<div class="mt">' + h().card('Incentive workings', 'Every rupee traceable to a booking or a receipt',
        '<div class="card-b flush">' + h().table(
          ['Person / basis', 'Rate', { t:'Base', num:true }, { t:'Bonus', num:true }, { t:'Total', num:true }, { t:'Status', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + h().note('<b>Incentive on collection, not just booking.</b> The best change a builder can make: pay part of the incentive when the money actually arrives. Suddenly your sales team cares about recovery too — and this screen makes that policy possible to run.') + '</div>';
  };

  /* ================= MASTERS ================= */
  var MASTERS = {
    'Contact':      { c:['Name','Type','Mobile','Email','City','Linked to'], r:[
      ['Nikunj Patel','Buyer','+91 98•••• ••21','nikunj@•••.com','Surat','Skies B-1104'],
      ['Skyline Realty','Channel partner','+91 99•••• ••14','skyline@•••.in','Surat','41 leads'],
      ['Sagar Infra','Contractor','+91 90•••• ••77','sagar@•••.in','Surat','Tower B'],
      ['HDFC — Nilesh Shah','Banker','+91 98•••• ••32','—','Surat','19 loan files'],
      ['Adv. K. Trivedi','Advocate','+91 97•••• ••05','—','Surat','Agreements']] },
    'Company':      { c:['Company','GSTIN','PAN','Type','Projects'], r:[
      ['Anantam Group','24AABCA1234F1Z5','AABCA1234F','Developer','3'],
      ['Anantam Realty LLP','24AABCA9911K1Z2','AABCA9911K','SPV — Business Park','1'],
      ['Anantam Facility Services','24AABCA7742M1Z8','AABCA7742M','Maintenance','2']] },
    'Branch':       { c:['Branch','City','Address','Team','Projects'], r:[
      ['Head Office','Surat','Ring Road','9','All'],
      ['Skies site office','Surat','Vesu','4','Anantam Skies'],
      ['Greens site office','Surat','Pal','3','Anantam Greens'],
      ['Vadodara desk','Vadodara','Alkapuri','2','Enquiries only']] },
    'Customer':     { c:['Customer','Type','Unit','Value','Stage'], r:[
      ['Nikunj Patel','Individual','Skies B-1104','₹1.58 Cr','Agreement'],
      ['Aliya Shaikh','Firm','Business Park Shop 12','₹68.4 L','Agreement'],
      ['Hiren Vasani','Individual','Skies A-0904','₹1.72 Cr','Registered'],
      ['Sanjay Modi','Individual','Greens C-0511','₹88.4 L','Possession done']] },
    'Product':      { c:['Product (unit type)','Project','Carpet','Super built-up','Base rate'], r:[
      ['3 BHK Sky Residence','Anantam Skies','1,190 sq ft','1,845 sq ft','₹7,100'],
      ['4 BHK Sky Residence','Anantam Skies','1,560 sq ft','2,410 sq ft','₹7,450'],
      ['2 BHK Garden Home','Anantam Greens','720 sq ft','1,120 sq ft','₹6,400'],
      ['Showroom · ground','Business Park','520 sq ft','640 sq ft','₹9,800']] },
    'Category':     { c:['Category','Description','Units'], r:[
      ['Residential','Apartments and garden homes','274'],
      ['Commercial','Showrooms and offices','44'],
      ['Plotted','Land parcels — future','0']] },
    'SubCategory':  { c:['Sub category','Under','Units'], r:[
      ['Sky Residence','Residential','178'],['Garden Home','Residential','96'],
      ['Showroom','Commercial','20'],['Office','Commercial','24']] },
    'Unit':         { c:['Unit of measure','Used for','Conversion'], r:[
      ['Square feet','Area — default','1'],['Square yard','Land parcels','9 sq ft'],
      ['Square metre','RERA filings','10.764 sq ft'],['Vigha','Agricultural land (Gujarat)','—']] },
    'Source':       { c:['Source','Category','Leads YTD','Cost per booking'], r:[
      ['Meta Ads','Paid digital','184','₹25,625'],['99acres','Portal','142','₹73,750'],
      ['MagicBricks','Portal','88','₹56,000'],['Website','Organic','54','₹6,667'],
      ['Channel partner','Broker','41','Brokerage'],['Referral','Existing buyer','22','₹50,000'],
      ['Walk-in','Site','36','—'],['Hoarding','Outdoor','19','₹88,000']] },
    'Terms And Condition': { c:['Template','Applies to','Version'], r:[
      ['Standard booking terms','All bookings','v6'],
      ['Construction-linked payment terms','CLP buyers','v4'],
      ['Cancellation & refund policy','All bookings','v3'],
      ['Channel partner terms','CP agreements','v5'],
      ['Possession & maintenance terms','Handover','v2']] },
    'Type':         { c:['Type','Applies to','Records'], r:[
      ['Lead type','Leads','Direct, CP, Referral, Walk-in'],
      ['Payment plan type','Bookings','CLP, Down payment, Flexi, Subvention'],
      ['Charge type','Cost sheet','Base, Floor rise, PLC, Parking, Club'],
      ['Document type','Post-sale','Booking form, Allotment, Agreement, Sale deed'],
      ['Hold type','Inventory','Sales hold, Token hold, Loan hold, Management block']] },
    'Status':       { c:['Status','Module','Colour'], r:[
      ['New / Contacted / Qualified / Visit booked / Negotiation / Booked / Lost','Leads','Pipeline'],
      ['Available / On hold / Booked / Registered','Inventory','Green / Amber / Blue / Grey'],
      ['Raised / Part paid / Paid / Overdue','Invoices','Status colours'],
      ['Open / In progress / Closed','Snags','Age-coded']] },
    'Template':     { c:['Template','Channel','Language','Used'], r:[
      ['First reply to portal lead','WhatsApp','Gu / Hi / En','1,412'],
      ['Cost sheet cover message','WhatsApp','Gu / Hi / En','214'],
      ['Site visit confirmation','WhatsApp','Gu / Hi / En','188'],
      ['Demand letter','Email + WhatsApp','En','214'],
      ['Reminder ladder — day 3 / 7 / 14 / 21','WhatsApp','Gu / Hi / En','96'],
      ['Possession & review request','WhatsApp','Gu / Hi','62'],
      ['Allotment letter','PDF','En','118']] },
    'Country':      { c:['Country','Code','Currency'], r:[['India','IN','INR ₹'],['United Arab Emirates','AE','AED'],['United States','US','USD'],['United Kingdom','GB','GBP']] },
    'State':        { c:['State','Country','Stamp duty','Registration'], r:[
      ['Gujarat','India','4.9%','1.0%'],['Maharashtra','India','6.0%','1.0%'],
      ['Rajasthan','India','5.0%','1.0%'],['Madhya Pradesh','India','7.5%','0.8%']] },
    'City':         { c:['City','State','Projects','Enquiries YTD'], r:[
      ['Surat','Gujarat','3','487'],['Vadodara','Gujarat','0','31'],
      ['Ahmedabad','Gujarat','0','24'],['Navsari','Gujarat','0','9']] },
    'Project':      { c:['Project','Location','RERA number','Units','Possession'], r:[
      ['Anantam Skies','Vesu, Surat','PR/GJ/SURAT/2024/01847','178','Dec 2027'],
      ['Anantam Greens','Pal, Surat','PR/GJ/SURAT/2023/00914','96','Mar 2027'],
      ['Anantam Business Park','Ring Road, Surat','PR/GJ/SURAT/2025/02611','44','Jun 2029']] },
    'Tower':        { c:['Tower','Project','Floors','Units per floor','Total'], r:[
      ['Tower A','Anantam Skies','16','4','64'],['Tower B','Anantam Skies','18','4','72'],
      ['Tower C','Anantam Skies','14','4','56'],['Greens Block G','Anantam Greens','12','8','96']] },
    'Payment Plan': { c:['Plan','Milestones','Discount','Buyers'], r:[
      ['Construction-linked (CLP)','9','—','64%'],
      ['Down payment','2','8%','21%'],
      ['Flexi 50:50','3','4%','11%'],
      ['Subvention (bank-funded)','4','—','4%']] },
    'Charge Head':  { c:['Charge head','Basis','Taxable','Applies to'], r:[
      ['Base rate','Per sq ft','Yes','All units'],['Floor rise','Per floor per sq ft','Yes','Above 3rd floor'],
      ['PLC — east / corner / deck','% of base','Yes','Selected units'],
      ['Covered parking','Per slot','Yes','All units'],['Club membership','One time','Yes','All units'],
      ['Maintenance advance','12 months','Yes','On possession'],
      ['Stamp duty','4.9% Gujarat','No','On agreement'],['Registration','1.0%','No','On agreement']] },
    'Brokerage Slab': { c:['Slab','Project','Rate','Bonus','Payout trigger'], r:[
      ['Standard CP','Anantam Skies','2.0%','—','On agreement'],
      ['Performance CP (3+ / quarter)','Anantam Skies','2.0%','+0.5%','On agreement'],
      ['Standard CP','Anantam Greens','2.5%','—','On agreement'],
      ['Commercial','Business Park','1.5%','+0.5% above ₹1 Cr','On registration'],
      ['Buyer referral','All projects','₹50,000 flat','—','On agreement']] }
  };

  V.master = function(name){
    var H = h();
    var M = MASTERS[name] || { c:['Value','Description'], r:[['—','No sample rows configured']] };
    var isNew = ['Project','Tower','Payment Plan','Charge Head','Brokerage Slab'].indexOf(name) > -1;
    var cols = M.c.map(function(c, i){ return i === 0 ? c : { t:c, num:i > 1 }; });
    var rows = M.r.map(function(r){
      return r.map(function(c, i){ return i === 0 ? '<b>' + c + '</b>' : c; })
        .concat(['<button class="btn btn-line btn-sm">Edit</button>']);
    });
    return head('Master · ' + name + (isNew ? ' ' + nu() : ''),
      isNew ? 'A property master your current system does not have — and cannot run a real estate business without.'
            : 'The same master list you maintain today, with property-specific fields added.',
      ['Add ' + name, 'Import', 'Export CSV']) +
      H.card(name + ' list', M.r.length + ' records',
        '<div class="card-b flush">' + H.table(cols.concat([{ t:'', num:true }]), rows) + '</div>') +
      '<div class="mt">' + H.note('<b>All 16 of your existing masters are here</b> — Contact, Company, Branch, Customer, Product, Category, SubCategory, Unit, Source, Terms And Condition, Type, Status, Template, Country, State and City — plus five property masters: Project, Tower, Payment Plan, Charge Head and Brokerage Slab. Nothing you use today has been dropped.') + '</div>';
  };

  /* ================= SUPPORT & SETTINGS ================= */
  V.support = function(){
    var H = h();
    return head('Support', 'You are not buying software and being left with it. This is what you get after go-live.',
      ['Raise a ticket', 'WhatsApp us']) +
      H.kpi([
        { k:'Average first response', v:'26 min', t:'g', d:'In business hours' },
        { k:'Open tickets', v:'1', t:'b', d:'Feature request' },
        { k:'Uptime last 90 days', v:'99.9%', t:'g', d:'Hosted in India' },
        { k:'Training sessions', v:'Unlimited', t:'ac', d:'For your team, in Gujarati' }
      ]) +
      '<div class="split mt">' +
      H.card('Your tickets', 'Everything logged, nothing lost in WhatsApp',
        '<div class="card-b flush">' + H.table(
          ['Ticket', 'Raised by', 'Type', 'Age', { t:'Status', num:true }],
          [
            [H.two('Add Vadodara to the city master','TKT-0412'), 'Dhara Sanghvi', 'Feature request', '2 days', H.pill('In progress','a')],
            [H.two('Bulk demand run for 18th slab','TKT-0409'), 'Parth Gandhi', 'How-to', '6 days', H.pill('Resolved','g')],
            [H.two('CP login for Vraj Realtors','TKT-0405'), 'Rahul Mehta', 'Access', '9 days', H.pill('Resolved','g')],
            [H.two('Gujarati template for reminders','TKT-0398'), 'Vishal Rathod', 'Feature request', '14 days', H.pill('Shipped','g')]
          ]) + '</div>') +
      H.card('What is included', 'Every month, not as an extra',
        '<div class="card-b">' + H.tl([
          { t:'Onboarding & data migration', d:'Your existing leads, buyers, units and ledgers moved in — we do it, not you.' },
          { t:'Team training in Gujarati or Hindi', d:'On site, as many sessions as your team needs.' },
          { t:'WhatsApp support line', d:'Direct to a human, not a ticket portal.' },
          { t:'Monthly review call', d:'We look at your numbers with you and tune the AI to how you actually sell.' },
          { t:'All updates included', d:'Every feature we build for real estate reaches you automatically.' },
          { t:'Your data is yours', d:'Full export any time, in a format you can open. No lock-in.' }
        ]) + '</div>') + '</div>';
  };

  V.settings = function(){
    var H = h();
    return head('Settings', 'The switches that make this system yours — including the ones that protect you from your own team.',
      ['Save changes']) +
      '<div class="grid g2">' +
      H.card('Business rules', 'The ones that pay for themselves',
        '<div class="card-b flush">' + H.table(['Rule', { t:'Setting', num:true }], [
          ['Unit hold expiry without token', '<b>72 hours</b>'],
          ['Auto-release expired holds', H.pill('On','g')],
          ['Discount authority — consultant', '<b>2%</b>'],
          ['Discount above authority', 'MD approval required'],
          ['CP lead claim validity', '<b>90 days</b>'],
          ['Interest on delayed payment', '<b>18% p.a.</b>'],
          ['RERA escrow split on receipt', '<b>70%</b> · automatic'],
          ['Lead escalation if untouched', '<b>48 hours</b>']
        ]) + '</div>'),
      H.card('AI settings', 'You stay in control of everything it does',
        '<div class="card-b flush">' + H.table(['Setting', { t:'Value', num:true }], [
          ['WhatsApp agent — answer new leads', H.pill('On · 24×7','g')],
          ['Languages', 'Gujarati, Hindi, Marathi, English'],
          ['Agent may quote prices', 'From approved price list only'],
          ['Agent may offer discounts', H.pill('Never','r')],
          ['Hand to human when', 'Negotiation, unusual query, or value > ₹2 Cr'],
          ['Call recording & summaries', H.pill('On · with consent','g')],
          ['Daily briefing to WhatsApp', '<b>8:00 am</b> · MD + sales head'],
          ['Collections reminder ladder', 'Requires one approval per run']
        ]) + '</div>')
      + '</div>' +
      '<div class="grid g2 mt">' +
      H.card('Access & security', 'Role-based, audited',
        '<div class="card-b flush">' + H.table(['Role', { t:'Can see', num:true }], [
          ['Managing Director', 'Everything, including margins and payouts'],
          ['Sales head', 'All leads, inventory, visits, team performance'],
          ['Sales consultant', 'Own leads only · live inventory · price list'],
          ['Accounts', 'Invoices, receipts, GST, banks, payouts'],
          ['Recovery', 'Overdue accounts and ledgers'],
          ['Site engineer', 'Milestones, snags, progress photos'],
          ['Channel partner', 'Released inventory, own leads, own ledger'],
          ['Buyer', 'Own unit, own ledger, own documents']
        ]) + '</div>'),
      H.card('Branding & data', 'It should look like your company, not ours',
        '<div class="card-b">' + H.tl([
          { t:'Your logo, colours and letterheads', d:'On every document, demand letter and cost sheet the system generates.' },
          { t:'Your document formats', d:'We rebuild your existing booking form, allotment letter and agreement templates exactly.' },
          { t:'Hosted in India', d:'Daily backups, encrypted at rest, full audit log of who changed what.' },
          { t:'Export any time', d:'Every table, every document, in CSV and PDF. Your data never becomes hostage.' }
        ]) + '</div>')
      + '</div>' +
      '<p class="disc">This is a front-end demonstration built for Anantam Group as a sample. A real build carries your company name, your projects and your documents.</p>';
  };

})();
