'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { budgetData } from '@/data/budget';
import type { BudgetYear } from '@/types';

// Gráfico comparativo de orçamento por ramo em BARRAS AGRUPADAS
// (cada ano mostra Exército / Marinha / Força Aérea / Força Espacial / P&D lado a
// lado, sem empilhamento, para comparação direta de repartição).
export function BudgetByBranchChart() {
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
        <h3 className="mb-1 font-display text-lg font-semibold text-slate-100">
          Comparativo por Ramo — barras agrupadas
        </h3>
        <p className="mb-3 text-xs text-slate-400">
          Cada ano exibe os ramos lado a lado para comparação direta da repartição orçamentária.
        </p>
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
              <Bar dataKey="Exército" fill="#2f7fb5" />
              <Bar dataKey="Marinha" fill="#c9a227" />
              <Bar dataKey="Força Aérea" fill="#20c997" />
              <Bar dataKey="Força Espacial" fill="#8b5cf6" />
              <Bar dataKey="P&D (RDT&E)" fill="#d9534f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
