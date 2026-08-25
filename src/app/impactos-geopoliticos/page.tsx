import { geopoliticsData } from '@/data/geopolitics';
import { doctrinesData } from '@/data/ontology';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader } from '@/components/ui/Card';

export const metadata = { title: 'Impactos Geopolíticos' };

function doctName(id: string) {
  return doctrinesData.find((d) => d.id === id)?.name ?? id;
}
function adminName(id: string) {
  return id;
}

export default function GeopoliticaPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-100">Estudos de Caso & Contingências Regionais</h1>
        <p className="text-sm text-slate-400">Dinâmicas geopolíticas e seus impactos na arquitetura de defesa dos EUA.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {geopoliticsData.map((g) => (
          <Card key={g.id}>
            <CardHeader title={g.title} subtitle={`${g.region} · ${g.period}`} />
            <p className="text-sm text-slate-300">{g.summary}</p>
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dinâmicas-chave</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-300">
                {g.keyDynamics.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-xs text-slate-500">Desfecho: {g.outcome} · Admin: {adminName(g.administration)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {g.relatedDoctrines.map((d) => (
                <Badge key={d} variant="outline">{doctName(d)}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
