import type { GlossaryTerm } from '../types';

// Glossário militar EN → pt-BR. Siglas usadas na inspeção de termos do portal.
// Fontes: Joint Publication 1-02 (DOD Dictionary), NATO Glossary of Terms (AAP-6).

export const glossaryData: GlossaryTerm[] = [
  {
    acronym: 'JADC2',
    termEn: 'Joint All-Domain Command and Control',
    termPt: 'Comando e Controle Conjunto de Todos os Domínios',
    definition:
      'Conceito de conectar sensores e atiradores de todos os domínios (terra, mar, ar, espaço, ciberespaço) numa rede unificada e alimentada por IA para reduzir o tempo sensor-to-shooter.',
    category: 'Doutrina & C2',
    relatedDoctrines: ['doct-mdo'],
  },
  {
    acronym: 'A2/AD',
    termEn: 'Anti-Access / Area Denial',
    termPt: 'Negação de Acesso / Negação de Área',
    definition:
      'Estratégia de impedir que forças adversárias entrem numa região (anti-access) e restringir sua liberdade de manobra dentro dela (area denial), tipicamente com mísseis balísticos e de cruzeiro.',
    category: 'Doutrina & C2',
    relatedDoctrines: ['doct-gpc'],
  },
  {
    acronym: 'C4ISR',
    termEn: 'Command, Control, Communications, Computers, Intelligence, Surveillance, Reconnaissance',
    termPt: 'Comando, Controle, Comunicações, Computadores, Inteligência, Vigilância e Reconhecimento',
    definition:
      'Infraestrutura integrada de sistemas que permite coletar, processar e disseminar informação para a tomada de decisão militar.',
    category: 'Inteligência & Sensores',
  },
  {
    acronym: 'MDO',
    termEn: 'Multi-Domain Operations',
    termPt: 'Operações Multidomínio',
    definition:
      'Doutrina do Exército dos EUA para conduzir combate convergente e contínuo em todos os domínios, sincronizado com aliados, para ganhar vantagem em competição e conflito.',
    category: 'Doutrina & C2',
    relatedDoctrines: ['doct-mdo'],
  },
  {
    acronym: 'ICBM',
    termEn: 'Intercontinental Ballistic Missile',
    termPt: 'Míssil Balístico Intercontinental',
    definition:
      'Míssil balístico de longo alcance (>&nbsp;5.500 km) parte da tríade nuclear, com ogivas reentrantes de alto rendimento.',
    category: 'Armamentos & Plataformas',
    relatedWeapons: ['ws-minuteman', 'ws-columbia-cruise'],
  },
  {
    acronym: 'SSBN',
    termEn: 'Ship, Submersible, Ballistic, Nuclear',
    termPt: 'Submarino Lançador de Mísseis Balísticos (Propulsão Nuclear)',
    definition:
      'Submarino de propulsão nuclear armado com mísseis balísticos, componente mais sobrevivente da tríade nuclear de segundo golpe.',
    category: 'Armamentos & Plataformas',
    relatedWeapons: ['ws-columbia'],
  },
  {
    acronym: 'RMA',
    termEn: 'Revolution in Military Affairs',
    termPt: 'Revolução nos Assuntos Militares',
    definition:
      'Teoria dos anos 1990 sobre ganho de vantagem assimétrica via tecnologias de informação, sensores e munições de precisão.',
    category: 'Doutrina & C2',
    relatedDoctrines: ['doct-rma'],
  },
  {
    acronym: 'GPC',
    termEn: 'Great Power Competition',
    termPt: 'Competição de Grandes Potências',
    definition:
      'PRIORIDADE estratégica reconhecendo a rivalidade interestatal com China e Rússia como foco principal da segurança nacional.',
    category: 'Geopolítica & Alianças',
    relatedDoctrines: ['doct-gpc'],
  },
  {
    acronym: 'CJADC2',
    termEn: 'Combined Joint All-Domain Command and Control',
    termPt: 'Comando e Controle Conjunto Combinado de Todos os Domínios',
    definition:
      'Extensão do JADC2 para forças aliadas, permitindo interoperabilidade C2 entre nações (ex.: OTAN via FMN).',
    category: 'Doutrina & C2',
    relatedDoctrines: ['doct-mdo'],
  },
  {
    acronym: 'LRHW',
    termEn: 'Long-Range Hypersonic Weapon',
    termPt: 'Arma Hipersônica de Longo Alcance',
    definition:
      'Sistema de planagem hipersônica (Dark Eagle) do Exército dos EUA, com veículo C-HGB a Mach 5+.',
    category: 'Armamentos & Plataformas',
    relatedWeapons: ['ws-lrhw'],
  },
  {
    acronym: 'ABMS',
    termEn: 'Advanced Battle Management System',
    termPt: 'Sistema Avançado de Gerenciamento de Batalha',
    definition:
      'Ecossistema da USAF para conectar plataformas via nuvem tática e IA, núcleo do JADC2.',
    category: 'Doutrina & C2',
    relatedDoctrines: ['doct-mdo'],
  },
  {
    acronym: 'SDA',
    termEn: 'Space Domain Awareness',
    termPt: 'Consciência do Domínio Espacial',
    definition:
      'Capacidade de detectar, rastrear e caracterizar objetos e ameaças no espaço (satélites e debris).',
    category: 'Inteligência & Sensores',
    relatedWeapons: ['ws-ussf'],
  },
  {
    acronym: 'DEFCON',
    termEn: 'Defense Readiness Condition',
    termPt: 'Condição de Prontidão de Defesa',
    definition:
      'Escala de prontidão militar dos EUA, do DEFCON 5 (normal) ao DEFCON 1 (guerra iminente).',
    category: 'Geopolítica & Alianças',
  },
  {
    acronym: 'FONOPS',
    termEn: 'Freedom of Navigation Operations',
    termPt: 'Operações de Liberdade de Navegação',
    definition:
      'Patrulhas navais que desafiam reivindicações marítimas excessivas e mantêm o direito de passagem.',
    category: 'Geopolítica & Alianças',
  },
  {
    acronym: 'NATO',
    termEn: 'North Atlantic Treaty Organization',
    termPt: 'Organização do Tratado do Atlântico Norte (OTAN)',
    definition:
      'Aliança militar do Atlântico Norte fundada em 1949; o Artigo 5 estabelece defesa coletiva.',
    category: 'Geopolítica & Alianças',
  },
  {
    acronym: 'AUKUS',
    termEn: 'Australia, United Kingdom, United States Security Pact',
    termPt: 'Pacto de Segurança Austrália-Reino Unido-Estados Unidos',
    definition:
      'Aliança trilateral (2021) focada em segurança no Indo-Pacífico, incluindo transferência de tecnologia de submarinos nucleares.',
    category: 'Geopolítica & Alianças',
    relatedWeapons: ['ws-aukus'],
  },
  {
    acronym: 'HUMINT',
    termEn: 'Human Intelligence',
    termPt: 'Inteligência Humana',
    definition:
      'Coleta de informação por meio de fontes humanas (agentes, entrevistas, interrogatórios).',
    category: 'Inteligência & Sensores',
  },
  {
    acronym: 'RDT&E',
    termEn: 'Research, Development, Test & Evaluation',
    termPt: 'Pesquisa, Desenvolvimento, Teste e Avaliação',
    definition:
      'Categoria orçamentária para inovação e prototipagem de sistemas de defesa (ex.: DARPA, hipersônicos).',
    category: 'Armamentos & Plataformas',
  },
  {
    acronym: 'VLO',
    termEn: 'Very Low Observability',
    termPt: 'Observabilidade Muito Baixa (Furtividade)',
    definition:
      'Plataformas com assinatura radar extremamente reduzida (ex.: F-35, B-2, B-21).',
    category: 'Armamentos & Plataformas',
    relatedWeapons: ['ws-f35', 'ws-b2', 'ws-b21'],
  },
  {
    acronym: 'ISR',
    termEn: 'Intelligence, Surveillance, Reconnaissance',
    termPt: 'Inteligência, Vigilância e Reconhecimento',
    definition:
      'Funções integradas de coleta e processamento de alvos para apoio à decisão e ao engajamento.',
    category: 'Inteligência & Sensores',
  },
];
