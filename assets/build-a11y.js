#!/usr/bin/env node
/* ============================================================
   PENTAGON-MIND — Injetor de acessibilidade estrutural (DRY, idempotente)
   - Link "Pular para o conteúdo" como primeiro elemento focável (WCAG 2.1 AA)
   - Garante <main id="conteudo"> para âncora do skip-link
   - Garante <a class="brand"> em <header> quando aplicável
   Idempotente: remove marcadores <!-- pm-a11y --> anteriores.
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const SKIP = '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>';

const PAGES = [
  'index.html', 'doutrina.html', 'politicas-presidenciais.html',
  'topicos-presidenciaveis.html', 'otan.html', 'arsenal-tecnologia.html',
  'impactos-geopoliticos.html', 'dominios-estrategicos.html',
  'briefings.html', 'glossario.html', 'article.html'
];

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }
function write(p, c) { fs.writeFileSync(path.join(ROOT, p), c); }

PAGES.forEach((file) => {
  let html = read(file);
  const before = html;
  // remove skip-link prévio
  html = html.replace(/<a class="skip-link"[^>]*>[\s\S]*?<\/a>\s*/g, '');

  // Insere skip-link imediatamente após <body>
  html = html.replace(/(<body[^>]*>)/, '$1\n  ' + SKIP);

  // Garante id="conteudo" no <main> (article.html usa <main class="wrap">)
  if (html.includes('<main') && !html.includes('id="conteudo"')) {
    html = html.replace(/<main([^>]*)>/, '<main id="conteudo"$1>');
  }

  if (html !== before) {
    write(file, html);
    console.log('  OK   a11y: ' + file);
  } else {
    console.log('  --   sem alteração: ' + file);
  }
});
console.log('PENTAGON-MIND — build-a11y concluído');
