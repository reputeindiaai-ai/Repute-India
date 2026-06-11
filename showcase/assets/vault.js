/* ============================================================
   REPUTE INDIA AI — SHOWCASE VAULT  ·  shared interactions
   Front-end only. No backend, no data, no product code.
   ============================================================ */
(function () {
  "use strict";

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Count-up for elements with [data-count]
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var dec = (el.getAttribute("data-dec") | 0);
    var dur = 1100, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(dec);
      el.textContent = prefix + Number(val).toLocaleString("en-IN") + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + Number(target).toLocaleString("en-IN") + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Mobile nav toggle (optional button with [data-navtoggle])
  var navToggle = document.querySelector("[data-navtoggle]");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var links = document.querySelector(".nav-links");
      if (links) links.classList.toggle("open");
    });
  }

  // Lightweight tab groups: [data-tabs] container, [data-tab="key"] buttons, [data-panel="key"] panels
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = group.querySelectorAll("[data-tab]");
    var panels = group.querySelectorAll("[data-panel]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-tab");
        btns.forEach(function (b) { b.classList.toggle("active", b === btn); });
        panels.forEach(function (p) { p.style.display = (p.getAttribute("data-panel") === key) ? "" : "none"; });
      });
    });
  });

  // Year stamp
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = "2026"; });

  // ── Local-only "Sales script" tab ────────────────────────────────────
  // Shows the Sales script tab ONLY when a demo page is opened from your
  // own computer (file:// or localhost). On the public live site it never
  // appears — and the sales-script files are not published online at all.
  (function () {
    var local = (location.protocol === "file:" ||
                 location.hostname === "localhost" ||
                 location.hostname === "127.0.0.1");
    if (!local) return;
    document.querySelectorAll(".tabs").forEach(function (tabs) {
      if (tabs.querySelector('a[href="sales.html"]')) return; // already there (e.g. the sales page itself)
      var a = document.createElement("a");
      a.href = "sales.html";
      a.textContent = "Sales script";
      tabs.appendChild(a);
    });
  })();
})();
