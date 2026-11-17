/* Cookie notice for reputeindiaai.com.
   - Visitors in the UK / EU: analytics is OFF until they press Accept (Google Consent Mode v2).
   - Everyone else: a small notice with a link to the privacy page.
   The consent defaults themselves are set in the <head> of each page, before Google Analytics loads.
   This file only shows the banner and records the visitor's choice. */
(function(){
  'use strict';
  var KEY='ri_consent', NOTE='ri_notice';
  var st=window.__ri||{eu:false,choice:null};
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

  /* used by the banner and by the buttons on the privacy page */
  window.riConsent=function(allow){
    set(KEY, allow?'granted':'denied'); set(NOTE,'1');
    if(typeof gtag==='function') gtag('consent','update',{ analytics_storage: allow?'granted':'denied' });
    var b=document.getElementById('ri-cookie'); if(b) b.parentNode.removeChild(b);
  };

  if(get(KEY)) return;                       /* already chose */
  if(!st.eu && get(NOTE)) return;            /* already saw the notice */
  if(/\/privacy\/?$/.test(location.pathname)) { if(!st.eu) return; }

  function show(){
    var d=document.createElement('div');
    d.id='ri-cookie'; d.setAttribute('role','region'); d.setAttribute('aria-label','Cookie notice');
    d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:300;max-width:'+(st.eu?'560':'430')+'px;margin:0 auto 0 0;'
      +'background:#0D0D0C;color:#F3F1EA;border:1px solid rgba(243,241,234,.22);border-radius:18px;padding:16px 18px;'
      +'box-shadow:0 18px 50px rgba(0,0,0,.35);font:400 14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;';
    var btn='min-height:44px;padding:0 18px;border-radius:999px;font:600 14px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;cursor:pointer;';
    var link='<a href="/privacy/" style="color:#FF8A5C;text-decoration:underline">Privacy policy</a>';
    d.innerHTML = st.eu
      ? '<p style="margin:0 0 12px">We would like to use analytics cookies to see how visitors use this site. They stay off unless you accept. '+link+'</p>'
        +'<div style="display:flex;gap:8px;flex-wrap:wrap">'
        +'<button type="button" data-c="1" style="'+btn+'background:#FF4F1A;color:#0D0D0C;border:1px solid #FF4F1A">Accept</button>'
        +'<button type="button" data-c="0" style="'+btn+'background:transparent;color:#F3F1EA;border:1px solid rgba(243,241,234,.4)">Decline</button></div>'
      : '<div style="display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap">'
        +'<p style="margin:0;flex:1;min-width:190px">This site uses analytics cookies to improve it. '+link+'</p>'
        +'<button type="button" data-c="ok" style="'+btn+'background:#F3F1EA;color:#0D0D0C;border:1px solid #F3F1EA">OK</button></div>';
    d.addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return;
      var c=b.getAttribute('data-c');
      if(c==='ok'){ set(NOTE,'1'); d.parentNode.removeChild(d); }
      else window.riConsent(c==='1');
    });
    document.body.appendChild(d);
  }
  if(document.body) show(); else document.addEventListener('DOMContentLoaded',show);
})();
