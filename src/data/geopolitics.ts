import type { GeopoliticalCase } from '../types';

// Estudos de caso geopolíticos regionais (impactos-geopoliticos).
// Fontes: CRS Reports, IISS Military Balance, RAND Corporation.

export const geopoliticsData: GeopoliticalCase[] = [
  {
    id: 'geo-taiwan',
    title: 'Dissuasão no Estreito de Taiwan e a "Estratégia Hellscape"',
    region: 'Indo-Pacífico',
    period: '2016–presente',
    administration: 'biden',
    summary:
      'Os EUA reorientam a prontidão do Indo-Pacífico para negar uma invasão chinesa de Taiwan via enxames autônomos e arquitetura AUKUS.',
    keyDynamics: [
      'Modernização acelerada do PLA Rocket Force (DF-17/DF-26)',
      'Desdobramento de enxames Replicator como barreira autônoma',
      'Eixo AUKUS de submarinos nucleares e compartilhamento de sensores',
    ],
    relatedDoctrines: ['doct-gpc', 'doct-mdo'],
    relatedWeapons: ['ws-f35', 'ws-lrhw', 'ws-replicator', 'ws-aukus'],
    outcome: 'Fase de dissuasão ativa; nenhum conflito cinético direto até o momento.',
    source: 'DoD China Military Power Report / CRS Report R46658',
    lastVerified: '2026-08-20',
  },
  {
    id: 'geo-ukraine',
    title: 'Guerra Russa-Ucraniana e a Logística de Dissuasão no Flanco Leste',
    region: 'Europa Oriental',
    period: '2022–presente',
    administration: 'biden',
    summary:
      'Apoio dos EUA por procuração revela a centralidade da artilharia de desgaste, drones e consumo industrial de munições.',
    keyDynamics: [
      'Fornecimento de HIMARS, Patriots e Foguetes GMLRS/PrSM',
      'Guerra de drones e saturação de defesa antimíssil',
      'Reativação de prontidão da OTAN no flanco leste (eFP)',
    ],
    relatedDoctrines: ['doct-gpc', 'doct-mdo'],
    relatedWeapons: ['ws-himars', 'ws-patriot', 'ws-f16', 'ws-m1'],
    outcome: 'Conflito de alta intensidade prolongado; sem tropas de combate dos EUA.',
    source: 'DoD Fact Sheets on U.S. Security Assistance to Ukraine / CSIS',
    lastVerified: '2026-08-20',
  },
  {
    id: 'geo-redsea',
    title: 'Operação Prosperity Guardian e a Guerra de Custo Assimétrico',
    region: 'Chifre da África / Oriente Médio',
    period: '2023–presente',
    administration: 'biden',
    summary:
      'Primeiro emprego operacional contínuo de mísseis balísticos antinavio e energia dirigida em combate real no Mar Vermelho.',
    keyDynamics: [
      'Interceptações de mísseis Houthi por SM-2/SM-6 e HELIOS',
      'Custo assimétrico desfavorável de interceptores vs. drones baratos',
      'Patrulha não tripulada com IA (Task Force 59)',
    ],
    relatedDoctrines: ['doct-gpc', 'doct-mdo'],
    relatedWeapons: ['ws-patriot', 'ws-helios', 'ws-mq9'],
    outcome: 'Liberdade de navegação sustentada; sem baixas americanas diretas.',
    source: 'USCENTCOM Statements / IISS Military Balance',
    lastVerified: '2026-08-20',
  },
  {
    id: 'geo-baltics',
    title: 'Corredor de Suwalki e a Tensão OTAN-Rússia',
    region: 'Europa Oriental',
    period: '2014–presente',
    administration: 'trump2',
    summary:
      'A estreita faixa entre Kaliningrado e Bielorrússia é o ponto de estrangulamento dos Bálticos e teste do Artigo 5.',
    keyDynamics: [
      'Bolha A2/AD densa em Kaliningrado (S-400, Iskander-M)',
      'Prontidão imediata de 300.000 soldados da OTAN',
      'Defesa de cada centímetro com batalhões eFP',
    ],
    relatedDoctrines: ['doct-gpc', 'doct-mdo'],
    relatedWeapons: ['ws-patriot', 'ws-stryker', 'ws-himars'],
    outcome: 'Dissuasão por prontidão; sem conflito direto da OTAN.',
    source: 'RAND Research Report: Reinforcing Deterrence on NATO’s Eastern Flank',
    lastVerified: '2026-08-20',
  },
  {
    id: 'geo-iran',
    title: 'Tensão Nuclear com o Irã e a Coerção Grey-Zone',
    region: 'Oriente Médio',
    period: '2025–presente',
    administration: 'trump2',
    summary:
      'Uso combinado de P&D, ciberespaço e dissuasão para conter o programa nuclear sem invasão em larga escala.',
    keyDynamics: [
      'Sabotagem e ciberataques a instalações',
      'Emprego de B-2 e LRHW em demonstrativos de capacidade',
      'Vigilância espacial da USSF',
    ],
    relatedDoctrines: ['doct-gpc', 'doct-mdo'],
    relatedWeapons: ['ws-b2', 'ws-lrhw', 'ws-ussf'],
    outcome: 'Fase de coerção; sem guerra larga declarada.',
    source: 'CRS Report R44049 / IISS',
    lastVerified: '2026-08-20',
  },
  {
    id: 'geo-arctic',
    title: 'Militarização do Ártico e a Linha GIUK',
    region: 'Região Polar Ártica',
    period: '2018–presente',
    administration: 'trump2',
    summary:
      'Aquecimento e rotas do Norte reabrem a competição estratégica; Rússia expande a Frota do Norte e os EUA reativam a 2ª Frota.',
    keyDynamics: [
      'Submarinos nucleares russos classe Yasen sob o gelo',
      'Radares de alerta precoce da USSF em Thule/Pituffik',
      'Adesão de Finlândia e Suécia à OTAN (flanco nórdico)',
    ],
    relatedDoctrines: ['doct-gpc'],
    relatedWeapons: ['ws-ussf'],
    outcome: 'Monitoramento acústico e espacial intensificado.',
    source: 'DoD Arctic Strategy 2024 / US Coast Guard Polar Security Cutter',
    lastVerified: '2026-08-20',
  },
];
