'use client';

import { useMemo, useState } from 'react';
import { glossaryData } from '@/data/glossary';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

const CATEGORY_COLOR: Record<string, string> = {
  'Doutrina & C2': 'text-military-400',
  'Armamentos & Plataformas': 'text-tactical-amber',
  'Inteligência & Sensores': 'text-tactical-cyan',
  'Geopolítica & Alianças': 'text-tactical-red',
};

export default function GlossarioPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('all');

  const categories = useMemo(() => ['all', ...Array.from(new Set(glossaryData.map((g) => g.category)))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossaryData.filter((g) => {
      const matchCat = cat === 'all' || g.category === cat;
      const matchQ =
        !q ||
        g.acronym.toLowerCase().includes(q) ||
        g.termPt.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  return (
    <div className="space-y-6">
      <header>
        <Badge variant="military">GLOSSÁRIO</Badge>
        <h1 className="section-title mt-2">Glossário Militar & Inspeção de Termos</h1>
        <p className="muted mt-1">Siglas em EN → pt-BR. Use também os popovers ao longo do portal (Tab + Enter).</p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar sigla ou termo…"
          aria-label="Buscar no glossário"
          className="flex-1 rounded border border-command-border bg-command-dark px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
        />
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filtrar por categoria">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                'rounded border px-2 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
                cat === c ? 'border-military-500 bg-military-900 text-slate-100' : 'border-command-border text-slate-300 hover:bg-command-surface',
              )}
            >
              {c === 'all' ? 'Todas' : c}
            </button>
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <div key={g.acronym} className="card-theme p-4">
            <dt className={cn('font-display text-lg font-bold', CATEGORY_COLOR[g.category])}>{g.acronym}</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-100">{g.termPt}</dd>
            <dd className="text-xs text-slate-500">{g.termEn}</dd>
            <dd className="mt-2 text-sm text-slate-300">{g.definition}</dd>
            <dd className="mt-2"><Badge variant="outline">{g.category}</Badge></dd>
          </div>
        ))}
      </dl>
      {filtered.length === 0 && (
        <p className="text-sm text-slate-400">Nenhum termo encontrado.</p>
      )}
    </div>
  );
}
