/* ============================================================
   PENTAGON-MIND — Engine de Glossário & Siglas
   - Popups em <span class="term" data-term="A2/AD">A2/AD</span>
   - Gera seção #glossario com mapa completo de termos
   - Gera legenda + pins do mapa de ameaças (index.html)
   ============================================================ */
(function () {
  "use strict";

  function lookup(key) {
    var g = window.PM_GLOSSARY || {};
    var alias = window.PM_GLOSSARY_ALIAS || {};
    if (g[key]) return g[key];
    if (alias[key] && g[alias[key]]) return g[alias[key]];
    // case-insensitive
    var lk = key.toLowerCase();
    for (var k in g) { if (k.toLowerCase() === lk) return g[k]; }
    return null;
  }

  // 1) Popups inline
  function bindTermPopups(root) {
    (root || document).querySelectorAll(".term[data-term]").forEach(function (el) {
      if (el.dataset.bound) return;
      el.dataset.bound = "1";
      var data = lookup(el.getAttribute("data-term"));
      if (!data) return;
      el.classList.add("has-popup");
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", data.pt);
      var tip = document.createElement("span");
      tip.className = "term-popup";
      tip.innerHTML =
        '<strong>' + esc(el.textContent) + "</strong>" +
        '<span class="tp-full">' + esc(data.full) + "</span>" +
        '<span class="tp-pt">' + esc(data.pt) + "</span>" +
        '<span class="tp-gloss">' + esc(data.gloss) + "</span>";
      el.appendChild(tip);
      el.addEventListener("mouseenter", function () { tip.classList.add("open"); });
      el.addEventListener("mouseleave", function () { tip.classList.remove("open"); });
      el.addEventListener("focus", function () { tip.classList.add("open"); });
      el.addEventListener("blur", function () { tip.classList.remove("open"); });
      el.addEventListener("click", function (e) { e.stopPropagation(); tip.classList.toggle("open"); });
    });
  }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  // 2) Seção de Glossário (mapa completo)
  function buildGlossarySection() {
    var host = document.getElementById("glossario-map");
    if (!host) return;
    var g = window.PM_GLOSSARY || {};
    var keys = Object.keys(g).sort();
    var html = '<div class="glossary-grid">';
    keys.forEach(function (k) {
      var d = g[k];
      html +=
        '<div class="glossary-item">' +
          '<div class="gi-term">' + esc(k) + '</div>' +
          '<div class="gi-full">' + esc(d.full) + "</div>" +
          '<div class="gi-pt">' + esc(d.pt) + "</div>" +
          '<div class="gi-gloss">' + esc(d.gloss) + "</div>" +
        "</div>";
    });
    html += "</div>";
    host.innerHTML = html;
  }

  // 3) Mapa de ameaças: legenda dinâmica + pins com popup
  function buildThreatMap() {
    var map = document.getElementById("threatmap");
    if (!map) return;
    var legend = window.PM_THREAT_LEGEND || [];
    // remove pins/legend estáticos preexistentes (deixados no HTML)
    map.querySelectorAll(".pin,.threat-legend").forEach(function (n) { n.remove(); });
    legend.forEach(function (p) {
      var pin = document.createElement("button");
      pin.type = "button";
      pin.className = "pin " + (p.level === "amber" ? "amber" : "");
      pin.style.left = p.x + "%";
      pin.style.top = p.y + "%";
      pin.setAttribute("aria-label", p.title);
      var pop = document.createElement("span");
      pop.className = "pin-popup";
      pop.innerHTML = "<strong>" + esc(p.title) + "</strong><span>" + esc(p.body) + "</span>";
      pin.appendChild(pop);
      map.appendChild(pin);
    });
    // legenda lateral
    var lg = document.createElement("div");
    lg.className = "threat-legend";
    lg.innerHTML =
      '<div class="legend-row"><i class="dot red"></i> Vetor de tensão ativa</div>' +
      '<div class="legend-row"><i class="dot amber"></i> Ponto de dissuasão / A2-AD</div>' +
      '<div class="legend-hint">Passe o mouse / toque nos pontos para detalhar.</div>';
    map.appendChild(lg);
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindTermPopups();
    buildGlossarySection();
    buildThreatMap();
  });

  // expõe para re-bind após injeções dinâmicas
  window.PM_bindTermPopups = bindTermPopups;
})();
