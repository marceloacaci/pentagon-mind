#!/usr/bin/env node
/* PENTAGON-MIND build verification — static + asset checks (no browser). */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGES = ["index.html","doutrina.html","politicas-presidenciais.html","arsenal-tecnologia.html","impactos-geopoliticos.html","glossario.html","briefings.html","article.html"];
let errors = 0;
const log = (ok, msg) => { console.log((ok ? "  OK  " : " FAIL ") + msg); if (!ok) errors++; };

// 1. Pages exist & non-empty
for (const p of PAGES) {
  const fp = path.join(ROOT, p);
  const ok = fs.existsSync(fp) && fs.statSync(fp).size > 500;
  log(ok, "page exists: " + p);
}

// 2. media.js registry parses and contains entries
const mediaPath = path.join(ROOT, "assets", "img", "media.js");
let media = {};
try {
  const src = fs.readFileSync(mediaPath, "utf8");
  const m = src.match(/window\.PM_MEDIA\s*=\s*(\{[\s\S]*?\});/);
  media = JSON.parse(m[1]);
  log(Object.keys(media).length > 0, "media.js registry parsed (" + Object.keys(media).length + " entries)");
} catch (e) {
  log(false, "media.js parse: " + e.message);
}

// 3. Every referenced image slug has a local file
const html = PAGES.map(p => fs.readFileSync(path.join(ROOT, p), "utf8")).join("\n");
const slugs = [...html.matchAll(/data-slug="([^"]+)"/g)].map(x => x[1]);
const uniq = [...new Set(slugs)];
let missing = 0;
for (const s of uniq) {
  const rel = media[s];
  if (!rel) { console.log("  MISSING REGISTRY: " + s); missing++; continue; }
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) { console.log("  MISSING FILE: " + rel); missing++; }
}
log(missing === 0, "all " + uniq.length + " image slugs resolve to local files (" + missing + " missing)");

// 4. ontology.json valid
try {
  const o = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "ontology.json"), "utf8"));
  log(true, "ontology.json valid (" + (o.administrations||[]).length + " adm, " + (o.conflicts||[]).length + " conf, " + (o.weaponSystems||[]).length + " weapons)");
} catch (e) { log(false, "ontology.json: " + e.message); }

// 5. Required JS files referenced exist
for (const f of ["js/common.js","js/nav.js","js/ontology.js","js/glossary.js","data/glossary.js","js/article.js","js/briefings.js"]) {
  log(fs.existsSync(path.join(ROOT, f)), "script present: " + f);
}

// 5b. Briefing pages wired correctly
{
  const b = fs.readFileSync(path.join(ROOT, "briefings.html"), "utf8");
  log(b.includes("js/briefings.js"), "briefings.html wired (list loader)");
  const a = fs.readFileSync(path.join(ROOT, "article.html"), "utf8");
  log(a.includes("js/article.js") && a.includes("js/glossary.js"), "article.html wired (article loader + glossary)");
}

// 5c. Briefings JSON valid + referenced by index.json
{
  let ok = true, n = 0;
  try {
    const idx = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "briefings", "index.json"), "utf8"));
    for (const meta of idx) {
      const fp = path.join(ROOT, "content", "briefings", meta.id + ".json");
      if (!fs.existsSync(fp)) { console.log("  MISSING BRIEFING: " + meta.id); ok = false; continue; }
      const d = JSON.parse(fs.readFileSync(fp, "utf8"));
      if (!d.id || !d.title || !d.bodyHtml) { console.log("  INCOMPLETE: " + meta.id); ok = false; }
      n++;
    }
    log(ok, "briefings JSON valid (" + n + " briefings, all referenced by index.json)");
  } catch (e) { log(false, "briefings JSON: " + e.message); }
}

// 6. Node syntax check on JS
const { execSync } = require("child_process");
for (const f of ["js/common.js","js/nav.js","js/ontology.js","js/glossary.js","data/glossary.js","js/article.js","js/briefings.js"]) {
  try { execSync("node --check " + path.join(ROOT, f)); log(true, "node --check: " + f); }
  catch (e) { log(false, "node --check: " + f + " -> " + e.message); }
}

// 7. Glossary terms present
try {
  const g = fs.readFileSync(path.join(ROOT, "data", "glossary.js"), "utf8");
  const defIdx = g.indexOf("window.PM_GLOSSARY =");
  const open = g.indexOf("{", defIdx);
  const aliasIdx = g.indexOf("window.PM_GLOSSARY_ALIAS =");
  const close = g.lastIndexOf("};", aliasIdx);
  let block = g.slice(open, close + 1).trim();
  const m = [null, block];
  if (m[1].slice(-1) !== "}") throw new Error("block not closed");
  const terms = (new Function("return " + m[1]))();
  log(Object.keys(terms).length >= 20, "glossary.js parsed (" + Object.keys(terms).length + " terms)");
} catch (e) { log(false, "glossary.js: " + e.message); }

// 8. Glossary wiring: dedicated page has the map host; other pages no inline section
for (const p of PAGES) {
  const c = fs.readFileSync(path.join(ROOT, p), "utf8");
  const hasHost = c.includes('id="glossario-map"');
  const hasSection = c.includes('id="glossario"');
  if (p === "glossario.html") {
    const ok = c.includes("data/glossary.js") && c.includes("js/glossary.js") && hasHost;
    log(ok, p + " wired (dedicated glossary + map host)");
  } else if (p === "article.html") {
    const ok = c.includes("js/article.js") && c.includes("js/glossary.js") && !hasHost && !hasSection;
    log(ok, p + " wired (article loader + glossary, no inline glossary)");
  } else if (p === "briefings.html") {
    const ok = c.includes("js/briefings.js") && !hasHost && !hasSection;
    log(ok, p + " wired (briefings index, no glossary section)");
  } else {
    const ok = c.includes("data/glossary.js") && c.includes("js/glossary.js") && !hasHost && !hasSection;
    log(ok, p + " glossary extracted (no inline section/host)");
  }
}

console.log("\n" + (errors === 0 ? "VERIFICATION PASSED" : "VERIFICATION FAILED (" + errors + " errors)"));
process.exit(errors === 0 ? 0 : 1);
