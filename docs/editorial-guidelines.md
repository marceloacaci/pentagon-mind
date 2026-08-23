# Guia de Estilo Editorial e Visual — PENTAGON-MIND

> Regras rígidas de escrita e de apresentação. O objetivo é um registro
> cirúrgico, estéril e geopoliticamente neutro. Desvio de tom é defeito
> bloqueante de merge, não questão de preferência.

---

## PARTE I — DESIGN SYSTEM SÓBRIO

## 1. Paleta Institucional

Contrato de cor. Nenhuma cor fora desta tabela entra no portal.

| Token | Valor | Aplicação |
|---|---|---|
| `--bg` | `#14161a` | fundo do documento (cinza-frio quase preto) |
| `--surface` | `#0e1116` | superfície de card e painel |
| `--surface-2` | `#1b1f26` | superfície elevada, nota, popup |
| `--primary` | `#2f7fb5` | azul-marinho institucional: link, borda ativa, foco |
| `--primary-soft` | `rgba(47,127,181,.18)` | fundo de estado ativo |
| `--accent` | `#c9a227` | âmbar: destaque analítico, seta, marcação de dado |
| `--text` | `#ffffff` | texto corrido (branco absoluto) |
| `--text-dim` | `#b9c0c9` | texto secundário, legenda, metadado |
| `--border` | `#3a4049` | borda padrão |
| `--danger` | `#b04a3a` | estado de erro (uso exclusivamente funcional) |

Restrições:

- **Cor não codifica informação isoladamente.** Toda distinção por cor
  acompanha rótulo textual ou padrão de forma (WCAG 1.4.1).
- Sem gradiente decorativo, sem cor saturada de alerta, sem semáforo
  vermelho/amarelo/verde para juízo de valor.
- Escala de intensidade em visualização de dados é **monocromática sequencial**
  (azul-marinho → âmbar), nunca arco-íris.
- Contraste mínimo **4,5:1** para texto corrido e **3:1** para texto grande,
  sempre **medido** por `getComputedStyle`.

## 2. Tipografia

Híbrida serifada/sem-serifa, otimizada para leitura longa. **Nenhuma web font
bloqueante** — pilha do sistema apenas.

| Uso | Pilha | Justificativa |
|---|---|---|
| Corpo de artigo | `Georgia, "Times New Roman", serif` | serifa reduz fadiga em texto extenso |
| Interface, títulos, navegação | `system-ui, "Segoe UI", Roboto, sans-serif` | densidade e nitidez em alta hierarquia |
| Sigla, designação, dado numérico | `ui-monospace, "Cascadia Mono", Consolas, monospace` | alinhamento de coluna e distinção de caractere |

Métricas de leitura:

- Corpo: `1rem`/`1.7` de altura de linha; medida de **66–80 caracteres** por linha.
- `h1` `2rem` · `h2` `1.5rem` · `h3` `1.25rem`; escala 1,25.
- Nenhum texto abaixo de `0.875rem`.
- Alinhamento à esquerda; **sem justificação** (evita rios de espaço).
- Tabelas e fichas técnicas em monoespaçada tabular.

## 3. Layout e Densidade

- Densidade informacional **alta**; densidade decorativa **nula**.
- Espaçamento em escala de 4 px (`4 · 8 · 12 · 16 · 24 · 32 · 48`).
- `--radius: 10px` uniforme.
- Superfície elevada (*raised*) 85/95% + `box-shadow` em cards, chips, botões e
  `summary` de ficha técnica.
- **Hover (regra rígida):** elevação vertical + `box-shadow` + borda `--primary`.
  **Proibido** alterar `color` do texto no hover.
- `--shadow-hover` em tema escuro inclui componente branca difusa — sombra preta
  é invisível sobre fundo escuro.
- Proibidos: carrossel, parallax, animação decorativa, ícone sem rótulo textual,
  modal de captura, banner promocional.
- Estado de `:hover` deve ser medido **após** o término da transição (~320 ms),
  nunca imediatamente após a aplicação da classe.

---

