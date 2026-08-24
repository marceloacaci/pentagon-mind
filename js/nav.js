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
    { href: "topicos-presidenciaveis.html", label: "TÓPICOS ELEITORAIS" },
    { href: "otan.html", label: "OTAN" },
    { href: "arsenal-tecnologia.html", label: "ARSENAL" },
    { href: "impactos-geopoliticos.html", label: "GEOPOLÍTICA" },
    { href: "dominios-estrategicos.html", label: "NÃO-CINÉTICO" },
    { href: "briefings.html", label: "BRIEFINGS" },
    { href: "busca.html", label: "BUSCA" },
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
        '<button type="button" class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="pm-nav-links">≡</button>' +
        '<nav class="nav-links" id="pm-nav-links">' + links + '</nav>' +
        '<form class="nav-search" role="search" action="busca.html" method="get">' +
          '<label class="visually-hidden" for="pm-search">Buscar no portal</label>' +
          '<input type="search" id="pm-search" name="q" placeholder="Buscar sigla, arma, operação…" autocomplete="off" />' +
        '</form>' +
        '<button type="button" class="theme-toggle" id="themeToggle" aria-label="Alternar tema claro/escuro" title="Alternar tema"></button>' +
      '</div>';
    // Mark active link now that nav exists
    var path = location.pathname.split('/').pop() || 'index.html';
    bar.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && (href === path || (path === '' && href === 'index.html'))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
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
          '<a href="busca.html">Busca</a>' +
          '<a href="glossario.html">Glossário</a>' +
        '</div>' +
      "</div>";
  }

  /* ===== Tema claro/escuro =====
     A escolha explicita do utilizador (localStorage) tem prioridade sobre a
     preferencia do sistema. O atributo e escrito em <html> para que os
     tokens [data-theme="light"] entrem em vigor. */
  var THEME_KEY = "pm-theme";

  function currentTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) { /* localStorage bloqueado: cai na preferencia do sistema */ }
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
      ? "light" : "dark";
  }

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      // O icone mostra o tema que sera ativado, nao o atual.
      btn.textContent = (t === "light") ? "☾" : "☀";
      btn.setAttribute("aria-label",
        t === "light" ? "Alternar para tema escuro" : "Alternar para tema claro");
      btn.setAttribute("aria-pressed", t === "light" ? "true" : "false");
    }
  }

  function initTheme() {
    applyTheme(currentTheme());
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* sessao apenas */ }
      applyTheme(next);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildTopbar();
    buildFooter();
    initTheme();
    // active link + toggle handled in common.js
  });
})();
