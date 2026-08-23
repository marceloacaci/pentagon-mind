/* ============================================================
   PENTAGON-MIND — Loader de Briefings (Sprint 2)
   Lê ?briefing=<id> e renderiza content/briefings/<id>.json
   Mantém design system (raised, gear-opt, popups de glossário).
   ============================================================ */
(function () {
  "use strict";

  function getParam(n) { return new URLSearchParams(location.search).get(n); }
  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }
  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return esc(iso);
    return d.toLocaleDateString("pt-BR", { year: "numeric", month: "long", day: "numeric" });
  }
  function tagPills(tags) {
    return (tags || []).map(function (t) { return '<span class="pill">' + esc(t) + "</span>"; }).join(" ");
  }

  function render(d) {
    var root = document.getElementById("article-root");
    var h = "";
    h += '<header class="hero" style="padding-bottom:8px">';
    h += '<p class="eyebrow">// BRIEFING — ' + (d.region ? esc(d.region.toUpperCase().replace(/-/g, " ")) : "GERAL") + "</p>";
    h += "<h1>" + esc(d.title) + "</h1>";
    h += '<div class="meta-row">';
    h += "<span><b>DATA</b> " + fmtDate(d.date) + "</span>";
    h += "<span><b>CATEGORIA</b> " + esc(d.category || "briefing") + "</span>";
    if (d.author) h += "<span><b>AUTORIA</b> " + esc(d.author) + "</span>";
    h += "</div>";
    if (d.tags && d.tags.length) h += '<div style="margin-top:10px">' + tagPills(d.tags) + "</div>";
    h += "</header>";

    h += '<p class="lead">' + esc(d.lead) + "</p>";

    h += '<section class="section" id="corpo">' + d.bodyHtml + "</section>";

    if (d.explain) {
      h += '<div class="explainer"><span class="ex-label">Em outras palavras</span><p>' + esc(d.explain) + "</p></div>";
    }

    if (d.data && d.data.length) {
      h += '<section class="section"><h2>Dados Técnicos</h2><table class="data"><tbody>';
      d.data.forEach(function (r) {
        h += '<tr><td class="k">' + esc(r.label) + "</td><td>" + esc(r.value) + "</td></tr>";
      });
      h += "</tbody></table></section>";
    }

    if (d.refs && d.refs.length) {
      h += '<section class="section" id="referencias"><h2>Referências Bibliográficas</h2><ol class="refs">';
      d.refs.forEach(function (r) { h += "<li>" + esc(r) + "</li>"; });
      h += "</ol></section>";
    }

    root.innerHTML = h;
    document.title = d.title + " — PENTAGON-MIND";
    if (window.PM_bindTermPopups) window.PM_bindTermPopups(root);
  }

  function load(id) {
    fetch("content/briefings/" + id + ".json")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(render)
      .catch(function () {
        document.getElementById("article-root").innerHTML =
          '<div class="box danger"><p>Não foi possível carregar o briefing <code>' +
          esc(id) + "</code>. Verifique o catálogo em <a href=\"briefings.html\">Briefings</a>.</p></div>";
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var id = getParam("briefing");
    if (!id) { location.href = "briefings.html"; return; }
    load(id);
  });
})();
