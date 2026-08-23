# PENTAGON-MIND

> Portal estático de inteligência geopolítica e doutrina militar dos Estados
> Unidos. Análise de defesa, tecnologia militar e projeções geopolíticas em
> português (pt-BR).

---

## 1. Visão Geral Executiva

O **PENTAGON-MIND** é um hub estático de análise de defesa voltado a
**analistas de inteligência, acadêmicos de Relações Internacionais e
historiadores militares**. Cobre três eixos:

1. **Doutrina militar** — evolução do desgaste industrial à dissuasão integrada,
   passando por AirLand Battle, COIN, Great Power Competition (GPC) e
   Operações Multidomínio (MDO/JADC2).
2. **Arsenal tecnológico** — tríade nuclear, plataformas de 5ª e 6ª geração,
   sistemas hipersônicos, armas de energia dirigida, domínios espacial e
   cibernético, e *spin-offs* da DARPA.
3. **Projeções geopolíticas** — políticas presidenciais de Bush 41 a Trump 2,
   estudos de caso regionais e escalada multidomínio.

**Posicionamento.** O portal opera como registro analítico, não como veículo de
opinião. O tom é cirúrgico, estéril, tecnicamente denso e **geopoliticamente
neutro**: descreve capacidade e postura, nunca aprova ou condena. Não há
gamificação, componente de rede social, comentários abertos, *newsletter* ou
analytics de terceiros. Prioriza-se **densidade de informação bruta e
legibilidade** sobre ornamento visual.

O portal **não constitui aconselhamento estratégico oficial**. Todo conteúdo
deriva de fontes públicas: DoD Joint Publications, Congressional Research
Service (CRS), GAO, RAND, CSIS, SIPRI e IISS. Imagens são de domínio público ou
obra do Governo dos EUA.

### Estado atual

| Métrica | Valor |
|---|---|
| Páginas publicadas | 8 |
| Briefings no corpus | 9 (com fontes primárias verificadas) |
| Termos no glossário | 33 (EN → pt-BR, com glosa) |
| Ontologia | 7 administrações · 11 conflitos · 20 sistemas de armas |
| Imagens locais | 59 (domínio público / Gov. EUA) |
| Dependências de runtime | **0** |

---

## 2. Stack e Guia de Setup Local

### 2.1 Decisão de stack

O portal usa um **gerador estático de grau zero (vanilla)**: HTML5 + CSS3 +
JavaScript ES-modules, **sem etapa de compilação**. O HTML publicado é o próprio
artefato versionado.

Racional completo — incluindo a comparação com Hugo, Jekyll e Next.js SSG e o
gatilho objetivo de migração (**corpus acima de 150 documentos**) — em
[`docs/architecture.md`](docs/architecture.md) §1.

| Camada | Tecnologia | Arquivo |
|---|---|---|
| Apresentação | HTML5 semântico | `*.html` (raiz) |
| Design system | CSS3 com tokens | `css/styles.css` |
| Comportamento | JavaScript ES-modules | `js/*.js` |
| Dados | JS/JSON versionado | `data/glossary.js`, `data/ontology.json` |
| Conteúdo | JSON/Markdown | `content/briefings/`, `content/analysis/` |
| Imagens | Bundle local | `assets/img/` + `media.js` |
| Servidor de dev | Node (stdlib) | `assets/serve.cjs` |
| Verificação | Node (stdlib) | `assets/verify.js`, `assets/check_frontmatter.js` |

### 2.2 Pré-requisitos

| Requisito | Versão | Necessário para |
|---|---|---|
| **Node.js** | ≥ 18 (LTS 20 recomendado) | servidor local e verificadores |
| **Git** | ≥ 2.30 | controle de versão |
| **Python** | ≥ 3.9 *(opcional)* | `assets/download_images.py` |
| **Java** | ≥ 8 *(opcional)* | compilar diagramas PlantUML localmente |

Não há `npm install`: **nenhuma dependência de runtime** é instalada. Os
verificadores usam apenas a biblioteca padrão do Node.

### 2.3 Instalação

```bash
git clone https://github.com/marceloacaci/pentagon-mind.git
cd pentagon-mind
node --version    # deve reportar >= 18
```

### 2.4 Servidor de desenvolvimento

```bash
node assets/serve.cjs
# -> http://127.0.0.1:8726/
```

O servidor é **exclusivamente para desenvolvimento** e não faz *hot-reload*:
após editar CSS ou JS, recarregue a página com invalidação de cache
(`Ctrl+F5` ou `?nocache=N` na URL). Alteração visual só é considerada válida
após **medição** por `getComputedStyle` — nunca por impressão visual.

### 2.5 Verificação

```bash
node assets/verify.js            # integridade estrutural -> VERIFICATION PASSED
node assets/check_frontmatter.js # contrato de metadados  -> FRONT MATTER OK
```

