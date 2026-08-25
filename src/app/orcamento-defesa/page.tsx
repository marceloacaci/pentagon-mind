import type { Metadata } from 'next';
import { BudgetChart } from '@/components/features/BudgetChart';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Analisador do Orçamento de Defesa (NDAA)',
  description: 'Série histórica do orçamento de defesa dos EUA (1989–2026) por ramo e P&D, com tabela de dados.',
};

export default function OrcamentoDefesaPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="military">ORÇAMENTO</Badge>
        <h1 className="section-title mt-2">Analisador Histórico do Orçamento de Defesa (NDAA)</h1>
        <p className="muted mt-1">
          Evolução do orçamento DoD, repartição por ramo e investimento em P&D (RDT&E). Fontes: CRS / DoD Comptroller.
        </p>
      </header>
      <BudgetChart />
    </div>
  );
}
