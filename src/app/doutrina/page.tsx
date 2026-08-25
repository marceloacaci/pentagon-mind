import type { Metadata } from 'next';
import { doctrinesData } from '@/data/ontology';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GlossaryInspector } from '@/components/ui/GlossaryInspector';

export const metadata: Metadata = {
  title: 'Doutrina Militar & Matriz Comparativa',
  description: 'Doutrinas militares dos EUA de 1982 a 2026: AirLand Battle, RMA, GPC, MDO e suas características operacionais.',
};

export default function DoutrinaPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="military">DOUTRINA</Badge>
        <h1 className="section-title mt-2">Doutrina Militar & Matriz Comparativa</h1>
        <p className="muted mt-1">
          <GlossaryInspector text="Evolução das doutrinas dos EUA, de AirLand Battle e RMA à Competição de Grandes Potências (GPC) e Operações Multidomínio (MDO)." />
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {doctrinesData.map((d) => (
          <Card key={d.id} className="p-4">
            <CardHeader title={d.name} subtitle={`${d.period} · ${d.fm}`} />
            <CardBody>
              <p className="mb-2">{d.summary}</p>
              <div className="flex flex-wrap gap-1">
                {d.operationalCharacteristics.map((c) => (
                  <Badge key={c} variant="outline">{c}</Badge>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">Fonte: {d.source}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