`verify.js` confere existência das páginas, resolução dos slugs de imagem,
validade da ontologia, sintaxe de todos os scripts (`node --check`), *parse* do
glossário e a fiação de cada página. `check_frontmatter.js` valida os campos
obrigatórios, unicidade de `id`, formato ISO-8601 de data e conformidade de
enums do índice de briefings.

### 2.6 Build de produção

Não há comando de build para a autoria — o conteúdo do repositório **é** o
artefato publicável. O pipeline executa apenas a indexação de busca:

```bash
npx pagefind --site . --output-path pagefind
```

### 2.7 Diagramas (opcional)

```bash
java -jar plantuml.jar -charset UTF-8 -tpng -o ./out docs/uml/*.puml
```

Diagramas Mermaid (`docs/chronogram.md`) renderizam nativamente no GitHub.

---

## 3. Fluxo de Contribuição e Governança

### 3.1 Modelo de branch — Trunk-Based Development

`main` é o **tronco único**, sempre publicável e protegido. Toda alteração entra
por *branch* de vida curta (**≤ 2 dias**) e *pull request*.

```text
main ──o───────o───────o──────>  (protegida; deploy automático)
        \     /       /
         o───o       o           feat/*  fix/*  docs/*  content/*
      (<= 2 dias, PR obrigatório)
```

| Prefixo | Uso |
|---|---|
| `feat/` | nova funcionalidade de interface ou dados |
| `fix/` | correção de defeito |
| `docs/` | documentação e artefatos de governança |
| `content/` | novo briefing ou análise |
| `chore/` | infraestrutura, CI, manutenção |

Regras: sem *commit* direto em `main`; sem *branch* de longa duração; sem
`git push --force` em `main`; *rebase* preferido a *merge commit*.

### 3.2 Padrão de commits — Conventional Commits

```text
<tipo>(<escopo opcional>): <descrição no imperativo, minúscula, sem ponto final>
```

Tipos admitidos: `feat` · `fix` · `docs` · `content` · `style` · `refactor` ·
`test` · `chore` · `ci`.

```text
feat(briefings): adiciona filtragem facetada por vetor militar
content(taiwan): ingere briefing da contingencia do Estreito de Taiwan
fix(glossary): devolve foco ao termo de origem ao fechar popup com Escape
docs(architecture): documenta CSP self-only e mapeamento OWASP
```

### 3.3 Submissão de novos artigos — regras estritas

Um *pull request* de conteúdo é **rejeitado** se qualquer item falhar:

1. **Localização e formato.** Briefing em `content/briefings/<id>.json`, com
   entrada correspondente em `content/briefings/index.json`. Análise em
   `content/analysis/<id>.md`. Base: `content/_template.md`.
2. **Front Matter completo.** Campos obrigatórios e enums conforme
   [`docs/architecture.md`](docs/architecture.md) §4. `id` em kebab-case, único.
3. **Densidade de fontes.** Mínimo de **2 fontes independentes**, sendo
   **≥ 1 primária do Governo dos EUA**. Cada fonte com identificador estável
   (nº de série CRS/RAND, DOI, ISBN) além da URL — URL isolada não é aceita.
4. **Nomenclatura oficial.** Designação DoD completa
   (`LGM-30G Minuteman III`, `F-35A Lightning II`). Ver
   [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md) §6.
5. **Neutralidade.** Nenhum adjetivo sensacionalista, nenhum juízo partidário,
   nenhuma antropomorfização de Estado. Projeções em modo condicional.
6. **Estrutura canônica.** Síntese · Contexto · Análise · Dados Técnicos ·
   *(Em outras palavras)* · Referências.
7. **Acessibilidade.** `alt` descritivo, contraste medido ≥ 4,5:1, operação por
   teclado.
8. **Verificação.** `node assets/verify.js` e `node assets/check_frontmatter.js`
   passando localmente **antes** de abrir o PR.
9. **Rodapé de auditoria** preenchido na descrição do PR:

```text
Fact-check:   [x] 2+ fontes, >=1 primaria US Gov
Vies:         [x] revisado (quality.md 1.2)
Bibliografia: [x] formato + links resolviveis
A11y:         [x] WCAG 2.1 AA
Verify:       [x] VERIFICATION PASSED
```

### 3.4 Portões automatizados

