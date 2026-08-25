import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ShieldAlert className="text-tactical-red" size={48} aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-bold text-slate-100">404 — Sinal Perdido</h1>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        A rota solicitada não foi encontrada no Command Center. Verifique a URL ou retorne ao painel.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded bg-military-500 px-4 py-2 text-sm font-semibold text-white hover:bg-military-600"
      >
        Voltar ao Painel
      </Link>
    </div>
  );
}
