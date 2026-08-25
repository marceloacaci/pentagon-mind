import type { Metadata } from 'next';
import { WargameSimulator } from '@/components/features/WargameSimulator';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Simulador de Crise & Wargame',
  description: 'Simulador de cenários de crise e escalada doutrinária dos EUA. Navegação por teclado e resumo textual.',
};

export default function SimuladorCrisePage() {
  return (
    <div className="space-y-6">
      <header>
        <Badge variant="red">WARGAME</Badge>
        <h1 className="section-title mt-2">Simulador de Cenários de Crise & Escalada</h1>
        <p className="muted mt-1">
          Árvore de decisão navegável por teclado, com resumo textual linear. Conteúdo em nível de doutrina pública.
        </p>
      </header>
      <WargameSimulator />
    </div>
  );
}
