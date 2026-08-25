import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { briefingsData } from '@/data/briefings';
import { Badge } from '@/components/ui/Badge';
import { BriefingPrintDossier } from '@/components/features/BriefingPrintDossier';

export function generateStaticParams() {
  return briefingsData.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = briefingsData.find((x) => x.slug === params.slug);
  if (!b) return { title: 'Briefing não encontrado' };
  return {
    title: b.title,
    description: b.summary,
    openGraph: { title: b.title, description: b.summary },
  };
}

export default function BriefingDetailPage({ params }: { params: { slug: string } }) {
  const briefing = briefingsData.find((b) => b.slug === params.slug);
  if (!briefing) notFound();

  return (
    <article className="space-y-6">
      <header>
        <Badge variant="red">{briefing.classificationHeader}</Badge>
        <h1 className="section-title mt-2">{briefing.title}</h1>
        <p className="muted mt-1">
          {briefing.authorAgency} · {briefing.date}
          {briefing.region ? ` · ${briefing.region}` : ''}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {briefing.tags.map((t) => (
            <Badge key={t} variant="military">{t}</Badge>
          ))}
        </div>
      </header>

      <section className="prose-command">
        <p>{briefing.summary}</p>
        <h3>Contexto Estratégico</h3>
        <p>{briefing.strategicContext}</p>
        <h3>Análise Tática</h3>
        <ul>
          {briefing.tacticalAnalysis.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <h3>Implicações de Política</h3>
        <p>{briefing.policyImplications}</p>
      </section>

      <BriefingPrintDossier briefing={briefing} />

      <div className="rounded border border-command-border bg-command-surface p-3">
        <h2 className="mb-2 font-display text-sm font-semibold text-slate-200">Fontes Primárias</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          {briefing.primarySources.map((s, i) => (
            <li key={i}>
              {s.title} — <span className="font-mono text-xs">{s.identifier}</span>
              {s.url ? ` (${s.url})` : ''}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/briefings" className="inline-block text-sm text-military-400 hover:underline">
        ← Voltar ao hub de briefings
      </Link>
    </article>
  );
}
