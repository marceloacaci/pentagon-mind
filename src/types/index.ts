export type MilitaryBranch = 'USAF' | 'USN' | 'USA' | 'USMC' | 'USSF' | 'Joint / DoD' | 'DARPA / R&D';

export type StrategicDomain = 'Terrestre' | 'Marítimo' | 'Aéreo' | 'Espacial' | 'Ciberespaço' | 'Multidomínio (MDO)';

export type ThreatLevel = 'DEFCON 1' | 'DEFCON 2' | 'DEFCON 3' | 'DEFCON 4' | 'DEFCON 5' | 'Alerta Crítico' | 'Monitoramento';

export interface Administration {
  id: string;
  name: string;
  term: string;
  party: 'Republicano' | 'Democrata';
  posture: string;
  keyDoctrines: string[];
  keyConflicts: string[];
  keySystems: string[];
  legacy: string;
  source: string;
  lastVerified: string;
}

export interface Doctrine {
  id: string;
  name: string;
  period: string;
  summary: string;
  fm: string;
  associatedAdministrations: string[];
  operationalCharacteristics: string[];
  historicalPrecedents: string[];
  source: string;
  lastVerified: string;
}

export interface Conflict {
  id: string;
  name: string;
  years: string;
  administration: string;
  doctrine: string[];
  weapons: string[];
  casualtiesApprox: string;
  scope: string;
  lessonsLearned: string;
  source: string;
  lastVerified: string;
}

export interface WeaponSystem {
  id: string;
  name: string;
  designation: string;
  category: 'Tríade Nuclear' | 'Aviação de 5ª/6ª Geração' | 'Hipersônicos' | 'Defesa Aérea & Antimíssil' | 'Guerra Espacial & Satélites' | 'Sistemas Não Tripulados & IA' | 'Armas de Energia Dirigida' | 'Blindados & Artilharia';
  manufacturer: string;
  firstDeployment: string;
  rangeKm?: number;
  speedMach?: number;
  unitCostMillionUsd?: number;
  payloadKg?: number;
  stealthRcsClass?: 'Ultra-baixa (VLO)' | 'Baixa (LO)' | 'Convencional' | 'N/A';
  guidanceSystem?: string;
  strategicRole: string;
  specifications: Record<string, string>;
  source: string;
  lastVerified: string;
}

export interface FlashpointThreat {
  id: string;
  theaterName: string;
  region: string;
  coordinates: { x: number; y: number }; // percentage on 1000x500 map
  threatLevel: ThreatLevel;
  primaryAdversary: string;
  usForcesDeployed: string;
  applicableTreaties: string[];
  escalationVector: string;
  keyVulnerabilities: string;
  tacticalSummary: string;
  source: string;
  lastVerified?: string;
}

export interface WargameChoice {
  id: string;
  label: string;
  doctrineApplied: string;
  outcomeTitle: string;
  outcomeDescription: string;
  riskAssessment: 'Baixo' | 'Moderado' | 'Alto' | 'Catastrófico';
  jadc2Involvement: string;
}

export interface WargameScenario {
  id: string;
  title: string;
  crisisTrigger: string;
  geopoliticalContext: string;
  initialDefcon: ThreatLevel;
  adversaryAction: string;
  usCommandOptions: WargameChoice[];
  historicalAnalogy: string;
  source: string;
  lastVerified?: string;
}

export interface BudgetYear {
  year: number;
  totalBudgetBillionUsd: number;
  armyBillionUsd: number;
  navyMarineBillionUsd: number;
  airForceBillionUsd: number;
  spaceForceBillionUsd: number;
  rdteBillionUsd: number;
  keyProcurementFocus: string;
  gdpPercentage: number;
  source: string;
  lastVerified?: string;
}

export interface Briefing {
  id: string;
  slug: string;
  title: string;
  classificationHeader: string;
  date: string;
  authorAgency: string;
  summary: string;
  strategicContext: string;
  tacticalAnalysis: string[];
  technicalData: Record<string, string>;
  policyImplications: string;
  primarySources: { title: string; identifier: string; url?: string }[];
  tags: string[];
  region?: string;
  source?: string;
  lastVerified?: string;
}

export interface GlossaryTerm {
  acronym: string;
  termEn: string;
  termPt: string;
  definition: string;
  category: 'Doutrina & C2' | 'Armamentos & Plataformas' | 'Inteligência & Sensores' | 'Geopolítica & Alianças';
  relatedDoctrines?: string[];
  relatedWeapons?: string[];
}

export interface GeopoliticalCase {
  id: string;
  title: string;
  region: string;
  period: string;
  administration: string;
  summary: string;
  keyDynamics: string[];
  relatedDoctrines: string[];
  relatedWeapons: string[];
  outcome: string;
  source: string;
  lastVerified: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  institution?: string;
  subject: string;
  message: string;
  inquiryType: 'Pesquisa Acadêmica' | 'Análise de Defesa' | 'Sugestão Técnica' | 'Outro';
  lgpdConsent: boolean;
  honeypot?: string;
}
