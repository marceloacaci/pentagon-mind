'use client';

import { useMemo, useState } from 'react';
import { arsenalData } from '@/data/arsenal';
import { buildComparatorMetrics } from '@/lib/comparator';
import { Badge } from '@/components/ui/Badge';
import type { WeaponSystem } from '@/types';

const METRICS: { key: keyof ReturnType<typeof buildComparatorMetrics>; label: string }[] = [
  { key: 'rangeKm', label: 'Alcance' },
  { key: 'speedMach', label: 'Velocidade' },
  { key: 'unitCostMillionUsd', label: 'Custo Unit.' },
  { key: 'payloadKg', label: 'Carga Útil' },
];

export function WeaponsComparator() {
  const [aId, setAId] = useState(arsenalData[0]?.id ?? '');
  const [bId, setBId] = useState(arsenalData[1]?.id ?? '');

  const a = useMemo(() => arsenalData.find((w) => w.id === aId), [aId]);
  const b = useMemo(() => arsenalData.find((w) => w.id === bId), [bId]);

  const metrics = useMemo(() => (a && b ? buildComparatorMetrics(a, b) : null), [a, b]);

  const Bar = ({ value, color }: { value: number; color: string }) => (
    <div className="h-2 w-full rounded bg-command-darkest">
      <div className="h-2 rounded" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="card-theme p-3">
          <label htmlFor="cmp-a" className="mb-1 block text-xs font-medium text-slate-400">
            Sistema A
          </label>
          <select
            id="cmp-a"
            value={aId}
            onChange={(e) => setAId(e.target.value)}
            className="w-full rounded border border-command-border bg-command-dark px-3 py-2 text-sm text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
          >
            {arsenalData.map((w) => (
              <option key={w.id} value={w.id} className="bg-command-dark">
                {w.name}
              </option>
            ))}
          </select>
        </div>
        <div className="card-theme p-3">
          <label htmlFor="cmp-b" className="mb-1 block text-xs font-medium text-slate-400">
            Sistema B
          </label>
          <select
            id="cmp-b"
            value={bId}
            onChange={(e) => setBId(e.target.value)}
            className="w-full rounded border border-command-border bg-command-dark px-3 py-2 text-sm text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
          >
            {arsenalData.map((w) => (
              <option key={w.id} value={w.id} className="bg-command-dark">
                {w.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {a && b && metrics && (
        <div className="card-theme overflow-x-auto p-4">
          <div className="mb-4 grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-2 sm:grid-cols-[1.2fr_1fr_1fr]">
            <div />
            <WeaponHead weapon={a} />
            <WeaponHead weapon={b} />
          </div>

          {METRICS.map((m) => {
            const [ma, mb] = metrics[m.key];
            return (
              <div key={m.key} className="grid grid-cols-1 gap-y-1 border-t border-command-border py-3 sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center sm:gap-x-4">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{m.label}</span>
                <div>
                  <div className="mb-1 text-sm text-slate-100">{ma.display}</div>
                  <Bar value={ma.normalized} color="#2f7fb5" />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-100">{mb.display}</div>
                  <Bar value={mb.normalized} color="#c9a227" />
                </div>
              </div>
            );
          })}

          <div className="mt-4 border-t border-command-border pt-3">
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Papel Estratégico
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <p className="text-sm text-slate-300">{a.strategicRole}</p>
              <p className="text-sm text-slate-300">{b.strategicRole}</p>
            </div>
          </div>
        </div>
      )}

      {/* Versão em tabela simples (fallback acessível) */}
      {a && b && (
        <details className="card-theme p-3 text-sm">
          <summary className="cursor-pointer font-medium text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500">
            Ver comparação em tabela
          </summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-command-borderStrong text-left text-xs uppercase text-slate-400">
                  <th scope="col" className="px-3 py-2">Atributo</th>
                  <th scope="col" className="px-3 py-2">{a.name}</th>
                  <th scope="col" className="px-3 py-2">{b.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-command-border">
                  <th scope="row" className="px-3 py-2 text-left text-slate-400">Categoria</th>
                  <td className="px-3 py-2 text-slate-200">{a.category}</td>
                  <td className="px-3 py-2 text-slate-200">{b.category}</td>
                </tr>
                <tr className="border-b border-command-border">
                  <th scope="row" className="px-3 py-2 text-left text-slate-400">Fabricante</th>
                  <td className="px-3 py-2 text-slate-200">{a.manufacturer}</td>
                  <td className="px-3 py-2 text-slate-200">{b.manufacturer}</td>
                </tr>
                <tr className="border-b border-command-border">
                  <th scope="row" className="px-3 py-2 text-left text-slate-400">Alcance</th>
                  <td className="px-3 py-2 text-slate-200">{a.rangeKm ? `${a.rangeKm} km` : 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-200">{b.rangeKm ? `${b.rangeKm} km` : 'N/A'}</td>
                </tr>
                <tr className="border-b border-command-border">
                  <th scope="row" className="px-3 py-2 text-left text-slate-400">Velocidade</th>
                  <td className="px-3 py-2 text-slate-200">{a.speedMach ? `${a.speedMach} Mach` : 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-200">{b.speedMach ? `${b.speedMach} Mach` : 'N/A'}</td>
                </tr>
                <tr className="border-b border-command-border">
                  <th scope="row" className="px-3 py-2 text-left text-slate-400">Custo unit.</th>
                  <td className="px-3 py-2 text-slate-200">{a.unitCostMillionUsd ? `US$ ${a.unitCostMillionUsd}M` : 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-200">{b.unitCostMillionUsd ? `US$ ${b.unitCostMillionUsd}M` : 'N/A'}</td>
                </tr>
                <tr>
                  <th scope="row" className="px-3 py-2 text-left text-slate-400">Furtividade</th>
                  <td className="px-3 py-2 text-slate-200">{a.stealthRcsClass ?? 'N/A'}</td>
                  <td className="px-3 py-2 text-slate-200">{b.stealthRcsClass ?? 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}

function WeaponHead({ weapon }: { weapon: WeaponSystem }) {
  return (
    <div className="text-right">
      <div className="font-display font-semibold text-slate-100">{weapon.name}</div>
      <div className="mt-1 flex justify-end">
        <Badge variant="military">{weapon.category}</Badge>
      </div>
    </div>
  );
}