O *merge* é bloqueado por [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

| # | Portão | Ferramenta |
|---|---|---|
| 1 | Lint de Markdown | `markdownlint-cli2` |
| 2 | Validação semântica de HTML | `html-validate` |
| 3 | Links quebrados | `lychee` |
| 4 | Integridade estrutural + Front Matter | `verify.js` + `check_frontmatter.js` |
| 5 | Índice de busca | `pagefind` |
| 6 | Publicação | `actions/deploy-pages` |

Falha em qualquer portão impede o deploy e **preserva a versão publicada
anteriormente**.

---

## 4. Estrutura de Conteúdo

| Rota | Seção | Foco |
|---|---|---|
| `index.html` | Briefing Central | mapa de vetores de ameaça, índices de capacidade |
| `doutrina.html` | Doutrina Militar | passado · presente · futuro |
| `politicas-presidenciais.html` | Políticas Presidenciais | matriz Bush 41 → Trump 2 |
| `arsenal-tecnologia.html` | Arsenal Tecnológico | tríade, 5ª/6ª geração, hipersônicos, DEW |
| `impactos-geopoliticos.html` | Impactos Geopolíticos | estudos de caso, escalada multidomínio |
| `briefings.html` | Catálogo de Briefings | 9 briefings com filtragem facetada |
| `article.html?briefing=<id>` | Template de Artigo | renderiza `content/briefings/<id>.json` |
| `glossario.html` | Glossário Analítico | 33 siglas, popups inline |

> **Trump 1 (2017–2021)** e **Trump 2 (2025–2029)** são administrações
> **distintas** na ontologia — a descontinuidade doutrinária entre elas é objeto
> de análise, não detalhe de catalogação.

---

## 5. Documentação

| Documento | Conteúdo |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | justificativa do SSG, taxonomia de Front Matter, CSP e OWASP |
| [`docs/editorial-guidelines.md`](docs/editorial-guidelines.md) | design system sóbrio e regras de escrita militar |
| [`docs/quality.md`](docs/quality.md) | checklists de fact-checking e de code review |
| [`docs/chronogram.md`](docs/chronogram.md) | cronograma Gantt (Mermaid), milestones e buffer de 20% |
| [`docs/brainstorm.md`](docs/brainstorm.md) | visualização de dados e sistema de citação (v2.0+) |
| [`docs/sprints/backlog.md`](docs/sprints/backlog.md) | product backlog com critérios em Gherkin |
| [`docs/sprints/sprint-1.md`](docs/sprints/sprint-1.md) | fundação e design system |
| [`docs/sprints/sprint-2.md`](docs/sprints/sprint-2.md) | template de artigo e corpus piloto |
| [`docs/sprints/sprint-3.md`](docs/sprints/sprint-3.md) | busca estática, SEO e deploy |
| [`docs/uml/`](docs/uml/) | diagramas PlantUML (fluxo, componentes, sitemap) |
| [`docs/deploy.md`](docs/deploy.md) | deploy e manutenção operacional |

---

## 6. Estrutura de Diretórios

```text
/
├── .github/workflows/deploy.yml     pipeline com 6 portões
├── README.md
├── index.html  doutrina.html  politicas-presidenciais.html
├── arsenal-tecnologia.html  impactos-geopoliticos.html
├── briefings.html  article.html  glossario.html
├── css/styles.css                   design system
├── js/                              nav · glossary · ontology · article · briefings
├── data/                            glossary.js · ontology.json
├── docs/
│   ├── architecture.md  editorial-guidelines.md  quality.md
│   ├── chronogram.md  brainstorm.md  deploy.md  checklists.md
│   ├── uml/                         user-flow · component-diagram · sitemap
│   └── sprints/                     backlog · sprint-1 · sprint-2 · sprint-3
├── content/
│   ├── _template.md                 contrato de Front Matter
│   ├── briefings/                   9 briefings + index.json
│   └── analysis/                    análises aprofundadas
└── assets/
    ├── img/                         59 imagens locais + media.js
    ├── wireframes/                  wireframes PlantUML
    ├── serve.cjs                    servidor de dev (porta 8726)
    ├── verify.js                    integridade estrutural
    └── check_frontmatter.js         contrato de metadados
```

---

## 7. Segurança

- **100% estático**: sem servidor de aplicação, sem banco, sem sessão — os
  vetores A01, A07 e A10 do OWASP Top 10 são inaplicáveis por construção.
- **CSP *self-only*** sem `unsafe-inline`: nenhum `<script>`/`style` inline,
  nenhum `on*=` em atributo.
- **Mitigação de DOM XSS**: o parâmetro `?briefing=<id>` é validado contra
  *allow-list* derivada de `content/briefings/index.json`; conteúdo injetado por
  `textContent`, nunca por `innerHTML`.
- **Zero dependências de runtime**: superfície de *supply-chain* nula.
- **Sem coleta de dados**: nenhum cookie, pixel ou analytics de terceiros.

Detalhamento e mapeamento completo do OWASP Top 10 em
[`docs/architecture.md`](docs/architecture.md) §5.

---

## 8. Créditos e Licenciamento de Conteúdo

Imagens: domínio público ou obra do Governo dos EUA (DVIDS, DoD, forças
singulares, via Wikimedia Commons). Citações reproduzidas conforme registro
público (DoD, CRS, Congresso dos EUA). Conteúdo de finalidade educacional,
historiográfica e analítica.
