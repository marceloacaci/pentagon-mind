import type { Metadata } from 'next';
import { WeaponsComparator } from '@/components/features/WeaponsComparator';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Comparador Tático de Sistemas de Armas',
  description: 'Compare sistemas de armas dos EUA lado a lado: alcance, velocidade, custo e furtividade, com alternativa em tabela.',
};

export default function ComparadorPage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="amber">COMPARADOR</Badge>
        <h1 className="section-title mt-2">Comparador Tático de Sistemas de Armas</h1>
        <p className="muted mt-1">
          Métricas públicas normalizadas (0–100). Use o seletor e a alternativa em tabela para verificação.
        </p>
      </header>
      <WeaponsComparator />
    </div>
  );
}
