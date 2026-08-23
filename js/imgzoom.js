/* Zoom + legenda de contexto nas imagens.
   Clique (ou Enter/Espaco) expande o proprio container (.img-zoom.expanded)
   para muito maior; o layout em redor reflui para acomodar o novo tamanho.
   A legenda fica persistente no estado expandido. Esc ou clique fora fecha.
   Idempotente: correr duas vezes nao duplica o invólucro nem os listeners. */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var bound = false;
  function bindGlobal() {
    if (bound) return; bound = true;
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".img-zoom")) return; // clique dentro nao fecha
      document.querySelectorAll(".img-zoom.expanded").forEach(function (z) {
        z.classList.remove("expanded");
        z.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".img-zoom.expanded").forEach(function (z) {
          z.classList.remove("expanded");
          z.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  function setExpanded(wrap, on) {
    wrap.classList.toggle("expanded", !!on);
    wrap.setAttribute("aria-expanded", wrap.classList.contains("expanded") ? "true" : "false");
  }

  function enhance(img) {
    if (!img || img.getAttribute("data-zoom-ready") === "1") return;

    var slug = img.getAttribute("data-slug") || "";
    var caps = window.PM_CAPTIONS || {};
    var c = caps[slug];

    var parent = img.parentNode;
    if (!parent) return;

    var wrap;
    if (parent.classList && parent.classList.contains("img-zoom")) {
      wrap = parent;
    } else {
      wrap = document.createElement("figure");
      wrap.className = "img-zoom";
      var invMargin = img.style && img.style.margin;
      if (invMargin) { wrap.style.margin = invMargin; img.style.margin = ""; }
      parent.insertBefore(wrap, img);
      wrap.appendChild(img);
    }

    if (!wrap.querySelector(".img-caption")) {
      var cap = document.createElement("figcaption");
      cap.className = "img-caption";
      if (c) {
        cap.innerHTML = "<strong>" + esc(c.t) + "</strong>" + esc(c.d) +
          (c.s ? '<span class="src">Fonte: ' + esc(c.s) + "</span>" : "");
      } else {
        var alt = img.getAttribute("alt") || "";
        if (!alt) return;
        cap.innerHTML = "<strong>" + esc(alt) + "</strong>";
      }
      wrap.appendChild(cap);
    }

    if (!wrap.hasAttribute("tabindex")) wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("role", "button");
    wrap.setAttribute("aria-expanded", "false");
    if (c && c.t && !wrap.hasAttribute("aria-label")) {
      wrap.setAttribute("aria-label", c.t + ". " + (c.d || "") + " (clique para ampliar)");
    }

    wrap.addEventListener("click", function (e) {
      e.stopPropagation();
      setExpanded(wrap, !wrap.classList.contains("expanded"));
    });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setExpanded(wrap, !wrap.classList.contains("expanded"));
      }
    });

    img.setAttribute("data-zoom-ready", "1");
  }

  function run() {
    bindGlobal();
    var imgs = document.querySelectorAll("img.pm-img");
    for (var i = 0; i < imgs.length; i++) enhance(imgs[i]);
  }

  window.PM_enhanceImages = run;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
