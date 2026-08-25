import { z } from 'zod';

// Schemas Zod que espelham os tipos em src/types e validam os arquivos de
// dados em build/CI. Garantem que campos obrigatórios (incl. source/lastVerified)
// estejam presentes — um erro de digitação quebra o build, não a produção.

export const administrationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  term: z.string().min(1),
  party: z.enum(['Republicano', 'Democrata']),
  posture: z.string().min(1),
  keyDoctrines: z.array(z.string()),
  keyConflicts: z.array(z.string()),
  keySystems: z.array(z.string()),
  legacy: z.string().min(1),
  source: z.string().min(1),
  lastVerified: z.string().min(1),
});

export const doctrineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  fm: z.string().min(1),
  associatedAdministrations: z.array(z.string()),
  operationalCharacteristics: z.array(z.string()),
  historicalPrecedents: z.array(z.string()),
  source: z.string().min(1),
  lastVerified: z.string().min(1),
});

export const conflictSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  years: z.string().min(1),
  administration: z.string().min(1),
  doctrine: z.array(z.string()),
  weapons: z.array(z.string()),
  casualtiesApprox: z.string().min(1),
  scope: z.string().min(1),
  lessonsLearned: z.string().min(1),
  source: z.string().min(1),
  lastVerified: z.string().min(1),
});

export const weaponSystemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  designation: z.string().min(1),
  category: z.enum([
    'Tríade Nuclear', 'Aviação de 5ª/6ª Geração', 'Hipersônicos',
    'Defesa Aérea & Antimíssil', 'Guerra Espacial & Satélites',
    'Sistemas Não Tripulados & IA', 'Armas de Energia Dirigida', 'Blindados & Artilharia',
  ]),
  manufacturer: z.string().min(1),
  firstDeployment: z.string().min(1),
  rangeKm: z.number().optional(),
  speedMach: z.number().optional(),
  unitCostMillionUsd: z.number().optional(),
  payloadKg: z.number().optional(),
  stealthRcsClass: z.enum(['Ultra-baixa (VLO)', 'Baixa (LO)', 'Convencional', 'N/A']).optional(),
  guidanceSystem: z.string().optional(),
  strategicRole: z.string().min(1),
  specifications: z.record(z.string(), z.string()),
  source: z.string().min(1),
  lastVerified: z.string().min(1),
});

export const flashpointSchema = z.object({
  id: z.string().min(1),
  theaterName: z.string().min(1),
  region: z.string().min(1),
  coordinates: z.object({ x: z.number(), y: z.number() }),
  threatLevel: z.enum([
    'DEFCON 1', 'DEFCON 2', 'DEFCON 3', 'DEFCON 4', 'DEFCON 5', 'Alerta Crítico', 'Monitoramento',
  ]),
  primaryAdversary: z.string().min(1),
  usForcesDeployed: z.string().min(1),
  applicableTreaties: z.array(z.string()),
  escalationVector: z.string().min(1),
  keyVulnerabilities: z.string().min(1),
  tacticalSummary: z.string().min(1),
  source: z.string().min(1),
  lastVerified: z.string().optional(),
});

export const wargameChoiceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  doctrineApplied: z.string().min(1),
  outcomeTitle: z.string().min(1),
  outcomeDescription: z.string().min(1),
  riskAssessment: z.enum(['Baixo', 'Moderado', 'Alto', 'Catastrófico']),
  jadc2Involvement: z.string().min(1),
});

export const wargameScenarioSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  crisisTrigger: z.string().min(1),
  geopoliticalContext: z.string().min(1),
  initialDefcon: z.enum([
    'DEFCON 1', 'DEFCON 2', 'DEFCON 3', 'DEFCON 4', 'DEFCON 5', 'Alerta Crítico', 'Monitoramento',
  ]),
  adversaryAction: z.string().min(1),
  usCommandOptions: z.array(wargameChoiceSchema).min(1),
  historicalAnalogy: z.string().min(1),
  source: z.string().min(1),
  lastVerified: z.string().optional(),
});

export const budgetYearSchema = z.object({
  year: z.number().int().gte(1989).lte(2100),
  totalBudgetBillionUsd: z.number().positive(),
  armyBillionUsd: z.number().nonnegative(),
  navyMarineBillionUsd: z.number().nonnegative(),
  airForceBillionUsd: z.number().nonnegative(),
  spaceForceBillionUsd: z.number().nonnegative(),
  rdteBillionUsd: z.number().nonnegative(),
  keyProcurementFocus: z.string().min(1),
  gdpPercentage: z.number().positive(),
  source: z.string().min(1),
  lastVerified: z.string().optional(),
});

export const briefingSourceSchema = z.object({
  title: z.string().min(1),
  identifier: z.string().min(1),
  url: z.string().url().optional(),
});

export const briefingSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  classificationHeader: z.string().min(1),
  date: z.string().min(1),
  authorAgency: z.string().min(1),
  summary: z.string().min(1),
  strategicContext: z.string().min(1),
  tacticalAnalysis: z.array(z.string()).min(1),
  technicalData: z.record(z.string(), z.string()),
  policyImplications: z.string().min(1),
  primarySources: z.array(briefingSourceSchema).min(1),
  tags: z.array(z.string()),
  region: z.string().optional(),
  source: z.string().optional(),
  lastVerified: z.string().optional(),
});

export const glossaryTermSchema = z.object({
  acronym: z.string().min(1),
  termEn: z.string().min(1),
  termPt: z.string().min(1),
  definition: z.string().min(1),
  category: z.enum([
    'Doutrina & C2', 'Armamentos & Plataformas', 'Inteligência & Sensores', 'Geopolítica & Alianças',
  ]),
  relatedDoctrines: z.array(z.string()).optional(),
});

export const geopoliticalCaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  region: z.string().min(1),
  period: z.string().min(1),
  administration: z.string().min(1),
  summary: z.string().min(1),
  keyDynamics: z.array(z.string()).min(1),
  relatedDoctrines: z.array(z.string()),
  relatedWeapons: z.array(z.string()),
  outcome: z.string().min(1),
  source: z.string().min(1),
  lastVerified: z.string().min(1),
});

// Validação do formulário de contato (reutilizada pela API e validations.ts).
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  institution: z.string().optional(),
  subject: z.string().min(3, 'Assunto muito curto'),
  message: z.string().min(10, 'Mensagem deve ter ao menos 10 caracteres'),
  inquiryType: z.enum(['Pesquisa Acadêmica', 'Análise de Defesa', 'Sugestão Técnica', 'Outro']),
  lgpdConsent: z.literal(true, { errorMap: () => ({ message: 'É necessário o consentimento LGPD' }) }),
  honeypot: z.string().max(0, 'Spam detectado').optional(),
});

export type ContactInput = z.infer<typeof contactFormSchema>;
