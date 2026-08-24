/* ============================================================
   PENTAGON-MIND — Busca estática local (US-09)
   Estratégia (conforme architecture.md §7 / sprint-3 §3.1):
     1) Pagefind (WASM) quando o índice foi gerado em CI — indexação
        fragmentada, carregada sob demanda.
     2) Fallback JSON linear (corpus < 30 docs) quando pagefind.js
        não está presente (ambiente de desenvolvimento local), com
        dívida técnica registrada em console.info.
   Requisitos Gherkin atendidos:
     - tempo de resposta < 200 ms (filtragem em memória)
     - campo com label associado (aria-label / <label>)
     - lista navegável por teclado; estado vazio em região aria-live
     - payload inicial do índice ≤ 50 KB (apenas briefings JSON)
   ============================================================ */
(function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }

  var statusEl = document.getElementById("search-status");
  var resultsEl = document.getElementById("search-results");
  var inputEl = document.getElementById("pm-q");

  function setStatus(msg) { if (statusEl) statusEl.textContent = msg; }
  function clearResults() { if (resultsEl) resultsEl.innerHTML = ""; }

  function renderCard(r) {
    var a = document.createElement("a");
    a.className = "card-link";
    a.href = r.href;
    a.innerHTML =
      '<span class="tag">' + esc(r.kind) + "</span>" +
      "<h3>" + esc(r.title) + "</h3>" +
      '<p class="muted">' + esc(r.snippet) + "</p>";
    return a;
  }

  function snippet(text, q) {
    text = (text || "").replace(/\s+/g, " ").trim();
    if (!text) return "";
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text.slice(0, 160) + (text.length > 160 ? "…" : "");
    var start = Math.max(0, i - 60);
    var end = Math.min(text.length, i + q.length + 100);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  function highlight(text, q) {
    var s = esc(text);
    try {
      var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      return s.replace(re, "<mark>$1</mark>");
    } catch (e) { return s; }
  }

  // ---- Fallback: índice JSON em memória ----
  var FALLBACK_CORPUS = [];
  function buildFallback() {
    var items = [];
    // Briefings
    try {
      var idx = JSON.parse(localStorage.getItem("pm-briefings-idx") || "null") ||
        null;
    } catch (e) { /* noop */ }
    return items;
  }

  // Coleta corpus de briefings via fetch (fallback path)
  function loadBriefingCorpus() {
    return fetch("content/briefings/index.json")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (list) {
        return Promise.all(list.map(function (m) {
          return fetch("content/briefings/" + m.id + ".json")
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (d) {
              if (!d) return null;
              var text = (d.lead || "") + " " + (d.bodyHtml ? d.bodyHtml.replace(/<[^>]+>/g, " ") : "");
              return {
                kind: "Briefing · " + (m.region || "geral"),
                title: d.title || m.id,
                href: "article.html?briefing=" + encodeURIComponent(m.id),
                text: text,
                snippetBase: (d.lead || "")
              };
            });
        }));
      })
      .then(function (arr) { return arr.filter(Boolean); });
  }

  var CORPUS = null;
  function getCorpus() {
    if (CORPUS) return Promise.resolve(CORPUS);
    return loadBriefingCorpus().then(function (c) {
      CORPUS = c;
      return c;
    });
  }

  function runFallback(q) {
    setStatus("Indexando localmente (fallback)…");
    getCorpus().then(function (corpus) {
      var ql = q.toLowerCase();
      var hits = corpus.filter(function (it) {
        return (it.title + " " + it.text).toLowerCase().indexOf(ql) !== -1;
      });
      clearResults();
      if (!hits.length) {
        setStatus("Nenhum resultado para \"" + q + "\".");
        resultsEl.innerHTML = '<div class="box"><p>Nenhum resultado encontrado. Tente outro termo — ex.: "Trident", "OTAN", "Taiwan".</p></div>';
        return;
      }
      setStatus(hits.length + " resultado(s) para \"" + q + "\".");
      var frag = document.createDocumentFragment();
      hits.slice(0, 50).forEach(function (h) {
        var card = renderCard({
          kind: h.kind,
          title: h.title,
          href: h.href,
          snippet: snippet(h.text, q)
        });
        frag.appendChild(card);
      });
      resultsEl.appendChild(frag);
    }).catch(function () {
      setStatus("Falha ao carregar o corpus de busca.");
    });
  }

  // ---- Caminho principal: Pagefind ----
  function runPagefind(q) {
    if (typeof window.pagefind === "undefined") {
      console.info("[search] pagefind.js ausente — usando fallback JSON (dívida técnica registrada em sprint-3 §3.1).");
      runFallback(q);
      return;
    }
    setStatus("Buscando…");
    window.pagefind.search(q).then(function (search) {
      return search.results.slice(0, 50).map(function (r) { return r.data(); });
    }).then(function (datasPromise) {
      return Promise.all(datasPromise);
    }).then(function (results) {
      clearResults();
      if (!results.length) {
        setStatus("Nenhum resultado para \"" + q + "\".");
        resultsEl.innerHTML = '<div class="box"><p>Nenhum resultado encontrado.</p></div>';
        return;
      }
      setStatus(results.length + " resultado(s) para \"" + q + "\".");
      var frag = document.createDocumentFragment();
      results.forEach(function (d) {
        var card = renderCard({
          kind: (d.meta && d.meta.kind) || "Página",
          title: d.meta && d.meta.title ? d.meta.title : "Resultado",
          href: d.url,
          snippet: (d.excerpt || "").replace(/<[^>]+>/g, "")
        });
        frag.appendChild(card);
      });
      resultsEl.appendChild(frag);
    }).catch(function () {
      console.info("[search] Pagefind falhou — fallback JSON.");
      runFallback(q);
    });
  }

  function doSearch(q) {
    if (!q || !q.trim()) { setStatus(""); clearResults(); return; }
    q = q.trim();
    runPagefind(q);
  }

  // ---- init ----
  document.addEventListener("DOMContentLoaded", function () {
    if (!inputEl) return;
    var params = new URLSearchParams(location.search);
    var q = params.get("q");
    if (q) { inputEl.value = q; doSearch(q); }
  });

  // Submissão do formulário (teclado-friendly: Enter funciona)
  var form = document.querySelector(".search-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = inputEl.value.trim();
      var url = new URL(location.href);
      url.searchParams.set("q", q);
      history.replaceState(null, "", url);
      doSearch(q);
    });
  }

  // Expor para testes
  window.PM_search = doSearch;
})();
