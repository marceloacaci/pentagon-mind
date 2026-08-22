# Checklist de Qualidade de Dados — PENTAGON-MIND

> Aplicar **antes** de publicar qualquer conteúdo novo. Sem todos os itens marcados, não publicar.

## 1. Verificação de Fatos (Fact-Check)

- [ ] Toda afirmação quantitativa (orçamento, efetivos, datas, designações) tem **2 fontes independentes**.
- [ ] Citações `ipsis litteris` conferidas contra o registro público original (DoD/CRS/SIPRI/Congress).
- [ ] Datas e nomes próprios revisados (ex.: `LGM-30G Minuteman III`, não "Minuteman 3").
- [ ] Siglas definidas na primeira ocorrência (termo completo + sigla).

## 2. Revisão de Viés Linguístico (Neutralidade)

- [ ] Sem adjetivos hiperbólicos/sensacionalistas.
- [ ] Sem julgamento partidário (descreve postura, não aprova/reprova).
- [ ] Nações tratadas como atores institucionais, não antropomorfizadas.
- [ ] Projeções em modo condicional; factuais em indicativo.

## 3. Citação e Referências

- [ ] Bloco "Referências" presente na página.
- [ ] Formato conforme `editorial-guidelines.md` (CRS/DoD/SIPRI/Foreign Affairs).
- [ ] Links para fontes primárias ou think tanks de referência (RAND/CSIS/SIPRI/IISS).

## 4. Imagens

- [ ] Domínio público / Governo dos EUA ou licença compatível.
- [ ] `alt` descritivo presente.
- [ ] `figcaption` com fonte/data quando aplicável.
- [ ] Arquivo versionado em `assets/img/` (não URL externa efêmera).

## 5. Acessibilidade (WCAG 2.1 AA)

- [ ] Contraste texto/fundo ≥ 4.5:1.
- [ ] Foco visível em todos os controles interativos.
- [ ] Navegação por teclado nos popups de glossário (`tabindex`/`aria-label`).
- [ ] HTML semântico (`<main>`, `<nav>`, `<section>`, `<h1>`–`<h3>` hierárquico).

## 6. Técnico (Build/Static)

- [ ] `node assets/verify.js` → **VERIFICATION PASSED**.
- [ ] Sem erros no console do browser (FCS: inspeção `getComputedStyle`).
- [ ] Sem recursos externos que quebrem offline (tudo versionado).

## 7. Estilo

- [ ] Tom "estéril/técnico" mantido (ver `editorial-guidelines.md`).
- [ ] Sem gamificação / sem elementos de redes sociais.
- [ ] Consistência visual com `css/styles.css` (raised/gear-opt, radius 10px).
