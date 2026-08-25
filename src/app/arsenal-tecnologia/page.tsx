import type { Metadata } from 'next';
import { arsenalData } from '@/data/arsenal';
import { Badge } from '@/components/ui/Badge';
import { DatasheetAccordion } from '@/components/ui/DatasheetAccordion';

export const metadata: Metadata = {
  title: 'Arsenal & Fichas de Armamentos',
  description: 'Catálogo de sistemas de armas dos EUA: aviação furtiva, tríade nuclear, hipersônicos, energia dirigida e drones.',
};

export default function ArsenalPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="amber">ARSENAL</Badge>
        <h1 className="section-title mt-2">Arsenal Tecnológico & Fichas de Armamentos</h1>
        <p className="muted mt-1">
          {arsenalData.length} sistemas de armas catalogados com especificações públicas e fonte verificada.
        </p>
      </header>

      <div className="space-y-3">
        {arsenalData.map((w) => (
          <DatasheetAccordion
            key={w.id}
            title={`${w.name} — ${w.designation}`}
            rows={[
              { label: 'Categoria', value: <Badge variant="military">{w.category}</Badge> },
              { label: 'Fabricante', value: w.manufacturer },
              { label: '1ª Implantação', value: w.firstDeployment },
              { label: 'Alcance', value: w.rangeKm ? `${w.rangeKm.toLocaleString('pt-BR')} km` : 'N/A' },
              { label: 'Velocidade', value: w.speedMach ? `${w.speedMach} Mach` : 'N/A' },
              { label: 'Custo unit.', value: w.unitCostMillionUsd ? `US$ ${w.unitCostMillionUsd.toLocaleString('pt-BR')}M` : 'N/A' },
              { label: 'Furtividade (RCS)', value: w.stealthRcsClass ?? 'N/A' },
              { label: 'Guiagem', value: w.guidanceSystem ?? 'N/A' },
              { label: 'Papel Estratégico', value: w.strategicRole },
              ...Object.entries(w.specifications).map(([k, v]) => ({ label: k, value: v })),
              { label: 'Fonte', value: w.source },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
