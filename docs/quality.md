# Estratégia de Qualidade e Fact-Checking — PENTAGON-MIND

> Portões de verificação **obrigatórios**. Nenhum merge em `main` sem os dois
> checklists integralmente marcados. Um item não marcado é um bloqueio, não uma
> ressalva.

---

## 1. Checklist de Qualidade de Dados (Fact-Checking)

Aplicar a **todo** artigo, briefing ou alteração de dado quantitativo.

### 1.1 Cruzamento com fontes primárias

- [ ] Toda afirmação quantitativa (orçamento, efetivos, alcance, tonelagem,
      datas, contagem de plataformas) possui **≥ 2 fontes independentes**, das
      quais **≥ 1 primária do Governo dos EUA**.
- [ ] Fontes primárias admitidas, em ordem de precedência:
      1. **DoD Joint Publications** (JP 1, JP 3-0, JP 5-0 etc.) — doutrina.
      2. **DoD Budget Request / Comptroller (Green Book)** — orçamento.
      3. **Congressional Research Service (CRS)** — síntese legislativa.
      4. **GAO** — auditoria de programa de aquisição.
      5. **DVIDS / service fact sheets** (af.mil, navy.mil, army.mil) — plataformas.
      6. **SIPRI / IISS Military Balance** — comparação internacional.
- [ ] Cada fonte registrada com **identificador estável** além da URL:
      número de relatório (`CRS R47266`), ISBN, DOI ou designação de publicação.
      URL isolada não é referência aceitável (risco de link rot).
- [ ] Nenhuma afirmação factual apoiada exclusivamente em mídia jornalística,
      blog, fórum ou enciclopédia colaborativa.
- [ ] Citação `ipsis litteris` conferida caractere a caractere contra o registro
      público original; reticências de elisão marcadas com `[...]`.
- [ ] Designação de equipamento conforme nomenclatura oficial
      (`LGM-30G Minuteman III`, `F-35A Lightning II`) — ver
      [`editorial-guidelines.md`](editorial-guidelines.md) §2.
- [ ] Datas em ISO-8601 no front matter; no corpo, formato pt-BR consistente.
- [ ] Toda sigla definida na primeira ocorrência (termo completo em inglês +
      sigla + tradução pt-BR quando aplicável) e presente em `data/glossary.js`.

### 1.2 Revisão de viés linguístico (neutralidade analítica)

- [ ] Zero adjetivos hiperbólicos: *devastador, assustador, inevitável,
      humilhante, brilhante, catastrófico*.
- [ ] Zero juízo partidário. Descreve-se **postura e capacidade**, não acerto ou
      erro de administração.
- [ ] Zero antropomorfização de Estado: "a política declarada dos EUA visa…",
      nunca "os EUA querem…".
- [ ] Distinção rígida entre **capacidade** (verificável) e **intenção**
      (inferida): intenção sempre em modo condicional e atribuída a uma fonte.
- [ ] Projeções em condicional; fatos em indicativo. Nenhuma projeção
      apresentada como fato consumado.
- [ ] Terminologia simétrica entre atores: se um lado é "adversário de nível
      quase-igual", o outro não é "regime".
- [ ] Nenhuma afirmação sobre território disputado que pressuponha reconhecimento
      político; descrever o **estado de controle de fato** e a **reivindicação**.

### 1.3 Validação da formatação bibliográfica

- [ ] Bloco "Referências" presente e ao final do documento.
- [ ] Formato conforme `editorial-guidelines.md` §3 (híbrido APA/Chicago),
      aplicado de modo uniforme em todo o documento.
- [ ] Ordenação alfabética por autor/instituição.
- [ ] Ano de publicação presente em **todas** as entradas.
- [ ] Relatórios institucionais com número de série entre parênteses.
- [ ] Links de fontes verificados como resolvíveis (HTTP 200) na data do merge —
      confirmado pelo *broken link checker* do CI.
- [ ] Seção "Leitura Recomendada" (quando presente) aponta apenas para
      RAND, CRS, CSIS, SIPRI, IISS, CFR, Brookings, NDU Press ou fonte primária.

### 1.4 Portão de merge de conteúdo

Um pull request de conteúdo só é aprovado com o rodapé de auditoria preenchido:

```
Fact-check: [x] 2+ fontes, >=1 primaria US Gov
Vies:       [x] revisado (§1.2 integral)
Bibliografia:[x] formato + links 200
A11y:       [x] WCAG 2.1 AA
Verify:     [x] node assets/verify.js PASSED
```

---

## 2. Checklist de Code Review e Performance

### 2.1 Otimização de imagens

- [ ] Formato moderno: **WebP** (ou **AVIF**) como fonte primária, com
      `<picture>` + fallback JPEG/PNG quando a compatibilidade exigir.
