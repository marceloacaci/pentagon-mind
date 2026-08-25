'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

// Modal acessível: trap de foco simples, fecha com Esc e clique fora,
// foco retornado ao elemento que abriu.
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    // foca o primeiro elemento focável
    const node = ref.current;
    const focusable = node?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        className={cn(
          'card-theme relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-command-border bg-command-card p-5',
          className,
        )}
      >
        <div className="mb-3 flex items-center justify-between border-b border-command-border pb-2">
          <h2 className="font-display text-lg font-semibold text-slate-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded p-1 text-slate-400 hover:bg-command-surface hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
