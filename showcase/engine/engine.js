/* ============================================================
   DEMO ENGINE
   ------------------------------------------------------------
   Every industry demo page is a 12-line stub that says which
   industry it is and which page to draw. This file does the rest:
   applies that industry's colours and fonts, then builds the page.

   To add an industry: write one data file + copy the 5 stub pages.
   ============================================================ */

(function(){
  const slug = document.body.getAttribute('data-ind');
  const page = document.body.getAttribute('data-page');
  const D = (window.DEMOS || {})[slug];

  if(!D){
    document.body.innerHTML = '<div style="padding:60px;text-align:center;font-family:sans-serif">' +
      'Demo data for "' + slug + '" was not loaded. Check the data file include.</div>';
    return;
  }

  /* ---------- 1. paint this industry's identity ---------- */
  const t = D.theme;
  const r = document.documentElement.style;
  const set = (k,v)=>{ if(v) r.setProperty(k,v); };
  set('--bg',t.bg); set('--bg2',t.bg2); set('--panel',t.panel); set('--panel2',t.panel2);
  set('--line',t.line); set('--line2',t.line2);
  set('--txt',t.txt); set('--txt2',t.txt2); set('--txt3',t.txt3);
  set('--ac',t.ac); set('--ac2',t.ac2); set('--ac-ink',t.acInk); set('--ac-glow',t.acGlow);
  set('--wash1',t.wash1 || 'transparent'); set('--wash2',t.wash2 || 'transparent');
  if(t.font){ set('--display',t.font); set('--sans',t.font); }
  if(t.fontBody) set('--sans',t.fontBody);
  if(t.fontUrl){
    const l=document.createElement('link'); l.rel='stylesheet'; l.href=t.fontUrl;
    document.head.appendChild(l);
  }
  document.title = D.name + ' — Demo · Repute India AI';

  /* ---------- helpers ---------- */
  const e = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const raw = s => (s==null?'':String(s));            // for strings that intentionally carry <span class="ac">
  const initials = n => String(n||'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  const arr = a => Array.isArray(a) ? a : [];

  const PAGES = [
    ['index.html','Overview'], ['website.html','Website'], ['crm.html','CRM'],
    ['app.html','App'], ['features.html','Features']
  ];

  function chrome(){
    const tabs = PAGES.map(p =>
      '<a href="'+p[0]+'"'+(p[0]===currentFile()?' class="cur"':'')+'>'+e(p[1])+'</a>').join('');
    return '<div class="demoswitch"><div class="inner">' +
      '<a class="ds-home" href="../index.html"><span class="dot"></span> VAULT</a>' +
      '<span class="ds-label">'+e(D.label||D.name)+'</span>' +
      '<div class="tabs">'+tabs+'</div></div></div>';
  }
  function currentFile(){
    const p = location.pathname.split('/').pop();
    return p && p.indexOf('.html')>-1 ? p : 'index.html';
  }
  function footer(){
    return '<footer class="foot"><div class="wrap"><div class="foot-top">' +
      '<div><div class="fb"><span class="dot"></span> Repute India <span class="ac">AI</span></div>' +
      '<p>'+e(D.name)+' demo · sample data, front-end only. Built to show what we would create for this business.</p></div>' +
      '<div class="foot-cols">' +
        '<div><h4>This demo</h4>'+PAGES.slice(1).map(p=>'<a href="'+p[0]+'">'+e(p[1])+'</a>').join('')+'</div>' +
        '<div><h4>Vault</h4><a href="../index.html">All industries</a><a href="../chahal/index.html">Chahal Academy proof</a></div>' +
      '</div></div>' +
      '<div class="foot-bottom">© '+new Date().getFullYear()+' Repute India AI · Showcase Vault</div>' +
      '</div></footer>';
  }

  /* ---------- 2. page builders ---------- */

  function pageIndex(){
    const o = D.overview || {};
    const cards = arr(o.cards).map((c,i)=>
      '<a class="card reveal'+(i%2?' d1':'')+'" href="'+e(c.link)+'"><div class="ic">'+e(c.ic)+'</div>' +
      '<h3 class="h-sm">'+e(c.h)+'</h3><p>'+e(c.p)+'</p><span class="go">'+e(c.go||'Open')+' →</span></a>').join('');
    const kpis = arr(o.kpis).map(k=>
      '<div class="kpibox"><div class="n"><span data-count="'+e(k.n)+'"'+(k.dec?' data-dec="'+e(k.dec)+'"':'') +
      (k.suffix?' data-suffix="'+e(k.suffix)+'"':'')+'>0</span></div><div class="l">'+e(k.l)+'</div></div>').join('');

    return '<section class="hero"><div class="wrap">' +
      '<div class="hero-tag reveal"><span class="pip"></span> '+e(D.heroTag||'Live demo')+'</div>' +
      '<h1 class="h-xl reveal d1">'+raw(D.hero.h1)+'</h1>' +
      '<p class="lead reveal d2" style="max-width:670px;margin-top:22px">'+e(D.hero.lead)+'</p>' +
      '<div class="hero-actions reveal d3">' +
        '<a href="crm.html" class="btn btn-ac btn-arrow">'+e(D.hero.cta1||'Open the CRM')+' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
        '<a href="website.html" class="btn btn-glass">'+e(D.hero.cta2||'See the website')+'</a>' +
      '</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap">' +
      '<div class="sec-head reveal"><span class="eyebrow">What\'s in this demo</span>' +
      '<h2 class="h-lg">Four ways to show the <span class="ac">value.</span></h2>' +
      '<p class="lead">Open any piece during the conversation. Each one is built around how this business actually makes — and loses — its money.</p></div>' +
      '<div class="grid g2">'+cards+'</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap">' +
      '<div class="kpis reveal">'+kpis+'</div>' +
      '<p class="disc reveal">Illustrative figures shown for demonstration.</p></div></section>';
  }

  function pageWebsite(){
    const w = D.website || {};
    const nav = arr(w.nav).map(n=>'<a href="#">'+e(n)+'</a>').join('');
    const stats = arr(w.stats).map(s=>'<div><div class="v">'+e(s.v)+'</div><div class="k">'+e(s.k)+'</div></div>').join('');
    const svcs = arr(w.services).map((s,i)=>
      '<div class="card card-flat reveal'+(i%2?' d1':'')+'"><div class="ic">'+e(s.ic)+'</div>' +
      '<h3 class="h-sm">'+e(s.h)+'</h3><p>'+e(s.p)+'</p>'+(s.price?'<p class="ac mt1" style="font-weight:700">'+e(s.price)+'</p>':'')+'</div>').join('');

    return '<section class="sec"><div class="wrap">' +
      '<div class="sec-head reveal"><span class="eyebrow">The website</span>' +
      '<h2 class="h-lg">'+raw(w.title||'The front door customers judge you by.')+'</h2>' +
      '<p class="lead">'+e(w.sub||'')+'</p></div>' +

      '<div class="site reveal">' +
        '<div class="site-bar"><div class="dots"><i></i><i></i><i></i></div>' +
        '<div class="url">'+e(w.url||'www.yourbusiness.in')+'</div></div>' +

        '<div class="site-hero">' +
          '<div class="site-nav"><span class="lg">'+e(w.brand||D.name)+'</span>'+nav +
          '<a class="btn btn-ac btn-sm cta">'+e(w.navCta||'Book now')+'</a></div>' +
          '<h2 class="h-lg" style="max-width:640px">'+raw(w.heroTitle)+'</h2>' +
          '<p class="lead mt2" style="max-width:560px">'+e(w.heroSub)+'</p>' +
          '<div class="hero-actions"><a class="btn btn-ac">'+e(w.heroCta||'Get started')+'</a>' +
          '<a class="btn btn-glass">'+e(w.heroCta2||'Call us')+'</a></div>' +
          (stats?'<div class="site-stats">'+stats+'</div>':'') +
        '</div>' +

        '<div class="svc"><span class="eyebrow">'+e(w.servicesLabel||'What we offer')+'</span>' +
        '<div class="grid g3 mt3">'+svcs+'</div></div>' +

        (w.testimonial ? '<div class="quote"><p>“'+e(w.testimonial.text)+'”</p>' +
          '<div class="who">— '+e(w.testimonial.who)+'</div></div>' : '') +
      '</div>' +

      '<div class="grid g3 mt4">' +
        '<div class="card card-flat reveal"><h3 class="h-sm">Built to convert</h3><p>Every screen pushes one action — enquire, book or call. Not a brochure.</p></div>' +
        '<div class="card card-flat reveal d1"><h3 class="h-sm">Perfect on a phone</h3><p>Nine out of ten customers will see this on a phone. That is where it is designed first.</p></div>' +
        '<div class="card card-flat reveal d2"><h3 class="h-sm">Wired to the system</h3><p>Every enquiry lands straight in the CRM and on the owner\'s WhatsApp. Nothing is lost.</p></div>' +
      '</div></div></section>';
  }

  function pageCRM(){
    const c = D.crm || {};
    const mini = arr(c.kpis).map(k=>
      '<div class="box"><div class="v" style="color:'+(k.color||'var(--ac)')+'">'+e(k.v)+'</div><div class="k">'+e(k.k)+'</div></div>').join('');

    const rows = arr(c.rows).map(x=>
      '<div class="row"><div class="av">'+e(initials(x.nm))+'</div>' +
      '<div class="main"><div class="nm">'+e(x.nm)+'</div><div class="sub">'+e(x.sub)+'</div></div>' +
      '<span class="pill '+e(x.tone||'')+'">'+e(x.pill)+'</span></div>').join('');

    const bars = arr(c.bars).map(h=>'<i style="height:'+Math.max(6,Math.min(100,h))+'%"></i>').join('');

    const side = arr(c.panels).map(p=>{
      const items = arr(p.rows).map(x=>
        '<div class="row"><div class="main"><div class="nm">'+e(x.nm)+'</div>' +
        (x.sub?'<div class="sub">'+e(x.sub)+'</div>':'')+'</div>' +
        (x.pill?'<span class="pill '+e(x.tone||'')+'">'+e(x.pill)+'</span>':'')+'</div>').join('');
      return '<div class="panel"><div class="panel-h"><h4>'+e(p.h)+'</h4>' +
             (p.tag?'<span class="tag">'+e(p.tag)+'</span>':'')+'</div>'+items+'</div>';
    }).join('');

    const ai = c.ai ? '<div class="ai-panel"><div class="panel-h"><h4>'+e(c.ai.h)+'</h4>' +
        '<span class="badge badge-edge">AI Edge</span></div>' +
        arr(c.ai.items).map(i=>'<div class="ai-item"><div class="t">'+e(i.t)+'</div><div class="d">'+e(i.d)+'</div></div>').join('') +
      '</div>' : '';

    return '<section class="sec"><div class="wrap">' +
      '<div class="sec-head reveal"><span class="eyebrow">The CRM</span>' +
      '<h2 class="h-lg">'+raw(c.title||'The system that runs the day.')+'</h2>' +
      '<p class="lead">'+e(c.sub||'')+'</p></div>' +

      '<div class="crm reveal">' +
        '<div class="crm-bar"><div class="dots"><i></i><i></i><i></i></div>' +
        '<span class="ttl">'+e(c.appName||(D.name+' CRM'))+'</span><span class="live">Live</span></div>' +
        '<div class="crm-body">' +
          '<div>' +
            '<div class="mini">'+mini+'</div>' +
            '<div class="panel"><div class="panel-h"><h4>'+e(c.mainTitle||'Today')+'</h4>' +
              (c.mainTag?'<span class="tag">'+e(c.mainTag)+'</span>':'')+'</div>'+rows +
              (c.footV?'<div class="statline"><div><div class="v">'+e(c.footV)+'</div><div class="k">'+e(c.footK)+'</div></div>' +
                       '<div style="text-align:right"><div class="v">'+e(c.footV2)+'</div><div class="k">'+e(c.footK2)+'</div></div></div>':'') +
            '</div>' +
            (bars?'<div class="panel"><div class="panel-h"><h4>'+e(c.barsTitle||'Last 12 weeks')+'</h4></div>' +
                  '<div class="bars">'+bars+'</div></div>':'') +
          '</div>' +
          '<div>'+ai+(side?'<div style="margin-top:16px">'+side+'</div>':'')+'</div>' +
        '</div>' +
      '</div>' +
      '<p class="disc reveal">Sample data shown. Yours would carry your real customers, your services and your numbers.</p>' +
      '</div></section>';
  }

  function pageApp(){
    const a = D.app || {};
    const screens = arr(a.screens).map((s,i)=>{
      let body='';
      if(s.big) body += '<div class="pbig"><div class="v">'+e(s.big.v)+'</div><div class="k">'+e(s.big.k)+'</div></div>';
      if(s.meter!=null) body += '<div class="meter"><i style="width:'+Math.max(2,Math.min(100,s.meter))+'%"></i></div>' +
                                '<div class="xs muted3">'+e(s.meterLabel||'')+'</div>';
      body += arr(s.rows).map(x=>
        '<div class="prow"><div><div class="nm">'+e(x.nm)+'</div>'+(x.sb?'<div class="sb">'+e(x.sb)+'</div>':'')+'</div>' +
        (x.rt?'<span class="rt">'+e(x.rt)+'</span>':'')+'</div>').join('');
      return '<div class="reveal'+(i===1?' d1':i===2?' d2':'')+'"><div class="phone"><div class="screen">' +
        '<div class="notch"><i></i></div>' +
        '<div class="phead"><div class="t">'+e(s.t)+'</div><div class="s">'+e(s.s||'')+'</div></div>' +
        '<div class="pbody">'+body+'</div></div></div>' +
        '<p class="pcap">'+e(s.cap||'')+'</p></div>';
    }).join('');

    return '<section class="sec"><div class="wrap">' +
      '<div class="sec-head reveal"><span class="eyebrow">The app</span>' +
      '<h2 class="h-lg">'+raw(a.title||'Your business in their pocket.')+'</h2>' +
      '<p class="lead">'+e(a.sub||'')+'</p></div>' +
      '<div class="phones">'+screens+'</div>' +
      '<div class="card card-flat mt4 reveal"><h3 class="h-sm">Why the app matters</h3>' +
      '<p class="mt1">'+e(a.why||'A customer with your app on their phone sees your name every day. A customer without it forgets you in three weeks.')+'</p></div>' +
      '</div></section>';
  }

  function pageFeatures(){
    const f = D.features || {};
    const ess = arr(f.essentials).map((x,i)=>
      '<div class="card card-flat reveal'+(i%3===1?' d1':i%3===2?' d2':'')+'">' +
      '<span class="badge badge-ess">Essential</span><h3 class="h-sm mt2">'+e(x.t)+'</h3><p>'+e(x.d)+'</p></div>').join('');
    const edge = arr(f.edge).map((x,i)=>
      '<div class="edge-card'+(x.star?' star':'')+' reveal'+(i%3===1?' d1':i%3===2?' d2':'')+'">' +
      '<span class="badge badge-edge">'+(x.star?'★ Star feature':'Repute India Edge')+'</span>' +
      '<h3 class="h-sm mt2">'+e(x.t)+'</h3><p class="muted mt1">'+e(x.d)+'</p></div>').join('');

    return '<section class="sec"><div class="wrap">' +
      '<div class="sec-head reveal"><span class="eyebrow">Everyday essentials</span>' +
      '<h2 class="h-lg">First, it runs the <span class="ac">basics</span> beautifully.</h2>' +
      '<p class="lead">Owners must trust it to run the business before they care about anything clever.</p></div>' +
      '<div class="grid g3">'+ess+'</div></div></section>' +

      '<section class="sec" style="padding-top:0"><div class="wrap">' +
      '<div class="sec-head reveal"><span class="eyebrow">The Repute India Edge</span>' +
      '<h2 class="h-lg">Then it does what <span class="ac">nobody else</span> does.</h2>' +
      '<p class="lead">Every other system records what already happened. This one tells the owner what is about to happen — and what to do about it.</p></div>' +
      '<div class="grid g3">'+edge+'</div>' +
      (f.killer ? '<div class="edge-card star mt4 reveal" style="text-align:center">' +
        '<span class="eyebrow">The line that lands</span>' +
        '<p class="h-md mt2" style="font-weight:700">'+raw(f.killer)+'</p></div>' : '') +
      '</div></section>';
  }

  /* ---------- 3. draw it ---------- */
  const build = { 'index':pageIndex, 'website':pageWebsite, 'crm':pageCRM, 'app':pageApp, 'features':pageFeatures };
  const fn = build[page] || pageIndex;
  document.body.innerHTML = chrome() + fn() + footer();

  /* ---------- 4. scroll reveal + count-up ---------- */
  const items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        en.target.classList.add('in');
        en.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold:.1, rootMargin:'0px 0px -40px 0px' });
    items.forEach(el=>io.observe(el));
  } else {
    items.forEach(el=>{ el.classList.add('in'); el.querySelectorAll('[data-count]').forEach(countUp); });
  }

  function countUp(el){
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const started = performance.now(), dur = 1100;
    (function step(now){
      const p = Math.min(1, (now - started) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if(p < 1) requestAnimationFrame(step);
    })(started);
  }
})();
