import type { Metadata } from 'next';
import Link from 'next/link';
import { briefingsData } from '@/data/briefings';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Hub de Briefings & Dossiês Analíticos',
  description: 'Dossiês analíticos de defesa com fontes primárias estáveis (CRS, RAND, CSIS, DoD).',
};

export default function BriefingsHubPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="amber">BRIEFINGS</Badge>
        <h1 className="section-title mt-2">Hub de Briefings & Dossiês Analíticos</h1>
        <p className="muted mt-1">Resumos próprios de fontes primárias de domínio público.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {briefingsData.map((b) => (
          <Link key={b.id} href={`/briefings/${b.slug}`} className="card-theme block p-4 transition-colors hover:bg-command-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500">
            <CardHeader title={b.title} subtitle={`${b.date}${b.region ? ` · ${b.region}` : ''}`} />
            <CardBody>
              <p className="mb-2">{b.summary}</p>
              <div className="flex flex-wrap gap-1">
                {b.tags.map((t) => (
                  <Badge key={t} variant="military">{t}</Badge>
                ))}
              </div>
            </CardBody>
          </Link>
        ))}
      </div>
    </div>
  );
}
