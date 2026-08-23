# Product Backlog — PENTAGON-MIND

> Backlog único e priorizado. Épicos ordenados por dependência técnica; histórias
> escritas na perspectiva do analista sênior de defesa. Critérios de aceitação em
> **Gherkin** (pt-BR), validando obrigatoriamente **acessibilidade (WCAG 2.1 AA)**
> e **SEO técnico**.

Estimativa em pontos de história (Fibonacci). Capacidade de referência:
**26 pontos por sprint de 2 semanas** (já descontado o buffer de 20% de
[`../chronogram.md`](../chronogram.md) §3).

---

## Épicos

| ID | Épico | Sprint | Pontos |
|---|---|---|---|
| **E1** | Fundação estática e design system sóbrio | 1 | 26 |
| **E2** | Template de análise profunda e ingestão de conteúdo | 2 | 26 |
| **E3** | Busca estática, SEO técnico e deploy automatizado | 3 | 26 |
| **E4** | Visualização de dados e sistema de citação | v2.0+ | — |

---

## E1 — Fundação Estática e Design System

### US-01 — Briefing central de entrada
**Como** analista de inteligência, **quero** uma página de entrada que consolide
os vetores de ameaça ativos e os índices de capacidade, **para** obter situação
geral em menos de 30 segundos, sem navegar.

*Prioridade:* Crítica · *Pontos:* 8

```gherkin
Funcionalidade: Briefing central de inteligencia

  Cenario: Carregamento do hub em conexao de borda
    Dado que o analista acesse a rota "/index.html"
    Quando o documento terminar de carregar
    Entao o mapa de vetores de ameaca deve renderizar todos os pins do dataset
    E os indices de capacidade devem estar visiveis sem rolagem em viewport de 1440px
    E o Largest Contentful Paint medido deve ser inferior a 1,2 segundo
    E o Cumulative Layout Shift medido deve ser inferior a 0,05

  Cenario: Acessibilidade estrutural do hub
    Dado que o analista utilize apenas o teclado
    Quando pressionar Tab a partir do carregamento
    Entao o primeiro elemento focavel deve ser o link "pular para o conteudo"
    E todo controle interativo deve exibir indicador de foco visivel
    E o documento deve conter exatamente um elemento h1
    E a hierarquia de titulos deve progredir sem salto de nivel

  Cenario: SEO tecnico do hub
    Dado que um rastreador acesse "/index.html"
    Entao o elemento html deve declarar lang="pt-BR"
    E deve existir meta name="description" com 120 a 160 caracteres
    E deve existir link rel="canonical" absoluto
    E devem existir as propriedades og:title, og:description e og:type
```

### US-02 — Design system sóbrio e legível
**Como** acadêmico de Relações Internacionais, **quero** tipografia e paleta
calibradas para leitura longa, **para** sustentar sessões de estudo prolongadas
sem fadiga visual.

*Prioridade:* Crítica · *Pontos:* 8

```gherkin
Funcionalidade: Design system institucional sobrio

  Cenario: Conformidade de contraste
    Dado que qualquer par de texto e fundo do design system seja medido
    Quando a razao de contraste for calculada
    Entao texto corrido deve apresentar razao maior ou igual a 4,5 para 1
    E texto grande deve apresentar razao maior ou igual a 3 para 1
    E a medicao deve ser obtida por getComputedStyle, nao por estimativa visual

  Cenario: Estado de hover sem troca de cor de fonte
    Dado que o cursor repouse sobre um card ou um item de navegacao
    Quando a transicao terminar apos 320 milissegundos
    Entao a propriedade transform deve indicar elevacao vertical
    E a box-shadow de hover deve estar aplicada
    E a propriedade color do texto deve permanecer identica ao estado de repouso

  Cenario: Respeito a preferencia de movimento reduzido
    Dado que o sistema declare prefers-reduced-motion: reduce
    Quando a pagina renderizar
    Entao nenhuma transicao ou animacao decorativa deve ser executada
```

