/* ============================================================
   ANANTAM REALTY OS — demo shell
   Navigation, helpers and hand-drawn SVG charts.
   Front-end only. All data is illustrative sample data.
   ============================================================ */
(function(){
  'use strict';

  /* ---------- tiny helpers used by every view ---------- */
  var H = {};
  H.e = function(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  H.ini = function(n){ return String(n||'').split(' ').filter(Boolean).slice(0,2)
    .map(function(w){ return w[0]; }).join('').toUpperCase(); };

  H.kpi = function(list){
    return '<div class="grid g4">' + list.map(function(k){
      return '<div class="kpi ' + (k.t||'') + '">' +
        '<div class="k">' + H.e(k.k) + '</div>' +
        '<div class="v">' + H.e(k.v) + '</div>' +
        (k.d ? '<div class="d">' + k.d + '</div>' : '') + '</div>';
    }).join('') + '</div>';
  };

  H.card = function(title, tag, body, cls){
    return '<div class="card ' + (cls||'') + '">' +
      (title ? '<div class="card-h"><h3>' + H.e(title) + '</h3>' +
        (tag ? '<span class="tag">' + H.e(tag) + '</span>' : '') + '</div>' : '') +
      body + '</div>';
  };

  /* table: cols = ['Name', {t:'Value', num:true}, ...]; rows = array of html-cell arrays */
  H.table = function(cols, rows){
    return '<div class="tblwrap"><table class="tbl"><thead><tr>' +
      cols.map(function(c){
        var o = (typeof c === 'string') ? {t:c} : c;
        return '<th' + (o.num ? ' class="num"' : '') + '>' + H.e(o.t) + '</th>';
      }).join('') + '</tr></thead><tbody>' +
      rows.map(function(r){
        return '<tr>' + r.map(function(cell, i){
          var o = (typeof cols[i] === 'string') ? {} : cols[i];
          return '<td' + (o.num ? ' class="num"' : '') + '>' + cell + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  };

  H.who = function(name, sub){
    return '<div class="who"><span class="av">' + H.e(H.ini(name)) + '</span><div>' +
      '<div class="nm">' + H.e(name) + '</div>' +
      (sub ? '<div class="sb">' + H.e(sub) + '</div>' : '') + '</div></div>';
  };
  H.two = function(a, b){
    return '<div class="nm">' + H.e(a) + '</div>' + (b ? '<div class="sb">' + H.e(b) + '</div>' : '');
  };
  H.pill = function(txt, tone){ return '<span class="pill ' + (tone||'') + '">' + H.e(txt) + '</span>'; };
  H.score = function(n){
    var c = n >= 75 ? 'hi' : n >= 50 ? 'md' : 'lo';
    return '<span class="score ' + c + '">' + n + '</span>';
  };
  H.meters = function(list){
    return list.map(function(m){
      return '<div class="mrow"><div class="lb"><b>' + H.e(m.t) + '</b><span>' + H.e(m.r||'') + '</span></div>' +
        '<div class="meter"><i style="width:' + Math.max(2, Math.min(100, m.p)) + '%"></i></div></div>';
    }).join('');
  };
  H.ai = function(title, items, tag){
    return '<div class="ai"><div class="card-h"><h3>' + H.e(title) + '</h3>' +
      '<span class="badge-ai">' + H.e(tag || 'AI') + '</span></div>' +
      items.map(function(i){
        return '<div class="ai-item"><div class="t">' + H.e(i.t) + '</div>' +
          '<div class="d">' + i.d + '</div>' +
          (i.acts ? '<div class="acts">' + i.acts.map(function(a, n){
            return '<button class="btn btn-sm ' + (n === 0 ? 'btn-ac' : 'btn-line') + '">' + H.e(a) + '</button>';
          }).join('') + '</div>' : '') + '</div>';
      }).join('') + '</div>';
  };
  H.note = function(html){ return '<div class="note">' + html + '</div>'; };
  H.tl = function(items){
    return '<div class="tl">' + items.map(function(i){
      return '<div class="tli"><div class="t">' + H.e(i.t) + '</div><div class="d">' + H.e(i.d) + '</div></div>';
    }).join('') + '</div>';
  };
  H.chips = function(list, cur){
    return '<div class="chips">' + list.map(function(c, i){
      return '<button class="chip' + (i === (cur||0) ? ' cur' : '') + '">' + H.e(c) + '</button>';
    }).join('') + '</div>';
  };
  H.filterbar = function(extra){
    return '<div class="filterbar">' +
      '<div class="fld"><label>From</label><div class="inp">01-04-2026 ' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></div></div>' +
      '<div class="fld"><label>To</label><div class="inp">18-08-2026 ' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></div></div>' +
      '<div class="fld"><label>Group by</label><div class="inp">' + H.e(extra || 'Executive') +
        ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="margin-left:auto"><path d="M6 9l6 6 6-6"/></svg></div></div>' +
      '<div style="margin-left:auto;display:flex;gap:7px">' +
        '<button class="btn btn-line btn-sm">Export CSV</button>' +
        '<button class="btn btn-line btn-sm">Print</button>' +
      '</div></div>';
  };

  /* ---------- charts (hand-drawn SVG, no libraries) ---------- */
  var CH = {};
  function pts(data, w, h, pad){
    var max = Math.max.apply(null, data) * 1.12 || 1;
    var step = (w - pad * 2) / (data.length - 1 || 1);
    return data.map(function(v, i){
      return [pad + i * step, h - pad - (v / max) * (h - pad * 2)];
    });
  }
  function smooth(p){
    var d = 'M' + p[0][0].toFixed(1) + ',' + p[0][1].toFixed(1);
    for (var i = 0; i < p.length - 1; i++){
      var x = (p[i][0] + p[i + 1][0]) / 2;
      d += ' Q' + p[i][0].toFixed(1) + ',' + p[i][1].toFixed(1) + ' ' + x.toFixed(1) + ',' +
           ((p[i][1] + p[i + 1][1]) / 2).toFixed(1);
    }
    d += ' T' + p[p.length - 1][0].toFixed(1) + ',' + p[p.length - 1][1].toFixed(1);
    return d;
  }
  function grid(w, h, pad){
    var g = '';
    for (var i = 0; i <= 4; i++){
      var y = pad + (h - pad * 2) * i / 4;
      g += '<line x1="' + pad + '" y1="' + y.toFixed(1) + '" x2="' + (w - pad) + '" y2="' + y.toFixed(1) +
           '" stroke="var(--line)" stroke-width="1"/>';
    }
    return g;
  }
  function labels(lab, w, h, pad){
    if (!lab) return '';
    var step = (w - pad * 2) / (lab.length - 1 || 1);
    return lab.map(function(l, i){
      return '<text x="' + (pad + i * step).toFixed(1) + '" y="' + (h - 6) + '" font-size="9" fill="var(--txt3)" ' +
        'text-anchor="middle" font-family="Inter,sans-serif">' + H.e(l) + '</text>';
    }).join('');
  }
  var SER = ['var(--ac)', 'var(--ac2)', 'var(--blue)', 'var(--amber)', 'var(--red)'];

  /* type: bar | line | area | pie | donut ; series = [{name, data, }] */
  CH.draw = function(type, series, lab){
    var w = 760, h = 210, pad = 24;
    if (type === 'pie' || type === 'donut') return CH.pie(series, type === 'donut');
    var body = grid(w, h, pad) + labels(lab, w, h, pad);
    series.forEach(function(s, si){
      var p = pts(s.data, w, h - 14, pad);
      var col = SER[si % SER.length];
      if (type === 'bar'){
        var max = Math.max.apply(null, s.data) * 1.12 || 1;
        var bw = (w - pad * 2) / s.data.length;
        var iw = Math.max(4, bw / series.length - 6);
        body += s.data.map(function(v, i){
          var bh = (v / max) * (h - 14 - pad * 2);
          return '<rect x="' + (pad + i * bw + si * (iw + 3) + 5).toFixed(1) + '" y="' +
            (h - 14 - pad - bh).toFixed(1) + '" width="' + iw.toFixed(1) + '" height="' + bh.toFixed(1) +
            '" rx="3" fill="' + col + '" opacity="' + (si ? .72 : .92) + '"/>';
        }).join('');
      } else {
        var d = smooth(p);
        if (type === 'area'){
          body += '<path d="' + d + ' L' + p[p.length - 1][0].toFixed(1) + ',' + (h - 14 - pad) +
            ' L' + p[0][0].toFixed(1) + ',' + (h - 14 - pad) + ' Z" fill="' + col + '" opacity=".14"/>';
        }
        body += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.2" ' +
          'stroke-linecap="round" stroke-linejoin="round"/>';
        body += p.map(function(q){
          return '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="3" fill="var(--surface)" stroke="' + col + '" stroke-width="2"/>';
        }).join('');
      }
    });
    return '<svg class="chart" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' + body + '</svg>';
  };

  CH.pie = function(series, hole){
    var data = series[0].data, lab = series[0].labels || [];
    var total = data.reduce(function(a, b){ return a + b; }, 0) || 1;
    var cx = 110, cy = 105, R = 88, r = hole ? 50 : 0, a0 = -Math.PI / 2, out = '';
    data.forEach(function(v, i){
      var a1 = a0 + (v / total) * Math.PI * 2;
      var big = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
      var x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      var d = 'M' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' A' + R + ',' + R + ' 0 ' + big + ' 1 ' +
              x1.toFixed(1) + ',' + y1.toFixed(1);
      if (hole){
        d += ' L' + (cx + r * Math.cos(a1)).toFixed(1) + ',' + (cy + r * Math.sin(a1)).toFixed(1) +
             ' A' + r + ',' + r + ' 0 ' + big + ' 0 ' +
             (cx + r * Math.cos(a0)).toFixed(1) + ',' + (cy + r * Math.sin(a0)).toFixed(1) + ' Z';
      } else { d += ' L' + cx + ',' + cy + ' Z'; }
      out += '<path d="' + d + '" fill="' + SER[i % SER.length] + '" stroke="var(--surface)" stroke-width="2"/>';
      a0 = a1;
    });
    var leg = data.map(function(v, i){
      return '<div style="display:flex;align-items:center;gap:7px;font-size:.79rem;margin-bottom:7px">' +
        '<i style="width:10px;height:10px;border-radius:3px;background:' + SER[i % SER.length] + ';display:block"></i>' +
        '<span style="flex:1">' + H.e(lab[i] || ('Item ' + (i + 1))) + '</span>' +
        '<b style="font-variant-numeric:tabular-nums">' + Math.round(v / total * 100) + '%</b></div>';
    }).join('');
    return '<div style="display:flex;gap:26px;align-items:center;flex-wrap:wrap">' +
      '<svg viewBox="0 0 220 210" style="width:220px;height:210px;flex:none">' + out + '</svg>' +
      '<div style="flex:1;min-width:180px">' + leg + '</div></div>';
  };

  /* a chart card whose Bar/Line/Area/Pie/Donut buttons actually work */
  var chartStore = {};
  var chartN = 0;
  H.chartCard = function(title, series, lab, tag, def){
    var id = 'ch' + (++chartN);
    chartStore[id] = { series: series, lab: lab };
    var types = ['Bar', 'Line', 'Area', 'Pie', 'Donut'];
    var d = def || 'Area';
    return '<div class="card"><div class="card-h"><h3>' + H.e(title) + '</h3>' +
      (tag ? '<span class="tag" style="margin-left:14px">' + H.e(tag) + '</span>' : '') +
      '<div class="chart-tabs" style="margin-left:auto">' + types.map(function(t){
        return '<button data-ch="' + id + '" data-t="' + t.toLowerCase() + '"' +
          (t === d ? ' class="cur"' : '') + '>' + t + '</button>';
      }).join('') + '</div></div>' +
      (series.length > 1 ? '<div class="legend">' + series.map(function(s, i){
        return '<span><i style="background:' + SER[i % SER.length] + '"></i>' + H.e(s.name) + '</span>';
      }).join('') + '</div>' : '') +
      '<div class="card-b" id="' + id + '">' + CH.draw(d.toLowerCase(), series, lab) + '</div></div>';
  };
  H.redrawChart = function(id, type){
    var s = chartStore[id];
    if (s) document.getElementById(id).innerHTML = CH.draw(type, s.series, s.lab);
  };

  /* ---------- navigation: their exact tree, extended for property ---------- */
  var IC = {
    dash:'<path d="M3 12l9-8 9 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V13h6v9"/>',
    task:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    crm:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    inv:'<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/>',
    post:'<path d="M20 6L9 17l-5-5"/>',
    ai:'<path d="M12 3l2.2 5.6L20 10.8l-5.8 2.2L12 19l-2.2-6L4 10.8l5.8-2.2z"/>',
    acc:'<path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    rep:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    hr:'<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
    mas:'<path d="M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6z"/>',
    sup:'<path d="M3 14v-2a9 9 0 0118 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>',
    set:'<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-2.87 1.2V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-2.9-1.17l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 003.5 15a2 2 0 010-4 1.7 1.7 0 001.17-2.9l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 0010.4 4.1V4a2 2 0 114 0v.1a1.7 1.7 0 002.9 1.17l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0020.5 11a2 2 0 010 4z"/>'
  };

  var NAV = [
    { t:'Dashboard', ic:'dash', k:'dashboard' },
    { t:'Task & Project', ic:'task', items:[
      ['Taskboard','taskboard'], ['Tasks','tasks'], ['Daily View','daily'], ['Projects','projects'] ] },
    { t:'CRM', ic:'crm', items:[
      ['Leads','leads'], ['Prospects','prospects'], ['Site Visits','visits',1], ['Quotations','quotations'],
      ['Bookings','bookings'], ['Invoices','invoices'], ['Recovery','recovery'], ['Contract','contract'],
      ['Channel Partners','partners',1] ] },
    { t:'Inventory', ic:'inv', nu:1, items:[
      ['Unit Plan','unitplan'], ['Availability','availability'], ['Price List','pricelist'], ['Holds & Blocks','holds'] ] },
    { t:'Post-Sale', ic:'post', nu:1, items:[
      ['Documentation','psdocs'], ['Home Loans','psloans'], ['Possession','pspossession'], ['Snags & Requests','pssnags'] ] },
    { t:'Arya AI', ic:'ai', nu:1, items:[
      ['Command Centre','ai'], ['Lead Scoring','aiscore'], ['Call Intelligence','aicalls'],
      ['WhatsApp Agent','aiwa'], ['Reputation','aireview'] ] },
    { t:'Account', ic:'acc', items:[
      ['GST','gst'], ['BankAccount','bank'], ['Brokerage Payouts','payouts',1] ] },
    { t:'Reports', ic:'rep', items:[
      ['Create report','rep:create'], ['Lead report','rep:lead'], ['Quotation report','rep:quotation'],
      ['Invoice report','rep:invoice'], ['Order report','rep:order'], ['Task report','rep:task'],
      ['Attendance report','rep:attendance'], ['Source ROI','rep:roi',1],
      ['Collection efficiency','rep:collection',1], ['Unit ageing','rep:ageing',1] ] },
    { t:'HR', ic:'hr', items:[
      ['Attendance','attendance'], ['Team','team'], ['Incentives','incentives',1] ] },
    { t:'Master', ic:'mas', items:[
      ['Contact','m:Contact'], ['Company','m:Company'], ['Branch','m:Branch'], ['Customer','m:Customer'],
      ['Product','m:Product'], ['Category','m:Category'], ['SubCategory','m:SubCategory'], ['Unit','m:Unit'],
      ['Source','m:Source'], ['Terms And Condition','m:Terms And Condition'], ['Type','m:Type'],
      ['Status','m:Status'], ['Template','m:Template'], ['Country','m:Country'], ['State','m:State'],
      ['City','m:City'], ['Project','m:Project',1], ['Tower','m:Tower',1], ['Payment Plan','m:Payment Plan',1],
      ['Charge Head','m:Charge Head',1], ['Brokerage Slab','m:Brokerage Slab',1] ] },
    { t:'Support', ic:'sup', k:'support' },
    { t:'Settings', ic:'set', k:'settings' }
  ];

  function svg(p){ return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }

  function buildNav(){
    return NAV.map(function(g, gi){
      var top = '<button class="navtop" data-grp="' + gi + '"' + (g.k ? ' data-go="' + g.k + '"' : '') + '>' +
        svg(IC[g.ic]) + '<span class="lbl">' + H.e(g.t) + '</span>' +
        (g.nu ? '<span class="badge-new">NEW</span>' : '') +
        (g.items ? '<span class="chev">▸</span>' : '') + '</button>';
      var subs = g.items ? '<div class="subs">' + g.items.map(function(it){
        return '<button data-go="' + H.e(it[1]) + '">' + H.e(it[0]) +
          (it[2] ? '<span class="nu">NEW</span>' : '') + '</button>';
      }).join('') + '</div>' : '';
      return '<div class="navgrp" data-gi="' + gi + '">' + top + subs + '</div>';
    }).join('');
  }

  /* label lookup so the breadcrumb reads properly */
  var LBL = {};
  NAV.forEach(function(g){
    if (g.k) LBL[g.k] = [g.t, ''];
    (g.items || []).forEach(function(it){ LBL[it[1]] = [g.t, it[0]]; });
  });

  /* ---------- shell wiring ---------- */
  var app, view, crumb;

  function go(key){
    var V = window.VIEWS || {};
    var fn = V[key];
    if (!fn && key.indexOf('m:') === 0) fn = function(){ return V.master(key.slice(2)); };
    if (!fn && key.indexOf('rep:') === 0) fn = function(){ return V.report(key.slice(4)); };
    view.innerHTML = fn ? fn() : V.dashboard();
    view.scrollIntoView ? window.scrollTo(0, 0) : null;

    var l = LBL[key] || ['Dashboard', ''];
    crumb.innerHTML = 'Anantam Group / <b>' + H.e(l[0]) + '</b>' + (l[1] ? ' / ' + H.e(l[1]) : '');

    document.querySelectorAll('[data-go]').forEach(function(b){
      b.classList.toggle('cur', b.getAttribute('data-go') === key);
    });
    var open = document.querySelector('[data-go="' + key + '"]');
    if (open){
      var grp = open.closest('.navgrp');
      if (grp && grp.querySelector('.subs')) grp.classList.add('open');
    }
    app.classList.remove('navopen');
  }
  window.__go = go;

  window.__boot = function(){
    app = document.getElementById('app');
    view = document.getElementById('view');
    crumb = document.getElementById('crumb');
    document.getElementById('nav').innerHTML = buildNav();
    window.H = H;

    document.addEventListener('click', function(ev){
      var t = ev.target.closest ? ev.target : null;
      if (!t) return;

      var chb = t.closest('[data-ch]');
      if (chb){
        var id = chb.getAttribute('data-ch');
        chb.parentNode.querySelectorAll('button').forEach(function(b){ b.classList.toggle('cur', b === chb); });
        H.redrawChart(id, chb.getAttribute('data-t'));
        return;
      }
      var chip = t.closest('.chips .chip');
      if (chip){
        chip.parentNode.querySelectorAll('.chip').forEach(function(b){ b.classList.toggle('cur', b === chip); });
        return;
      }
      var unit = t.closest('.unit');
      if (unit && window.VIEWS && window.VIEWS.pickUnit){ window.VIEWS.pickUnit(unit); return; }

      var goBtn = t.closest('[data-go]');
      if (goBtn){ go(goBtn.getAttribute('data-go')); return; }

      var top = t.closest('.navtop');
      if (top){
        var grp = top.closest('.navgrp');
        if (grp.querySelector('.subs')) grp.classList.toggle('open');
        return;
      }
    });

    document.getElementById('theme').addEventListener('click', function(){
      var r = document.documentElement;
      r.setAttribute('data-theme', r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('burger').addEventListener('click', function(){
      if (window.innerWidth <= 860) app.classList.toggle('navopen');
      else app.classList.toggle('collapsed');
    });

    document.querySelector('.navgrp').classList.add('open');
    go('dashboard');
  };
})();
