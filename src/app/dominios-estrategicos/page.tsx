import type { Metadata } from 'next';
import { JADC2FlowDiagram } from '@/components/features/JADC2FlowDiagram';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GlossaryInspector } from '@/components/ui/GlossaryInspector';

export const metadata: Metadata = {
  title: 'Domínios Estratégicos & Fluxo JADC2',
  description: 'Os cinco domínios de guerra e o fluxo JADC2 (sensor-to-shooter) integrado por IA.',
};

const DOMAINS = [
  { name: 'Terrestre', desc: 'Operações Multidomínio (MDO) do Exército; BCTs e defesa antimíssil.' },
  { name: 'Marítimo', desc: 'Marinha e Fuzileiros; grupos de porta-aviões, SSBN e Project Overmatch.' },
  { name: 'Aéreo', desc: 'Força Aérea; superioridade, ABMS e reabastecimento em ala.' },
  { name: 'Espacial', desc: 'USSF; SDA, PWSA e resiliência orbital (TacRS).' },
  { name: 'Ciberespaço', desc: 'USCYBERCOM; defesa persistente e operações JP 3-12.' },
];

export default function DominiosPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="military">DOMÍNIOS</Badge>
        <h1 className="section-title mt-2">Domínios Estratégicos & Fluxo JADC2</h1>
        <p className="muted mt-1">
          <GlossaryInspector text="O JADC2 conecta sensores e atiradores em todos os domínios via nuvem tática e IA, reduzindo o tempo sensor-to-shooter." />
        </p>
      </header>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-slate-100">Fluxo Sensor-to-Shooter (JADC2)</h2>
        <JADC2FlowDiagram />
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-slate-100">Os Cinco Domínios</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((d) => (
            <Card key={d.name} className="p-4">
              <CardHeader title={d.name} />
              <CardBody>{d.desc}</CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