### US-03 — Navegação hierárquica consistente
**Como** historiador militar, **quero** navegação idêntica em todas as páginas,
**para** localizar a seção de doutrina sem reaprender a interface.

*Prioridade:* Alta · *Pontos:* 5

```gherkin
Funcionalidade: Navegacao DRY com indicacao de rota ativa

  Cenario: Marcacao da rota corrente
    Dado que o analista esteja em "/doutrina.html"
    Quando o menu for injetado por js/nav.js
    Entao o link correspondente deve receber a classe "active"
    E deve declarar aria-current="page"
    E exatamente um link do menu deve estar marcado como ativo

  Cenario: Navegacao em viewport estreito
    Dado um viewport de 360px de largura
    Quando o analista acionar o controle de menu por teclado
    Entao o atributo aria-expanded deve alternar entre false e true
    E a tecla Escape deve fechar o menu e devolver o foco ao controle
```

### US-04 — Glossário de siglas técnicas
**Como** analista, **quero** resolver uma sigla do DoD sem sair da página,
**para** não perder o contexto de leitura.

*Prioridade:* Alta · *Pontos:* 5

```gherkin
Funcionalidade: Resolucao de siglas por popup inline

  Cenario: Abertura do popup de termo
    Dado que a pagina contenha um elemento span.term com data-term="JADC2"
    Quando o analista acionar o elemento por clique ou pela tecla Enter
    Entao um popup deve tornar-se visivel com opacity igual a 1
    E deve apresentar o termo completo em ingles, a traducao em portugues e a glosa
    E o termo deve existir como chave em data/glossary.js

  Cenario: Operacao integral por teclado
    Dado que o popup de termo esteja aberto
    Quando o analista pressionar Escape
    Entao o popup deve fechar
    E o foco deve retornar ao elemento span.term de origem
    E o atributo aria-expanded do elemento deve ser false
```

---

## E2 — Template de Análise Profunda e Ingestão

### US-05 — Filtragem de briefings por vetor militar
**Como** analista de inteligência, **quero** filtrar briefings por classe de
vetor militar, **para** acelerar a produção dos meus relatórios estratégicos.

*Prioridade:* Crítica · *Pontos:* 8

```gherkin
Funcionalidade: Filtragem facetada do catalogo de briefings

  Cenario: Filtro por vetor militar unico
    Dado que o catalogo em "/briefings.html" esteja carregado
    Quando o analista selecionar o vetor militar "naval"
    Entao apenas briefings cujo campo vetor_militar contenha "naval" devem ser listados
    E o contador de resultados deve refletir exatamente o numero de itens visiveis
    E a selecao ativa deve ser anunciada por aria-pressed="true"

  Cenario: Composicao de facetas com conjuncao
    Dado que o filtro de vetor militar "naval" esteja ativo
    Quando o analista adicionar a regiao geopolitica "indo-pacifico"
    Entao o resultado deve conter apenas itens que satisfacam ambos os criterios
    E as facetas ativas devem ser exibidas como chips removiveis individualmente

  Cenario: Conjunto de resultado vazio
    Dado que uma combinacao de facetas nao produza nenhum resultado
    Quando a filtragem for aplicada
    Entao deve ser exibida mensagem explicita de ausencia de resultados
    E deve ser oferecida acao de limpar filtros
    E a mensagem deve residir em regiao com aria-live="polite"

  Cenario: Filtragem operavel sem mouse
    Dado que o analista utilize apenas o teclado
    Quando percorrer os controles de faceta com Tab
    Entao cada faceta deve ser alcancavel e acionavel por Enter ou Space
    E o indicador de foco deve permanecer visivel em todo o percurso
```

### US-06 — Template padronizado de artigo
**Como** acadêmico, **quero** que toda análise siga a mesma estrutura, **para**
comparar briefings e localizar as referências sempre no mesmo lugar.