## PARTE II — REGRAS DE ESCRITA MILITAR

## 4. Princípios Gerais

1. **Neutralidade analítica.** Descrever postura e capacidade. Nunca aprovar,
   condenar, celebrar ou lamentar.
2. **Precisão terminológica.** Termo técnico correto na primeira ocorrência,
   seguido da sigla entre parênteses.
3. **Capacidade ≠ intenção.** Capacidade é verificável e vai em indicativo;
   intenção é inferida, vai em condicional e é sempre atribuída a uma fonte.
4. **Uma ideia por frase.** Parágrafos curtos; listas para enumeração.
5. **Todo número tem fonte.** Afirmação quantitativa sem referência não é
   publicável.

## 5. Terminologia do Departamento de Defesa

Autoridade normativa, em ordem de precedência:

1. **DoD Dictionary of Military and Associated Terms**
2. **Joint Publications** (JP 1, JP 3-0, JP 5-0)
3. Documentos de estratégia (NDS, NSS, NMS)
4. *Fact sheets* das forças singulares (af.mil, navy.mil, army.mil)

| Prefira | Evite |
|---|---|
| Operações Multidomínio (MDO) | "guerra total" |
| Anti-Acesso/Negação de Área (A2/AD) | "muro de defesa" |
| Dissuasão integrada | "ameaça" (vago) |
| Projeção de força | "dominância" |
| Adversário de nível quase-igual (*near-peer*) | "inimigo" (salvo em citação) |
| Conflito de baixa intensidade | "guerra secreta" |
| Assistência de segurança | "envio de armas" |
| Estado soberano / governo de | "regime" (salvo em citação) |
| Baixas / vítimas | "mortos" (sem qualificação de fonte) |
| Sistema autônomo letal | "robô assassino" |

- Siglas em maiúsculas, sem ponto: `A2/AD`, `JADC2`, `C2`, `CSG`, `ISR`, `PQC`,
  `MDO`, `GPC`, `COIN`, `ICBM`, `SLBM`.
- Nome de operação em itálico, grafia original: *Operation Enduring Freedom*.
- Tradução em português entre parênteses na primeira ocorrência, quando útil.

## 6. Nomenclatura de Sistemas de Armas

Formato obrigatório: **designação (MDS) + nome popular oficial**, na primeira
ocorrência.

| Correto | Incorreto |
|---|---|
| `LGM-30G Minuteman III` | "Minuteman 3", "míssil Minuteman" |
| `UGM-133A Trident II D5` | "Trident D-5", "Trident 2" |
| `F-35A Lightning II` | "F35", "caça furtivo americano" |
| `F-22A Raptor` | "F-22 Raptor stealth" |
| `B-21 Raider` | "novo bombardeiro invisível" |
| `M142 HIMARS` | "Himars", "lança-foguetes americano" |
| `MQ-9A Reaper` | "drone Reaper", "drone assassino" |
| `MIM-104 Patriot` | "escudo Patriot" |
| `USS Gerald R. Ford (CVN-78)` | "porta-aviões Ford" |

Regras complementares:

- A variante importa: `F-35A` (USAF), `F-35B` (USMC, STOVL) e `F-35C` (USN, CATOBAR)
  **não** são intercambiáveis.
- Navio: `USS Nome (casco-número)` na primeira menção; itálico não é usado no
  nome do navio neste portal.
- Unidade: designação completa (`3rd Infantry Division`), sem tradução informal.
- Número de série de programa mantido no original (`GBSD`, `NGAD`, `Sentinel`).

## 7. Proibições Absolutas

### 7.1 Adjetivos sensacionalistas — vetados

*devastador · aniquilador · assustador · inevitável · humilhante · brilhante ·
catastrófico · imbatível · lendário · terrível · impressionante · gigantesco ·
histórico* (como elogio) · *mortal* (como qualificador retórico)

### 7.2 Linguagem de viés político-ideológico — vetada

