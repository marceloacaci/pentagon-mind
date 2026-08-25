import { describe, it, expect } from 'vitest';
import { administrationsData, doctrinesData, conflictsData } from '../data/ontology';
import { arsenalData } from '../data/arsenal';
import { budgetData } from '../data/budget';
import { briefingsData } from '../data/briefings';
import { glossaryData } from '../data/glossary';
import { geopoliticsData } from '../data/geopolitics';
import { flashpointsData } from '../data/threatMap';
import { wargameScenarios } from '../data/wargame';
import {
  administrationSchema, doctrineSchema, conflictSchema, weaponSystemSchema,
  budgetYearSchema, briefingSchema, glossaryTermSchema, geopoliticalCaseSchema,
  flashpointSchema, wargameScenarioSchema,
} from './schemas';

// Testes de integridade referencial da ontologia:
//  - IDs são únicos
//  - referências cruzadas (administração→doutrina/conflito/sistema) resolvem
//  - dados passam nos schemas Zod

describe('ontologia: integridade referencial', () => {
  it('ids de administrações são únicos', () => {
    const ids = administrationsData.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ids de doutrinas são únicos', () => {
    const ids = doctrinesData.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ids de conflitos são únicos', () => {
    const ids = conflictsData.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('cada administração referencia doutrinas existentes', () => {
    const doctrineIds = new Set(doctrinesData.map((d) => d.id));
    for (const a of administrationsData) {
      for (const d of a.keyDoctrines) {
        expect(doctrineIds.has(d), `admin ${a.id} -> doutrina ${d}`).toBe(true);
      }
    }
  });

  it('cada administração referencia conflitos existentes', () => {
    const conflictIds = new Set(conflictsData.map((c) => c.id));
    for (const a of administrationsData) {
      for (const c of a.keyConflicts) {
        expect(conflictIds.has(c), `admin ${a.id} -> conflito ${c}`).toBe(true);
      }
    }
  });

  it('cada administração referencia sistemas existentes', () => {
    const weaponIds = new Set(arsenalData.map((w) => w.id));
    for (const a of administrationsData) {
      for (const w of a.keySystems) {
        expect(weaponIds.has(w), `admin ${a.id} -> arma ${w}`).toBe(true);
      }
    }
  });

  it('cada conflito referencia administração e doutrinas existentes', () => {
    const adminIds = new Set(administrationsData.map((a) => a.id));
    const doctrineIds = new Set(doctrinesData.map((d) => d.id));
    const weaponIds = new Set(arsenalData.map((w) => w.id));
    for (const c of conflictsData) {
      expect(adminIds.has(c.administration), `conflito ${c.id} -> admin ${c.administration}`).toBe(true);
      for (const d of c.doctrine) expect(doctrineIds.has(d)).toBe(true);
      for (const w of c.weapons) expect(weaponIds.has(w), `conflito ${c.id} -> arma ${w}`).toBe(true);
    }
  });

  it('cada cenário de wargame referencia doutrina aplicada plausível (via titles)', () => {
    for (const s of wargameScenarios) {
      expect(s.usCommandOptions.length).toBeGreaterThan(0);
      for (const opt of s.usCommandOptions) {
        expect(opt.doctrineApplied.length).toBeGreaterThan(0);
      }
    }
  });

  it('cada flashpoint tem nível de ameaça válido', () => {
    const valid = ['DEFCON 1','DEFCON 2','DEFCON 3','DEFCON 4','DEFCON 5','Alerta Crítico','Monitoramento'];
    for (const f of flashpointsData) expect(valid).toContain(f.threatLevel);
  });

  it('cada caso geopolítico vincula doutrinas e armas existentes', () => {
    const doctrineIds = new Set(doctrinesData.map((d) => d.id));
    const weaponIds = new Set(arsenalData.map((w) => w.id));
    for (const g of geopoliticsData) {
      for (const d of g.relatedDoctrines) expect(doctrineIds.has(d), `geo ${g.id} -> doutrina ${d}`).toBe(true);
      for (const w of g.relatedWeapons) expect(weaponIds.has(w), `geo ${g.id} -> arma ${w}`).toBe(true);
    }
  });
});

describe('ontologia: validação por schema Zod', () => {
  it('administrações validam', () => {
    for (const a of administrationsData) expect(administrationSchema.parse(a)).toBeTruthy();
  });
  it('doutrinas validam', () => {
    for (const d of doctrinesData) expect(doctrineSchema.parse(d)).toBeTruthy();
  });
  it('conflitos validam', () => {
    for (const c of conflictsData) expect(conflictSchema.parse(c)).toBeTruthy();
  });
  it('armas validam', () => {
    for (const w of arsenalData) expect(weaponSystemSchema.parse(w)).toBeTruthy();
  });
  it('orçamentos validam', () => {
    for (const b of budgetData) expect(budgetYearSchema.parse(b)).toBeTruthy();
  });
  it('briefings validam', () => {
    for (const b of briefingsData) expect(briefingSchema.parse(b)).toBeTruthy();
  });
  it('glossário valida', () => {
    for (const g of glossaryData) expect(glossaryTermSchema.parse(g)).toBeTruthy();
  });
  it('geopolítica valida', () => {
    for (const g of geopoliticsData) expect(geopoliticalCaseSchema.parse(g)).toBeTruthy();
  });
  it('flashpoints validam', () => {
    for (const f of flashpointsData) expect(flashpointSchema.parse(f)).toBeTruthy();
  });
  it('wargames validam', () => {
    for (const s of wargameScenarios) expect(wargameScenarioSchema.parse(s)).toBeTruthy();
  });
});
