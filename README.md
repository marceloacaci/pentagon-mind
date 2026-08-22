# PENTAGON-MIND

Portal web analítico e estático sobre a doutrina militar, tecnologia de defesa e projeções geopolíticas dos Estados Unidos.

> Público-alvo: analistas de defesa, acadêmicos de relações internacionais e historiadores militares.
> Tom objetivo, estéril e altamente técnico (padrão RAND / CSIS / SIPRI). Idioma: pt-BR.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Briefing de Inteligência — mapa de vetores de ameaça |
| `doutrina.html` | Evolução da doutrina militar (desgaste → MDO/JADC2) |
| `politicas-presidenciais.html` | Matriz comparativa Bush 41 → Trump 2 |
| `arsenal-tecnologia.html` | Tríade nuclear, 5ª/6ª geração, hipersônicos, spin-offs DARPA |
| `impactos-geopoliticos.html` | Estudos de caso & postura multidomínio |
| `glossario.html` | Glossário Analítico & Siglas (33 termos) |

- `css/styles.css` — design system (padrão MeuBolso "raised/gear-opt")
- `js/` — nav/footer, glossary engine, ontology
- `data/` — `glossary.js` (siglas), `ontology.json` (relações presidente↔conflito↔arma)
- `assets/img/` — imagens reais (domínio público / Governo dos EUA, Wikimedia Commons)

## Como servir localmente

```bash
node assets/serve.cjs
# abre em http://127.0.0.1:8726/index.html
```

## Verificação

```bash
node assets/verify.js   # valida as 6 páginas (nav/footer, glossary host, etc.)
```

## Documentação de design

- `PRODUCT.md` — product truth (usuários, propósito, plataforma, capacidades)
- `DESIGN.md` — sistema visual incumbente (paleta, raised gradients, gear-opt hover)

## Créditos de imagem

Imagens: domínio público / Governo dos EUA (Wikimedia Commons). Não constitui
aconselhamento estratégico oficial. Citações reproduzidas conforme registros
públicos (DoD, CRS, SIPRI).
