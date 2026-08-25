import { Card } from '@/components/ui/Card';

// Nós do fluxo JADC2 (Sensor-to-Shooter Loop).
const FLOW_NODES = [
  { id: 'space', label: 'Satélites SDA / Espaço', desc: 'Detecção e alerta precoce orbital (PWSA, SDA).' },
  { id: 'air', label: 'Sensores Aéreos (E-7 / F-35)', desc: 'Fusão de alvos e retransmissão de dados.' },
  { id: 'cloud', label: 'Nuvem Tática de IA (ABMS / Project Convergence)', desc: 'Atribuição automática de engajamentos.' },
  { id: 'shoot', label: 'Atiradores (HIMARS / Typhon / Arleigh Burke)', desc: 'Engajamento cinético em segundos.' },
];

export function JADC2FlowDiagram() {
  return (
    <div className="space-y-4">
      {/* Diagrama SVG */}
      <Card className="p-4">
        <div className="overflow-x-auto">
          <svg
            viewBox="0 0 900 160"
            role="img"
            aria-label="Fluxo JADC2: do sensor espacial ao atirador cinético, em loop fechado"
            className="min-w-[700px] w-full"
          >
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,3 L0,6 Z" fill="#2f7fb5" />
              </marker>
            </defs>
            {FLOW_NODES.map((n, i) => {
              const x = 30 + i * 220;
              return (
                <g key={n.id}>
                  <rect x={x} y={50} width={180} height={60} rx={8} fill="#14161a" stroke="#2f7fb5" strokeWidth={1.5} />
                  <text x={x + 90} y={78} textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600">
                    {n.label.length > 22 ? n.label.slice(0, 20) + '…' : n.label}
                  </text>
                  <text x={x + 90} y={96} textAnchor="middle" fill="#94a3b8" fontSize="10">
                    {n.desc.length > 28 ? n.desc.slice(0, 26) + '…' : n.desc}
                  </text>
                  {i < FLOW_NODES.length - 1 && (
                    <line x1={x + 180} y1={80} x2={x + 220} y2={80} stroke="#2f7fb5" strokeWidth={2} markerEnd="url(#arrow)" />
                  )}
                </g>
              );
            })}
            {/* Loop de retorno */}
            <path d="M30 110 C 30 150, 850 150, 870 110" fill="none" stroke="#c9a227" strokeWidth={2} strokeDasharray="5 4" markerEnd="url(#arrow)" />
            <text x={450} y={148} textAnchor="middle" fill="#c9a227" fontSize="11">
              Loop fechado (retroalimentação de efeito)
            </text>
          </svg>
        </div>
      </Card>

      {/* Lista ordenada sequencial (correção WCAG 1.4.1) */}
      <div className="card-theme p-4">
        <h3 className="mb-2 font-display text-lg font-semibold text-slate-100">
          Fluxo sequencial (texto equivalente)
        </h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          {FLOW_NODES.map((n) => (
            <li key={n.id}>
              <span className="font-medium text-slate-100">{n.label}:</span> {n.desc}
            </li>
          ))}
          <li>
            <span className="font-medium text-tactical-amber">Loop fechado:</span> o efeito do engajamento
            retroalimenta os sensores, reduzindo o tempo sensor-to-shooter de minutos para segundos.
          </li>
        </ol>
      </div>
    </div>
  );
}
