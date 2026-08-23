# Sprint 2 — Template de Análise Profunda e Corpus Piloto

| Campo | Valor |
|---|---|
| **Épico** | E2 — Template de análise profunda e ingestão de conteúdo |
| **Janela** | 2026-09-07 → 2026-09-18 (**2 semanas fixas**) |
| **Capacidade** | 26 pontos |
| **Comprometido** | 26 pontos (US-05, US-06, US-07 parcial, US-08) |
| **Marco** | **M2 — Ingestão de Dados Piloto** (2026-09-18) |
| **Status** | Em execução |

---

## 1. Objetivo da Sprint

Converter o portal de "estrutura navegável" em "fonte de trabalho": entregar o
template canônico de artigo, o catálogo com filtragem facetada e um corpus
piloto de **5 a 10 briefings com dados históricos reais e citações verificadas**.
Nenhum artigo é publicado sem duas fontes independentes, das quais ao menos uma
primária do Governo dos EUA.

## 2. Escopo Comprometido

| ID | História | Pontos | Estado |
|---|---|---|---|
| US-05 | Filtragem de briefings por vetor militar | 8 | Concluída |
| US-06 | Template padronizado de artigo | 8 | Concluída |
| US-07 | Ingestão de 5 a 10 briefings piloto verificados | 13 → **8 nesta sprint** | Em verificação |
| US-08 | Referências cruzadas por ontologia | 5 | Concluída |
| | **Total** | **26** | |

> US-07 foi decomposta: a **ingestão** (8 pontos) fecha nesta sprint; a
> **verificação bibliográfica final** (5 pontos) consome o buffer editorial e é o
> critério de liberação do marco M2.

## 3. Tarefas Técnicas

### Template de artigo (`article.html`)

- [x] Estrutura canônica: lead · contexto · análise · dados técnicos ·
      "Em outras palavras" · referências.
- [x] Loader estático resolvendo `?briefing=<id>` contra
      `content/briefings/index.json`.
- [x] **Validação por allow-list** do parâmetro de rota; injeção de conteúdo
      exclusivamente por `textContent` (mitigação de DOM XSS — OWASP A03).
- [x] Estado de erro explícito para identificador inexistente ou forjado, sem
      exceção não tratada no console.
- [x] `meta description` derivada do lead, `canonical` com parâmetro e JSON-LD
      `Article` com `datePublished`.
- [x] Wireframe de referência em `assets/wireframes/article-wireframe.puml`.

### Catálogo facetado (`briefings.html`)

- [x] Facetas: `ano` · `vetor_militar` · `administracao_potus` ·
      `regiao_geopolitica` · `doutrina` · `arma`.
- [x] Composição conjuntiva de facetas; chips ativos removíveis individualmente.
- [x] Contador de resultados sincronizado com os itens visíveis.
- [x] Estado vazio explícito com ação de limpar filtros, em região `aria-live="polite"`.
- [x] `aria-pressed` nos controles de faceta; operação integral por teclado.

### Contrato de conteúdo

- [x] `content/_template.md` como contrato de Front Matter.
- [x] Enums de taxonomia fixados em `docs/architecture.md` §4.
- [x] `content/briefings/index.json` como índice e allow-list única.
- [x] `content/analysis/` criado para análises aprofundadas (formato Markdown).

### Corpus piloto ingerido (9 briefings)

| # | Briefing | `ano` | `regiao_geopolitica` | Fonte primária |
|---|---|---|---|---|
| 1 | Guerra da Coreia | 1950 | asia-oriental | JCS · registro histórico do DoD |
| 2 | Crise dos Mísseis de Cuba | 1962 | americas | registros presidenciais · DoD |
| 3 | Estreito de Ormuz | 1980 | oriente-medio | CRS · USCENTCOM |
| 4 | Operação Tempestade no Deserto | 1991 | oriente-medio | DoD Gulf War report |
| 5 | Operation Enduring Freedom | 2001 | asia-central | CRS · DoD |
| 6 | Operation Iraqi Freedom | 2003 | oriente-medio | CRS · GAO |
| 7 | Dissuasão Espacial e Cibernética | 2019 | global | USSF · NIST (PQC) |
| 8 | Guerra Rússia–Ucrânia | 2022 | euro-atlantico | CRS · DoD (assistência de segurança) |
| 9 | Contingência do Estreito de Taiwan | 2022 | indo-pacifico | CRS · RAND · DoD China Report |

- [x] Cada briefing com `id` único, Front Matter completo e enums válidos.
- [x] Citações `ipsis litteris` conferidas contra o registro público original.
- [x] Designações de equipamento em nomenclatura oficial do DoD.
- [ ] **Pendente (buffer editorial):** revalidação de todas as URLs de fonte e
      registro de identificador estável (número de série CRS/RAND) para as
      entradas que ainda dependem apenas de URL.

### Ontologia e referências cruzadas

- [x] `data/ontology.json`: 7 administrações, 11 conflitos, 20 sistemas de armas.
- [x] `trump` (2017–2021) e `trump2` (2025–2029) como administrações **distintas**.
- [x] Seção de correlações no artigo, com links internos resolvíveis.

## 4. Definition of Done da Sprint

- [x] `node assets/verify.js` → **VERIFICATION PASSED**.
- [x] Cenários Gherkin de US-05, US-06 e US-08 verificados em browser real.
- [x] Filtragem operada integralmente por teclado.
- [x] Identificador forjado em `?briefing=` não executa script.
- [ ] Checklist de fact-check de `../quality.md` §1 integralmente marcado para os
      9 briefings (**bloqueia M2**).
- [ ] Verificador de links sem falha (depende da Sprint 3 para automação em CI).

## 5. Buffer Editorial (2 dias)

| Destinação | Alocação |
|---|---|
| Revalidação de URL e registro de número de série de fonte | 1 dia |
| Revisão de viés linguístico nos 9 briefings (`quality.md` §1.2) | 0,5 dia |
| Uniformização de formatação bibliográfica | 0,5 dia |

**Regra aplicada:** o escopo de conteúdo cede antes da etapa de fact-check. Se o
buffer se esgotar, o corpus é reduzido para o mínimo de 5 briefings do marco M2 —
nunca se publica artigo com verificação incompleta.

## 6. Riscos da Sprint

| Risco | Estado | Mitigação |
|---|---|---|
| Redação de briefing excede a estimativa | Materializado (parcial) | M2 exige 5; os 9 ingeridos absorvem folga |
| Link rot em relatório CRS/RAND | Ativo | registrar número de série + snapshot arquivado |
| Divergência de nomenclatura entre fontes | Controlado | `editorial-guidelines.md` §2 é autoridade final |
| Deriva de tom em texto histórico | Ativo | revisão de viés como portão, não tarefa opcional |

## 7. Saída para a Sprint 3

- Corpus de 9 briefings indexável — habilita a busca estática (US-09).
- Volume acima do gatilho de 15 documentos exigirá `data/references.json`
  centralizado (US-13, v1.2).
- Verificação de links precisa deixar de ser manual: automatizar no pipeline
  (US-11).
