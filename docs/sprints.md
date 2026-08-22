# Planejamento de Sprints — PENTAGON-MIND

> Foco em conteúdo e infraestrutura. O site atual já entrega as 6 páginas (piloto); os sprints estruturam maturidade e escala.

## Backlog do Produto (priorizado)

1. **Hub central de inteligência** — `index.html` como porta de entrada (mapa de vetores, índices, módulos). ✅ Entregue na versão piloto.
2. **Templates padronizados de artigo/análise** — consistência visual e estrutural (ver `assets/wireframes/article-wireframe.puml`).
3. **Sistema de tags/categorias** — filtragem avançada (por ano, tipo de arma, região) via `data/ontology.json`.
4. **Glossário expansível** — de 33 para ~60+ siglas com curadoria contínua.
5. **Visualizações de dados** — gráficos de orçamento, linha do tempo de doutrinas (brainstorm).
6. **SEO técnico + WCAG** — metadados, sitemap.xml, contraste AA.
7. **Deploy automatizado** — GitHub Pages / Actions.

## Sprint 1 — Setup e Design System

**Duração:** 2 semanas (alinhado à Fase 1 do cronograma).

- Ambiente estático (HTML/CSS/JS puro) validado com `assets/serve.cjs`.
- Design system definido: cores sóbrias (`--bg #14161a`, primary `#2f7fb5`, accent âmbar), tipografia legível (system-ui + mono para siglas), `--radius: 10px`, raised/gear-opt.
- Estrutura base do `index.html` como hub (mapa de vetores + índices + módulos). ✅
- `docs/editorial-guidelines.md` e `architecture.md` publicados.

**Critério de pronto:** `node assets/verify.js` PASSED; design system documentado em `DESIGN.md`.

## Sprint 2 — Templates e Conteúdo Piloto

**Duração:** 3 semanas (Fase 2 do cronograma).

- Template de página de artigo/análise (`assets/wireframes/article-wireframe.puml`) aplicado às seções existentes.
- Modelo de conteúdo em `content/briefings/` e `content/analysis/` (`_template.md`).
- 5–10 briefings reais populados (ex.: Tempestade no Deserto, Enduring Freedom, Ormuz, Taiwan, Ucrânia-Rússia).
- Glossary engine expandido e ontology cruzada (presidente↔conflito↔arma).

**Critério de pronto:** 5+ briefings publicados; popups de glossário funcionando em browser real (FCS).

## Sprint 3 — SEO, Acessibilidade e Deploy

**Duração:** 2 semanas (Fase 3 do cronograma) + 1 semana beta (Fase 4).

- SEO técnico: `<meta>` description, Open Graph, `sitemap.xml`, `robots.txt`.
- Acessibilidade WCAG 2.1 AA: contraste, `alt`, foco visível, navegação por teclado nos popups.
- Deploy inicial estático (GitHub Pages / Vercel / Netlify) via pipeline automatizado (`docs/deploy.md`).
- **Beta fechado** para grupo de analistas; validação do tom "estéril/técnico" por especialista (marco crítico).

**Critério de pronto:** site público estático; checklist de qualidade (`docs/checklists.md`) aplicado a todo conteúdo novo.