- [ ] Nenhuma imagem servida acima de 1920 px de largura sem justificativa.
- [ ] Peso por imagem ≤ 250 KB; hero da página ≤ 400 KB.
- [ ] `width` e `height` explícitos em todo `<img>` (evita CLS).
- [ ] `loading="lazy"` em toda imagem abaixo da dobra; `loading="eager"` +
      `fetchpriority="high"` apenas no LCP.
- [ ] `alt` descritivo e informativo (não o nome do arquivo); `alt=""` apenas em
      imagem decorativa.
- [ ] Arquivo versionado em `assets/img/` e registrado em `assets/img/media.js`.
      **Nunca** `<img src="https://…">` apontando para host externo.
- [ ] Licença verificada: domínio público, obra do Governo dos EUA ou
      compatível; fonte anotada em `figcaption`.

### 2.2 Compressão de scripts e estilos

- [ ] Sem dependência de runtime de terceiros por CDN mutável. Se admitida,
      auto-hospedada com `integrity=` (SRI) e `crossorigin`.
- [ ] JS total (não comprimido) ≤ 100 KB; CSS total ≤ 60 KB.
- [ ] Sem código morto, sem `console.log` remanescente, sem bloco comentado.
- [ ] `defer` ou `type="module"` em todo `<script>`; nenhum script bloqueante no
      `<head>`.
- [ ] Nenhuma web font bloqueante; pilha de fontes do sistema como base.

### 2.3 Ausência de peso dinâmico e conformidade estática

- [ ] Nenhuma chamada a API externa em runtime; todo dado é local e versionado.
- [ ] Nenhum `innerHTML` recebendo dado de query-string ou de JSON externo —
      usar `textContent` ou construção de nó (mitigação de A03/DOM XSS).
- [ ] Parâmetro `?briefing=<id>` validado contra allow-list de
      `content/briefings/index.json` antes de qualquer uso.
- [ ] Nenhum `<script>` inline, `style` inline ou `on*=` em atributo
      (pré-requisito da CSP sem `unsafe-inline`, ver `architecture.md` §5.1).
- [ ] Página funcional com JavaScript desabilitado ao nível do conteúdo textual
      essencial (degradação graciosa).
- [ ] Nenhum analytics de terceiros, pixel de rastreamento ou cookie.

### 2.4 Validação semântica do HTML gerado

- [ ] Estrutura semântica: `<header>`, `<nav>`, `<main>`, `<article>`,
      `<section>`, `<footer>`.
- [ ] Exatamente um `<h1>` por página; hierarquia `h1→h2→h3` sem salto de nível.
- [ ] `<html lang="pt-BR">` presente.
- [ ] `<meta name="description">`, Open Graph e `<link rel="canonical">` em toda
      página indexável.
- [ ] Tabelas com `<caption>`, `<thead>` e `scope` nos `<th>`.
- [ ] Validação sem erro em `html-validate` (executado no CI).
- [ ] `sitemap.xml` e `robots.txt` atualizados ao adicionar rota.

### 2.5 Acessibilidade (WCAG 2.1 AA)

- [ ] Contraste texto/fundo ≥ 4,5:1 (≥ 3:1 para texto grande) — **medido**, não
      estimado.
- [ ] Foco visível em todo controle interativo; ordem de tabulação lógica.
- [ ] Popups de glossário operáveis por teclado (`Enter`/`Space` abre, `Esc`
      fecha) com `aria-expanded` e `aria-describedby` corretos.
- [ ] Nenhuma informação transmitida exclusivamente por cor.
- [ ] `prefers-reduced-motion` respeitado nas transições.
- [ ] Link "pular para o conteúdo" presente na primeira posição tabulável.

### 2.6 Portões automatizados no CI

O pipeline `.github/workflows/deploy.yml` bloqueia o merge em:

| Etapa | Ferramenta | Falha bloqueia? |
|---|---|---|
| Lint de Markdown | `markdownlint-cli2` | Sim |
| Validação de HTML | `html-validate` | Sim |
| Links quebrados | `lychee` | Sim |
| Verificação estrutural | `node assets/verify.js` | Sim |
| Build do índice de busca | `pagefind` | Sim |
| Deploy | `actions/deploy-pages` | — |

### 2.7 Verificação manual obrigatória (FCS)

Automação não substitui inspeção. Antes de declarar concluída qualquer alteração
visual:

```bash
node assets/serve.cjs        # http://127.0.0.1:8726/
node assets/verify.js        # deve imprimir VERIFICATION PASSED
```

- [ ] Página aberta em browser real; console **sem** erro ou warning.
- [ ] Alteração de CSS confirmada por medição de `getComputedStyle` no elemento
      afetado — não por inspeção visual isolada.
- [ ] Estado de `:hover` medido **após** o término da transição (~320 ms), nunca
      imediatamente após aplicar a classe.
- [ ] Layout verificado em 360 px, 768 px e 1440 px de largura.
