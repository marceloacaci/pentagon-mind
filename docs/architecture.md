# Arquitetura de Informação e Dados Estáticos — PENTAGON-MIND

> Blueprint técnico da geração estática, da taxonomia de conteúdo e da postura de
> segurança do portal. Diagramas fonte em [`uml/`](uml/).

---

## 1. Decisão de Stack: SSG "Zero-Build" (vanilla) vs. Hugo/Jekyll/Next.js

**Estado inspecionado do repositório** (`github.com/marceloacaci/pentagon-mind`,
branch `main`): o repositório **não está vazio**. Contém um portal estático
funcional em HTML5/CSS3/JavaScript ES-modules, sem framework e sem etapa de
compilação, com 8 páginas publicadas, design system central em `css/styles.css`,
camada de dados em `data/` + `content/briefings/*.json`, 59 imagens locais em
`assets/img/` e verificador próprio (`assets/verify.js`).

Decisão arquitetural: **preservar o gerador vanilla ("SSG de grau zero")**.
Justificativa comparada:

| Critério | Vanilla (atual) | Hugo | Jekyll | Next.js SSG |
|---|---|---|---|---|
| Tempo de build | 0 ms (não há build) | ~50 ms/1k págs | ~5 s/1k págs | ~20 s/1k págs |
| Dependências de runtime | 0 | Go toolchain | Ruby + gems | Node + ~300 pacotes |
| Superfície de supply-chain | nula | baixa | média (gems) | **alta** (npm tree) |
| Custo de migração do estado atual | 0 | alto (rewrite de templates) | alto | muito alto |
| Output | HTML já final | HTML | HTML | HTML + hydration JS |

Para o volume-alvo desta versão (dezenas de briefings, não milhares), o custo de
introduzir um toolchain excede o benefício. A migração para **Hugo** permanece a
rota documentada de escala — gatilho objetivo: **> 150 documentos em `content/`**
ou necessidade de taxonomias geradas automaticamente. O front matter definido na
§4 é deliberadamente compatível com Hugo, tornando a migração mecânica.

## 2. Vantagens Técnicas e Matemáticas da Geração Estática

### 2.1 Segurança — superfície de ataque tendendo a zero

Modelo de exposição de uma aplicação dinâmica:

```
Superfície = S(servidor de aplicação) + S(banco de dados) + S(camada de auth)
           + S(dependências de runtime) + S(entrada do usuário)
```

Em um portal estático servido por CDN, os quatro primeiros termos são
identicamente nulos e o quinto é reduzido a parâmetros de query lidos pelo
cliente (`article.html?briefing=<id>`), validados contra uma **allow-list**
derivada de `content/briefings/index.json`. Não há interpretador server-side,
logo não há SQLi, RCE, SSRF, deserialização insegura ou escalonamento de
privilégio de aplicação.

### 2.2 Performance — Core Web Vitals

Latência percebida de um documento estático em borda:

```
TTFB = RTT_cliente→PoP + t_cache_hit        (t_cache_hit ≈ 1–5 ms)
```

contra o caso dinâmico `TTFB = RTT + t_app + t_query + t_render`, onde
`t_app + t_query + t_render` tipicamente soma 80–400 ms. Metas do projeto:

| Métrica | Meta | Mecanismo |
|---|---|---|
| LCP | < 1,2 s | imagem hero local, sem web font bloqueante |
| CLS | < 0,05 | `width`/`height` explícitos em todo `<img>` |
| INP | < 100 ms | JS vanilla, sem hydration; handlers delegados |
| TTFB | < 100 ms | cache de borda, 100% cache-hit |

### 2.3 Custo de infraestrutura

Custo marginal por requisição em GitHub Pages / Netlify / Vercel (tier gratuito,
tráfego de portal acadêmico) = **US$ 0,00**. Não há instância computacional,
nem banco, nem escalonamento horizontal a provisionar. O custo total de posse
reduz-se a: domínio (opcional) + tempo editorial humano.

## 3. Fluxo de Dados em Tempo de Build e em Runtime