- Nenhum juízo sobre acerto ou erro de administração, partido ou governo.
- Nenhum epíteto: "falcão", "belicista", "apaziguador", "isolacionista" como
  rótulo — apenas quando textualmente citado de uma fonte, com atribuição.
- Nenhuma antropomorfização de Estado: "a política declarada dos EUA visa…",
  nunca "os EUA querem…".
- Simetria terminológica obrigatória entre atores em conflito.
- Território disputado: descrever **controle de fato** e **reivindicação**, sem
  pressupor reconhecimento político.
- Nenhuma projeção apresentada como fato consumado.
- Nenhuma atribuição de motivação psicológica a chefe de Estado.

### 7.3 Elementos de produto vetados

Gamificação (badge, ponto, ranking, *streak*), botão de compartilhamento,
contador de visualização, comentário aberto, *newsletter*, *paywall*, analytics
de terceiros.

## 8. Formatação de Citações e Referências

Base **Chicago (notes-bibliography)** para material documental e histórico;
**APA 7** em periódico acadêmico. Formatação uniforme dentro de cada documento.

**Publicação doutrinária:**
> U.S. Joint Chiefs of Staff. *Joint Publication 3-0: Joint Campaigns and
> Operations*. Washington, DC: JCS, 2022.

**Relatório CRS:**
> Congressional Research Service. *Defense Primer: U.S. Defense Budget*
> (R47266). Washington, DC: CRS, 2023.

**Relatório RAND:**
> Heginbotham, Eric, et al. *The U.S.–China Military Scorecard*. Santa Monica,
> CA: RAND Corporation, 2015. RR-392-AF.

**Anuário:**
> SIPRI. *SIPRI Yearbook 2024: Armaments, Disarmament and International
> Security*. Oxford: Oxford University Press, 2024.

**Periódico:**
> Autor, A. "Título do artigo." *Foreign Affairs* 103, n. 2 (2024): 45–58.

**Citação direta (*ipsis litteris*):**
> "Be polite, be professional, but have a plan to kill everybody you meet."
> — Mattis, J. N., citado em U.S. Congress, *Hearings* (2003).

Regras:

- Toda referência exige **identificador estável** além da URL (número de série,
  ISBN, DOI). URL isolada não é referência aceitável.
- Citação em língua estrangeira é reproduzida no original, com tradução pt-BR
  em `<span class="quote-translation">`.
- Elisão marcada com `[...]`; interpolação do autor entre `[ ]`.
- Bloco "Referências" ao final, em ordem alfabética por autor/instituição.

## 9. Convenções de Estrutura de Documento

Ordem canônica das seções de um artigo:

1. **Síntese (lead)** — tese central em um parágrafo.
2. **Contexto** — antecedentes verificáveis.
3. **Análise** — capacidades, posturas, doutrina aplicada.
4. **Dados Técnicos** — tabela ou ficha com fonte por célula.
5. **Em outras palavras** — reformulação para não-especialista (opcional).
6. **Referências** — obrigatória.

Marcações de conteúdo:

- Sigla: `<span class="term" data-term="JADC2">`
- Tradução de citação: `<span class="quote-translation">`
- Reformulação didática: `<div class="explainer">`
- Célula de dado sem fonte confirmada: `—` (nunca uma estimativa não referenciada).

## 10. Imagens

- Exclusivamente domínio público, obra do Governo dos EUA (DVIDS, DoD, forças
  singulares) ou licença compatível — verificada individualmente.
- Arquivo versionado em `assets/img/` e registrado em `assets/img/media.js`.
  **Nunca** `<img src="https://…">` para host externo (quebra offline, expõe a
  CSP e depende de URL rotativa).
- `alt` descritivo e informativo; `alt=""` apenas em imagem estritamente
  decorativa.
- `figcaption` com identificação do objeto, fonte e data.
- WebP/AVIF com fallback; `width`/`height` explícitos; `loading="lazy"` abaixo
  da dobra.
- Sem sobreposição de texto em imagem sem contraste medido.
- Nenhuma imagem de combate usada como recurso dramático — a imagem ilustra o
  objeto técnico ou o teatro de operações discutido no texto.
