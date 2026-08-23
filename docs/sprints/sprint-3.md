# Sprint 3 — Busca Estática, SEO Técnico e Deploy Automatizado

| Campo | Valor |
|---|---|
| **Épico** | E3 — Busca estática, SEO técnico e deploy automatizado |
| **Janela** | 2026-09-21 → 2026-10-02 (**2 semanas fixas**) |
| **Capacidade** | 26 pontos |
| **Comprometido** | 21 pontos + 5 pontos residuais de US-07 |
| **Marco** | **M3 — Validação Editorial & Lançamento** (2026-10-02) |
| **Status** | Planejada |

---

## 1. Objetivo da Sprint

Tornar o corpus **localizável** (busca estática local), **indexável** (SEO
técnico e integridade de links) e **publicável sem intervenção manual** (pipeline
com portões bloqueantes). Encerramento: site público em URL de borda, com
publicação condicionada à aprovação automática de qualidade.

## 2. Escopo Comprometido

| ID | História | Pontos |
|---|---|---|
| US-09 | Busca textual local sem backend (Pagefind) | 8 |
| US-10 | SEO técnico e indexabilidade | 5 |
| US-11 | Deploy automatizado com portões de qualidade | 8 |
| US-07 | Verificação bibliográfica residual (herdada da Sprint 2) | 5 |
| | **Total** | **26** |

## 3. Tarefas Técnicas

### 3.1 Busca estática local (US-09)

Decisão registrada em `docs/architecture.md` §7: **Pagefind** em preferência a
Fuse.js — índice fragmentado e carregado sob demanda, indexação em WASM sobre o
HTML já publicado, sem exigir manutenção manual de índice.

- [ ] Etapa de indexação no pipeline: `npx pagefind --site . --output-path pagefind`
- [ ] Campo de busca no cabeçalho, com `label` associado, presente em todas as páginas.
- [ ] Resultados com trecho de contexto e termo destacado.
- [ ] Lista de resultados navegável por teclado; estado vazio em região
      `aria-live="polite"`.
- [ ] Payload inicial do índice ≤ 50 KB (verificado, não estimado).
- [ ] Estilo do componente de busca herdado do design system (sem CSS de terceiro).
- [ ] `pagefind/` incluído no artefato de deploy e ignorado no controle de versão.

**Alternativa de contingência:** se Pagefind não puder ser executado no runner,
retroceder para índice JSON pré-gerado + busca linear no cliente — aceitável para
corpus abaixo de 30 documentos, com dívida técnica registrada.

### 3.2 SEO técnico (US-10)

- [ ] `sitemap.xml` com todas as rotas canônicas (incluindo as rotas
      parametrizadas de `article.html?briefing=<id>`).
- [ ] `robots.txt` referenciando o sitemap; nenhuma rota canônica em `noindex`.
- [ ] `meta description` (120–160 caracteres) em todas as páginas.
- [ ] Open Graph e `twitter:card` do tipo `summary_large_image` — **metadados
      de indexação, não widget social**.
- [ ] `link rel="canonical"` absoluto em todas as páginas.
- [ ] JSON-LD: `WebSite` no hub, `Article` em cada briefing, `BreadcrumbList` na
      hierarquia de navegação.
- [ ] Imagens convertidas para WebP com fallback via `<picture>`; `width`/`height`
      explícitos; `loading="lazy"` abaixo da dobra.
- [ ] Auditoria de Core Web Vitals contra as metas de `architecture.md` §2.2.

### 3.3 Acessibilidade — auditoria final (WCAG 2.1 AA)

- [ ] Contraste reauditado após a ingestão de conteúdo (texto sobre imagem
      inclusive).
- [ ] Percurso completo por teclado nas 8 páginas, sem armadilha de foco.
- [ ] Popups de glossário com `aria-expanded` e `aria-describedby` corretos.
- [ ] Nenhuma informação transmitida exclusivamente por cor (legenda do mapa de
      ameaças inclusa).
- [ ] Tabelas com `caption`, `thead` e `scope`.
- [ ] `prefers-reduced-motion` respeitado em todo o portal.

### 3.4 Pipeline de CI/CD com portões bloqueantes (US-11)

`.github/workflows/deploy.yml` — ordem de execução:

| # | Etapa | Ferramenta | Bloqueia deploy? |
|---|---|---|---|
| 1 | Lint de Markdown | `markdownlint-cli2` | Sim |
| 2 | Validação de HTML | `html-validate` | Sim |
| 3 | Verificação de links | `lychee` | Sim |
| 4 | Verificação estrutural | `node assets/verify.js` | Sim |
| 5 | Índice de busca | `pagefind` | Sim |
| 6 | Publicação | `actions/deploy-pages` | — |

- [ ] Permissões mínimas (`contents: read`, `pages: write`, `id-token: write`).
- [ ] `concurrency` com grupo `pages` para serializar publicações.
- [ ] Verificação de que uma falha em qualquer portão **não** executa o deploy e
      preserva a versão publicada anteriormente (cenário negativo de US-11).
- [ ] Job mensal agendado de revalidação de links externos, abrindo issue
      automática nas falhas.

### 3.5 Verificação bibliográfica residual (US-07)

- [ ] Todas as fontes dos 9 briefings com identificador estável além da URL.
- [ ] Snapshot de arquivo (Internet Archive) registrado em `url_arquivada`.
- [ ] Formatação bibliográfica uniforme conforme `editorial-guidelines.md` §3.
- [ ] Checklist de `quality.md` §1 integralmente marcado para todo o corpus.

### 3.6 Cabeçalhos de segurança

- [ ] CSP self-only conforme `architecture.md` §5.1, sem `unsafe-inline`.
- [ ] Confirmação de ausência de `<script>` inline, `style` inline e `on*=` em
      atributo (pré-requisito da CSP).
- [ ] Headers complementares (HSTS, `nosniff`, `Referrer-Policy`,
      `Permissions-Policy`, `X-Frame-Options`) publicados via arquivo da
      plataforma; degradação por `<meta http-equiv>` em GitHub Pages, que não
      permite headers customizados.
- [ ] Verificação dos headers efetivos na URL publicada (medição, não presunção).

## 4. Definition of Done da Sprint

- [ ] Site público acessível em URL de borda.
- [ ] Pipeline verde nas 5 etapas de verificação.
- [ ] Cenários Gherkin de US-09, US-10 e US-11 verificados — incluindo o cenário
      **negativo** de bloqueio de deploy.
- [ ] Zero link interno quebrado.
- [ ] Checklists de `quality.md` §1 e §2 integralmente marcados.
- [ ] Core Web Vitals dentro das metas, medidos na URL publicada.
- [ ] Beta fechado liberado para o grupo de analistas revisores.

## 5. Buffer Técnico (2 dias)

| Destinação | Alocação |
|---|---|
| Correção de falhas do validador de HTML no corpus existente | 0,75 dia |
| Ajuste de CSP (remoção de inline residual) | 0,5 dia |
| Substituição de fontes com link irrecuperável | 0,5 dia |
| Contingência | 0,25 dia |

## 6. Riscos da Sprint

| Risco | Prob. | Impacto | Mitigação |
|---|---|---|---|
| CSP quebra funcionalidade por inline remanescente | Média | Alto | auditar antes de publicar a política; usar `Report-Only` em uma iteração |
| GitHub Pages não permite headers customizados | **Certo** | Médio | `<meta http-equiv>` para CSP; migrar para Netlify/Vercel se headers plenos forem requisito |
| Pagefind indisponível no runner | Baixa | Médio | contingência de índice JSON (§3.1) |
| Link externo irrecuperável em fonte citada | Média | Alto | substituir por fonte primária equivalente; nunca remover a afirmação sem revisão |
| Falha de contraste revelada só após conteúdo real | Baixa | Médio | reauditoria explícita em §3.3 |

## 7. Saída da Sprint — Marco M3

Com M3 entregue, o portal entra na fase de estabilização pós-v1.0 descrita em
[`../chronogram.md`](../chronogram.md): revisão ortográfica integral, auditoria de
links acadêmicos, refatoração de Front Matter e beta fechado, culminando no
lançamento público **M4 (2026-10-30)**.

Backlog subsequente (v1.1+): US-13 (`data/references.json` centralizado) torna-se
prioritário assim que o corpus exceder 25 documentos; a camada de visualização de
dados (E4) permanece não priorizada até a consolidação dos dados orçamentários.