```
Autoria (Markdown/JSON)  →  Camada de Dados  →  Loader cliente  →  DOM final
content/briefings/*.json     data/*.js/json      js/*.js           HTML renderizado
content/analysis/*.md        assets/img/*        (fetch local)
```

Em runtime, nenhum `fetch` cruza origem: todos os recursos são same-origin e
versionados no Git. O `article.html` resolve o `id` do query-string, valida-o
contra o índice e injeta o conteúdo no template. Ver
[`uml/component-diagram.puml`](uml/component-diagram.puml).

## 4. Taxonomia e Modelo de Metadados (Front Matter)

Contrato obrigatório de todo documento em `content/`. Campos marcados
`obrigatório` bloqueiam merge (ver [`quality.md`](quality.md)).

```yaml
---
title: "Contingência do Estreito de Taiwan"        # obrigatório
id: taiwan-strait                                   # obrigatório, slug kebab-case, único
category: briefing                                  # obrigatório: briefing | analysis
date: 2022-08-01                                    # obrigatório, ISO-8601
status: publicado                                   # rascunho | revisao | publicado
ano: 2022                                           # obrigatório, inteiro (âncora temporal)
vetor_militar: [aereo, naval, ciber]                # ver enum §4.1
administracao_potus: biden                          # ver enum §4.2
regiao_geopolitica: indo-pacifico                   # ver enum §4.3
arma: [DF-21D, F-35A, LGM-30G]                      # designação oficial, ver §4.4
doutrina: [gpc, jadc2, a2-ad]                       # ver enum §4.5
classificacao_fonte: aberta                         # aberta | oficial-publica | academica
referencias_min: 2                                  # invariante de fact-check
---
```

### 4.1 `vetor_militar` (enum fechado)
`terrestre` · `naval` · `aereo` · `nuclear` · `espacial` · `ciber` ·
`irregular` · `logistico` · `c2` (comando e controle)

### 4.2 `administracao_potus` (enum fechado, cronológico)
`truman` · `eisenhower` · `kennedy` · `johnson` · `nixon` · `ford` · `carter` ·
`reagan` · `bush41` · `clinton` · `bush43` · `obama` · `trump` (2017–2021) ·
`biden` · `trump2` (2025–2029)

> **Invariante:** `trump` e `trump2` são administrações **distintas**. Nunca
> agregar as duas sob a mesma chave — a descontinuidade doutrinária entre elas é
> objeto de análise.

### 4.3 `regiao_geopolitica` (enum fechado)
`indo-pacifico` · `euro-atlantico` · `oriente-medio` · `asia-central` ·
`asia-oriental` · `africa` · `americas` · `artico` · `global`

### 4.4 `arma` — regra de nomenclatura
Designação oficial DoD/MDS completa, sem apelido isolado:
`LGM-30G Minuteman III`, `F-35A Lightning II`, `M142 HIMARS`,
`UGM-133A Trident II D5`. Proibido: "Minuteman 3", "caça furtivo".

### 4.5 `doutrina` (enum extensível, curado)
`desgaste-industrial` · `dissuasao-massiva` · `resposta-flexivel` ·
`airland-battle` · `doutrina-powell` · `coin` · `guerra-ao-terror` ·
`rebalanceamento-asia` · `gpc` (Great Power Competition) · `mdo` ·
`jadc2` · `dissuasao-integrada` · `a2-ad`

### 4.6 Eixos de filtragem derivados

A interface de catálogo (`briefings.html`) deriva facetas de filtragem
diretamente destes campos, sem índice server-side:

`ano` (faixa) × `vetor_militar` (multi) × `administracao_potus` (single) ×
`regiao_geopolitica` (single) × `doutrina` (multi) × `arma` (busca textual).

A cardinalidade combinatória é resolvida no cliente sobre
`content/briefings/index.json` — O(n) sobre um n de dezenas, custo desprezível.

## 5. Segurança Baseada em Estáticos

### 5.1 Content Security Policy

