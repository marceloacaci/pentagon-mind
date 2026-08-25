import type { Briefing } from '../types';

// Briefings analíticos — resumos/paráfrases PRÓPRIOS do conteúdo de fontes
// primárias estáveis (CRS, RAND, CSIS, DoD Joint Pubs). NUNCA reprodução
// extensa de texto original. Cada item cita fontes por identifier/url.
// (Correção de direitos autorais do plano v3.)

export const briefingsData: Briefing[] = [
  {
    id: 'brf-jadc2',
    slug: 'arquitetura-jadc2-sensor-to-shooter',
    title: 'Arquitetura JADC2: do Sensor ao Atirador em Segundos',
    classificationHeader: 'ANÁLISE — DOMÍNIO PÚBLICO (PARÁBASE DE FONTES OFICIAIS)',
    date: '2026-05-12',
    authorAgency: 'PENTAGON-MIND / Equipe de Análise',
    summary:
      'Síntese da evolução do conceito de Comando e Controle Conjunto de Todos os Domínios e como ele reduz o tempo de decisão militar.',
    strategicContext:
      'A competição com grandes potências exige ciclos de decisão mais rápidos que os do adversário. O JADC2 conecta sensores (espaço, aeronaves, navios) a atiradores (HIMARS, destróieres, caças) via nuvem tática e IA.',
    tacticalAnalysis: [
      'Sensores SDA/Espaço detectam alvos e alimentam a malha de dados em tempo real.',
      'Plataformas aéreas (E-7, F-35) atuam como nós de fusão e retransmissão.',
      'A nuvem tática (ABMS / Project Convergence) atribui engajamentos automaticamente.',
      'Atiradores cinéticos (HIMARS, Typhon, Arleigh Burke) recebem alvos em segundos.',
    ],
    technicalData: {
      'Conceito Origem': 'DoD CJADC2 Strategy (2022)',
      'Pilar USAF': 'ABMS (Advanced Battle Management System)',
      'Pilar Navy': 'Project Overmatch',
      'Pilar Army': 'Project Convergence',
      'Enlace Tático': 'Link 16 / FMN (alianças)',
    },
    policyImplications:
      'Interoperabilidade com aliados (CJADC2 combinado) torna-se pré-requisito para a defesa coletiva do Artigo 5 na era da competição de grandes potências.',
    primarySources: [
      { title: 'DoD CJADC2 Strategy', identifier: 'DoD, 2022' },
      { title: 'CSIS — Modernizing Command and Control', identifier: 'CSIS Brief', url: 'https://www.csis.org' },
    ],
    tags: ['JADC2', 'C2', 'MDO', 'IA'],
    region: 'Global',
    source: 'DoD CJADC2 Strategy / CSIS',
    lastVerified: '2026-08-20',
  },
  {
    id: 'brf-hypersonic',
    slug: 'corrida-hipersonica-eua-russia-china',
    title: 'A Corrida Hipersônica: EUA, Rússia e China',
    classificationHeader: 'ANÁLISE — DOMÍNIO PÚBLICO (PARÁBASE DE FONTES OFICIAIS)',
    date: '2026-04-03',
    authorAgency: 'PENTAGON-MIND / Equipe de Análise',
    summary:
      'Comparação de abordagens de armas hipersônicas e por que a doutrina dos EUA prioriza plataformas convencionais de precisão.',
    strategicContext:
      'Rússia (Kinzhal/TSR) e China (DF-17/DF-27) já operam armas hipersônicas. Os EUA priorizam o LRHW (Dark Eagle) e o ARRW (AGM-183A) com foco em negação de A2/AD.',
    tacticalAnalysis: [
      'Hipersônicos reduzem janela de defesa a segundos (Mach 5+ em trajetória manobrável).',
      'LRHW do Exército usa o veículo C-HGB comum e integra-se ao AFATDS.',
      'A defesa exige sensores espaciais de alerta precoce e interceptadores de estágio terminal.',
    ],
    technicalData: {
      'EUA (LRHW)': 'Mach 5+, alcance ~2.775 km',
      'China (DF-17)': 'Veículo planador DF-ZF',
      'Rússia (Kinzhal)': 'Mach 10 derivado do Iskander',
      'Desafio Defesa': 'Detectar e rastrear em LEO (PWSA)',
    },
    policyImplications:
      'Investimento concentrado em P&D (RDT&E) e em camadas de defesa antimíssil espacial para restaurar a vantagem de detecção.',
    primarySources: [
      { title: 'CRS — Hypersonic Weapons: Background and Issues', identifier: 'CRS Report R45811' },
      { title: 'DoD Hypersonics Progress Report', identifier: 'OUSD R&E' },
    ],
    tags: ['Hipersônicos', 'LRHW', 'A2/AD'],
    region: 'Global',
    source: 'CRS Report R45811 / DoD',
    lastVerified: '2026-08-20',
  },
  {
    id: 'brf-nuclear-posture',
    slug: 'modernizacao-triade-nuclear-2026',
    title: 'Modernização da Tríade Nuclear até 2026',
    classificationHeader: 'ANÁLISE — DOMÍNIO PÚBLICO (PARÁBASE DE FONTES OFICIAIS)',
    date: '2026-03-18',
    authorAgency: 'PENTAGON-MIND / Equipe de Análise',
    summary:
      'Visão geral dos programas de substituição da tríade (Sentinel, Columbia, B-21) e da dissuasão integrada.',
    strategicContext:
      'Todos os três componentes da tríade envelhecem simultaneamente; a modernização visa garantir a credibilidade do segundo golpe em ambiente de duas potências nucleares.',
    tacticalAnalysis: [
      'GBSD/Sentinel substitui o Minuteman III em silos terrestres.',
      'Classe Columbia substitui os Ohio de míssil a partir de ~2027.',
      'B-21 Raider assume o papel de penetração furtiva daqui para a frente.',
      'LRSO moderniza a ogiva de cruzeiro aerotransportada.',
    ],
    technicalData: {
      'Terrestre': 'Sentinel (GBSD)',
      'Marítimo': 'Classe Columbia (SSBN)',
      'Aéreo': 'B-21 Raider + LRSO',
      'Doutrina': 'Nuclear Posture Review (NPR)',
    },
    policyImplications:
      'Custo de modernização pressiona o orçamento de defesa e exige sustentação bipartidária do NDAA.',
    primarySources: [
      { title: 'Nuclear Posture Review', identifier: 'DoD, 2022' },
      { title: 'CRS — U.S. Strategic Nuclear Forces', identifier: 'CRS Report R44429' },
    ],
    tags: ['Tríade', 'Dissuasão', 'Sentinel', 'Columbia'],
    region: 'Global',
    source: 'DoD NPR / CRS Report R44429',
    lastVerified: '2026-08-20',
  },
  {
    id: 'brf-aukus',
    slug: 'aukus-e-o-balanco-de-poder-indo-pacifico',
    title: 'AUKUS e o Balanço de Poder no Indo-Pacífico',
    classificationHeader: 'ANÁLISE — DOMÍNIO PÚBLICO (PARÁBASE DE FONTES OFICIAIS)',
    date: '2026-02-09',
    authorAgency: 'PENTAGON-MIND / Equipe de Análise',
    summary:
      'Como o eixo trilateral de submarinos nucleares e tecnologia de sensores redefine a dissuasão no Indo-Pacífico.',
    strategicContext:
      'AUKUS (2021) transfere tecnologia de propulsão nuclear para a Austrália e cria uma arquitetura compartilhada de sensores marítimos frente à expansão naval chinesa.',
    tacticalAnalysis: [
      'SSN-AUKUS baseia-se no reator dos USS Virginia com integração australiana.',
      'Pilar II estende cooperação em IA, drones e guerra eletrônica.',
      'Reforça a rede de bases e FONOPS no Mar do Sul da China.',
    ],
    technicalData: {
      'Pilar I': 'Submarinos de ataque nuclear (SSN)',
      'Pilar II': 'Capacidades avançadas (IA, hipersônicos, EW)',
      'Parceiro': 'Austrália (com Reino Unido e EUA)',
    },
    policyImplications:
      'Sinaliza compromisso de longo prazo dos EUA com a segurança regional e complementa acordos QUAD.',
    primarySources: [
      { title: 'AUKUS Joint Leaders Statement', identifier: 'Casa Branca, 2021' },
      { title: 'CRS — AUKUS', identifier: 'CRS Report R47681' },
    ],
    tags: ['AUKUS', 'Indo-Pacífico', 'SSN', 'Alianças'],
    region: 'Indo-Pacífico',
    source: 'Casa Branca / CRS Report R47681',
    lastVerified: '2026-08-20',
  },
  {
    id: 'brf-space-force',
    slug: 'forca-espacial-e-resiliencia-orbital',
    title: 'Força Espacial e a Resiliência Orbital (PWSA)',
    classificationHeader: 'ANÁLISE — DOMÍNIO PÚBLICO (PARÁBASE DE FONTES OFICIAIS)',
    date: '2026-01-22',
    authorAgency: 'PENTAGON-MIND / Equipe de Análise',
    summary:
      'Por que a USSF prioriza a proliferação em órbita baixa (PWSA) para sobreviver a ataques antissatélite.',
    strategicContext:
      'Satélites grandes e concentrados são alvos tentadores. A resiliência exige arquiteturas distribuídas e reconstituição rápida (TacRS).',
    tacticalAnalysis: [
      'PWSA (Proliferated Warfighter Space Architecture) difunde nós de SDA e comunicações.',
      'Tactically Responsive Space (TacRS) reconstitui constelações em < 24h.',
      'Doutrina Spacepower orienta a integração do domínio espaço ao JADC2.',
    ],
    technicalData: {
      'Arquitetura': 'PWSA (LEO proliferado)',
      'Resposta': 'TacRS (< 24h)',
      'Ameaça': 'ASAT cinético e ciber-ótico',
    },
    policyImplications:
      'Investimento em lançadores comerciais rápidos reduz o tempo de reconstituição e eleva o custo de ataque para o adversário.',
    primarySources: [
      { title: 'Spacepower: Doctrine for Space Force', identifier: 'USSF SPD 1' },
      { title: 'CRS — Defense Space Activities', identifier: 'CRS Report R45726' },
    ],
    tags: ['USSF', 'Espaço', 'SDA', 'PWSA'],
    region: 'Espaço',
    source: 'USSF / CRS Report R45726',
    lastVerified: '2026-08-20',
  },
];
