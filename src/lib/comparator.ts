import type { WeaponSystem } from '../types';

// Métricas normalizadas do comparador tático de armas.
// Cada métrica é normalizada para 0–100 em relação ao máximo do conjunto,
// para exibição em barras comparativas lado-a-lado.

export interface ComparatorMetric {
  key: string;
  label: string;
  // valor bruto (pode ser undefined → não comparável)
  raw?: number;
  // valor normalizado 0–100
  normalized: number;
  unit?: string;
  display: string;
}

function maxOf(systems: WeaponSystem[], pick: (w: WeaponSystem) => number | undefined): number {
  const vals = systems.map(pick).filter((v): v is number => typeof v === 'number' && v > 0);
  return vals.length ? Math.max(...vals) : 1;
}

export function buildComparatorMetrics(a: WeaponSystem, b: WeaponSystem): Record<string, [ComparatorMetric, ComparatorMetric]> {
  const systems = [a, b];
  const maxRange = maxOf(systems, (w) => w.rangeKm);
  const maxSpeed = maxOf(systems, (w) => w.speedMach);
  const maxCost = maxOf(systems, (w) => w.unitCostMillionUsd);
  const maxPayload = maxOf(systems, (w) => w.payloadKg);

  const metric = (
    key: string, label: string, raw: number | undefined, max: number, unit: string,
  ): ComparatorMetric => ({
    key, label, raw,
    normalized: raw && max > 0 ? Math.round((raw / max) * 100) : 0,
    unit,
    display: raw !== undefined ? `${raw.toLocaleString('pt-BR')} ${unit}`.trim() : 'N/A',
  });

  return {
    rangeKm: [metric('rangeKm', 'Alcance', a.rangeKm, maxRange, 'km'), metric('rangeKm', 'Alcance', b.rangeKm, maxRange, 'km')],
    speedMach: [metric('speedMach', 'Velocidade', a.speedMach, maxSpeed, 'Mach'), metric('speedMach', 'Velocidade', b.speedMach, maxSpeed, 'Mach')],
    unitCostMillionUsd: [metric('unitCostMillionUsd', 'Custo unit.', a.unitCostMillionUsd, maxCost, 'US$ M'), metric('unitCostMillionUsd', 'Custo unit.', b.unitCostMillionUsd, maxCost, 'US$ M')],
    payloadKg: [metric('payloadKg', 'Carga útil', a.payloadKg, maxPayload, 'kg'), metric('payloadKg', 'Carga útil', b.payloadKg, maxPayload, 'kg')],
  };
}

// Ordena sistemas por uma métrica específica (descendente), tratando undefined como 0.
export function rankByMetric(systems: WeaponSystem[], key: keyof WeaponSystem): WeaponSystem[] {
  return [...systems].sort((x, y) => {
    const xv = typeof x[key] === 'number' ? (x[key] as number) : 0;
    const yv = typeof y[key] === 'number' ? (y[key] as number) : 0;
    return yv - xv;
  });
}

// Verifica se dois sistemas são comparáveis (mesma categoria ou domínio similar).
export function areComparable(a: WeaponSystem, b: WeaponSystem): boolean {
  if (a.id === b.id) return false;
  return true;
}