*Prioridade:* Crítica · *Pontos:* 8

```gherkin
Funcionalidade: Template canonico de artigo analitico

  Cenario: Renderizacao a partir do identificador de rota
    Dado que o analista acesse "/article.html?briefing=taiwan-strait"
    Quando o loader resolver o identificador
    Entao devem ser renderizadas as secoes lead, corpo analitico, dados tecnicos e referencias
    E o titulo do documento deve refletir o titulo do briefing
    E o conteudo textual deve ser injetado por textContent, nunca por innerHTML

  Cenario: Identificador invalido ou forjado
    Dado que o analista acesse "/article.html?briefing=<script>alert(1)</script>"
    Quando o loader validar o parametro contra a allow-list de content/briefings/index.json
    Entao nenhum script deve ser executado
    E deve ser exibida mensagem de briefing nao encontrado
    E o console do navegador nao deve registrar erro nao tratado

  Cenario: SEO tecnico do artigo
    Dado um artigo publicado
    Entao deve existir meta name="description" derivada do lead
    E deve existir link rel="canonical" apontando para a rota com o parametro do briefing
    E deve existir dado estruturado JSON-LD do tipo Article com datePublished
```

### US-07 — Ingestão de 5 a 10 briefings piloto verificados
**Como** analista de defesa, **quero** um corpus inicial com dados históricos
reais e citações verificadas, **para** confiar no portal como fonte de trabalho.

*Prioridade:* Crítica · *Pontos:* 13

```gherkin
Funcionalidade: Corpus piloto com rastreabilidade de fonte

  Cenario: Front Matter completo e valido
    Dado um briefing publicado em content/briefings/
    Entao os campos title, id, category, date, ano, vetor_militar,
      administracao_potus e regiao_geopolitica devem estar preenchidos
    E cada valor de enum deve pertencer ao dominio definido em docs/architecture.md
    E o identificador deve ser unico em todo o corpus

  Cenario: Densidade minima de fontes
    Dado um briefing publicado
    Entao deve haver no minimo duas fontes independentes
    E no minimo uma delas deve ser primaria do Governo dos Estados Unidos
    E cada fonte deve registrar identificador estavel alem da URL

  Cenario: Neutralidade do texto
    Dado o texto de um briefing publicado
    Entao nao deve conter adjetivos sensacionalistas
    E projecoes devem estar redigidas em modo condicional
    E designacoes de equipamento devem seguir a nomenclatura oficial do DoD
```

### US-08 — Referências cruzadas por ontologia
**Como** pesquisador, **quero** navegar de um conflito para a administração e o
sistema de armas associados, **para** reconstruir o encadeamento causal.

*Prioridade:* Média · *Pontos:* 5

```gherkin
Funcionalidade: Referencias cruzadas via ontologia

  Cenario: Correlacao a partir do briefing
    Dado um briefing cujo campo administracao_potus seja "biden"
    Quando a secao de referencias cruzadas renderizar
    Entao deve listar os conflitos e sistemas de armas correlacionados em data/ontology.json
    E cada correlacao deve ser um link resolvivel dentro do portal
    E nenhum link interno deve retornar rota inexistente
```

---

## E3 — Busca Estática, SEO Técnico e Deploy

### US-09 — Busca textual local sem backend
**Como** analista, **quero** buscar por designação de arma ou operação em todo o
portal, **para** localizar a passagem relevante sem varrer as páginas.

*Prioridade:* Alta · *Pontos:* 8

