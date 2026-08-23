#!/usr/bin/env node
/**
 * Valida o contrato de Front Matter / metadados dos briefings.
 * Portao 4 do pipeline (.github/workflows/deploy.yml).
 *
 * Regras verificadas:
 *  - campos obrigatorios presentes no indice;
 *  - id em kebab-case e unico;
 *  - arquivo de conteudo correspondente existente;
 *  - data em ISO-8601;
 *  - valores de enum pertencentes ao dominio de docs/architecture.md secao 4.
 *
 * Saida: "FRONT MATTER OK - N briefings validados" e exit 0, ou lista de
 * defeitos e exit 1.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'content', 'briefings', 'index.json');

const REQUIRED = ['id', 'title', 'date', 'region', 'category', 'tags'];

const ENUM_REGION = new Set([
  'indo-pacifico', 'euro-atlantico', 'oriente-medio', 'asia-central',
  'asia-oriental', 'africa', 'americas', 'artico', 'global'
]);

const ENUM_CATEGORY = new Set(['briefing', 'analysis']);

const errors = [];

function fail(msg) {
  errors.push(msg);
}

if (!fs.existsSync(INDEX)) {
  console.error('FALHA: indice nao encontrado em ' + INDEX);
  process.exit(1);
}

let index;
try {
  index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
} catch (e) {
  console.error('FALHA: index.json invalido - ' + e.message);
  process.exit(1);
}

if (!Array.isArray(index)) {
  console.error('FALHA: index.json deve conter um array');
  process.exit(1);
}

const seen = new Set();

for (const b of index) {
  const id = b && b.id ? b.id : '(sem id)';

  for (const key of REQUIRED) {
    const v = b[key];
    const empty = v === undefined || v === null || v === '' ||
      (Array.isArray(v) && v.length === 0);
    if (empty) {
      fail('campo obrigatorio ausente ou vazio: "' + key + '" em ' + id);
    }
  }

  if (typeof b.id !== 'string' || !/^[a-z0-9-]+$/.test(b.id || '')) {
    fail('id fora do padrao kebab-case: ' + id);
  }

  if (seen.has(b.id)) {
    fail('id duplicado no corpus: ' + id);
  }
  seen.add(b.id);

  const file = path.join(ROOT, 'content', 'briefings', b.id + '.json');
  if (!fs.existsSync(file)) {
    fail('arquivo de conteudo ausente para o indice: content/briefings/' + b.id + '.json');
  } else {
    try {
      JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      fail('JSON invalido em content/briefings/' + b.id + '.json - ' + e.message);
    }
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date || '')) {
    fail('data fora do padrao ISO-8601 (YYYY-MM-DD) em ' + id + ': ' + b.date);
  }

  if (!ENUM_REGION.has(b.region)) {
    fail('regiao_geopolitica fora do enum em ' + id + ': ' + b.region);
  }

  if (!ENUM_CATEGORY.has(b.category)) {
    fail('category fora do enum (briefing|analysis) em ' + id + ': ' + b.category);
  }

  if (!Array.isArray(b.tags)) {
    fail('tags deve ser um array em ' + id);
  }

  if (typeof b.title !== 'string' || b.title.length < 8) {
    fail('title ausente ou demasiado curto em ' + id);
  }
}

if (errors.length > 0) {
  console.error('FRONT MATTER FAILED - ' + errors.length + ' defeito(s):');
  for (const e of errors) {
    console.error('  - ' + e);
  }
  process.exit(1);
}

console.log('FRONT MATTER OK - ' + index.length + ' briefings validados');
