# Design

<!-- impeccable:design-schema 1 -->
<!-- Documentado do sistema incumbente em css/styles.css + js/nav.js (não é redesign) -->

## World

Command-center intelligence briefing — escuro, estéril, técnico. Superfície "Operate/Read": densidade alta, sem exuberância. Relevo via degradês suaves raised + sombra branca no escuro (padrão herdado do MeuBolso).

## Palette

- `--bg: #14161a` (fundo de página/superfície escura)
- `--surface: #0e1116` (cartões/inputs)
- `--primary: #2f7fb5` (azul institucional) · `--primary-soft` (hover/translúcido)
- `--accent: #c9a227` (âmbar — destaques, siglas, acentos de topo)
- `--danger: #d9534f` · `--danger-soft` (vetores de ameaça críticos)
- `--text: #fff` (texto padrão, branco absoluto) · `--text-muted`/`--text-faint` (secundário)
- `--border: #2a2f37` · `--border-strong: #3a4049` · `--border-dark: rgba(255,255,255,.95)`

Regra aplicada (7ª rodada): bordas de acento laterais = **1px** (side-tab >1px removido); popups usam `box-shadow: inset 0 3px 0 0 var(--accent)` em vez de `border-top: 3px` (respeita `--radius`).

## Typography

- Display/UI: `--sans` (system-ui stack) · `--mono` (ui-monospace, "SFMono", Consolas) para siglas, dados, código, labels técnicos.
- Títulos em weight + size; tracking normal; medida de corpo ~65–75ch.

## Radius & Depth

- `--radius: 10px` (cards/botões retangulares); `.chip`/`.pill` = 20px; fotos de presidente e legendas de mapa = 3px (intencionais); círculos/pins = 50%.
- Raised cards: `background-image: linear-gradient(to bottom, color-mix(var(--bg) 85%, white) 0%, var(--bg) 100%)` (contínuo, sem parada 50%) + `box-shadow: var(--shadow)`.
- Hover (gear-opt/MeuBolso): **SÓ** `translateY(-1/-2px)` + `box-shadow: var(--shadow-hover)` (branca, `rgba(255,255,255,.10)`) + borda `--primary`. **NUNCA** troca cor de fundo/texto no hover.
- Header (`.topbar`): tem degradê+shadow próprios, sem hover.

## Components

- Cards `.card`/`.card-link`/`.box`/`.glossary-item`/`.matrix-row .who`/`.flow .node`/`.datasheet summary`: raised gradient + shadow.
- `.chip`/`.pill`: pill 20px (filtros, tags).
- Botões `.btn`/`.btn-primary`/`.nav-toggle`: radius 10px.
- Glossary: popups inline (`<span class="term" data-term>` + `.term-popup` montado por js/glossary.js) + grid `#glossario-map` (33 termos).
- Threat-map: SVG/imagem-múndi + pins pulsantes (`.pin`, `.pin.amber`) + `.pin-popup`.
- Matriz presidencial: `.matrix-row` com `.who` (foto+nome) + filtros por era.
- Fichas de armamentos: `<details class="datasheet">` expansíveis.

## Motion

- Transições ~0.15s em hover/lift; pulse 2.2s nos pins do mapa; fade-in dos popups (~0.14s). Sem animação de entrada por seção.

## Layout

- Topbar fixa com logo + nav (ativas marcadas por borda `--primary`).
- Grid responsivo: `.split` (2 col), `.glossary-grid` (3 col desktop / 2 col), `.img-row` (1–2 col).
- Footer com links + disclaimer (imagens domínio público/Governo EUA).

## Accessibility

- Contraste AA (texto branco sobre `--bg`); popups com `tabindex`/`aria-label`/`role="button"`; navegação por teclado nos termos destacados; `:focus-visible` com anel.
- Imagens com `alt` descritivo; SVG do mapa com `role="img"` + `aria-label`.

## Build / Verify

- Sem build step; servir com `node assets/serve.cjs`.
- `node assets/verify.js` valida 6 páginas (nav/footer, glossary host, sem seção duplicada).
- Verificação visual em browser real (getComputedStyle) obrigatória antes de afirmar "pronto".
