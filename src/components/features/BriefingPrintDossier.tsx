'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import type { Briefing } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function BriefingPrintDossier({ briefing }: { briefing: Briefing }) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `briefing-${briefing.slug}`,
  });

  return (
    <div className="space-y-3">
      <Button type="button" variant="secondary" onClick={handlePrint}>
        Exportar Dossiê (PDF/Impressão)
      </Button>

      <div
        ref={ref}
        className="space-y-4 rounded border border-command-border bg-white p-6 text-slate-900"
        style={{ color: '#0f172a', background: '#ffffff' }}
      >
        <div className="border-b-2 border-slate-800 pb-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {briefing.classificationHeader}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">{briefing.title}</h1>
          <p className="text-sm text-slate-600">
            {briefing.authorAgency} · {briefing.date}
            {briefing.region ? ` · ${briefing.region}` : ''}
          </p>
        </div>

        <section>
          <h2 className="font-display text-lg font-semibold">Resumo</h2>
          <p className="text-sm text-slate-700">{briefing.summary}</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">Contexto Estratégico</h2>
          <p className="text-sm text-slate-700">{briefing.strategicContext}</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">Análise Tática</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {briefing.tacticalAnalysis.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">Dados Técnicos</h2>
          <table className="w-full border-collapse text-sm">
            <tbody>
              {Object.entries(briefing.technicalData).map(([k, v]) => (
                <tr key={k} className="border-b border-slate-200">
                  <th scope="row" className="py-1 pr-4 text-left font-medium text-slate-600">{k}</th>
                  <td className="py-1 text-slate-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">Implicações de Política</h2>
          <p className="text-sm text-slate-700">{briefing.policyImplications}</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold">Fontes Primárias</h2>
          <ul className="space-y-1 text-sm text-slate-700">
            {briefing.primarySources.map((s, i) => (
              <li key={i}>
                {s.title} — <span className="font-mono text-xs">{s.identifier}</span>
                {s.url ? ` (${s.url})` : ''}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-1">
            {briefing.tags.map((t) => (
              <Badge key={t} variant="military">{t}</Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
