# content/analysis/ — Análises Aprofundadas

Diretório de análises longas em Markdown (doutrina, tecnologia, geopolítica),
distintas dos **briefings** (estudos de caso curtos em
`content/briefings/*.json`).

## Como criar uma análise

1. Copie [`../_template.md`](../_template.md) para `content/analysis/<id>.md`.
2. Preencha o Front Matter conforme o contrato de
   [`../../docs/architecture.md`](../../docs/architecture.md) §4 — todos os
   campos obrigatórios, todos os enums dentro do domínio.
3. Redija seguindo a estrutura canônica: Síntese · Contexto · Análise ·
   Dados Técnicos · *(Em outras palavras)* · Referências.
4. Aplique as regras de escrita de
   [`../../docs/editorial-guidelines.md`](../../docs/editorial-guidelines.md)
   (nomenclatura oficial do DoD, proibição de adjetivos sensacionalistas,
   neutralidade).
5. Percorra o checklist de
   [`../../docs/quality.md`](../../docs/quality.md) §1 integralmente.
6. Execute os verificadores antes de abrir o pull request:

```bash
node assets/verify.js
node assets/check_frontmatter.js
```

## Convenções

- `id` em kebab-case, único em todo o corpus (briefings inclusos).
- Mínimo de **2 fontes independentes**, sendo **≥ 1 primária do Governo dos EUA**.
- Cada fonte com identificador estável (nº de série CRS/RAND, DOI, ISBN) além da
  URL.
- Imagens referenciadas pelo registry `PM_MEDIA` (`assets/img/media.js`) — nunca
  por URL externa.
- Siglas marcadas com `<span class="term" data-term="SIGLA">` e presentes em
  `data/glossary.js`.
