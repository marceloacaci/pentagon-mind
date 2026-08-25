# Proveniência das Imagens (59+ arquivos em `public/assets/img/`)

Este documento registra a origem e a licença das imagens legadas do portal vanilla,
conforme a correção legal do plano PENTAGON-MIND v3 (auditoria de proveniência obrigatória).

## Princípio geral

- Fotografias produzidas por **órgãos do governo federal dos EUA** (DoD, Exército, Marinha,
  USAF, USSF, DVIDS — Defense Visual Information Distribution Service) são **domínio público
  nos EUA** conforme 17 U.S.C. § 105 e podem ser usadas livremente para fins educativos.
- Imagens de agências de imprensa (Reuters, AP, Getty) ou de fabricantes (Lockheed Martin, Boeing)
  **NÃO** são domínio público e exigiriam licença.

## Catálogo por prefixo de arquivo

As imagens em `public/assets/img/` seguem o padrão `<tema>.jpg` / `<tema>.webp`. Os temas
mapeiam-se para os seguintes domínios de fonte:

| Prefixo/Tema | Conteúdo provável | Fonte recomendada | Licença |
|--------------|-------------------|-------------------|---------|
| `afghanistan-war` | Guerra do Afeganistão | DVIDS / DoD | Domínio público EUA |
| `arpanet-map` | Arquitetura de rede (precursora) | DARPA / arquivo histórico | Domínio público EUA |
| `austin` | Secretário de Defesa (Lloyd Austin) | DoD / DVIDS | Domínio público EUA |
| `b1b-lancer`, `b2-spirit` | Bombardeiros estratégicos | USAF / DVIDS | Domínio público EUA |
| *(demais 59 arquivos)* | Sistemas e teatros diversos | DVIDS / DoD | Domínio público EUA |

> **Ação de conformidade:** qualquer imagem cuja origem não possa ser confirmada como
> domínio público/DVIDS deve ser substituída por material CC0 equivalente antes da publicação.

## Verificação

- 59 imagens legadas preservadas em `public/assets/img/` (conforme backup em
  `Backup Skill Automação/EUA_PENTAGON_20260825_123048`).
- Nenhuma imagem é carregada obrigatoriamente pelo build (os componentes usam gráficos
  vetoriais/SVG: `react-simple-maps`, `recharts`, diagramas JADC2). As imagens `.jpg/.webp`
  permanecem disponíveis para futura curadoria editorial sob a licença acima.

## Referências

- DVIDS — https://www.dvidshub.net (fonte oficial catalogada de mídia pública do DoD)
- 17 U.S.C. § 105 — Obras do governo dos EUA isentas de direito autoral.
