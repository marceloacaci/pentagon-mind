'use client';

import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { budgetData } from '@/data/budget';
import type { BudgetYear } from '@/types';

export function BudgetChart() {
  const [showTable, setShowTable] = useState(false);

  const data = useMemo(
    () =>
      budgetData.map((b: BudgetYear) => ({
        year: String(b.year),
        Exército: b.armyBillionUsd,
        Marinha: b.navyMarineBillionUsd,
        'Força Aérea': b.airForceBillionUsd,
        'Força Espacial': b.spaceForceBillionUsd,
        'P&D (RDT&E)': b.rdteBillionUsd,
      })),
    [],
  );

  return (
    <div className="space-y-3">
      <div className="card-theme p-4">
        <h3 className="mb-3 font-display text-lg font-semibold text-slate-100">
          Orçamento de Defesa dos EUA por Ramo (US$ bilhões)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f37" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#14161a', border: '1px solid #2a2f37', borderRadius: 8, color: '#e2e8f0' }}
                formatter={(v: number) => `US$ ${v} bi`}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="Exército" stackId="a" fill="#2f7fb5" />
              <Bar dataKey="Marinha" stackId="a" fill="#c9a227" />
              <Bar dataKey="Força Aérea" stackId="a" fill="#20c997" />
              <Bar dataKey="Força Espacial" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="P&D (RDT&E)" stackId="a" fill="#d9534f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowTable((v) => !v)}
        aria-expanded={showTable}
        className="rounded border border-command-border bg-command-card px-3 py-2 text-sm font-medium text-slate-200 hover:bg-command-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
      >
        {showTable ? 'Ocultar tabela de dados' : 'Ver tabela de dados subjacente'}
      </button>

      {showTable && (
        <div className="card-theme overflow-x-auto p-3">
          <table className="w-full border-collapse text-sm">
            <caption className="mb-2 text-left text-xs text-slate-500">
              Dados subjacentes por ano (US$ bilhões) — fontes: CRS / DoD Comptroller
            </caption>
            <thead>
              <tr className="border-b border-command-borderStrong text-left text-xs uppercase tracking-wide text-slate-400">
                <th scope="col" className="px-3 py-2">Ano</th>
                <th scope="col" className="px-3 py-2">Total</th>
                <th scope="col" className="px-3 py-2">Exército</th>
                <th scope="col" className="px-3 py-2">Marinha</th>
                <th scope="col" className="px-3 py-2">Aérea</th>
                <th scope="col" className="px-3 py-2">Espacial</th>
                <th scope="col" className="px-3 py-2">RDT&E</th>
                <th scope="col" className="px-3 py-2">% PIB</th>
                <th scope="col" className="px-3 py-2">Foco</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((b) => (
                <tr key={b.year} className="border-b border-command-border odd:bg-command-bg even:bg-command-surface/40">
                  <td className="px-3 py-2 font-medium text-slate-100">{b.year}</td>
                  <td className="px-3 py-2 text-slate-200">{b.totalBudgetBillionUsd}</td>
                  <td className="px-3 py-2 text-slate-300">{b.armyBillionUsd}</td>
                  <td className="px-3 py-2 text-slate-300">{b.navyMarineBillionUsd}</td>
                  <td className="px-3 py-2 text-slate-300">{b.airForceBillionUsd}</td>
                  <td className="px-3 py-2 text-slate-300">{b.spaceForceBillionUsd}</td>
                  <td className="px-3 py-2 text-slate-300">{b.rdteBillionUsd}</td>
                  <td className="px-3 py-2 text-slate-300">{b.gdpPercentage}</td>
                  <td className="px-3 py-2 text-slate-300">{b.keyProcurementFocus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
