import type { Administration, Doctrine } from '@/types';
import { Badge } from '@/components/ui/Badge';

// Linha do tempo das doutrinas de defesa dos EUA por administração.
// Renderiza como <ol> (ordem cronológica semanticamente correta e
// navegável por leitores de tela / teclado). Cada item é focável via Tab.
export function TimelineDoutrinas({
  administrations,
  doctrines,
}: {
  administrations: Administration[];
  doctrines: Doctrine[];
}) {
  const doctName = (id: string) => doctrines.find((d) => d.id === id)?.name ?? id;

  return (
    <ol className="relative space-y-6 border-l border-command-border pl-6">
      {administrations.map((a) => (
        <li key={a.id} tabIndex={0} role="listitem" className="relative rounded outline-none focus-visible:ring-2 focus-visible:ring-military-500">
          <span
            className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-tactical-amber bg-command-dark"
            aria-hidden="true"
          />
          <div className="card-theme p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-slate-100">{a.name}</h3>
              <Badge variant={a.party === 'Republicano' ? 'military' : 'amber'}>{a.party}</Badge>
              <Badge variant="outline">{a.term}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-300">{a.posture}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {a.keyDoctrines.map((d) => (
                <Badge key={d} variant="amber">
                  {doctName(d)}
                </Badge>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Fonte: {a.source} · Verificado: {a.lastVerified}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
