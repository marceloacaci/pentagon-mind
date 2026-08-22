/* ============================================================
   PENTAGON-MIND — Ontology loader (Module 3 deliverable)
   Exposes window.PM_ONTOLOGY from data/ontology.json (production schema).
   Also builds a cross-reference index: administration -> doctrines/conflicts/weapons.
   ============================================================ */
(function () {
  "use strict";
  window.PM_ONTOLOGY = null;
  window.PM_ONTOLOGY_XREF = null;

  function buildXref(o) {
    var byId = {};
    (o.administrations || []).forEach(function (a) {
      byId[a.id] = {
        admin: a,
        doctrines: (a.keyDoctrines || []).map(idOf(o.doctrines, idText)),
        conflicts: (a.keyConflicts || []).map(idOf(o.conflicts, idText)),
        weapons: (a.keySystems || []).map(idOf(o.weaponSystems, idText))
      };
    });
    return byId;
  }
  function idText(x) { return x && x.name ? x.name : x ? x.id : ""; }
  function idOf(arr, fn) {
    return function (id) {
      var found = (arr || []).filter(function (x) { return x.id === id; })[0];
      return found ? fn(found) : id;
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch("data/ontology.json")
      .then(function (r) { return r.json(); })
      .then(function (json) {
        window.PM_ONTOLOGY = json;
        window.PM_ONTOLOGY_XREF = buildXref(json);
        document.dispatchEvent(new CustomEvent("pm-ontology-ready"));
      })
      .catch(function (e) {
        console.warn("[ontology] não carregou:", e);
      });
  });
})();
