/* ============================================================
   PENTAGON-MIND — Índice de Briefings (Sprint 2)
   Lê content/briefings/index.json e aplica filtros por
   região / tag / ano (sistema de tags do backlog).
   ============================================================ */
(function () {
  "use strict";

  var REGION_LABEL = {
    "indo-pacifico": "Indo-Pacífico",
    "euro-atlantico": "Euro-Atlântico",
    "oriente-medio": "Oriente Médio",
    "asia-central": "Ásia Central",
    "asia-oriental": "Ásia Oriental",
    "americas": "Américas",
    "global": "Global"
  };

  var state = { region: "all", tag: "all" };
  var DATA = [];

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function year(iso) { return String(iso || "").slice(0, 4); }

  function buildTagFilters() {
    var tags = {};
    DATA.forEach(function (d) { (d.tags || []).forEach(function (t) { tags[t] = (tags[t] || 0) + 1; }); });
    var host = document.getElementById("tag-filters");
    var html = '<button class="chip active" data-tag="all">TODAS AS TAGS</button>';
    Object.keys(tags).sort().forEach(function (t) {
      html += '<button class="chip" data-tag="' + esc(t) + '">' + esc(t) + " (" + tags[t] + ")</button>";
    });
    host.innerHTML = html;
    host.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        state.tag = b.getAttribute("data-tag");
        host.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderList();
      });
    });
  }

  function matches(d) {
    var okR = state.region === "all" || d.region === state.region;
    var okT = state.tag === "all" || (d.tags || []).indexOf(state.tag) !== -1;
    return okR && okT;
  }

  function renderList() {
    var host = document.getElementById("briefing-list");
    var list = DATA.filter(matches);
    if (!list.length) {
      host.innerHTML = '<div class="box"><p>Nenhum briefing corresponde aos filtros selecionados.</p></div>';
      return;
    }
    host.innerHTML = list.map(function (d) {
      return '<a class="card-link" href="article.html?briefing=' + esc(d.id) + '">' +
        '<span class="tag">' + esc(REGION_LABEL[d.region] || d.region) + " · " + esc(year(d.date)) + "</span>" +
        "<h3>" + esc(d.title) + "</h3>" +
        '<p class="muted">' + esc(d.blurb) + "</p>" +
        '<div style="margin-top:8px">' + (d.tags || []).slice(0, 4).map(function (t) { return '<span class="pill">' + esc(t) + "</span>"; }).join(" ") + "</div>" +
        "</a>";
    }).join("");
  }

  function bindRegionFilters() {
    var host = document.getElementById("filters");
    host.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        state.region = b.getAttribute("data-region") || "all";
        host.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        renderList();
      });
    });
  }

  fetch("content/briefings/index.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (list) {
      DATA = list;
      bindRegionFilters();
      buildTagFilters();
      renderList();
    })
    .catch(function () {
      document.getElementById("briefing-list").innerHTML =
        '<div class="box danger"><p>Falha ao carregar o catálogo de briefings.</p></div>';
    });
})();
