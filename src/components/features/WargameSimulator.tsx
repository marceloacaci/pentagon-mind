'use client';

import { useMemo, useState } from 'react';
import { wargameScenarios } from '@/data/wargame';
import type { WargameScenario } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

const RISK_COLOR: Record<string, string> = {
  Baixo: 'text-tactical-green border-tactical-green/40 bg-tactical-green/10',
  Moderado: 'text-tactical-amber border-tactical-amber/40 bg-tactical-amber/10',
  Alto: 'text-tactical-red border-tactical-red/40 bg-tactical-red/10',
  Catastrófico: 'text-tactical-red border-tactical-red/60 bg-tactical-red/20',
};

export function WargameSimulator() {
  const [scenarioId, setScenarioId] = useState(wargameScenarios[0]?.id ?? '');

  const scenario = useMemo<WargameScenario | undefined>(
    () => wargameScenarios.find((s) => s.id === scenarioId),
    [scenarioId],
  );

  // Caminho de decisão: opção escolhida em cada cenário.
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const chosen = scenario?.usCommandOptions.find((o) => o.id === choiceId) ?? null;

  return (
    <div className="space-y-4">
      <div className="card-theme p-3">
        <label htmlFor="wg-scenario" className="mb-1 block text-xs font-medium text-slate-400">
          Cenário de Crise
        </label>
        <select
          id="wg-scenario"
          value={scenarioId}
          onChange={(e) => {
            setScenarioId(e.target.value);
            setChoiceId(null);
          }}
          className="w-full rounded border border-command-border bg-command-dark px-3 py-2 text-sm text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
        >
          {wargameScenarios.map((s) => (
            <option key={s.id} value={s.id} className="bg-command-dark">
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {scenario && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Árvore de decisão (navegável por teclado) */}
          <div className="card-theme space-y-3 p-4">
            <div>
              <Badge variant="red">{scenario.initialDefcon}</Badge>
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-100">{scenario.title}</h3>
            </div>
            <dl className="space-y-1 text-sm">
              <div><dt className="text-slate-400">Gatilho:</dt><dd className="text-slate-300">{scenario.crisisTrigger}</dd></div>
              <div><dt className="text-slate-400">Ação adversa:</dt><dd className="text-slate-300">{scenario.adversaryAction}</dd></div>
            </dl>

            <h4 className="font-medium text-slate-200">Opções de Comando (EUA):</h4>
            <ul className="space-y-2" role="list">
              {scenario.usCommandOptions.map((opt) => {
                const isActive = choiceId === opt.id;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setChoiceId(opt.id)}
                      className={cn(
                        'block w-full rounded border px-3 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
                        isActive
                          ? 'border-military-500 bg-military-900 text-slate-100'
                          : 'border-command-border bg-command-dark text-slate-300 hover:border-command-borderStrong',
                      )}
                    >
                      {opt.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desdobramento da escolha */}
          <div className="card-theme p-4">
            {chosen ? (
              <div className="space-y-3">
                <span className={cn('inline-block rounded border px-2 py-0.5 text-xs font-semibold', RISK_COLOR[chosen.riskAssessment])}>
                  Risco: {chosen.riskAssessment}
                </span>
                <h4 className="font-display text-lg font-semibold text-slate-100">{chosen.outcomeTitle}</h4>
                <p className="text-sm text-slate-300">{chosen.outcomeDescription}</p>
                <div className="text-sm">
                  <span className="text-slate-400">Doutrina aplicada: </span>
                  <span className="text-tactical-amber">{chosen.doctrineApplied}</span>
                </div>
                <div className="rounded border border-command-border bg-command-dark p-2 text-sm text-slate-300">
                  <span className="font-medium text-military-400">Envolvimento JADC2: </span>
                  {chosen.jadc2Involvement}
                </div>
                <p className="text-xs text-slate-500">Analogia histórica: {scenario.historicalAnalogy}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Selecione uma opção de comando à esquerda para ver o desdobramento do cenário.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Resumo textual linear (alternativa ao visual em árvore) */}
      {scenario && (
        <details className="card-theme p-3 text-sm">
          <summary className="cursor-pointer font-medium text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500">
            Resumo textual do cenário ({scenario.title})
          </summary>
          <div className="prose-command mt-3">
            <p><strong>Contexto:</strong> {scenario.geopoliticalContext}</p>
            <p><strong>Gatilho:</strong> {scenario.crisisTrigger}</p>
            <p><strong>Ação adversa:</strong> {scenario.adversaryAction}</p>
            <h3>Opções e desdobramentos</h3>
            <ul>
              {scenario.usCommandOptions.map((o) => (
                <li key={o.id}>
                  <strong>{o.label}</strong> — {o.outcomeTitle} (Risco: {o.riskAssessment}). {o.outcomeDescription} JADC2: {o.jadc2Involvement}
                </li>
              ))}
            </ul>
            <p><strong>Analogia histórica:</strong> {scenario.historicalAnalogy}</p>
          </div>
        </details>
      )}
    </div>
  );
}
