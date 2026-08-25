import { describe, it, expect } from 'vitest';
import { buildComparatorMetrics, rankByMetric, areComparable } from './comparator';
import { arsenalData } from '../data/arsenal';
import type { WeaponSystem } from '../types';

const byId = (id: string) => arsenalData.find((w) => w.id === id) as WeaponSystem;

describe('buildComparatorMetrics', () => {
  it('normaliza métricas entre 0 e 100', () => {
    const a = byId('ws-f35');
    const b = byId('ws-minuteman');
    const m = buildComparatorMetrics(a, b);
    for (const [k, [x, y]] of Object.entries(m)) {
      expect(x.normalized).toBeGreaterThanOrEqual(0);
      expect(x.normalized).toBeLessThanOrEqual(100);
      expect(y.normalized).toBeGreaterThanOrEqual(0);
      expect(y.normalized).toBeLessThanOrEqual(100);
    }
  });

  it('o sistema com maior alcance recebe normalized=100', () => {
    const a = byId('ws-minuteman'); // 13000 km
    const b = byId('ws-f35'); // 2220 km
    const m = buildComparatorMetrics(a, b);
    expect(m.rangeKm[0].normalized).toBe(100);
  });

  it('display formata com unidade', () => {
    const a = byId('ws-f35');
    const b = byId('ws-f22');
    const m = buildComparatorMetrics(a, b);
    expect(m.speedMach[0].display).toContain('Mach');
  });
});

describe('rankByMetric', () => {
  it('ordena desc por métrica numérica', () => {
    const ranked = rankByMetric(arsenalData, 'rangeKm');
    for (let i = 1; i < ranked.length; i++) {
      const prev = ranked[i - 1].rangeKm ?? 0;
      const cur = ranked[i].rangeKm ?? 0;
      expect(prev).toBeGreaterThanOrEqual(cur);
    }
  });
});

describe('areComparable', () => {
  it('rejeita comparar o mesmo sistema', () => {
    const a = byId('ws-f35');
    expect(areComparable(a, a)).toBe(false);
  });
  it('aceita dois sistemas distintos', () => {
    expect(areComparable(byId('ws-f35'), byId('ws-f22'))).toBe(true);
  });
});
