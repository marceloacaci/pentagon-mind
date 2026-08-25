'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface DatasheetRow {
  label: string;
  value: ReactNode;
}

interface DatasheetAccordionProps {
  title: string;
  defaultOpen?: boolean;
  rows: DatasheetRow[];
}

// Acordeão de ficha técnica (datasheet) — seção colapsável acessível.
export function DatasheetAccordion({ title, defaultOpen = false, rows }: DatasheetAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `ds-panel-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const btnId = `ds-btn-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="rounded border border-command-border bg-command-card">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
        >
          <span>{title}</span>
          <ChevronDown
            size={18}
            className={cn('transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </h3>
      {open && (
        <dl id={panelId} className="divide-y divide-command-border border-t border-command-border px-4 py-2 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-slate-400">{r.label}</dt>
              <dd className="text-slate-200 sm:col-span-2">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
