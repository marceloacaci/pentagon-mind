'use client';

import { useMemo, useState } from 'react';
import { glossaryData } from '@/data/glossary';
import type { GlossaryTerm } from '@/types';
import { cn } from '@/lib/cn';

interface GlossaryInspectorProps {
  // Texto onde siglas serão realçadas automaticamente.
  text: string;
  className?: string;
}

const CATEGORY_COLOR: Record<GlossaryTerm['category'], string> = {
  'Doutrina & C2': 'text-military-400',
  'Armamentos & Plataformas': 'text-tactical-amber',
  'Inteligência & Sensores': 'text-tactical-cyan',
  'Geopolítica & Alianças': 'text-tactical-red',
};

// Realça siglas presentes no glossário e, ao focar/passar o mouse, mostra
// a definição em pt-BR. Acessível por teclado: Tab foca, Enter/Espaço abre,
// Esc fecha (correção WCAG do plano v3).
export function GlossaryInspector({ text, className }: GlossaryInspectorProps) {
  const [activeAcronym, setActiveAcronym] = useState<string | null>(null);

  const byAcronym = useMemo(() => {
    const m = new Map<string, GlossaryTerm>();
    for (const g of glossaryData) m.set(g.acronym.toUpperCase(), g);
    return m;
  }, []);

  const acronyms = useMemo(
    () => Array.from(byAcronym.keys()).sort((a, b) => b.length - a.length),
    [byAcronym],
  );

  // Tokeniza o texto preservando pontuação.
  const tokens = useMemo(() => {
    const escaped = acronyms
      .map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    if (!escaped) return [text];
    const re = new RegExp(`\\b(${escaped})\\b`, 'g');
    return text.split(re);
  }, [text, acronyms]);

  return (
    <span className={cn('relative', className)}>
      {tokens.map((tok, i) => {
        const term = byAcronym.get(tok.toUpperCase());
        if (!term) return <span key={i}>{tok}</span>;
        const open = activeAcronym === term.acronym;
        return (
          <span key={i} className="relative inline-block">
            <button
              type="button"
              className={cn(
                'cursor-help font-semibold underline decoration-dotted underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
                CATEGORY_COLOR[term.category],
              )}
              aria-expanded={open}
              aria-describedby={open ? `gl-${term.acronym}` : undefined}
              onMouseEnter={() => setActiveAcronym(term.acronym)}
              onMouseLeave={() => setActiveAcronym((a) => (a === term.acronym ? null : a))}
              onFocus={() => setActiveAcronym(term.acronym)}
              onBlur={() => setActiveAcronym((a) => (a === term.acronym ? null : a))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveAcronym((a) => (a === term.acronym ? null : term.acronym));
                } else if (e.key === 'Escape') {
                  setActiveAcronym(null);
                }
              }}
            >
              {tok}
            </button>
            {open && (
              <span
                id={`gl-${term.acronym}`}
                role="tooltip"
                className="card-theme absolute left-0 top-full z-50 mt-1 w-72 max-w-[90vw] rounded border border-command-border bg-command-card p-3 text-left text-xs font-normal normal-case leading-relaxed text-slate-200 shadow-xl"
              >
                <span className="mb-1 block font-display text-sm font-semibold text-slate-100">
                  {term.acronym} — {term.termPt}
                </span>
                <span className="mb-1 block text-slate-400">{term.termEn}</span>
                {term.definition}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
