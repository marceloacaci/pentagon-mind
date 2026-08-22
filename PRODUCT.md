# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS (vanilla, sem build) — servido por `assets/serve.cjs` (Node, porta 8726). Imagens domínio público via Wikimedia Commons (bundle local em `assets/img/`). [inferido do brief + código existente]

## Users

Analistas de defesa, acadêmicos de relações internacionais e historiadores militares (público-alvo declarado no brief). Leitores que buscam rigor técnico no padrão RAND / CSIS / SIPRI. [inferido do brief]

## Product Purpose

Repositório analítico de nível corporativo sobre o aparato militar dos Estados Unidos: doutrina operacional (passado industrial → competição de grandes potências → operações multidomínio), tecnologia de defesa e spin-offs civis (DARPA/Pentagon), e projeções geopolíticas. Tom objetivo, estéril, altamente técnico. [inferido do brief]

## Positioning

Portal de referência em língua portuguesa (pt-BR) que cruza doutrina, presidências (Bush 41 → Trump 2), arsenal e geopolítica numa ontologia relacional única, com citações verificáveis e fontes primárias (CRS, DoD, SIPRI).

## Operating Context

Leitura em桌面/navegador; conteúdo denso com glossário de siglas, mapa de vetores de ameaça, matriz presidencial e fichas de armamentos. [inferido do brief + código]

## Capabilities and Constraints

- 6 páginas estáticas: index (briefing), doutrina, politicas-presidenciais, arsenal-tecnologia, impactos-geopoliticos, glossario (dedicada).
- Glossary engine (popups inline + grid), threat-map com pins, matriz comparativa com filtros, fichas `<details>` expansíveis.
- Conteúdo pt-BR; `lang="pt-BR"`.
- Sem backend; todas as imagens são reais (domínio público / Governo EUA).
- Sistema de design compartilhado (css/styles.css) + nav/footer injetados via js/nav.js. [verificado no código]

## Brand Commitments

- Identidade visual "command-center intelligence briefing": escuro, estéril, técnico. Texto padrão branco absoluto; destaques em âmbar. [verificado no código/CSS]
- Padrão de UI herdado do projeto MeuBolso do usuário (raised cards, gear-opt hover, sem troca de cor no hover). [verificado]

## Evidence on Hand

- data/glossary.js (33 termos/siglas EN→PT), data/ontology.json (administrações, conflitos, sistemas de armas).
- Citações verificáveis: Powell (1992), Mattis (2003/2017), Milley (CJCS), Brodie (1959), Dugan (DARPA 2012).
- references/ CRS, DoD Joint Publications, SIPRI Yearbook, Foreign Affairs. [verificado no código]

## Product Principles

1. Rigor sobre retórica: toda afirmação ancorada em fonte primária ou oficial.
2. Neutralidade analítica: descrever posturas (hard/soft/smart power) sem julgamento partidário.
3. Relevo técnico via UI "raised/gear-opt" — profundidade percebida sem ruído visual.
4. Acessibilidade de术语: glossário inline + página dedicada para desambiguar siglas. [inferido do brief]

## Accessibility & Inclusion

Contraste AA em modo escuro (texto branco sobre --bg #14161a); popups com `role="button"`/`tabindex`/`aria-label`; navegação por teclado nos termos. [verificado no código]
