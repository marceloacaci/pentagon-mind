# Sprint 1 — Fundação Estática e Design System Sóbrio

| Campo | Valor |
|---|---|
| **Épico** | E1 — Fundação estática e design system |
| **Janela** | 2026-08-24 → 2026-09-04 (**2 semanas fixas**) |
| **Capacidade** | 26 pontos (buffer de 20% já descontado) |
| **Comprometido** | 26 pontos |
| **Marco** | **M1 — Design & Estrutura Base** (2026-09-04) |
| **Status** | Concluída |

---

## 1. Objetivo da Sprint

Estabelecer o ambiente estático operacional, fixar o design system sóbrio como
contrato visual imutável e entregar o `index.html` como Briefing Central
navegável. Ao final da sprint o portal deve ser **servível, verificável e
acessível**, ainda que com corpus de conteúdo mínimo.

## 2. Escopo Comprometido

| ID | História | Pontos |
|---|---|---|
| US-01 | Briefing central de entrada | 8 |
| US-02 | Design system sóbrio e legível | 8 |
| US-03 | Navegação hierárquica consistente | 5 |
| US-04 | Glossário de siglas técnicas | 5 |
| | **Total** | **26** |

## 3. Tarefas Técnicas

### Ambiente e infraestrutura local

- [x] Estrutura de diretórios conforme `docs/architecture.md` §6.
- [x] Servidor local de desenvolvimento (`assets/serve.cjs`, porta 8726) com
      resolução de caminho segura em Windows (`path.resolve` + verificação de
      prefixo, evitando 403 por conversão de separador).
- [x] Verificador estrutural `assets/verify.js` (`node --check` em todos os
      scripts, parse do glossário, checagem de fiação das páginas).
- [x] `.gitignore` e convenção de commits (Conventional Commits).

### Design system (contrato visual)

- [x] Tokens de cor: `--bg #14161a`, `--surface #0e1116`,
      `--primary #2f7fb5` (azul-marinho), `--accent #c9a227` (âmbar),
      `--border #3a4049`, texto branco absoluto.
- [x] Tipografia híbrida: pilha do sistema para corpo, monoespaçada para siglas
      e designações de equipamento. Nenhuma web font bloqueante.
- [x] Superfície elevada (*raised*) 85/95% com `box-shadow` em cards, chips,
      pills, `summary` de ficha técnica e botões.
- [x] **Regra rígida de hover:** elevação vertical + sombra + borda `--primary`.
      Proibida a alteração de `color` do texto no hover.
- [x] `--shadow-hover` em tema escuro com componente branca difusa (a sombra
      preta desaparece sobre fundo escuro).
- [x] Scrollbar elevada com hex fixo (`color-mix` não resolve em pseudo-elemento
      de scrollbar).
- [x] `prefers-reduced-motion` desabilita transições.

### Template base do Briefing Central

- [x] `index.html` com estrutura semântica (`header`/`nav`/`main`/`footer`),
      `lang="pt-BR"`, `h1` único.
- [x] Mapa de vetores de ameaça: pins, popups e legenda dinâmica.
- [x] Painel de índices de capacidade acima da dobra em 1440 px.
- [x] Módulos de entrada para as quatro seções temáticas.
- [x] Navegação e footer injetados de forma DRY por `js/nav.js`, com marcação de
      rota ativa executada **após** a montagem do menu.

### Glossário

- [x] `data/glossary.js` com 33 termos (`full` em inglês, `pt`, `gloss`) +
      tabela de aliases.
- [x] Engine de popup inline (`js/glossary.js`) com abertura por clique e por
      teclado, fechamento por `Escape` e devolução de foco.
- [x] Página dedicada `glossario.html` renderizando a grade de termos.

### Acessibilidade e SEO (portões de US-01)

- [x] Link "pular para o conteúdo" como primeiro elemento tabulável.
- [x] Indicador de foco visível em todos os controles.
- [x] Contraste medido ≥ 4,5:1 em texto corrido.
- [x] `meta description`, Open Graph e `link rel="canonical"` no hub.

### Documentação

- [x] `docs/architecture.md`, `docs/editorial-guidelines.md`.
- [x] `docs/uml/user-flow.puml`, `component-diagram.puml`, `sitemap.puml`.
- [x] `assets/wireframes/index-wireframe.puml`.

## 4. Definition of Done da Sprint

- [x] `node assets/verify.js` → **VERIFICATION PASSED**.
- [x] Todos os cenários Gherkin de US-01 a US-04 verificados em browser real,
      com medição por `getComputedStyle` (não inspeção visual).
- [x] Console do navegador sem erro ou warning.
- [x] Layout verificado em 360 px, 768 px e 1440 px.
- [x] Contraste medido, não estimado.
- [x] Design system documentado em `DESIGN.md`.

## 5. Consumo do Buffer (2 dias)

| Item | Consumo | Observação |
|---|---|---|
| Ajuste de borda em tema escuro | 0,5 dia | `color-mix(#fff 90%, #888)` resultou ≈ rgb(242), praticamente branco e imperceptível; corrigido para proporção 50/50 (≈ rgb(196)) até haver diferença mensurável. |
| Correção de resolução de caminho no servidor Windows | 0,5 dia | `path.normalize` convertia `/` em `\`, gerando 403. |
| Ordem de execução do *active link* da navegação | 0,5 dia | `querySelectorAll('.nav-links a')` retornava vazio quando executado antes da injeção do menu. |
| Contingência não consumida | 0,5 dia | — |

## 6. Riscos Observados

| Risco | Desfecho |
|---|---|
| Alteração de CSS não percebida visualmente | Mitigado: passou-se a exigir medição por `getComputedStyle`, com leitura de estado de hover **após** 320 ms de transição. |
| Regra de borda aplicada a apenas parte dos cards | Mitigado: seletor agrupado cobrindo todas as variantes de superfície em tema escuro. |

## 7. Retrospectiva

**Manter:** verificação por medição antes de declarar conclusão; design system
como contrato único de estilo.

**Corrigir:** o ambiente Electron/servidor local não recarrega automaticamente —
toda verificação exige reinício explícito e invalidação de cache (`?nocache=N`).

**Adotar:** contraste e acessibilidade auditados na Sprint 1, não postergados
para a Sprint 3 — corrigir tokens de cor após a ingestão de conteúdo teria custo
multiplicado pelo número de artigos.
