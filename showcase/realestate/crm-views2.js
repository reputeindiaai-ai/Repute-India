/* ============================================================
   ANANTAM REALTY OS — Inventory, Post-Sale and the AI layer
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

  /* ---------- the unit plan: a real builder's wall chart ---------- */
  var UNIT_DATA = {};
  function statusFor(tower, floor, n){
    var seed = (tower.charCodeAt(0) * 13 + floor * 7 + n * 5) % 17;
    if (floor <= 6) return seed % 5 === 0 ? 'bk' : 'rg';
    if (floor <= 12) return seed % 6 === 0 ? 'av' : (seed % 7 === 0 ? 'hd' : 'bk');
    return seed % 3 === 0 ? 'bk' : (seed % 8 === 0 ? 'hd' : 'av');
  }
  var STATUS_LBL = { av:['Available','g'], hd:['On hold','a'], bk:['Booked','b'], rg:['Registered',''] };

  function towerHtml(t, floors, perFloor){
    var out = '<div class="tower"><div class="tname">Tower ' + t + '</div>';
    for (var f = floors; f >= 1; f--){
      out += '<div class="floor"><span class="fn">' + f + '</span>';
      for (var n = 1; n <= perFloor; n++){
        var id = t + '-' + (f < 10 ? '0' + f : f) + '0' + n;
        var st = statusFor(t, f, n);
        UNIT_DATA[id] = { st:st, f:f, t:t, n:n };
        out += '<button class="unit ' + st + '" data-u="' + id + '" title="' + id + ' · ' + STATUS_LBL[st][0] + '">' +
          id.slice(2) + '</button>';
      }
      out += '</div>';
    }
    return out + '</div>';
  }

  V.pickUnit = function(el){
    var H = h();
    var id = el.getAttribute('data-u');
    var u = UNIT_DATA[id];
    if (!u) return;
    document.querySelectorAll('.unit.cur').forEach(function(x){ x.classList.remove('cur'); });
    el.classList.add('cur');
    var box = document.getElementById('unitdetail');
    if (!box) return;
    var cfg = u.n === 1 ? '3 BHK · 1,845 sq ft' : u.n === 2 ? '3 BHK · 1,760 sq ft' :
              u.n === 3 ? '4 BHK · 2,410 sq ft' : '2 BHK · 1,180 sq ft';
    var rate = 7100 + u.f * 35;
    var area = u.n === 1 ? 1845 : u.n === 2 ? 1760 : u.n === 3 ? 2410 : 1180;
    var base = area * rate;
    var s = STATUS_LBL[u.st];
    var extra = u.st === 'av'
      ? '<div class="mt">' + H.note('This unit has been available for <b>' + (40 + u.f * 3) + ' days</b>. Arya suggests offering the 2-slot parking waiver — it has moved 4 of the last 5 stale units in this floor band.') + '</div>' +
        '<div class="mt"><button class="btn btn-ac btn-sm">Hold for 72 hours</button> <button class="btn btn-line btn-sm">Build cost sheet</button></div>'
      : u.st === 'hd'
      ? '<div class="mt">' + H.note('Held for <b>Mehul Trivedi</b> since 09 Aug. No token received. The 72-hour rule expired <b>6 days ago</b> — two live enquiries want this floor band.') + '</div>' +
        '<div class="mt"><button class="btn btn-ac btn-sm">Release unit</button> <button class="btn btn-line btn-sm">Extend 24h</button></div>'
      : u.st === 'bk'
      ? '<div class="mt">' + H.note('Booked by <b>Jayesh Kansara</b> on 02 Jun 2026. 3 of 9 milestones paid. Next demand ₹18.4 L — <b>overdue 22 days</b>.') + '</div>' +
        '<div class="mt"><button class="btn btn-ac btn-sm">Open buyer</button> <button class="btn btn-line btn-sm">Ledger</button></div>'
      : '<div class="mt">' + H.note('Registered and handed over. Sale deed indexed, TDS 26QB filed, society membership issued.') + '</div>';

    box.innerHTML = '<div class="card-h"><h3>' + id + '</h3><span class="tag">' + s[0] + '</span></div>' +
      '<div class="card-b">' + h().pill(s[0], s[1]) +
      '<div class="mt" style="font-size:.86rem"><b>' + cfg + '</b></div>' +
      '<div style="font-size:.78rem;color:var(--txt3)">Tower ' + u.t + ' · floor ' + u.f + ' · ' +
        (u.n % 2 ? 'east facing' : 'west facing') + (u.f >= 12 ? ' · club level' : '') + '</div>' +
      '<div class="hr"></div>' +
      H.table(['Component', { t:'Amount', num:true }], [
        ['Base rate · ₹' + rate.toLocaleString('en-IN') + ' / sq ft', '₹' + base.toLocaleString('en-IN')],
        ['Floor rise · ' + u.f + ' floors', '₹' + (u.f * 35 * area).toLocaleString('en-IN')],
        ['PLC', '₹' + Math.round(base * 0.035).toLocaleString('en-IN')],
        ['<b>Indicative all-in</b>', '<b style="color:var(--ac)">₹' + Math.round(base * 1.19).toLocaleString('en-IN') + '</b>']
      ]) + extra + '</div>';
  };

  V.unitplan = function(){
    var H = h();
    UNIT_DATA = {};
    var board = '<div class="towers">' + towerHtml('A', 16, 4) + towerHtml('B', 18, 4) + towerHtml('C', 14, 4) + '</div>';
    var legend = '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;font-size:.79rem">' +
      '<span>' + H.pill('Available','g') + '</span><span>' + H.pill('On hold','a') + '</span>' +
      '<span>' + H.pill('Booked','b') + '</span><span>' + H.pill('Registered') + '</span>' +
      '<span style="color:var(--txt3)">Click any unit</span></div>';

    return head('Unit Plan ' + nu(),
      'The wall chart every builder keeps in the sales office — except this one is live, and everybody sees the same truth at the same second.',
      ['Anantam Skies', 'Anantam Greens', 'Business Park']) +
      H.kpi([
        { k:'Total units', v:'178', d:'3 towers · Anantam Skies' },
        { k:'Available', v:'54', t:'g', d:'₹68.2 Cr of sellable value' },
        { k:'On hold', v:'6', t:'a', d:'2 past the 72-hour rule' },
        { k:'Sold', v:'118', t:'b', d:'66% · ₹141 Cr booked' }
      ]) +
      '<div class="split mt">' +
      H.card('Anantam Skies · live unit plan', 'Updated 4 seconds ago',
        '<div class="card-b">' + legend + board + '</div>') +
      '<div class="card" id="unitdetail"><div class="card-h"><h3>Pick a unit</h3></div>' +
      '<div class="card-b" style="color:var(--txt2);font-size:.84rem">Click any flat on the plan to see its configuration, its live price build-up and what the system wants you to do about it.</div></div>' +
      '</div>' +
      '<div class="mt">' + H.note('<b>This one screen ends the two worst problems in a sales office:</b> two executives selling the same flat, and units quietly held for a friend for three weeks. Every hold has a clock and an owner, and an unpaid hold releases itself.') + '</div>';
  };

  V.availability = function(){
    var H = h();
    var rows = [
      ['Anantam Skies','3 BHK · 1,845 sq ft','12','₹1.42 – 1.71 Cr','62 days','Floors 13–18', H.pill('Healthy','g')],
      ['Anantam Skies','4 BHK · 2,410 sq ft','7','₹2.04 – 2.31 Cr','98 days','Corner units', H.pill('Slow','a')],
      ['Anantam Skies','2 BHK · 1,180 sq ft','9','₹88 L – 1.02 Cr','41 days','Tower C', H.pill('Healthy','g')],
      ['Anantam Greens','2 BHK · 1,120 sq ft','6','₹78 – 86 L','34 days','Garden facing', H.pill('Fast','g')],
      ['Anantam Greens','3 BHK · 1,540 sq ft','5','₹95 L – 1.08 Cr','71 days','Phase 2', H.pill('Slow','a')],
      ['Business Park','Showroom · 640 sq ft','9','₹64 – 74 L','126 days','Ground + first', H.pill('Stale','r')],
      ['Business Park','Office · 1,100 sq ft','6','₹92 L – 1.1 Cr','88 days','3rd–6th floor', H.pill('Slow','a')]
    ].map(function(r){ return [H.two(r[0], r[5]), r[1], '<b>' + r[2] + '</b>', r[3], r[4], r[6]]; });

    return head('Availability ' + nu(),
      'Not just what is left — how long it has been left, which is the number that tells you where your money is stuck.',
      ['Export CSV', 'Share with CPs']) +
      H.kpi([
        { k:'Available units', v:'54', t:'g', d:'Across 3 projects' },
        { k:'Sellable value', v:'₹68.2 Cr', t:'b', d:'At current price list' },
        { k:'Average days on market', v:'74', t:'a', d:'Was 91 last quarter' },
        { k:'Stale · over 120 days', v:'9', t:'r', d:'₹6.1 Cr locked up' }
      ]) +
      '<div class="split mt">' +
      H.card('By configuration', 'Days on market is the truth-teller',
        '<div class="card-b flush">' + H.table(
          ['Project / band', 'Configuration', { t:'Left', num:true }, { t:'Price range', num:true },
           { t:'Avg days', num:true }, { t:'Health', num:true }], rows) + '</div>') +
      H.ai('Stale inventory radar', [
        { t:'9 Business Park showrooms are dead stock', d:'126 days on market, 3 enquiries in 60 days. Your per-sq-ft is 11% above two comparable Ring Road projects. A ₹4,000/sq ft correction on the ground floor units alone should clear 5 of them.',
          acts:['Model a price change','See comparables'] },
        { t:'4 BHK corners are priced right but shown wrong', d:'They convert at 31% when shown after the sample flat, and 6% when shown first. Fix the site-visit script, not the price.',
          acts:['Update visit script'] },
        { t:'Tower C 2 BHKs will finish in ~5 weeks', d:'At the current run rate you have 9 left and sell 1.8 a week. Time to open the phase-2 price band before you run out of stock to sell.' }
      ], 'Predictive') + '</div>';
  };

  V.pricelist = function(){
    var H = h();
    var rows = [
      ['3 BHK · 1,845 sq ft','₹7,100','₹35 / floor','East + deck 3.5%','₹2,00,000 / slot','₹3,50,000','₹1.42 Cr'],
      ['3 BHK · 1,760 sq ft','₹7,100','₹35 / floor','West 2.0%','₹2,00,000 / slot','₹3,50,000','₹1.35 Cr'],
      ['4 BHK · 2,410 sq ft','₹7,450','₹40 / floor','Corner 5.0%','₹2,00,000 / slot','₹4,50,000','₹2.04 Cr'],
      ['2 BHK · 1,180 sq ft','₹6,900','₹30 / floor','—','₹1,50,000 / slot','₹2,50,000','₹88 L'],
      ['Greens 2 BHK · 1,120 sq ft','₹6,400','₹25 / floor','Garden 3.0%','₹1,25,000 / slot','₹2,00,000','₹78 L'],
      ['Business Park showroom · 640 sq ft','₹9,800','—','Frontage 6.0%','₹2,50,000 / slot','₹1,50,000','₹64 L']
    ].map(function(r){ return [ '<b>' + r[0] + '</b>', r[1], r[2], r[3], r[4], r[5], '<b style="color:var(--ac)">' + r[6] + '</b>' ]; });

    return head('Price List ' + nu(),
      'One controlled price list. Nobody quotes from a photo of an old sheet on their phone ever again.',
      ['New revision', 'Approval history', 'Export CSV']) +
      H.kpi([
        { k:'Current revision', v:'v11', t:'b', d:'Effective 01 Aug 2026 · MD approved' },
        { k:'Discount authority', v:'2%', t:'a', d:'Above that needs MD approval' },
        { k:'Off-list quotes', v:'0', t:'g', d:'System will not generate one' },
        { k:'Average realisation', v:'₹7,240', d:'Per sq ft · against ₹7,100 list' }
      ]) +
      '<div class="mt">' + H.card('Price list · revision v11', 'Effective 01 August 2026',
        '<div class="card-b flush">' + H.table(
          ['Configuration', { t:'Base rate', num:true }, { t:'Floor rise', num:true }, { t:'PLC', num:true },
           { t:'Parking', num:true }, { t:'Club', num:true }, { t:'From', num:true }], rows) + '</div>') + '</div>' +
      '<div class="grid g2 mt">' +
        H.card('Payment plans', 'Attached to every unit',
          '<div class="card-b">' + H.meters([
            { t:'Construction-linked (CLP) · 9 milestones', r:'64% of buyers', p:64 },
            { t:'Down payment · 8% discount', r:'21% of buyers', p:21 },
            { t:'Flexi 50:50', r:'11% of buyers', p:11 },
            { t:'Subvention (bank-funded)', r:'4% of buyers', p:4 }
          ]) + '</div>') +
        H.card('Approval trail', 'Every revision is signed',
          '<div class="card-b">' + H.tl([
            { t:'v11 · 01 Aug 2026', d:'Skies base ₹6,950 → ₹7,100 · approved by MD' },
            { t:'v10 · 12 May 2026', d:'Business Park frontage PLC introduced' },
            { t:'v9 · 02 Feb 2026', d:'Greens phase 2 opened at ₹6,400' },
            { t:'v8 · 14 Nov 2025', d:'Launch benefit ₹8 L extended to Skies tower B' }
          ]) + '</div>') +
      '</div>';
  };

  V.holds = function(){
    var H = h();
    var rows = [
      ['B-1104','Mehul Trivedi','Priya Nair','09 Aug','72 hours','Expired 6 days ago','₹0', H.pill('Release now','r')],
      ['A-1502','Ronak Vaghela','Rahul Mehta','17 Aug','72 hours','Expires in 9 hours','₹1,00,000', H.pill('Token paid','g')],
      ['C-0803','Falguni Mehta','Priya Nair','16 Aug','48 hours','Expired yesterday','₹0', H.pill('Release now','r')],
      ['Shop 12','Aliya Shaikh','Kunal Doshi','15 Aug','7 days · CP','Expires 22 Aug','₹50,000', H.pill('Token paid','g')],
      ['G-406','Bhavna Joshi','Priya Nair','12 Aug','Loan hold','Extended to 26 Aug','₹1,00,000', H.pill('Approved','b')],
      ['B-1604','Devang Bhatt','Rahul Mehta','18 Aug','72 hours','Expires 21 Aug','₹0', H.pill('Awaiting token','a')]
    ].map(function(r){ return [ '<b>' + r[0] + '</b>', H.who(r[1]), r[2], r[3], r[4], r[5], r[6], r[7] ]; });

    return head('Holds & Blocks ' + nu(),
      'The quiet leak in every sales office — units held on a promise, never released, blocking buyers who are ready.',
      ['New hold', 'Hold policy', 'Export CSV']) +
      H.kpi([
        { k:'Active holds', v:'6', t:'a', d:'₹8.9 Cr of inventory' },
        { k:'Expired, not released', v:'2', t:'r', d:'Blocking 3 live enquiries' },
        { k:'Token received', v:'3 of 6', t:'g', d:'₹2.5 L collected' },
        { k:'Auto-released this month', v:'11', t:'b', d:'4 of them sold within a week' }
      ]) +
      '<div class="mt">' + H.card('Current holds', 'The clock runs whether anyone is watching or not',
        '<div class="card-b flush">' + H.table(
          ['Unit', 'Held for', 'By', 'Since', 'Policy', 'Expiry', { t:'Token', num:true }, { t:'Action', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>The rule that pays for itself:</b> no token in 72 hours and the unit returns to sale automatically, with the executive and the sales head both told. Since this was switched on, 4 of the 11 auto-released units sold within a week — to buyers who had been told they were gone.') + '</div>';
  };

  /* ================= POST-SALE ================= */
  V.psdocs = function(){
    var H = h();
    var rows = [
      ['Nikunj Patel','Skies B-1104','✓','✓','—','—','—', H.pill('Agreement stage','a')],
      ['Aliya Shaikh','Business Park Shop 12','✓','✓','—','—','—', H.pill('Agreement stage','a')],
      ['Jayesh Kansara','Skies B-0703','✓','✓','✓','—','—', H.pill('Registered','b')],
      ['Bhavna Joshi','Greens G-406','✓','✓','✓','—','—', H.pill('Registered','b')],
      ['Hiren Vasani','Skies A-0904','✓','✓','✓','✓','—', H.pill('TDS filed','b')],
      ['Sanjay Modi','Greens C-0511','✓','✓','✓','✓','✓', H.pill('Complete','g')],
      ['Ketan Dave','Greens G-208','✓','✓','✓','✓','—', H.pill('Possession due','a')]
    ].map(function(r){
      return [H.who(r[0], r[1]), r[2], r[3], r[4], r[5], r[6], r[7]];
    });
    return head('Documentation ' + nu(),
      'Booking is not the finish line. Between booking and possession sit seven documents, and buyers judge you on every one of them.',
      ['Generate document', 'Chase pending', 'Export CSV']) +
      H.kpi([
        { k:'Bookings in documentation', v:'27', t:'b', d:'Across 3 projects' },
        { k:'Agreements pending', v:'4', t:'a', d:'2 older than the 30-day norm' },
        { k:'TDS 26QB not filed', v:'3', t:'r', d:'Buyer obligation · we remind them' },
        { k:'Fully closed', v:'94', t:'g', d:'Indexed and searchable' }
      ]) +
      '<div class="mt">' + H.card('Documentation tracker', 'Every stage, every buyer',
        '<div class="card-b flush">' + H.table(
          ['Buyer / unit', 'Booking form', 'Allotment', 'Agreement', 'Registered', 'TDS 26QB', { t:'Stage', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>Why buyers remember this:</b> the buyer app shows them exactly which document is done and which is pending, with a downloadable copy of each. Your office stops being a photocopy counter.') + '</div>';
  };

  V.psloans = function(){
    var H = h();
    var rows = [
      ['Nikunj Patel','HDFC Bank','₹94,00,000','₹0','Pre-approved 17 Aug','Sanction letter awaited', H.pill('In process','a')],
      ['Bhavna Joshi','SBI','₹72,00,000','₹15,32,760','ITR query raised','Finance desk following up', H.pill('Query','r')],
      ['Jayesh Kansara','ICICI Bank','₹1,05,00,000','₹68,00,000','3 disbursements done','4th linked to 18th slab', H.pill('Active','g')],
      ['Ronak Vaghela','LIC Housing','₹1,40,00,000','₹0','File submitted 14 Aug','Valuation scheduled', H.pill('In process','a')],
      ['Aliya Shaikh','Bajaj Finserv','₹48,00,000','₹6,84,000','Commercial loan','Disbursement on agreement', H.pill('Active','g')],
      ['Hiren Vasani','HDFC Bank','₹1,20,00,000','₹1,20,00,000','Fully disbursed','Closed', H.pill('Complete','b')]
    ].map(function(r){ return [ H.who(r[0]), r[1], r[2], r[3], H.two(r[4], r[5]), r[6] ]; });

    return head('Home Loans ' + nu(),
      'A booking that cannot get funded is not a booking. Most builders find out too late — this desk finds out on day three.',
      ['Add loan file', 'Bank panel', 'Export CSV']) +
      H.kpi([
        { k:'Active loan files', v:'19', t:'b', d:'₹14.2 Cr sanctioned' },
        { k:'Disbursed to date', v:'₹9.8 Cr', t:'g', d:'Against certified milestones' },
        { k:'Files with queries', v:'2', t:'r', d:'Both chased today' },
        { k:'Average sanction time', v:'11 days', d:'Panel banks · 19 days off-panel' }
      ]) +
      '<div class="split mt">' +
      H.card('Loan files', 'Disbursement is auto-requested on milestone certification',
        '<div class="card-b flush">' + H.table(
          ['Buyer', 'Lender', { t:'Sanctioned', num:true }, { t:'Disbursed', num:true }, 'Stage', { t:'Status', num:true }], rows) + '</div>') +
      H.ai('Finance desk assistant', [
        { t:'Bhavna Joshi\'s file will stall', d:'SBI has asked for two years of ITR. In 7 of your last 9 SBI cases this query took 14+ days and delayed the demand. Escalate to the relationship manager today.',
          acts:['Escalate','Message buyer'] },
        { t:'Route Nikunj Patel to HDFC', d:'His profile matches 23 approved HDFC files. Average sanction 9 days against 17 at his own bank. He has already been pre-approved — push for the sanction letter.',
          acts:['Send to panel RM'] },
        { t:'₹1.4 Cr of disbursement is claimable now', d:'The 18th slab was certified yesterday. Three lenders can be invoiced immediately — the requests are drafted.',
          acts:['Raise all 3'] }
      ], 'Assist') + '</div>';
  };

  V.pspossession = function(){
    var H = h();
    return head('Possession ' + nu(),
      'The day that decides whether a buyer sends you two more buyers — or a one-star review.',
      ['Schedule handover', 'Snag checklist', 'Export CSV']) +
      H.kpi([
        { k:'Due in 90 days', v:'22', t:'a', d:'Anantam Greens phase 1' },
        { k:'Handed over YTD', v:'41', t:'g', d:'Average 2 days ahead of promise' },
        { k:'Open snags', v:'7', t:'r', d:'Average closure 4.2 days' },
        { k:'Google reviews earned', v:'34', t:'ac', d:'4.7 average · asked at the right moment' }
      ]) +
      '<div class="split mt">' +
      h().card('Handover pipeline', 'Anantam Greens phase 1',
        '<div class="card-b flush">' + h().table(
          ['Buyer / unit', 'Stage', 'Scheduled', { t:'Dues', num:true }, { t:'Status', num:true }],
          [
            [h().who('Ketan Dave','Greens G-208'), 'Final demand raised', '02 Sep', '₹12.4 L', h().pill('Payment pending','r')],
            [h().who('Sanjay Modi','Greens C-0511'), 'Handover done', '11 Aug', '₹0', h().pill('Complete','g')],
            [h().who('Rekha Chauhan','Greens G-114'), 'Snag inspection', '28 Aug', '₹0', h().pill('3 snags open','a')],
            [h().who('Amit Solanki','Greens G-302'), 'Keys ready', '30 Aug', '₹0', h().pill('Scheduled','b')],
            [h().who('Priti Vora','Greens G-407'), 'NOC issued', '05 Sep', '₹2.1 L', h().pill('Payment pending','a')]
          ]) + '</div>') +
      h().ai('Handover intelligence', [
        { t:'Ask Sanjay Modi for the review today', d:'He took possession 7 days ago and rated the handover 5/5 in the app. Days 5–10 after possession is when review requests convert at 61%. The request is drafted.',
          acts:['Send request','Preview'] },
        { t:'Rekha Chauhan is your risk this month', d:'3 open snags, 11 days old, and her app messages have turned short. This is the exact pattern that preceded your two negative Google reviews last year.',
          acts:['Call her','Escalate snags'] },
        { t:'Close snags inside 5 days', d:'Buyers whose snags closed within 5 days left a review 3.4× more often than those who waited 12. Snag speed is a marketing spend, not a maintenance cost.' }
      ], 'Reputation') + '</div>' +
      '<div class="mt">' + h().note('<b>This is our home ground.</b> Repute India began as a Google-reviews and reputation system for Indian businesses. Every handover here becomes a review request at the moment it is most likely to be said yes to — and any negative sentiment reaches you before it reaches the internet.') + '</div>';
  };

  V.pssnags = function(){
    var H = h();
    var rows = [
      ['SNG-0311','Rekha Chauhan','Greens G-114','Bathroom tile hollow · 2 places','07 Aug','11 days','R. Solanki', H.pill('Open','r')],
      ['SNG-0310','Rekha Chauhan','Greens G-114','Kitchen window alignment','07 Aug','11 days','R. Solanki', H.pill('Open','r')],
      ['SNG-0309','Amit Solanki','Greens G-302','Main door lock stiff','14 Aug','4 days','Site team', H.pill('In progress','a')],
      ['SNG-0308','Priti Vora','Greens G-407','Balcony grouting','15 Aug','3 days','Site team', H.pill('In progress','a')],
      ['SNG-0307','Sanjay Modi','Greens C-0511','Geyser point shifted','04 Aug','Closed in 2 days','R. Solanki', H.pill('Closed','g')],
      ['SNG-0306','Ketan Dave','Greens G-208','Paint touch-up · living room','01 Aug','Closed in 3 days','Site team', H.pill('Closed','g')]
    ].map(function(r){ return [ '<b>' + r[0] + '</b>', H.who(r[1], r[2]), r[3], r[4], r[5], r[6], r[7] ]; });

    return head('Snags & Requests ' + nu(),
      'Raised by the buyer from their own app, with an owner and a clock on every one. No more "I told someone at the site".',
      ['New request', 'Assign', 'Export CSV']) +
      H.kpi([
        { k:'Open snags', v:'7', t:'r', d:'2 older than 10 days' },
        { k:'Average closure', v:'4.2 days', t:'g', d:'Target is 5' },
        { k:'Raised via the app', v:'89%', t:'b', d:'Rest by phone, logged by the desk' },
        { k:'Repeat snags', v:'2', t:'a', d:'Both tile work · same contractor' }
      ]) +
      '<div class="mt">' + H.card('All requests', 'Buyer-visible status at every step',
        '<div class="card-b flush">' + H.table(
          ['Ref', 'Buyer / unit', 'Issue', 'Raised', 'Age', 'Owner', { t:'Status', num:true }], rows) + '</div>') + '</div>' +
      '<div class="mt">' + H.note('<b>Contractor accountability:</b> repeat snags are grouped by trade and contractor. Two hollow-tile complaints from the same contractor in one tower is a retention conversation, not a coincidence — and now you can prove it.') + '</div>';
  };

  /* ================= ARYA AI ================= */
  V.ai = function(){
    var H = h();
    return head('Arya — AI Command Centre ' + nu(),
      'The part no other builder in your city has. Every other system records what already happened; this one tells you what is about to.',
      ['Ask Arya', 'Daily briefing settings']) +
      H.kpi([
        { k:'Leads answered by AI', v:'96%', t:'g', d:'Average reply 30 seconds' },
        { k:'Calls auto-summarised', v:'412', t:'b', d:'This month · Gujarati, Hindi, English' },
        { k:'Actions suggested', v:'186', t:'ac', d:'71% acted on' },
        { k:'Revenue influenced', v:'₹2.9 Cr', t:'g', d:'Bookings traced to an AI prompt' }
      ]) +
      '<div class="split mt">' +
      H.card('This morning\'s briefing', 'Also sent to your WhatsApp at 8:00am',
        '<div class="card-b">' +
        H.note('<b>Good morning Kushal.</b> Yesterday: <b>18 new leads</b>, 5 site visits, <b>1 booking (₹1.61 Cr)</b> and ₹22.4 L collected. Three things need you today.') +
        '<div class="mt">' + H.tl([
          { t:'1 · Nikunj Patel will book this week — or with Sunrise Heights', d:'Booking probability 92%. He enquired with a competitor at 9:14am today. Rahul has been told; you should know.' },
          { t:'2 · ₹1.37 Cr of collections is drifting', d:'Two accounts match your historical default pattern. The reminder ladder is drafted and waiting for one approval.' },
          { t:'3 · You are overpaying 99acres by roughly ₹1.2 L a month', d:'₹1,860 per site visit against ₹640 on Meta. Moving the budget buys about 11 more visits for the same money.' }
        ]) + '</div>' +
        '<div class="hr"></div>' +
        '<div style="font-size:.82rem;color:var(--txt2)">Read it in the car. If you do nothing else today, do number one.</div>' +
        '</div>') +
      H.ai('What Arya is watching', [
        { t:'112 live leads', d:'Scored and re-scored every time the buyer does anything — opens a cost sheet, answers a call, visits the site or goes quiet.' },
        { t:'54 available units', d:'Days on market, enquiry rate and price against comparable projects nearby.' },
        { t:'₹4.67 Cr of raised demands', d:'Payment behaviour matched against the pattern of every past default.' },
        { t:'41 channel partners', d:'Lead quality, conversion and time to close — not lead count.' },
        { t:'5 marketing sources', d:'Cost per lead, per site visit and per booking, recalculated daily.' },
        { t:'Your Google reviews', d:'Sentiment read as they arrive, with a reply drafted for anything below 4 stars.' }
      ], 'Always on') + '</div>';
  };

  V.aiscore = function(){
    var H = h();
    var rows = [
      ['Nikunj Patel',92,'Budget fit 95 · 2 visits · 4 cost-sheet opens · loan approved','Call before 12pm', 'g'],
      ['Devang Bhatt',81,'Budget fit 88 · 1 visit · returning Sunday with family','Confirm the visit', 'g'],
      ['Ronak Vaghela',77,'Referral lead · visit booked · budget verified','Send comparison sheet', 'g'],
      ['Aliya Shaikh',74,'CP lead · cost sheet opened 3× · commercial buyer','Close on parking', 'b'],
      ['Hitesh Ramani',69,'CP claim fresh · budget fit 82 · no visit yet','Book the visit', 'b'],
      ['Bhavna Joshi',57,'Loan query open · engagement falling','Fix the loan file first', 'a'],
      ['Sneha Kapadia',44,'Two missed calls · no app activity in 9 days','Nurture, do not chase', ''],
      ['Paresh Doshi',31,'Budget ₹60 L against ₹88 L entry price','Move to Greens', '']
    ].map(function(r){
      return [H.who(r[0]), H.score(r[1]), r[2], H.pill(r[3], r[4])];
    });
    return head('Lead Scoring ' + nu(),
      'A 9-person team cannot chase 112 leads properly. It can absolutely close the 12 that matter — if it knows which 12.',
      ['How scoring works', 'Export CSV']) +
      H.kpi([
        { k:'Scored leads', v:'112', t:'b', d:'Re-scored on every interaction' },
        { k:'Score 75+', v:'12', t:'g', d:'These are today\'s calls' },
        { k:'Accuracy', v:'81%', t:'ac', d:'Of bookings came from score 70+' },
        { k:'Wasted calls avoided', v:'~340', d:'Per month across the team' }
      ]) +
      '<div class="split mt">' +
      H.card('Scored pipeline', 'Highest first',
        '<div class="card-b flush">' + H.table(
          ['Lead', { t:'Score', num:true }, 'Why the score is what it is', { t:'Next action', num:true }], rows) + '</div>') +
      H.card('What goes into a score', 'Explainable, not a black box',
        '<div class="card-b">' + H.meters([
          { t:'Budget fit against available stock', r:'30%', p:30 },
          { t:'Site visit behaviour', r:'22%', p:22 },
          { t:'Cost sheet opens & app activity', r:'18%', p:18 },
          { t:'Reply speed and call answers', r:'14%', p:14 },
          { t:'Loan readiness', r:'10%', p:10 },
          { t:'Source quality', r:'6%', p:6 }
        ]) + '<div class="hr"></div>' +
        '<div style="font-size:.82rem;color:var(--txt2)">Every score can be opened to see exactly what moved it. Your sales head can argue with it — and when he is right, it learns.</div></div>') +
      '</div>';
  };

  V.aicalls = function(){
    var H = h();
    var rows = [
      ['Rahul Mehta','Nikunj Patel','6m 12s','Gujarati','Possession timing vs rent agreement','Offer transition scheme', 88],
      ['Priya Nair','Rachana Shah','3m 04s','Hindi','Husband not convinced on location','Invite both on Sunday', 64],
      ['Kunal Doshi','Aliya Shaikh','8m 41s','Gujarati','Parking allocation for showroom','Confirm 2 slots in writing', 79],
      ['Rahul Mehta','Ronak Vaghela','4m 55s','English','Comparing with Shalin Elite','Send comparison sheet', 82],
      ['Priya Nair','Bhavna Joshi','5m 22s','Gujarati','Loan delay anxiety','Escalate to panel RM', 58],
      ['Archi Shah','Jayesh Kansara','2m 11s','Hindi','Cash flow — asked for 30 days','Restructure or notice', 34]
    ].map(function(r){
      return [H.who(r[0]), H.who(r[1]), r[2], r[3], '<b>' + r[4] + '</b>', r[5], H.score(r[6])];
    });
    return head('Call Intelligence ' + nu(),
      'Every sales call transcribed, summarised and filed to the right lead — in Gujarati, Hindi or English. No more "I already told him that."',
      ['Recording policy', 'Export CSV']) +
      H.kpi([
        { k:'Calls processed', v:'412', t:'b', d:'This month · 3 languages' },
        { k:'CRM notes written by AI', v:'100%', t:'g', d:'Executives type nothing' },
        { k:'Objections captured', v:'128', t:'ac', d:'Grouped into 9 recurring themes' },
        { k:'Average pitch score', v:'71', t:'a', d:'Rahul 88 · lowest 34' }
      ]) +
      '<div class="mt">' + H.card('Recent calls', 'Click any row to read the transcript and hear the recording',
        '<div class="card-b flush">' + H.table(
          ['Executive', 'Buyer', 'Length', 'Language', 'Real objection', 'Suggested move', { t:'Pitch', num:true }], rows) + '</div>') + '</div>' +
      '<div class="grid g2 mt">' +
        H.card('The nine objections you keep losing to', 'Across 412 calls',
          '<div class="card-b">' + H.meters([
            { t:'Possession date too far away', r:'31 calls', p:78 },
            { t:'Price per sq ft vs a nearby project', r:'27 calls', p:68 },
            { t:'Parking allocation', r:'19 calls', p:48 },
            { t:'Loan / funding uncertainty', r:'17 calls', p:43 },
            { t:'Spouse or family not convinced', r:'14 calls', p:35 },
            { t:'Waiting for a festival / muhurat', r:'11 calls', p:28 }
          ]) + '</div>') +
        H.ai('Coaching, not surveillance', [
          { t:'Kunal loses on price, every time', d:'In 11 of his 14 lost calls he moved to discount within 90 seconds. Rahul holds value for 4 minutes and closes 3× more. Same script, different training need.' },
          { t:'Nobody is answering the possession objection', d:'It came up 31 times and was answered convincingly 6 times. One prepared answer is worth roughly ₹1 Cr of pipeline.',
            acts:['Draft the answer'] },
          { t:'The best 20 seconds of your month', d:'Rahul\'s opening on the 15th, clipped and ready to play in Monday\'s meeting.', acts:['Play clip'] }
        ], 'Coach') +
      '</div>';
  };

  V.aiwa = function(){
    var H = h();
    var chat = '<div class="card-b" style="max-height:420px;overflow-y:auto">' +
      [
        ['them','Hi, saw the 3 BHK at Anantam Skies on 99acres. Is it still available?','11:42 pm'],
        ['us','Good evening! Yes — we have 12 three-bedroom homes available at Anantam Skies, Vesu. May I ask what budget range you are working with, and roughly when you would want possession?','11:42 pm'],
        ['them','Around 1.5 crore. Possession within 2-3 years is fine.','11:44 pm'],
        ['us','Perfect. Three homes fit that exactly — B-1104 (₹1.58 Cr, east facing with a sunset deck), B-1204 (₹1.61 Cr) and C-1102 (₹1.49 Cr). All with December 2027 possession, RERA registered. Shall I send you the cost sheet for B-1104?','11:44 pm'],
        ['them','Yes please. And can I see it this weekend?','11:46 pm'],
        ['us','Sent 📄 I have Saturday 11:00am or Sunday 4:30pm free with Rahul, our senior consultant. Which suits you? We can also arrange a cab from your area.','11:46 pm'],
        ['them','Sunday 4:30 works.','11:47 pm'],
        ['us','Booked ✅ Sunday, 4:30pm at Anantam Skies, Vesu. Rahul will call you tomorrow to confirm. Location pin and the brochure are on their way. Good night!','11:47 pm']
      ].map(function(m){
        var me = m[0] === 'us';
        return '<div style="display:flex;justify-content:' + (me ? 'flex-end' : 'flex-start') + ';margin-bottom:9px">' +
          '<div style="max-width:76%;padding:9px 13px;border-radius:14px;font-size:.83rem;line-height:1.5;' +
          (me ? 'background:var(--ac-soft);border:1px solid var(--ac);border-bottom-right-radius:4px'
              : 'background:var(--surface3);border:1px solid var(--line);border-bottom-left-radius:4px') + '">' +
          H.e(m[1]) + '<div style="font-size:.66rem;color:var(--txt3);margin-top:4px;text-align:right">' + m[2] + '</div></div></div>';
      }).join('') + '</div>';

    return head('WhatsApp Agent ' + nu(),
      'The single feature that wins the most deals — because 78% of buyers go with whoever replied first, and your competitors reply tomorrow afternoon.',
      ['Edit the script', 'Handover rules', 'Language settings']) +
      H.kpi([
        { k:'Leads answered', v:'96%', t:'g', d:'Of every lead, from every source' },
        { k:'Average first reply', v:'30 sec', t:'ac', d:'Day, night, Sunday, festival' },
        { k:'Site visits booked by AI', v:'23', t:'b', d:'This month, without a human' },
        { k:'Handed to a human', v:'41%', t:'a', d:'The moment it gets serious' }
      ]) +
      '<div class="split mt">' +
      H.card('Real conversation · 99acres lead, 11:42pm', 'Nikunj Patel — who booked B-1104', chat) +
      '<div>' + H.ai('How it protects you', [
        { t:'It never invents inventory', d:'It reads the live unit plan. If B-1104 is held or booked, it will not offer it — the most common and most damaging mistake a human makes at 11pm.' },
        { t:'It never discounts', d:'Prices come from the approved price list only. Anything below the authority limit is handed to a human immediately.' },
        { t:'It hands over cleanly', d:'The moment a buyer negotiates, asks something unusual, or crosses a value threshold, your executive gets the whole conversation with a summary.' },
        { t:'It speaks their language', d:'Gujarati, Hindi, Marathi and English — matched to how the buyer wrote to you.' }
      ], 'Guardrails') +
      '<div class="mt">' + H.note('<b>Show this screen and stop talking.</b> This one conversation — at 11:42pm on a Saturday, with a cost sheet sent and a site visit booked before midnight — is the whole pitch.') + '</div></div>' +
      '</div>';
  };

  V.aireview = function(){
    var H = h();
    return head('Reputation ' + nu(),
      'Where Repute India started. In property, one bad review sits on your project name for years and costs you buyers who never call you at all.',
      ['Request reviews', 'Reply to all', 'Sentiment report']) +
      H.kpi([
        { k:'Google rating', v:'4.7', t:'g', d:'<span class="up">▲ 0.4</span> in 6 months' },
        { k:'Reviews earned', v:'186', t:'b', d:'34 from this year\'s handovers' },
        { k:'Requests sent', v:'62', t:'ac', d:'55% converted to a review' },
        { k:'Negative caught early', v:'9', t:'a', d:'Resolved before going public' }
      ]) +
      '<div class="split mt">' +
      H.card('Recent reviews', 'Sentiment read as they arrive',
        '<div class="card-b flush">' + H.table(
          ['Reviewer', 'What they said', { t:'Rating', num:true }, { t:'Reply', num:true }],
          [
            [H.who('Sanjay Modi','Greens C-0511'), 'Handover was two days early and the snag list was closed in three days. Rare in Surat.', '★ 5', H.pill('Replied','g')],
            [H.who('Hiren Vasani','Skies A-0904'), 'The app showing payment schedule and site photos every month is what made the difference.', '★ 5', H.pill('Replied','g')],
            [H.who('Rekha Chauhan','Greens G-114'), 'Good construction quality but the tile work in the bathroom needed rework twice.', '★ 3', H.pill('Draft ready','a')],
            [H.who('Amit Solanki','Greens G-302'), 'Sales team responded within minutes even at night. Very professional process.', '★ 5', H.pill('Replied','g')],
            [H.who('Nilesh Bhagat','Greens G-112'), 'Possession delayed by a month from what was promised at booking.', '★ 3', H.pill('Needs you','r')]
          ]) + '</div>') +
      H.ai('Reputation engine', [
        { t:'Reply to Rekha Chauhan today', d:'3 stars, tile rework, 11-day open snag. A specific, non-defensive reply plus a closed snag has turned 6 of your last 8 three-star reviews into revisions.',
          acts:['Send draft reply','Escalate snag'] },
        { t:'5 handovers are in the review window', d:'Days 5–10 after possession convert at 61%. Requests are drafted and personalised for each family.',
          acts:['Send all 5','Review each'] },
        { t:'Your reviews are your cheapest marketing', d:'Buyers who mentioned reading your Google reviews before enquiring convert at 29% against 11% for cold portal leads. That is a bigger number than any campaign you run.' }
      ], 'Repute India') + '</div>';
  };

})();