Política-alvo (self-only, sem `unsafe-inline`, sem CDN de terceiros):

```
Content-Security-Policy:
  default-src 'none';
  script-src  'self';
  style-src   'self';
  img-src     'self' data:;
  font-src    'self';
  connect-src 'self';
  base-uri    'none';
  form-action 'none';
  frame-ancestors 'none';
  object-src  'none';
  upgrade-insecure-requests
```

Consequência de projeto: **nenhum `<script>` ou `style` inline** e nenhum
`onclick=` em atributo HTML. Handlers são registrados em `js/*.js` por
delegação de evento — padrão já adotado por `js/common.js`.

### 5.2 Headers HTTP complementares

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), camera=(), microphone=(), usb=(), payment=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
X-Frame-Options: DENY
```

Entrega por plataforma: `_headers` (Netlify), `vercel.json` (Vercel), ou
`<meta http-equiv="Content-Security-Policy">` como degradação em GitHub Pages,
que não permite headers customizados.

### 5.3 OWASP Top 10 (2021) — aplicabilidade a um portal estático

| # | Categoria | Aplicável? | Controle no PENTAGON-MIND |
|---|---|---|---|
| A01 | Broken Access Control | Não | não há autenticação nem recurso privado |
| A02 | Cryptographic Failures | Parcial | HTTPS obrigatório + HSTS; nenhum dado sensível trafega |
| A03 | Injection | **Sim (DOM XSS)** | conteúdo injetado via `textContent`; nunca `innerHTML` com dado externo; `id` de query-string validado contra allow-list |
| A04 | Insecure Design | Parcial | ausência deliberada de formulários, comentários e login |
| A05 | Security Misconfiguration | **Sim** | CSP + headers da §5.1/§5.2; directory listing desabilitado |
| A06 | Vulnerable Components | **Sim** | zero dependências de runtime; libs de visualização (v2.0+) entram auto-hospedadas com SRI, nunca via CDN mutável |
| A07 | Auth Failures | Não | não há sessão |
| A08 | Integrity Failures | **Sim** | assets versionados no Git; `integrity=` obrigatório se algum recurso externo for admitido |
| A09 | Logging Failures | Parcial | logs de acesso pela plataforma de borda; sem analytics de terceiros |
| A10 | SSRF | Não | não há requisição originada em servidor |

Os três vetores materialmente relevantes — **A03 (DOM XSS)**, **A05** e **A06** —
são portões de revisão obrigatórios no checklist de code review
([`quality.md`](quality.md) §2).

## 6. Sitemap Lógico

```
PENTAGON-MIND (index.html — Briefing Central)
├── Doutrina Militar ............. doutrina.html        (passado · presente · futuro)
├── Políticas Presidenciais ...... politicas-presidenciais.html (Bush→Obama→Trump→Biden→Trump2)
├── Arsenal Tecnológico .......... arsenal-tecnologia.html
├── Impactos Geopolíticos ........ impactos-geopoliticos.html
├── Catálogo de Briefings ........ briefings.html       (facetas da §4.6)
│   └── Artigo .................... article.html?briefing=<id>
└── Glossário Analítico .......... glossario.html       (utilitário transversal)
```

Fonte formal: [`uml/sitemap.puml`](uml/sitemap.puml). Jornada do analista:
[`uml/user-flow.puml`](uml/user-flow.puml).

## 7. Estratégia de Busca Estática

Decisão para a Sprint 3: **Pagefind** em preferência a Fuse.js.

| Critério | Pagefind | Fuse.js |
|---|---|---|
| Índice | fragmentado, carregado sob demanda | monolítico, carregado integralmente |
| Payload inicial | ~10 KB + fragmentos | cresce O(n) com o corpus |
| Execução | WASM, pós-build sobre HTML final | JS, exige índice mantido à mão |
| Acoplamento ao SSG | nenhum (varre o HTML gerado) | exige pipeline de indexação própria |

Pagefind indexa o HTML já publicado, preservando a premissa "zero-build" na
autoria: o índice é um artefato de CI, não de desenvolvimento.
