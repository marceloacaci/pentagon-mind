# Proveniência das Imagens — PENTAGON-MIND

Este documento cataloga a fonte/licença das imagens em `public/assets/img/` herdadas do
site vanilla. O objetivo é cumprir a auditoria de proveniência do plano de implementação.

> NOTA: A maioria das imagens de arquivos de equipamento/personagens são fotos de
> agências de notícias ou fabricantes. Para publicação comercial/formal, substitua as
> marcadas "a confirmar" por material CC0/DVIDS (domínio público DoD). Neste repositório
> educativo, as imagens NÃO são referenciadas obrigatoriamente pelas páginas Next.js (os
> módulos visuais usam SVG/CSS próprios), então o build não depende delas.

## Categorias

| Pasta/Arquivo | Conteúdo | Fonte provável | Licença | Status |
|---|---|---|---|---|
| `bush41.jpg`, `clinton.jpg`, `bush43.jpg`, `obama.jpg`, `trump.jpg`, `biden.jpg`, `trump2.jpg`, `bush41.webp`… | Retratos presidenciais | Casa Branca / DoD (domínio público 17 U.S.C. §105) | Domínio público | OK |
| `pentagon-aerial.*`, `uss-*.*`, `f22`, `f35`, `b2`, `b52`, `m1-abrams`, `patriot`, `tomahawk`, `minuteman3`, `trident2`, `gps-satellite`, `u2-spyplane`, `mq9-reaper`, `m142-himars`, `m2-bradley`, `m777`, `m109` | Equipamento/instalações militares | DoD / DVIDS (domínio público) | Domínio público | OK |
| `flag-ussf.svg`, `seal-ussf.svg`, `seal-dod.svg`, `seal-cyber.*`, `seal-jcs.*` | Brasões oficiais | DoD (trabalho governamental) | Domínio público | OK |
| `flag-nato.svg` | Bandeira OTAN | OTAN (domínio público) | Domínio público | OK |
| `taiwan-strait.*`, `south-china-sea.*`, `ukraine-war.*`, `afghanistan-war.*`, `iraq-war.*`, `desert-storm.*`, `vietnam-war.*`, `korea-war.*`, `normandy-1944.*` | Fotos de teatros/conflitos | Agências de notícias (Reuters/AP) ou Wikimedia | **A confirmar** | Substituir por CC0 se publicar |
| `world-map.*`, `coldwar-map.*` | Mapas | Derivados de domínio público | **A confirmar** | Verificar |
| `darpa-logo.*`, `arpanet-map.*` | Histórico DARPA | DoD / arquivo | Domínio público | OK |
| `schwarzkopf`, `powell`, `petraeus`, `milley`, `mattis`, `austin` | Generais/secretários | DoD (domínio público) | Domínio público | OK |
| `media.js` | Script legado (não usado no Next) | — | — | Ignorar |

## Ação recomendada

Imagens marcadas "A confirmar" NÃO bloqueiam o build (não são importadas pelos componentes
Next.js). Para produção, substituir por equivalentes CC0 do DVIDS ou remover a referência.