```gherkin
Funcionalidade: Busca estatica local

  Cenario: Consulta por designacao de sistema de armas
    Dado que o indice de busca tenha sido gerado no pipeline
    Quando o analista consultar "Minuteman III"
    Entao os resultados devem incluir toda pagina que mencione o termo
    E cada resultado deve exibir trecho de contexto com o termo destacado
    E o tempo de resposta percebido deve ser inferior a 200 milissegundos

  Cenario: Consulta sem correspondencia
    Dado que o analista consulte um termo ausente do corpus
    Entao deve ser exibida mensagem de ausencia de resultados
    E a mensagem deve ser anunciada em regiao aria-live="polite"

  Cenario: Acessibilidade do campo de busca
    Dado o campo de busca
    Entao deve possuir rotulo associado por label ou aria-label
    E a lista de resultados deve ser navegavel por teclado
    E o payload inicial do indice nao deve exceder 50 quilobytes
```

### US-10 — SEO técnico e indexabilidade
**Como** Product Owner, **quero** que o portal seja corretamente indexado,
**para** que analistas o encontrem por busca orgânica.

*Prioridade:* Alta · *Pontos:* 5

```gherkin
Funcionalidade: SEO tecnico do portal

  Cenario: Artefatos de indexacao
    Dado o site publicado
    Entao deve existir "/sitemap.xml" listando todas as rotas canonicas
    E deve existir "/robots.txt" referenciando o sitemap
    E nenhuma rota canonica deve estar marcada como noindex

  Cenario: Integridade de links
    Dado que o verificador de links execute no pipeline
    Quando todos os links internos e externos forem resolvidos
    Entao nao deve haver nenhuma resposta 404 em link interno
    E links externos irresolviveis devem falhar a execucao do pipeline
```

### US-11 — Deploy automatizado com portões de qualidade
**Como** mantenedor, **quero** que apenas conteúdo aprovado seja publicado,
**para** que um erro editorial não alcance a audiência.

*Prioridade:* Crítica · *Pontos:* 8

```gherkin
Funcionalidade: Pipeline de publicacao com portoes bloqueantes

  Cenario: Publicacao de alteracao conforme
    Dado um commit na branch "main" que satisfaca todos os portoes
    Quando o workflow deploy.yml executar
    Entao o lint de Markdown deve concluir sem erro
    E a validacao de HTML deve concluir sem erro
    E o verificador de links deve concluir sem link quebrado
    E "node assets/verify.js" deve imprimir VERIFICATION PASSED
    E o artefato estatico deve ser publicado na plataforma de borda

  Cenario: Bloqueio de alteracao nao conforme
    Dado um commit que introduza um link quebrado
    Quando o workflow executar
    Entao a etapa de verificacao de links deve falhar
    E a etapa de deploy nao deve ser executada
    E a versao publicada anteriormente deve permanecer intacta
```

---

## E4 — Visualização e Citação (v2.0+, não priorizado para v1.0)

Detalhamento em [`../brainstorm.md`](../brainstorm.md).

| ID | História | Gatilho de entrada no backlog |
|---|---|---|
| US-12 | Série histórica do orçamento de defesa (Chart.js sobre JSON) | dados do Green Book consolidados |
| US-13 | Bibliografia centralizada em `data/references.json` | corpus > 25 documentos |
| US-14 | Exportação de citação (Chicago/APA/BibTeX) | demanda acadêmica confirmada |
| US-15 | Linha do tempo interativa de doutrina | ontologia doutrinária completa |
| US-16 | Mapa de calor de conflitos por região e década | dataset geográfico validado |

---

## Definition of Ready

Uma história entra na sprint apenas quando:

- [ ] Tem critérios de aceitação em Gherkin, incluindo cenário de a11y **e** de SEO.
- [ ] Tem estimativa em pontos acordada.
- [ ] Não depende de história ainda não concluída.
- [ ] Fontes de dados necessárias estão identificadas e acessíveis.

## Definition of Done

- [ ] Todos os cenários Gherkin verificados em browser real (FCS).
- [ ] `node assets/verify.js` → **VERIFICATION PASSED**.
- [ ] Checklists de [`../quality.md`](../quality.md) §1 e §2 integralmente marcados.
- [ ] Pipeline de CI verde (lint · HTML · links · verify · pagefind).
- [ ] Documentação afetada atualizada no mesmo pull request.
