# PENTAGON-MIND v3

Portal analítico de inteligência militar e geopolítica dos EUA — **Command Center** — construído
com **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide + Vitest + Zod**.

> Conteúdo educativo e de domínio público, baseado em fontes primárias (CRS, RAND, CSIS, DoD).
> Não afiliado ao Departamento de Defesa dos EUA.

## Stack

- **Next.js 14** (App Router, SSG)
- **TypeScript** (modo estrito)
- **Tailwind CSS** (design system "Command Center")
- **Lucide React** (ícones)
- **Zod** (validação de dados e formulários)
- **Vitest** (testes unitários)
- **Fuse.js** (busca fuzzy)
- **react-simple-maps** (mapa tático)
- **recharts** (gráficos de orçamento)
- **react-to-print** (exportação de dossiês)
- **next-sitemap** (robots.txt + sitemap.xml)
- **@upstash/ratelimit** (rate limiting externo na API)

## Design System "Command Center"

- Fundo tático: `#0e1116` / `#14161a`
- Bordas em grafite: `#2a2f37`
- Acentos: azul militar `#2f7fb5`, âmbar `#c9a227`, vermelho ameaça `#d9534f`

## Acessibilidade (WCAG 2.1 AA)

- Seletor de tamanho de fonte **A / A+ / A++**
- Modo **alto contraste**
- Navegação 100% por teclado (popovers, modais, árvore de wargame)
- **Alternativas textuais/tabulares** nos 3 módulos visuais:
  - Mapa Tático → `ThreatMapTable`
  - Comparador → tabela colapsável
  - JADC2 → `<ol>` sequencial
  - Orçamento → tabela de dados subjacente
- `skip-link`, landmarks semânticos e `aria-*` adequados

## Estrutura

```
src/
  app/            # 16+ rotas (SSG) + api/contact + not-found
  components/
    ui/           # Badge, Button, Card, Input, Modal, Toast, DatasheetAccordion, GlossaryInspector, DataTable
    layout/       # Navbar (prontidão + a11y + contraste), Footer
    features/     # ThreatMap, Comparator, Wargame, JADC2, BudgetChart, BriefingPrintDossier
    contact/      # ContactForm (Zod + honeypot + LGPD)
    a11y/         # AccessibilityProvider
  data/           # ontology, arsenal, threatMap, wargame, budget, briefings, glossary, geopolitics
  lib/            # schemas (Zod), validations, search (Fuse), comparator, rateLimit, cn
  types/          # tipagens estritas
```

## Scripts

```bash
npm install        # instalar dependências
npm run dev        # desenvolvimento
npm test           # testes Vitest
npm run build      # build de produção (SSG das rotas)
npm run start      # servir build
npm run lint       # lint (next lint)
npm run test:e2e   # testes Playwright
```

## Variáveis de ambiente

Veja `.env.example`. Defina `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` para ativar
o rate limiting real na rota `/api/contact`. Sem elas, usa-se um stub em memória (apenas dev/local).

## CI

GitHub Actions (`.github/workflows/ci.yml`) executa `lint`, testes Vitest, `build` e testes
E2E (Playwright) em cada push/PR na branch `main`.

## Licença de conteúdo

Imagens de órgãos federais dos EUA são domínio público (17 U.S.C. §105). Ver
`src/data/SOURCES.md` para a proveniência das imagens.
