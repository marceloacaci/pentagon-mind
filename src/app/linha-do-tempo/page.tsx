import type { Metadata } from 'next';
import { administrationsData, doctrinesData } from '@/data/ontology';
import { TimelineDoutrinas } from '@/components/features/TimelineDoutrinas';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Linha do Tempo das Doutrinas de Defesa dos EUA (1989–2026+)',
  description:
    'Evolução das doutrinas militares dos EUA por administração, de Bush 41 à competição de grandes potências (Trump 2).',
};

export default function LinhaDoTempoPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="amber">LINHA DO TEMPO</Badge>
        <h1 className="section-title mt-2">Evolução Doutrinária dos EUA (1989–2026+)</h1>
        <p className="muted mt-1">
          Doutrinas militares e posturas estratégicas por administração, do fim da Guerra Fria à competição de
          grandes potências.
        </p>
      </header>

      <TimelineDoutrinas administrations={administrationsData} doctrines={doctrinesData} />
    </div>
  );
}
