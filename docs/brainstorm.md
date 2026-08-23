# Brainstorm — Diferenciais Analíticos e Visualização de Dados (v2.0+)

> Teto de evolução do portal. Toda ideia aqui respeita duas invariantes:
> **(a)** o site permanece 100% estático; **(b)** nenhuma gamificação, nenhum
> componente de rede social, nenhuma poluição visual.

---

## 1. Recursos Analíticos Avançados (v2.0+)

### 1.1 Série histórica de orçamento de defesa (Chart.js sobre JSON estático)

- **Dado:** `data/viz/budget-timeline.json` — dotação do DoD por ano fiscal
  (1948→presente), em dólares correntes **e** constantes de 2026, permitindo
  distinguir crescimento nominal de crescimento real.
- **Fonte:** DoD Comptroller *National Defense Budget Estimates* (Green Book) +
  CRS *Defense Primer: U.S. Defense Budget*.
- **Render:** Chart.js auto-hospedado (não CDN), `<canvas>` com eixo duplo e
  bandas sombreadas marcando conflitos (Coreia, Vietnã, Golfo, GWOT).
- **Valor analítico:** expõe visualmente a tese de que picos orçamentários
  precedem, não seguem, mudanças doutrinárias.

### 1.2 Matriz de dissuasão integrada por administração

- **Render:** heatmap SVG puro. Eixo Y = administração (`truman`→`trump2`);
  eixo X = domínio (`terrestre`, `naval`, `aereo`, `nuclear`, `espacial`,
  `ciber`, `economico`, `diplomatico`).
- **Célula:** índice de ênfase relativa (0–4) derivado de documento de estratégia
  nacional publicado, com nota de rodapé apontando o parágrafo-fonte.
- **Restrição metodológica:** o índice é declaradamente **qualitativo e
  codificado por analista**, com critério de codificação publicado — não um
  número pseudo-objetivo.

### 1.3 Mapa de calor de conflitos por região

- Camada sobre o mapa-múndi já existente em `index.html`.
- **Dado:** `data/viz/conflicts.geo.json` com intensidade por
  `regiao_geopolitica` e por década.
- **Render:** SVG com escala sequencial monocromática (azul-marinho→âmbar),
  legenda numérica explícita. Sem animação de "pulso".
- Slider de década altera apenas a classe do `<path>` — sem re-render.

### 1.4 Linha do tempo interativa de evolução doutrinária

- Trilha horizontal: desgaste industrial → dissuasão massiva → resposta
  flexível → AirLand Battle → Doutrina Powell → COIN → rebalanceamento Ásia →
  GPC → MDO/JADC2 → dissuasão integrada.
- Cada nó abre painel lateral com: publicação de origem (JP/estratégia), ano,
  administração, conflito exemplar e briefings correlacionados via
  `data/ontology.json`.
- **Render:** CSS Grid + `<details>`; JS apenas para o filtro temporal.

### 1.5 Comparador de plataformas de armas

- Seleção de até 3 sistemas do mesmo `vetor_militar`; tabela comparativa
  gerada a partir de `data/ontology.json` (alcance, carga, IOC, custo unitário,
  operadores).
- **Regra:** cada célula carrega atribuição de fonte; célula sem fonte exibe
  `—`, nunca uma estimativa não referenciada.

### 1.6 Grafo de correlação da ontologia

- Grafo force-directed (D3.js auto-hospedado) sobre
  `administracao ↔ conflito ↔ arma ↔ doutrina`.
- **Risco reconhecido:** grafos force-directed degeneram em "bola de pelo" acima
  de ~150 nós. Mitigação: filtro obrigatório por dimensão antes do render, e
  fallback em matriz de adjacência.

### 1.7 Painel de indicadores comparativos (SIPRI)

- Gasto militar como % do PIB, EUA vs. RPC vs. Rússia vs. OTAN-Europa.
- Sparklines SVG inline, sem biblioteca. Nota metodológica obrigatória sobre
  paridade de poder de compra e opacidade de dados chineses.

### 1.8 Princípios de implementação de visualização

- Toda biblioteca **auto-hospedada** com SRI — a CSP não admite CDN mutável
  (`architecture.md` §5.1).
- Todo gráfico acompanha **tabela de dados acessível** (`<table>` em
  `<details>`), atendendo WCAG 2.1 (1.1.1).
- Escala nunca truncada no eixo Y sem marcação explícita de quebra.
- `prefers-reduced-motion` desabilita transições.
- Peso incremental por página ≤ 60 KB de JS de visualização, carregado
  sob demanda (`import()` dinâmico) apenas na página que o usa.

---

## 2. Curadoria e Sistema de Citação

