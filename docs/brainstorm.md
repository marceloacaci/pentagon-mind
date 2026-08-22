# Brainstorm — Diferenciais e Recursos Analíticos

> Ideias alinhadas ao perfil "altamente técnico e objetivo". Nenhuma delas compromete a natureza estática ou a seriedade acadêmica.

## Recursos Analíticos (diferenciais)

1. **Visualizações de dados interativas (client-side, sem backend)**
   - Gráfico de evolução do orçamento de defesa dos EUA (DoD Budget Request, CRS).
   - Mapa de calor de conflitos por região (camada sobre o mapa-múndi existente).
   - *Implementação:* SVG/Canvas ou lib leve (ex.: Chart.js via CDN opcional) — dados embutidos em `data/`.

2. **Linha do tempo interativa de doutrinas**
   - Slider temporal: desgaste industrial → AirLand Battle → COIN → GPC → MDO/JADC2.
   - *Implementação:* componente `js/` consumindo `data/ontology.json`.

3. **Matriz de dissuasão integrada**
   - Cruzamento visual de capacidades militares × econômicas × cibernéticas × diplomáticas por administração.

4. **Filtragem avançada por ontologia**
   - Tags: ano, tipo de arma, região, presidente. Já suportado parcialmente pela matriz de presidências.

## Curadoria de Fontes

1. **Sistema de citação rigorosa (padrão acadêmico)**
   - Citações `ipsis litteris` com atribuição verificável (ver `editorial-guidelines.md`).
   - Bloco "Referências" por página (CRS, DoD Joint Pubs, SIPRI Yearbook, Foreign Affairs).

2. **Seção "Leitura Recomendada"**
   - Links para think tanks de referência: RAND, CSIS, SIPRI, IISS, CFR, Brookings.
   - Critério de inclusão: fontes primárias ou peer-reviewed; sem mídia sensacionalista.

3. **Verificação de fatos (fact-check) obrigatória**
   - Antes de publicar: 2 fontes independentes para cada afirmação quantitativa.

## Princípios de Exclusão (o que NÃO faremos)

- ❌ Gamificação (badges, pontos, rankings).
- ❌ Botões de compartilhamento social / feed.
- ❌ Comentários abertos sem moderação editorial.
- ❌ Qualquer elemento que desvie do perfil sério/acadêmico.

## Ideias de Longo Prazo (opcionais, mantendo o estático)

- Exportação de página para PDF/acadêmico.
- Modo "citação rápida" (copia referência formatada).
- Índice temático navegável (A–Z de doutrinas/armas).
