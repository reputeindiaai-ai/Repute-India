/* ============================================================
   PREMIUM LAYER — motion + the live product showcase
   No libraries. Everything degrades safely and respects
   prefers-reduced-motion.
   ============================================================ */
(function(){
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine   = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- 1. split headlines into rising words ----------
     Walks TEXT NODES only, so inline markup like <span class="grad-txt">
     and <br> survive untouched. Splitting the raw HTML string would
     break any tag that contains a space. */
  document.querySelectorAll('[data-split]').forEach(function(el){
    var texts = [];
    (function walk(node){
      for (var i = 0; i < node.childNodes.length; i++){
        var n = node.childNodes[i];
        if (n.nodeType === 3){ if (n.nodeValue.trim()) texts.push(n); }
        else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      }
    })(el);

    texts.forEach(function(node){
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function(part){
        if (!part) return;
        if (!part.trim()){ frag.appendChild(document.createTextNode(part)); return; }
        var wrap = document.createElement('span');
        wrap.className = 'wsplit';
        var inner = document.createElement('i');
        inner.textContent = part;
        wrap.appendChild(inner);
        frag.appendChild(wrap);
      });
      node.parentNode.replaceChild(frag, node);
    });

    el.querySelectorAll('.wsplit').forEach(function(w, i){
      w.querySelector('i').style.transitionDelay = (i * 0.055) + 's';
    });
  });

  /* ---------- 2. one observer drives every reveal ---------- */
  var revealables = document.querySelectorAll('[data-split],[data-rise],[data-stagger],.live-feats');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        if (e.target.hasAttribute('data-split')){
          e.target.querySelectorAll('.wsplit').forEach(function(w){ w.classList.add('in'); });
        } else {
          e.target.classList.add('in');
        }
        io.unobserve(e.target);
      });
    }, { threshold:.15, rootMargin:'0px 0px -8% 0px' });
    revealables.forEach(function(el){ io.observe(el); });
  } else {
    revealables.forEach(function(el){
      el.classList.add('in');
      el.querySelectorAll('.wsplit').forEach(function(w){ w.classList.add('in'); });
    });
  }

  /* ---------- 3. scroll progress bar ---------- */
  var prog = document.createElement('div');
  prog.id = 'prog';
  document.body.appendChild(prog);

  /* ---------- 4. parallax + progress on one scroll handler ---------- */
  var parallax = [].slice.call(document.querySelectorAll('[data-par]'));
  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      var h = document.documentElement.scrollHeight - innerHeight;
      prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
      if (!reduce){
        var vh = innerHeight;
        parallax.forEach(function(el){
          var r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          var mid = (r.top + r.height / 2 - vh / 2) / vh;      // -1 .. 1
          var amt = parseFloat(el.getAttribute('data-par')) || 14;
          el.style.transform = 'translate3d(0,' + (-mid * amt).toFixed(2) + 'px,0)';
        });
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- 5. desktop only: spotlight, magnets, tilt ---------- */
  if (fine && !reduce){
    var spot = document.createElement('div');
    spot.id = 'spot';
    document.body.appendChild(spot);
    document.body.classList.add('spot-on');
    addEventListener('pointermove', function(e){
      spot.style.setProperty('--sx', e.clientX + 'px');
      spot.style.setProperty('--sy', e.clientY + 'px');
    }, { passive:true });

    document.querySelectorAll('.mag').forEach(function(b){
      b.addEventListener('pointermove', function(e){
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * .22;
        var y = (e.clientY - r.top - r.height / 2) * .34;
        b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function(){ b.style.transform = ''; });
    });

    document.querySelectorAll('.tilt').forEach(function(c){
      c.addEventListener('pointermove', function(e){
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        c.style.transform = 'perspective(900px) rotateX(' + (-py * 5).toFixed(2) +
                            'deg) rotateY(' + (px * 6).toFixed(2) + 'deg) translateY(-5px)';
      });
      c.addEventListener('pointerleave', function(){ c.style.transform = ''; });
    });
  }

  /* ============================================================
     6. THE LIVE PRODUCT SHOWCASE
     Real screens from the demos, tappable, right on the homepage.
     ============================================================ */
  var SHOW = {
    gyms: {
      label:'Gym', title:'Members quietly stop coming', full:'showcase/gyms/apps.html',
      prob:'They never cancel — they just stop turning up. The owner finds out at renewal, when it is far too late to save them.',
      feats:[['Churn Radar','names members before they quit'],
             ['AI diet plan','Indian food, their goal, regenerated weekly'],
             ['Consistency rewards','a streak they will not break'],
             ['Owner CRM','collections, dues, trainer performance']],
      home:'home',
      screens:{
        home:{ t:'Hi Rohan 👋', s:'Iron Age Fitness · Vesu', b:[
          {k:'kpi', a:['23 days','Current streak'], c:['-4.2 kg','Since joining']},
          {k:'meter', w:52, l:'Goal · lose 8 kg', r:'52%'},
          {k:'lab', t:'Today'},
          {k:'rows', r:[
            {ic:'🏋️', nm:"Today's workout", sb:'Push day · 6 exercises', go:'work'},
            {ic:'🥗', nm:'Diet plan', sb:'1,850 kcal · 4 meals', go:'diet'},
            {ic:'📈', nm:'My progress', sb:'Weight, strength, measurements', go:'prog'},
            {ic:'🏅', nm:'Rewards', sb:'1,240 points · Silver', go:'rew'}]}
        ]},
        work:{ t:'Today · Push day', s:'Chosen by AI', back:'home', b:[
          {k:'note', t:'You trained legs yesterday, so today is <b>chest, shoulders and triceps</b>. Your bench has stalled for 2 weeks — weight dropped, a set added.'},
          {k:'rows', r:[
            {ic:'1', nm:'Barbell bench press', sb:'4 × 8 · 45 kg', rt:'Start'},
            {ic:'2', nm:'Incline dumbbell press', sb:'3 × 10 · 16 kg'},
            {ic:'3', nm:'Shoulder press', sb:'3 × 10 · 14 kg'},
            {ic:'4', nm:'Lateral raises', sb:'3 × 15 · 6 kg'},
            {ic:'5', nm:'Triceps pushdown', sb:'3 × 12 · 25 kg'}]}
        ]},
        diet:{ t:'Your diet plan', s:'Built by AI for your goal', back:'home', b:[
          {k:'kpi', a:['1,850','kcal target'], c:['128 g','Protein target']},
          {k:'note', t:'Vegetarian · Gujarati home food · budget friendly. Regenerated <b>Monday</b> after you lost 700 g.'},
          {k:'meals', m:[
            {t:'Breakfast · 8:00 am', c:'420 kcal', i:['2 methi thepla with curd','1 boiled egg white','1 glass buttermilk']},
            {t:'Lunch · 1:30 pm', c:'620 kcal', i:['2 phulka, no ghee','Dal + sabzi','Salad and curd']},
            {t:'Dinner · 8:30 pm', c:'630 kcal', i:['Khichdi','150 g paneer bhurji','Vegetable soup']}]}
        ]},
        prog:{ t:'My progress', s:'12 weeks in', back:'home', b:[
          {k:'big', v:'-4.2 kg', l:'78.6 kg today · started 82.8 kg'},
          {k:'lab', t:'Strength'},
          {k:'rows', r:[
            {nm:'Bench press', sb:'Was 35 kg', rt:'45 kg ▲'},
            {nm:'Squat', sb:'Was 50 kg', rt:'70 kg ▲'},
            {nm:'Deadlift', sb:'Was 60 kg', rt:'85 kg ▲'}]},
          {k:'note', t:'You are <b>52% to your goal.</b> At this rate you hit 74 kg by 12 November.'}
        ]},
        rew:{ t:'Rewards', s:'Consistency pays', back:'home', b:[
          {k:'big', v:'23', l:'Day streak · your best is 31'},
          {k:'meter', w:62, l:'1,240 points · Silver', r:'Gold at 2,000'},
          {k:'lab', t:'Redeem'},
          {k:'rows', r:[
            {ic:'🎁', nm:'One free PT session', sb:'800 points', rt:'Claim'},
            {ic:'🎁', nm:'10% off your renewal', sb:'1,500 points'},
            {ic:'🎁', nm:'Free protein shake', sb:'300 points'}]}
        ]}
      }
    },

    salons: {
      label:'Salon', title:'Regulars drift away unnoticed', full:'showcase/salons/apps.html',
      prob:'A client who came every month suddenly has not been in for ten weeks — and nobody at the desk has any way of knowing.',
      feats:[['Lapsed-client radar','spots a broken visit rhythm'],
             ['One-tap rebook','they book at 11pm without calling'],
             ['Package tracking','stops prepaid sessions expiring unused'],
             ['Colour formula on file','the salon owns it, not the stylist']],
      home:'home',
      screens:{
        home:{ t:'Hello Ananya ✨', s:'Bloom Studio · Adajan', b:[
          {k:'kpi', a:['4 left','Facial package'], c:['2,340','Loyalty points']},
          {k:'note', t:'Your usual colour touch-up is due in <b>6 days</b>. Priya has Saturday 4pm free.'},
          {k:'rows', r:[
            {ic:'📅', nm:'Book an appointment', sb:'Service, stylist, time', go:'book'},
            {ic:'🎟️', nm:'My packages', sb:'Facial 6 of 10 used', go:'pack'},
            {ic:'📖', nm:'My visits', sb:'Every service and formula', go:'vis'}]}
        ]},
        book:{ t:'Book an appointment', s:'Saturday · with Priya', back:'home', b:[
          {k:'rows', r:[
            {nm:'Global colour touch-up', sb:'90 min · your usual', rt:'₹3,200'},
            {nm:'Hair spa treatment', sb:'60 min · in package', rt:'Package'},
            {nm:'Cut & blow dry', sb:'45 min', rt:'₹1,100'}]},
          {k:'lab', t:'Available'},
          {k:'note', t:'Priya is your usual stylist and knows your colour formula. <b>4:00 pm</b> is free.'}
        ]},
        pack:{ t:'My packages', s:'Already paid for', back:'home', b:[
          {k:'meter', w:60, l:'Signature facial · 10 sessions', r:'6 used'},
          {k:'rows', r:[
            {nm:'Sessions remaining', sb:'Valid to 12 December', rt:'4'},
            {nm:'You paid', sb:'₹9,000 for 10', rt:'saved ₹3,000'}]},
          {k:'note', t:'Expires in <b>7 weeks</b> with 4 sessions unused — that is ₹3,600 you have already paid. Shall we book them?'}
        ]},
        vis:{ t:'My visits', s:'18 visits with Bloom', back:'home', b:[
          {k:'rows', r:[
            {nm:'Global colour + hair spa', sb:'12 July · Priya', rt:'₹4,400'},
            {nm:'Signature facial', sb:'28 June · Radhika', rt:'Package'},
            {nm:'Cut & blow dry', sb:'14 June · Priya', rt:'₹1,100'}]},
          {k:'lab', t:'On file'},
          {k:'rows', r:[
            {nm:'Colour formula', sb:'6.34 + 7.3 · 30 vol · 35 min', rt:'Saved'},
            {nm:'Allergy note', sb:'Sensitive to ammonia bleach', rt:'⚠️'}]},
          {k:'note', t:'She never has to explain herself again — and will not start over somewhere else.'}
        ]}
      }
    },

    clinics: {
      label:'Clinic', title:'No-shows and forgotten follow-ups', full:'showcase/clinics/apps.html',
      prob:'A booked slot goes empty with no warning, and the patient told to come back in three weeks never does. Both are pure lost revenue.',
      feats:[['Live queue','patients wait at home, not the corridor'],
             ['Recall engine','brings back every overdue follow-up'],
             ['Records forever','no lost prescriptions, no reprints'],
             ['Review recovery','catches an unhappy patient first']],
      home:'home',
      screens:{
        home:{ t:'Hello Rakesh 👋', s:'Sanjeevani Clinic · Piplod', b:[
          {k:'note', t:'Your <b>3-month diabetes review</b> is due in 9 days. Dr. Sheth has Tuesday 11:30 free.'},
          {k:'rows', r:[
            {ic:'⏱️', nm:'Live queue', sb:'You are 3rd · about 22 min', go:'q'},
            {ic:'📄', nm:'My reports', sb:'Prescriptions and tests', go:'rep'},
            {ic:'💊', nm:'My medicines', sb:'4 active · refill in 6 days', go:'med'}]}
        ]},
        q:{ t:'Live queue', s:'Dr. Sheth · today', back:'home', b:[
          {k:'big', v:'3rd', l:'Your position in the queue'},
          {k:'meter', w:64, l:'Estimated wait', r:'~22 min'},
          {k:'rows', r:[
            {ic:'✅', nm:'Token 12', sb:'In consultation now', rt:'Now'},
            {ic:'⏳', nm:'Token 13', sb:'Waiting', rt:'~8 min'},
            {ic:'🔵', nm:'Token 15 — you', sb:'Arrived 11:24', rt:'~22 min'}]},
          {k:'note', t:'Patients wait <b>at home or in the car</b> instead of a crowded corridor.'}
        ]},
        rep:{ t:'My reports', s:'All your records', back:'home', b:[
          {k:'rows', r:[
            {ic:'📄', nm:'Prescription · Dr. Sheth', sb:'14 May · diabetes review', rt:'View'},
            {ic:'🧪', nm:'HbA1c + lipid profile', sb:'14 May · Sanjeevani Lab', rt:'View'},
            {ic:'📄', nm:'Prescription · Dr. Patel', sb:'2 March · viral fever', rt:'View'},
            {ic:'🧾', nm:'Invoice · consultation', sb:'14 May', rt:'₹600'}]},
          {k:'note', t:'Never lost, never reprinted, never a phone call to the desk asking for a copy.'}
        ]},
        med:{ t:'My medicines', s:'4 active', back:'home', b:[
          {k:'rows', r:[
            {ic:'💊', nm:'Metformin 500 mg', sb:'Twice daily after food', rt:'6 days'},
            {ic:'💊', nm:'Glimepiride 1 mg', sb:'Before breakfast', rt:'6 days'},
            {ic:'💊', nm:'Atorvastatin 10 mg', sb:'At night', rt:'12 days'}]},
          {k:'note', t:'Reminder set <b>6 days</b> before they run out. Chronic patients who keep taking their medicines keep coming back.'}
        ]}
      }
    },

    restaurants: {
      label:'Restaurant', title:'You cannot contact a single customer', full:'showcase/restaurants/apps.html',
      prob:'Hundreds eat with you every month and you have no way to reach one of them again. Meanwhile aggregators take 30% and own the relationship.',
      feats:[['Your own customer list','not rented from an aggregator'],
             ['Direct ordering','zero commission on every order'],
             ['Repeat-visit engine','turns a one-time diner into a regular'],
             ['Slow-night filler','fills Tuesday from your own list']],
      home:'home',
      screens:{
        home:{ t:'Welcome back, Jay 👋', s:'Saffron House · Ghod Dod Road', b:[
          {k:'kpi', a:['740','Loyalty points'], c:['3','Visits to free dessert']},
          {k:'note', t:'Midweek treat — <b>20% off Tuesday and Wednesday</b>, just for you.'},
          {k:'rows', r:[
            {ic:'🛵', nm:'Order directly', sb:'No commission · faster', go:'ord'},
            {ic:'🪑', nm:'Book a table', sb:'See live availability', go:'tab'},
            {ic:'🎁', nm:'My loyalty', sb:'740 points · Gold diner', go:'loy'}]}
        ]},
        ord:{ t:'Order directly', s:'Saffron House', back:'home', b:[
          {k:'lab', t:'Your usuals'},
          {k:'rows', r:[
            {nm:'Paneer Tikka Masala', sb:'Ordered 7 times', rt:'₹340'},
            {nm:'Dal Makhani', sb:'Ordered 6 times', rt:'₹280'},
            {nm:'Butter Naan × 4', sb:'Every single time', rt:'₹200'}]},
          {k:'note', t:'Ordering here instead of an aggregator saves the restaurant <b>₹360 on this order</b> — which is why you get the points.'}
        ]},
        tab:{ t:'Book a table', s:'Tonight · 4 guests', back:'home', b:[
          {k:'rows', r:[
            {nm:'7:00 pm', sb:'Garden seating', rt:'Available'},
            {nm:'7:30 pm', sb:'Indoor · AC', rt:'Available'},
            {nm:'8:00 pm', sb:'Fully booked', rt:'Waitlist'}]},
          {k:'note', t:'You are a <b>Gold diner</b> — your table is held 20 minutes instead of 10.'}
        ]},
        loy:{ t:'My loyalty', s:'Gold diner', back:'home', b:[
          {k:'big', v:'740', l:'Points earned with Saffron House'},
          {k:'meter', w:70, l:'3 more visits to a free dessert', r:'7 of 10'},
          {k:'note', t:'Loyalty points only work <b>here.</b> That is the point — the aggregator cannot copy it.'}
        ]}
      }
    }
  };

  var wrapEl = document.getElementById('liveShow');
  if (!wrapEl) return;
  var CUR = 'gyms';

  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function blocks(bs){
    return bs.map(function(b){
      if (b.k === 'kpi') return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:4px 0 12px">' +
        [b.a, b.c].map(function(x){ return '<div style="background:rgba(255,255,255,.045);border:1px solid var(--line);border-radius:11px;padding:10px 11px">' +
          '<div style="font-family:var(--display);font-weight:800;font-size:1.12rem;letter-spacing:-.02em">' + esc(x[0]) + '</div>' +
          '<div style="font-size:.65rem;color:var(--txt3);margin-top:2px">' + esc(x[1]) + '</div></div>'; }).join('') + '</div>';
      if (b.k === 'meter') return '<div style="margin:10px 0 12px"><div style="display:flex;justify-content:space-between;font-size:.71rem;color:var(--txt3);margin-bottom:6px">' +
        '<span>' + esc(b.l) + '</span><span>' + esc(b.r || '') + '</span></div>' +
        '<div class="mmeter"><i style="--w:' + b.w + '%"></i></div></div>';
      if (b.k === 'big')  return '<div class="mbig"><div class="v">' + esc(b.v) + '</div><div class="k">' + esc(b.l) + '</div></div>';
      if (b.k === 'lab')  return '<div class="mlab">' + esc(b.t) + '</div>';
      if (b.k === 'note') return '<div class="mnote">' + b.t + '</div>';
      if (b.k === 'meals') return b.m.map(function(m){
        return '<div class="mmeal"><div class="h"><span class="t">' + esc(m.t) + '</span><span class="c">' + esc(m.c) + '</span></div>' +
          '<ul>' + m.i.map(function(i){ return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>'; }).join('');
      if (b.k === 'rows') return b.r.map(function(r){
        return '<div class="mrow' + (r.go ? ' go" data-go="' + r.go + '' : '') + '">' +
          (r.ic ? '<div class="ic">' + esc(r.ic) + '</div>' : '') +
          '<div class="m"><div class="nm">' + esc(r.nm) + '</div>' +
          (r.sb ? '<div class="sb">' + esc(r.sb) + '</div>' : '') + '</div>' +
          (r.rt ? '<span class="rt">' + esc(r.rt) + '</span>' : '') +
          (r.go ? '<span class="ch">›</span>' : '') + '</div>'; }).join('');
      return '';
    }).join('');
  }

  function draw(){
    var d = SHOW[CUR];
    var panes = Object.keys(d.screens).map(function(id){
      var s = d.screens[id];
      return '<div class="pane' + (id === d.home ? ' on' : '') + '" data-pane="' + id + '">' +
        '<div class="pane-top">' +
        (id !== d.home ? '<div class="pane-back" data-go="' + esc(s.back || d.home) + '">‹</div>' : '') +
        '<div><div class="pane-t">' + esc(s.t) + '</div>' +
        (s.s ? '<div class="pane-s">' + esc(s.s) + '</div>' : '') + '</div></div>' +
        '<div class="pane-body">' + blocks(s.b) + '</div></div>';
    }).join('');

    wrapEl.innerHTML =
      '<div class="live-wrap">' +
        '<div class="live-copy">' +
          '<div class="ind-pills">' + Object.keys(SHOW).map(function(k){
            return '<button data-ind="' + k + '"' + (k === CUR ? ' class="on"' : '') + '>' + esc(SHOW[k].label) + '</button>';
          }).join('') + '</div>' +
          '<h3>' + esc(d.title) + '</h3>' +
          '<p class="prob">' + esc(d.prob) + '</p>' +
          '<div class="live-feats in">' + d.feats.map(function(f){
            return '<div><span class="dot"></span><span><b>' + esc(f[0]) + '</b> — ' + esc(f[1]) + '</span></div>';
          }).join('') + '</div>' +
          '<div style="margin-top:26px"><a class="btn btn-accent btn-arrow mag" href="' + d.full + '">' +
            'Open the full demo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>' +
        '</div>' +
        '<div><div class="dev"><div class="dev-body"><div class="dev-scr">' +
          '<div class="dev-bar"><span>9:41</span><span>●●●  ⌁</span></div>' + panes +
        '</div></div>' +
        '<div class="dev-foot"><span class="taphint"><span class="k">Tap</span> any row — it really works</span></div>' +
        '</div></div>' +
      '</div>';
  }

  wrapEl.addEventListener('click', function(e){
    var pill = e.target.closest('[data-ind]');
    if (pill){ CUR = pill.getAttribute('data-ind'); draw(); return; }
    var go = e.target.closest('[data-go]');
    if (!go) return;
    var target = go.getAttribute('data-go');
    var panes = wrapEl.querySelectorAll('[data-pane]');
    panes.forEach(function(p){ p.classList.toggle('on', p.getAttribute('data-pane') === target); });
    var body = wrapEl.querySelector('.pane.on .pane-body');
    if (body) body.scrollTop = 0;
  });

  draw();
})();
