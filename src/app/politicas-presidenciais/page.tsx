import { administrationsData, doctrinesData } from '@/data/ontology';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const metadata = { title: 'Matriz Estratégica Presidencial 1989–2026+' };

function doctName(id: string) {
  return doctrinesData.find((d) => d.id === id)?.name ?? id;
}

export default function PresidentesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-100">Matriz Estratégica Presidencial</h1>
        <p className="text-sm text-slate-400">Postura de defesa, doutrinas e sistemas-chave por administração (Bush 41 → Trump 2).</p>
      </header>

      <div className="space-y-4">
        {administrationsData.map((a) => (
          <Card key={a.id}>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg font-semibold text-slate-100">{a.name}</h2>
              <Badge variant={a.party === 'Republicano' ? 'military' : 'amber'}>{a.party}</Badge>
              <Badge variant="outline">{a.term}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-300">{a.posture}</p>
            <p className="mt-2 text-sm text-slate-400">{a.legacy}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {a.keyDoctrines.map((d) => (
                <Badge key={d} variant="amber">{doctName(d)}</Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Fonte: {a.source} · Verificado: {a.lastVerified}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
