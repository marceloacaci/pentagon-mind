/* ============================================================
   PENTAGON-MIND — helpers compartilhados
   ============================================================ */
(function () {
  "use strict";

  // Resolve a media slug to a verified local path (or a graceful fallback).
  window.PM_IMG = function (slug, alt) {
    var base = (window.PM_MEDIA && window.PM_MEDIA[slug]) || "";
    var img = document.createElement("img");
    img.loading = "lazy";
    img.alt = alt || (window.PM_MEDIA_META && window.PM_MEDIA_META[slug]) || "";
    if (base) {
      img.src = base;
    } else {
      // Fallback plate — no broken images
      img.src =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">' +
            '<rect width="100%" height="100%" fill="#121925"/>' +
            '<rect x="1" y="1" width="638" height="358" fill="none" stroke="#243244"/>' +
            '<text x="50%" y="50%" fill="#5d6b7d" font-family="monospace" font-size="14" text-anchor="middle" dominant-baseline="middle">[ IMAGEM NÃO DISPONÍVEL ]</text>' +
            "</svg>"
        );
    }
    return img;
  };

  // Build a responsive figure with caption.
  window.PM_FIGURE = function (slug, caption, alt) {
    var fig = document.createElement("figure");
    fig.className = "media";
    fig.appendChild(window.PM_IMG(slug, alt));
    if (caption) {
      var c = document.createElement("figcaption");
      c.innerHTML = caption;
      fig.appendChild(c);
    }
    return fig;
  };

  // Mobile nav toggle (injected in topbar markup)
  document.addEventListener("DOMContentLoaded", function () {
    var t = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (t && links) {
      t.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        t.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          links.classList.remove("open");
          t.setAttribute("aria-expanded", "false");
        }
      });
      // Escape fecha o menu e devolve o foco ao controle (WCAG 2.1 AA)
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && links.classList.contains("open")) {
          links.classList.remove("open");
          t.setAttribute("aria-expanded", "false");
          t.focus();
        }
      });
    }
  });

  // Graceful image fallback: any <img class="pm-img"> that fails to load
  // swaps to a neutral plate (no broken-image icons in the briefing).
  document.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (t && t.tagName === "IMG" && !t.dataset.fallback) {
        t.dataset.fallback = "1";
        t.src =
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">' +
              '<rect width="100%" height="100%" fill="#121925"/>' +
              '<rect x="1" y="1" width="638" height="358" fill="none" stroke="#243244"/>' +
              '<text x="50%" y="50%" fill="#5d6b7d" font-family="monospace" font-size="14" text-anchor="middle" dominant-baseline="middle">[ IMAGEM NÃO DISPONÍVEL ]</text>' +
              "</svg>"
          );
      }
    },
    true
  );

})();
