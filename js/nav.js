/* ============================================================
   PENTAGON-MIND — Navbar + Footer injection (DRY across pages)
   Each page contains <div id="site-topbar"></div> and <footer id="site-footer"></footer>
   ============================================================ */
(function () {
  "use strict";

  var NAV = [
    { href: "index.html", label: "BRIEFING" },
    { href: "doutrina.html", label: "DOUTRINA" },
    { href: "politicas-presidenciais.html", label: "PRESIDÊNCIAS" },
    { href: "arsenal-tecnologia.html", label: "ARSENAL" },
    { href: "impactos-geopoliticos.html", label: "GEOPOLÍTICA" },
    { href: "briefings.html", label: "BRIEFINGS" },
    { href: "glossario.html", label: "GLOSSÁRIO" }
  ];

  function buildTopbar() {
    var bar = document.getElementById("site-topbar");
    if (!bar) return;
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '">' + n.label + "</a>";
    }).join("");
    bar.className = "topbar";
    bar.innerHTML =
      '<div class="topbar-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="glyph">PM</span>' +
          '<span>PENTAGON-MIND<small>DOUTRINA · TECNOLOGIA · GEOPOLÍTICA</small></span>' +
        "</a>" +
        '<button type="button" class="nav-toggle" aria-label="Menu">≡</button>' +
        '<nav class="nav-links">' + links + "</nav>" +
      "</div>";
    // Mark active link now that nav exists
    var path = location.pathname.split("/").pop() || "index.html";
    bar.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && (href === path || (path === "" && href === "index.html"))) {
        a.classList.add("active");
      }
    });
  }

  function buildFooter() {
    var f = document.getElementById("site-footer");
    if (!f) return;
    f.className = "site";
    f.innerHTML =
      '<div class="wrap">' +
        '<div class="disc">' +
          "<strong>PENTAGON-MIND</strong> — Portal analítico de doutrina militar, tecnologia de defesa e projeções geopolíticas dos Estados Unidos. " +
          "Conteúdo de caráter educacional e historiográfico. Imagens: domínio público / Governo dos EUA (Wikimedia Commons). " +
          "Não constitui aconselhamento estratégico oficial. Citações reproduzidas conforme registros públicos (DoD, CRS, SIPRI)." +
        "</div>" +
        '<div class="links">' +
          '<a href="index.html">Início</a>' +
          '<a href="doutrina.html">Doutrina</a>' +
          '<a href="politicas-presidenciais.html">Presidências</a>' +
          '<a href="arsenal-tecnologia.html">Arsenal</a>' +
          '<a href="impactos-geopoliticos.html">Geopolítica</a>' +
          '<a href="briefings.html">Briefings</a>' +
          '<a href="glossario.html">Glossário</a>' +
        '</div>' +
      "</div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildTopbar();
    buildFooter();
    // active link + toggle handled in common.js
  });
})();
