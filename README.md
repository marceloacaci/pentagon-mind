# PENTAGON-MIND

> Portal web **estático** de análise de defesa, tecnologia militar e projeções geopolíticas dos Estados Unidos.

## Visão Geral

O **PENTAGON-MIND** é um portal web estático (sem backend, sem banco de dados server-side) voltado à análise objetiva da doutrina militar, do arsenal tecnológico e da postura geopolítica dos Estados Unidos. O conteúdo é redigido em língua portuguesa (`lang="pt-BR"`) e estruturado segundo o padrão de rigor das instituições de referência **RAND Corporation**, **CSIS** e **SIPRI**.

O portal **não constitui aconselhamento estratégico oficial**. Imagens são de domínio público ou do Governo dos EUA (Wikimedia Commons). Citações são reproduzidas conforme registros públicos (DoD, CRS, SIPRI).

## Público-Alvo

- **Analistas de defesa** e de inteligência.
- **Acadêmicos de Relações Internacionais** e ciência política.
- **Historiadores militares** e pesquisadores de segurança internacional.

O tom e a densidade técnica são calibrados para leitores com formação na área — não para o público geral.

## Tom e Estilo

Diretriz editorial rígida (ver [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md)):

- **Objetivo e estéril**: descrever capacidades e posturas (hard/soft/smart power) sem julgamento partidário.
- **Altamente técnico**: terminologia militar e geopolítica precisa, com glossário de siglas (`glossario.html`).
- **Sem sensacionalismo, sem gamificação, sem elementos de redes sociais** — em conformidade com o perfil sério do público-alvo.

## Stack Tecnológica

| Camada | Tecnologia | Nota |
|---|---|---|
| Apresentação | HTML5 + CSS3 (vanilla) | Design system central em `css/styles.css` |
| Comportamento | JavaScript (vanilla, ES modules) | Nav/footer, glossary engine, threat-map, matriz |
| Dados | `data/glossary.js`, `data/ontology.json` | Sem backend; versionado no Git |
| Imagens | Bundle local (`assets/img/`) | Domínio público / Gov. EUA |
| Servidor local | `node assets/serve.cjs` | Apenas desenvolvimento |
| Verificação | `node assets/verify.js` | Valida as 6 páginas |

**Performance/segurança**: site 100% estático (sem superfície de ataque server-side); nenhum dado pessoal coletado; assets versionados; CSS/JS minificáveis sem quebra de funcionalidade.

## Estrutura de Conteúdo

`index.html` é o **hub central de inteligência (Briefing de Ameaças)** e aponta para as seções analíticas:

| Rota | Seção | Foco |
|---|---|---|
| `index.html` | Briefing de Inteligência | Mapa de vetores de ameaça, índices de capacidade, módulos |
| `doutrina.html` | Doutrina Militar | Evolução: desgaste industrial → COIN → GPC → MDO/JADC2 |
| `politicas-presidenciais.html` | Nexo de Comando Executivo | Matriz Bush 41 → Trump 2 (hard/soft/smart power) |
| `arsenal-tecnologia.html` | Tecnologia de Defesa | Tríade nuclear, 5ª/6ª geração, hipersônicos, spin-offs DARPA |
| `impactos-geopoliticos.html` | Geopolítica EUA | Estudos de caso, postura multidomínio |
| `glossario.html` | Glossário Analítico | 33 siglas EN→PT, popups inline |

## Como servir localmente

```bash
node assets/serve.cjs
# http://127.0.0.1:8726/index.html
```

## Verificação

```bash
node assets/verify.js
```

## Documentação

- [`docs/architecture.md`](docs/architecture.md) — Arquitetura de Informação, fluxo de usuário, componentes, sitemap.
- [`docs/uml/`](docs/uml/) — Diagramas PlantUML (fluxo, componentes, sitemap, Gantt).
- [`docs/sprints.md`](docs/sprints.md) — Backlog e planejamento de sprints.
- [`docs/brainstorm.md`](docs/brainstorm.md) — Diferenciais e recursos analíticos.
- [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md) — Guia de estilo editorial.
- [`docs/deploy.md`](docs/deploy.md) — Deploy e manutenção.
- [`docs/checklists.md`](docs/checklists.md) — Checklist de qualidade de dados.

## Estrutura de pastas

```
/
├── index.html  doutrina.html  politicas-presidenciais.html
├── arsenal-tecnologia.html  impactos-geopoliticos.html  glossario.html
├── css/  js/  data/  assets/
├── docs/
│   ├── editorial-guidelines.md
│   ├── architecture.md
│   ├── sprints.md  brainstorm.md  deploy.md  checklists.md
│   └── uml/            (PlantUML: user-flow, component-diagram, sitemap, gantt)
├── content/
│   ├── briefings/      (modelo de conteúdo futuro, ver content/README.md)
│   └── analysis/
└── assets/wireframes/  (wireframes baixa fidelidade)
```

## Créditos

Imagens: domínio público / Governo dos EUA (Wikimedia Commons). Conteúdo educacional e historiográfico.
