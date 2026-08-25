import Fuse from 'fuse.js';
import type { WeaponSystem, Doctrine, Conflict, Briefing, GlossaryTerm, GeopoliticalCase } from '../types';

export interface SearchableItem {
  id: string;
  kind: 'arma' | 'doutrina' | 'conflito' | 'briefing' | 'glossario' | 'geopolitica';
  title: string;
  description: string;
  vector?: string; // vetor militar / região
  region?: string; // região geográfica (faceta)
  period?: string; // década (faceta)
  tags?: string[];
  source: string;
}

function extractYear(text?: string): number | null {
  if (!text) return null;
  const m = text.match(/\b(19|20)\d{2}\b/);
  return m ? parseInt(m[0], 10) : null;
}

function decadeOf(year: number | null): string {
  if (year === null) return '';
  return `${Math.floor(year / 10) * 10}s`;
}

// Constrói um índice plano a partir das coleções de dados.
export function buildSearchIndex(input: {
  weapons?: WeaponSystem[];
  doctrines?: Doctrine[];
  conflicts?: Conflict[];
  briefings?: Briefing[];
  glossary?: GlossaryTerm[];
  geopolitics?: GeopoliticalCase[];
}): SearchableItem[] {
  const items: SearchableItem[] = [];
  for (const w of input.weapons ?? []) {
    items.push({
      id: w.id, kind: 'arma', title: w.name, description: w.designation + ' ' + w.strategicRole,
      vector: w.category, tags: [w.category, w.manufacturer], source: w.source,
      region: 'Global', period: decadeOf(extractYear(w.firstDeployment)),
    });
  }
  for (const d of input.doctrines ?? []) {
    items.push({
      id: d.id, kind: 'doutrina', title: d.name, description: d.summary,
      vector: d.period, tags: d.operationalCharacteristics, source: d.source,
      region: 'Global', period: decadeOf(extractYear(d.period)),
    });
  }
  for (const c of input.conflicts ?? []) {
    items.push({
      id: c.id, kind: 'conflito', title: c.name, description: c.scope + ' ' + c.lessonsLearned,
      vector: c.years, tags: c.doctrine, source: c.source,
      region: 'Global', period: decadeOf(extractYear(c.years)),
    });
  }
  for (const b of input.briefings ?? []) {
    items.push({
      id: b.id, kind: 'briefing', title: b.title, description: b.summary,
      vector: b.region, tags: b.tags, source: b.source ?? '',
      region: b.region || 'Global', period: decadeOf(extractYear(b.date)),
    });
  }
  for (const g of input.glossary ?? []) {
    items.push({
      id: g.acronym, kind: 'glossario', title: `${g.acronym} — ${g.termPt}`,
      description: g.definition, vector: g.category, tags: [g.category], source: '',
      region: 'Global', period: '',
    });
  }
  for (const g of input.geopolitics ?? []) {
    items.push({
      id: g.id, kind: 'geopolitica', title: g.title,
      description: g.summary + ' ' + g.keyDynamics.join(' '),
      vector: g.region, tags: [...g.relatedDoctrines, ...g.relatedWeapons], source: g.source,
      region: g.region, period: decadeOf(extractYear(g.period)),
    });
  }
  return items;
}

export interface SearchOptions {
  query: string;
  kinds?: SearchableItem['kind'][];
  regions?: string[];
  periods?: string[];
  limit?: number;
}

export function searchItems(index: SearchableItem[], opts: SearchOptions): SearchableItem[] {
  const q = opts.query.trim();
  if (q.length === 0) return [];
  const fuse = new Fuse(index, {
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.2 },
    ],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  let results = fuse.search(q).map((r) => r.item);
  if (opts.kinds && opts.kinds.length > 0) {
    results = results.filter((r) => opts.kinds!.includes(r.kind));
  }
  if (opts.regions && opts.regions.length > 0) {
    results = results.filter((r) => r.region && opts.regions!.includes(r.region));
  }
  if (opts.periods && opts.periods.length > 0) {
    results = results.filter((r) => r.period && opts.periods!.includes(r.period));
  }
  return opts.limit ? results.slice(0, opts.limit) : results;
}
