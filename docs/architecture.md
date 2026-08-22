# Arquitetura de Informação — PENTAGON-MIND

> Documento de referência da IA do portal. Diagramas em [`uml/`](uml/).

## 1. Objetivo da Arquitetura de Informação

Organizar o conteúdo de defesa/geopolítica de modo que um analista passe do **briefing geral** à **análise específica** (doutrina, tecnologia, geopolítica, presidências) com o mínimo de fricção cognitiva, preservando a densidade técnica sem poluição visual.

## 2. Fluxo de Usuário (User Flow)

O analista entra no `index.html` (Briefing de Inteligência), explora o mapa de vetores de ameaça e os índices de capacidade, e ramifica para a seção temática de interesse. Em qualquer página, siglas destacadas abrem popups inline; o glossário dedicado (`glossario.html`) resolve desambiguações. Ao final, o leitor cruza as fontes em "Referências". Ver [`uml/user-flow.puml`](uml/user-flow.puml).

**Caminho canônico:**
`index.html` → (Doutrina | Arsenal | Geopolítica | Presidências) → popup/glossário → Referências (CRS/DoD/SIPRI).

## 3. Diagrama de Componentes (Estático)

Separação em três camadas, sem acoplamento server-side:

- **Conteúdo** — páginas HTML (markup semântico).
- **Dados** — `data/glossary.js` (33 siglas), `data/ontology.json` (relações presidente↔conflito↔arma).
- **Apresentação (lógica)** — `css/styles.css` (design system), `js/nav.js` (nav/footer), `js/glossary.js` (engine de popups/grid), `js/ontology.js`, `js/common.js`.
- **Assets** — `assets/img/*` (imagens reais, domínio público).

A camada de apresentação consome os dados e renderiza o conteúdo; não há backend. Integração com fontes externas (API CRS/SIPRI, RSS de notícias) é **potencial e opcional** — hoje o conteúdo é estático e versionado no Git. Ver [`uml/component-diagram.puml`](uml/component-diagram.puml).

## 4. Integração com Fontes Externas (potencial)

| Fonte | Uso potencial | Risco |
|---|---|---|
| CRS (Congress) | Atualização de orçamentos/citanções | Mudança de formato |
| SIPRI Yearbook | Dados de gasto militar | Licença acadêmica |
| Wikimedia API | Referencial de imagens | Latência/rate-limit |
| RSS think tanks | Briefings recentes | Viés editorial |

Decisão atual: **manter estático**. Se houver integração futura, ela será assíncrona, em build-time (não runtime client-side), preservando a natureza estática e segura.

## 5. Mapa do Site (Sitemap)

Hierarquia lógica em três categorias-mãe (Doutrina Militar, Tecnologia de Defesa, Geopolítica EUA) acessíveis a partir do hub `index.html`, com o Glossário como utilitário transversal. Ver [`uml/sitemap.puml`](uml/sitemap.puml).

```
PENTAGON-MIND (index.html)
├── Doutrina Militar ............ doutrina.html
├── Tecnologia de Defesa ........ arsenal-tecnologia.html
├── Geopolítica EUA ............. impactos-geopoliticos.html
├── Nexo Executivo .............. politicas-presidenciais.html
└── Glossário Analítico ......... glossario.html  (transversal a todas)
```

## 6. Estrutura Atual vs. Proposta

| Atual (funcional) | Proposta (escala) |
|---|---|
| Páginas HTML na raiz | Mantém-se (6 páginas) |
| Conteúdo embutido no HTML | Novo conteúdo via `content/briefings/` e `content/analysis/` (modelo Markdown/JSON) |
| `assets/img/` | `assets/wireframes/` adicionado para UI |

O site atual já é a "versão piloto" (conteúdo real em todas as seções). A pasta `content/` é a evolução para autoria escalável sem refatorar o que funciona.
