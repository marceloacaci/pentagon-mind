'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { buildSearchIndex, searchItems } from '@/lib/search';
import { arsenalData } from '@/data/arsenal';
import { doctrinesData } from '@/data/ontology';
import { briefingsData } from '@/data/briefings';
import { glossaryData } from '@/data/glossary';
import { geopoliticsData } from '@/data/geopolitics';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import type { SearchableItem } from '@/lib/search';

const KIND_LABELS: Record<SearchableItem['kind'], string> = {
  arma: 'Armas',
  doutrina: 'Doutrinas',
  conflito: 'Conflitos',
  briefing: 'Briefings',
  glossario: 'Glossário',
  geopolitica: 'Geopolítica',
};

export default function BuscaPage() {
  const index = useMemo(
    () => buildSearchIndex({ weapons: arsenalData, doctrines: doctrinesData, briefings: briefingsData, glossary: glossaryData, geopolitics: geopoliticsData }),
    [],
  );
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [kinds, setKinds] = useState<SearchableItem['kind'][]>([]);

  // Pré-preencher a partir de ?q= (deep-link compartilhável vindo da navbar)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) {
      setQuery(q);
      setDebounced(q);
    }
  }, []);

  // debounce simples
  useMemo(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(
    () => (debounced.trim() ? searchItems(index, { query: debounced, kinds }) : []),
    [debounced, index, kinds],
  );

  const toggleKind = (k: SearchableItem['kind']) =>
    setKinds((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));

  const hrefFor = (item: SearchableItem) => {
    switch (item.kind) {
      case 'arma': return '/arsenal-tecnologia';
      case 'doutrina': return '/doutrina';
      case 'conflito': return '/impactos-geopoliticos';
      case 'briefing': return '/briefings';
      case 'glossario': return '/glossario';
      case 'geopolitica': return '/impactos-geopoliticos';
      default: return '/busca';
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-100">Busca Global Multifacetada</h1>
        <p className="text-sm text-slate-400">Busca difusa (Fuse.js) por armas, doutrinas, conflitos, briefings e glossário.</p>
      </header>

      <Input
        id="busca-global"
        label="Termo de busca"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex.: JADC2, F-35, Taiwan, nuclear…"
      />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros por tipo">
        {(Object.keys(KIND_LABELS) as SearchableItem['kind'][]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kinds.includes(k)}
            onClick={() => toggleKind(k)}
            className={cn(
              'rounded border px-3 py-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
              kinds.includes(k) ? 'border-military-500 bg-military-500 text-white' : 'border-command-border text-slate-300 hover:bg-command-card',
            )}
          >
            {KIND_LABELS[k]}
          </button>
        ))}
      </div>

      {debounced.trim() && (
        <p className="text-sm text-slate-400">{results.length} resultado(s) para “{debounced}”.</p>
      )}

      <ul className="space-y-2">
        {results.map((r) => (
          <li key={`${r.kind}-${r.id}`}>
            <Link
              href={hrefFor(r)}
              className="card-theme block rounded-lg border border-command-border bg-command-card p-3 transition-colors hover:border-military-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
            >
              <div className="flex items-center gap-2">
                <Badge variant="military">{KIND_LABELS[r.kind]}</Badge>
                <span className="font-semibold text-slate-100">{r.title}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{r.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
