#!/usr/bin/env node
/* ============================================================
   PENTAGON-MIND — Injetor de metadados SEO técnicos (DRY, idempotente)
   Gera em cada página estática:
     - <link rel="canonical"> absoluto
     - Open Graph (og:type/site_name/title/description/url/locale)
     - Twitter Card (summary_large_image)
     - JSON-LD estruturado (WebSite ou Article)
   Também (re)escreve sitemap.xml e robots.txt no raiz.

   Execução: node assets/build-seo.js
   Idempotente: remove marcadores <!-- pm-seo --> anteriores antes de reinserir.
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_BASE = process.env.PM_SITE_BASE ||
  'https://marceloacaci.github.io/pentagon-mind/';
const SITE_NAME = 'PENTAGON-MIND';

// Páginas estáticas e seu tipo Open Graph.
const PAGES = {
  'index.html': 'website',
  'doutrina.html': 'article',
  'politicas-presidenciais.html': 'article',
  'topicos-presidenciaveis.html': 'article',
  'otan.html': 'article',
  'arsenal-tecnologia.html': 'article',
  'impactos-geopoliticos.html': 'article',
  'dominios-estrategicos.html': 'article',
  'briefings.html': 'website',
  'glossario.html': 'website',
  'busca.html': 'website'
};

const SEARCH_PAGE = 'busca.html';

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }
function write(p, c) { fs.writeFileSync(path.join(ROOT, p), c); }

function stripPrev(html) {
  return html.replace(/<!-- pm-seo-start -->[\s\S]*?<!-- pm-seo-end -->/g, '');
}

function extract(html, re, def) {
  const m = html.match(re);
  return m ? m[1].trim() : def;
}

function buildSeoBlock(opts) {
  const { canonical, title, description, ogType, jsonLd } = opts;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const metaOg = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  ].join('\n  ');
  return `  <!-- pm-seo-start -->\n  ${metaOg}\n  <!-- pm-seo-end -->`;
}

function urlFor(file) {
  // index.html vira raiz canônica (sem index.html); demais mantêm o .html
  return file === 'index.html' ? SITE_BASE : (SITE_BASE + file);
}

function processPage(file) {
  let html = read(file);
  const before = html;
  html = stripPrev(html);
  const title = extract(html, /<title>([\s\S]*?)<\/title>/, SITE_NAME);
  const description = extract(html, /<meta name="description" content="([\s\S]*?)"\s*\/?>/,
    'Portal analítico de doutrina militar, tecnologia de defesa e projeções geopolíticas dos Estados Unidos.');
  const canonical = urlFor(file);
  const ogType = PAGES[file] || 'website';

  const jsonLd = (ogType === 'website')
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: canonical,
        description: description,
        inLanguage: 'pt-BR'
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        inLanguage: 'pt-BR',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        publisher: { '@type': 'Organization', name: SITE_NAME }
      };

  const block = buildSeoBlock({ canonical, title, description, ogType, jsonLd });
  // Insere antes de </head>
  if (!html.includes('</head>')) {
    console.error('  FAIL sem </head> em ' + file);
    return false;
  }
  html = html.replace('</head>', block + '\n</head>');
  if (html !== before) write(file, html);
  console.log('  OK   SEO injetado: ' + file + ' (' + ogType + ')');
  return true;
}

// ---- sitemap.xml ----
function buildSitemap() {
  const lastmod = '2026-08-24';
  const staticUrls = Object.keys(PAGES).map((f) =>
    `  <url>\n    <loc>${urlFor(f)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${f === 'index.html' ? '1.0' : '0.8'}</priority>\n  </url>`
  );
  // Rotas parametrizadas de artigo (US-10): article.html?briefing=<id>
  let articleUrls = [];
  try {
    const idx = JSON.parse(read('content/briefings/index.json'));
    articleUrls = idx.map((m) =>
      `  <url>\n    <loc>${SITE_BASE}article.html?briefing=${encodeURIComponent(m.id)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  } catch (e) {
    console.error('  WARN índice de briefings não lido para sitemap: ' + e.message);
  }
  const urls = staticUrls.concat(articleUrls).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  write('sitemap.xml', xml);
  console.log('  OK   sitemap.xml (' + (staticUrls.length + articleUrls.length) + ' rotas)');
}

// ---- robots.txt ----
function buildRobots() {
  const txt =
    `# PENTAGON-MIND — robots.txt\n` +
    `User-agent: *\n` +
    `Allow: /\n` +
    `Sitemap: ${SITE_BASE}sitemap.xml\n`;
  write('robots.txt', txt);
  console.log('  OK   robots.txt');
}

// ---- exec ----
console.log('PENTAGON-MIND — build-seo');
console.log('SITE_BASE = ' + SITE_BASE);
let ok = true;
Object.keys(PAGES).forEach((f) => { if (!processPage(f)) ok = false; });
buildSitemap();
buildRobots();
process.exit(ok ? 0 : 1);