### 2.1 Modelo de dados bibliográfico

Bibliografia centralizada e reutilizável em `data/references.json`, referenciada
por chave a partir do front matter — elimina divergência de formatação entre
artigos:

```json
{
  "crs-r47266": {
    "tipo": "relatorio",
    "autor": "Congressional Research Service",
    "ano": 2023,
    "titulo": "Defense Primer: U.S. Defense Budget",
    "serie": "R47266",
    "local": "Washington, DC",
    "url": "https://crsreports.congress.gov/product/pdf/R/R47266",
    "acessado": "2026-08-24",
    "classe_fonte": "primaria-legislativa"
  }
}
```

No corpo do artigo: `[[ref:crs-r47266]]`. O loader resolve a chave, numera a
citação, injeta a nota e monta a seção "Referências" — garantindo
**formatação única e ordenação automática**.

### 2.2 Padrão de citação

Base **Chicago (notes-bibliography)** para material histórico e documental,
degradando para **APA 7** em periódicos acadêmicos — decisão registrada em
`editorial-guidelines.md` §3. Exemplos canônicos:

- **Publicação doutrinária:** U.S. Joint Chiefs of Staff. *Joint Publication
  3-0: Joint Campaigns and Operations*. Washington, DC: JCS, 2022.
- **Relatório CRS:** Congressional Research Service. *Defense Primer: U.S.
  Defense Budget* (R47266). Washington, DC: CRS, 2023.
- **RAND:** Heginbotham, Eric, et al. *The U.S.–China Military Scorecard*.
  Santa Monica, CA: RAND Corporation, 2015. RR-392-AF.
- **Anuário:** SIPRI. *SIPRI Yearbook 2024*. Oxford: Oxford University Press, 2024.

### 2.3 Seção automatizada "Leitura Recomendada"

Gerada por correspondência de `tags` do front matter contra
`data/references.json`, agrupada por instituição:

| Instituição | Papel na curadoria | Critério de inclusão |
|---|---|---|
| **RAND Corporation** | modelagem e wargaming | relatório numerado (RR/MG/PE) |
| **CRS** | síntese legislativa e orçamentária | relatório com número de série |
| **CSIS** | postura no Indo-Pacífico | publicação de programa nomeado |
| **SIPRI / IISS** | dados comparativos internacionais | anuário ou *Military Balance* |
| **GAO** | auditoria de aquisição | relatório GAO-XX-XXX |
| **NDU Press (JFQ)** | debate doutrinário | artigo peer-reviewed |

**Exclusão explícita:** mídia de opinião, veículos com viés declarado, blogs de
indústria de defesa e material promocional de fabricante.

### 2.4 Rastreabilidade e integridade das fontes

- **Arquivamento:** toda URL registrada também como snapshot do Internet Archive
  no campo `url_arquivada` — link rot é o risco documental principal.
- **Auditoria periódica:** job de CI mensal revalida todas as URLs de
  `data/references.json` e abre issue automática para as que falharem.
- **Modo "citação rápida":** botão que copia a referência já formatada
  (Chicago/APA/BibTeX) — utilidade acadêmica, não interação social.
- **Exportação:** `references.bib` gerado no build para consumo em
  Zotero/BibTeX.

---

## 3. Princípios de Exclusão (fronteira do produto)

- Sem gamificação: nenhum badge, ponto, ranking, streak ou barra de progresso.
- Sem componentes de rede social: nenhum botão de compartilhar, curtir, seguir,
  contador de visualizações ou feed.
- Sem comentários abertos. Correções entram por *issue* ou pull request, com
  autoria e revisão editorial rastreáveis.
- Sem newsletter, modal de captura, banner de consentimento ou paywall.
- Sem analytics de terceiros. Métrica agregada de borda é suficiente.
- Sem carrossel, parallax, animação decorativa ou ícone que substitua rótulo
  textual.
- Sem conteúdo gerado por IA publicado sem verificação humana de fonte.

---

## 4. Evolução de Plataforma (roadmap técnico)

| Horizonte | Movimento | Gatilho objetivo |
|---|---|---|
| v1.1 | Busca estática (Pagefind) | corpus > 15 documentos |
| v1.2 | `data/references.json` + citação por chave | corpus > 25 documentos |
| v2.0 | Camada de visualização (§1.1–§1.4) | dados orçamentários consolidados |
| v2.1 | Exportação PDF/BibTeX por artigo | demanda de citação acadêmica |
| v3.0 | Migração para Hugo com taxonomias geradas | corpus > 150 documentos |
| v3.1 | Edição em inglês (`/en/`) | audiência internacional confirmada |
