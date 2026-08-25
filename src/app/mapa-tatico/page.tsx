'use client';

import { useState } from 'react';
import type { FlashpointThreat } from '@/types';
import { ThreatMapViewer, ThreatMapTable, ThreatMapLegend } from '@/components/features/ThreatMapViewer';
import { Badge } from '@/components/ui/Badge';

export default function MapaTaticoPage() {
  const [selected, setSelected] = useState<FlashpointThreat | null>(null);
  const [view, setView] = useState<'map' | 'table'>('map');

  return (
    <div className="space-y-6">
      <header>
        <Badge variant="red">MAPA TÁTICO</Badge>
        <h1 className="section-title mt-2">Mapa Tático Interativo de Ameaças Globais</h1>
        <p className="muted mt-1">
          Global Threat Matrix: teatros de operações, nível de prontidão e forças dos EUA desdobradas.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ThreatMapLegend />
        <div className="flex gap-2" role="group" aria-label="Alternar visualização">
          <button
            type="button"
            aria-pressed={view === 'map'}
            onClick={() => setView('map')}
            className={`rounded border px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500 ${view === 'map' ? 'border-military-500 bg-military-900 text-slate-100' : 'border-command-border text-slate-300 hover:bg-command-surface'}`}
          >
            Mapa
          </button>
          <button
            type="button"
            aria-pressed={view === 'table'}
            onClick={() => setView('table')}
            className={`rounded border px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500 ${view === 'table' ? 'border-military-500 bg-military-900 text-slate-100' : 'border-command-border text-slate-300 hover:bg-command-surface'}`}
          >
            Ver como tabela
          </button>
        </div>
      </div>

      {view === 'map' ? (
        <ThreatMapViewer onSelect={setSelected} />
      ) : (
        <ThreatMapTable />
      )}

      {selected && view === 'map' && (
        <div className="card-theme p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-slate-100">{selected.theaterName}</h2>
            <Badge variant="amber">{selected.threatLevel}</Badge>
          </div>
          <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-slate-400">Região</dt><dd className="text-slate-200">{selected.region}</dd></div>
            <div><dt className="text-slate-400">Adversário</dt><dd className="text-slate-200">{selected.primaryAdversary}</dd></div>
            <div><dt className="text-slate-400">Forças dos EUA</dt><dd className="text-slate-200">{selected.usForcesDeployed}</dd></div>
            <div><dt className="text-slate-400">Vetor de escalada</dt><dd className="text-slate-200">{selected.escalationVector}</dd></div>
            <div className="sm:col-span-2"><dt className="text-slate-400">Resumo tático</dt><dd className="text-slate-200">{selected.tacticalSummary}</dd></div>
            <div className="sm:col-span-2"><dt className="text-slate-400">Tratados</dt><dd className="text-slate-200">{selected.applicableTreaties.join(', ')}</dd></div>
          </dl>
          <p className="mt-2 text-xs text-slate-500">Fonte: {selected.source}</p>
        </div>
      )}

      <p className="text-xs text-slate-500">
        A visualização em tabela é a alternativa acessível (WCAG 2.1 AA) ao mapa interativo.
      </p>
    </div>
  );
}
