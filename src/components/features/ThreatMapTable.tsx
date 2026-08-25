import { flashpointsData } from '@/data/threatMap';
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import type { FlashpointThreat } from '@/types';

const columns: DataTableColumn<FlashpointThreat>[] = [
  { key: 'theaterName', header: 'Teatro', render: (r) => <span className="font-medium text-slate-100">{r.theaterName}</span> },
  { key: 'region', header: 'Região' },
  {
    key: 'threatLevel',
    header: 'Nível',
    render: (r) => (
      <Badge variant={r.threatLevel.includes('DEFCON 1') || r.threatLevel.includes('DEFCON 2') || r.threatLevel === 'Alerta Crítico' ? 'red' : r.threatLevel === 'Monitoramento' ? 'blue' : 'amber'}>
        {r.threatLevel}
      </Badge>
    ),
  },
  { key: 'primaryAdversary', header: 'Adversário' },
  { key: 'usForcesDeployed', header: 'Forças dos EUA' },
];

export function ThreatMapTable() {
  return (
    <div className="card-theme rounded-lg border border-command-border bg-command-card p-4">
      <h3 className="mb-3 font-display text-lg font-semibold text-slate-100">Teatros de Operações — Tabela</h3>
      <DataTable
        columns={columns}
        rows={flashpointsData}
        caption="Alternativa acessível ao mapa interativo (WCAG 1.1.1 / 1.4.1)."
      />
    </div>
  );
}
