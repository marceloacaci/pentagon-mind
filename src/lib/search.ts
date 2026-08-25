import Fuse from 'fuse.js';
import type { WeaponSystem, Doctrine, Conflict, Briefing, GlossaryTerm, GeopoliticalCase } from '../types';

export interface SearchableItem {
  id: string;
  kind: 'arma' | 'doutrina' | 'conflito' | 'briefing' | 'glossario' | 'geopolitica';
  title: string;
  description: string;
  vector?: string; // vetor militar / região
  tags?: string[];
  source: string;
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
    });
  }
  for (const d of input.doctrines ?? []) {
    items.push({
      id: d.id, kind: 'doutrina', title: d.name, description: d.summary,
      vector: d.period, tags: d.operationalCharacteristics, source: d.source,
    });
  }
  for (const c of input.conflicts ?? []) {
    items.push({
      id: c.id, kind: 'conflito', title: c.name, description: c.scope + ' ' + c.lessonsLearned,
      vector: c.years, tags: c.doctrine, source: c.source,
    });
  }
  for (const b of input.briefings ?? []) {
    items.push({
      id: b.id, kind: 'briefing', title: b.title, description: b.summary,
      vector: b.region, tags: b.tags, source: b.source ?? '',
    });
  }
  for (const g of input.glossary ?? []) {
    items.push({
      id: g.acronym, kind: 'glossario', title: `${g.acronym} — ${g.termPt}`,
      description: g.definition, vector: g.category, tags: [g.category], source: '',
    });
  }
  for (const g of input.geopolitics ?? []) {
    items.push({
      id: g.id, kind: 'geopolitica', title: g.title,
      description: g.summary + ' ' + g.keyDynamics.join(' '),
      vector: g.region, tags: [...g.relatedDoctrines, ...g.relatedWeapons], source: g.source,
    });
  }
  return items;
}

export interface SearchOptions {
  query: string;
  kinds?: SearchableItem['kind'][];
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
  return opts.limit ? results.slice(0, opts.limit) : results;
}
