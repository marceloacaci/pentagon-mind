import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function BriefingNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <FileQuestion className="text-tactical-amber" size={48} aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-bold text-slate-100">Briefing Não Encontrado</h1>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        O dossiê solicitado não existe ou foi desclassificado. Veja todos os briefings disponíveis.
      </p>
      <Link
        href="/briefings"
        className="mt-6 inline-flex items-center gap-2 rounded bg-military-500 px-4 py-2 text-sm font-semibold text-white hover:bg-military-600"
      >
        Ver todos os Briefings
      </Link>
    </div>
  );
}
