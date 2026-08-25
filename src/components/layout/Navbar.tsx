'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Shield, Menu, X, Eye, Type, Contrast, Sun, Moon, Search } from 'lucide-react';
import { useAccessibility, type FontScale } from '@/components/a11y/AccessibilityProvider';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/', label: 'Painel' },
  { href: '/mapa-tatico', label: 'Mapa Tático' },
  { href: '/doutrina', label: 'Doutrina' },
  { href: '/arsenal-tecnologia', label: 'Arsenal' },
  { href: '/comparador', label: 'Comparador' },
  { href: '/dominios-estrategicos', label: 'Domínios' },
  { href: '/simulador-crise', label: 'Wargame' },
  { href: '/impactos-geopoliticos', label: 'Geopolítica' },
  { href: '/orcamento-defesa', label: 'Orçamento' },
  { href: '/politicas-presidenciais', label: 'Presidentes' },
  { href: '/linha-do-tempo', label: 'Linha do Tempo' },
  { href: '/otan', label: 'OTAN' },
  { href: '/briefings', label: 'Briefings' },
  { href: '/glossario', label: 'Glossário' },
  { href: '/busca', label: 'Busca' },
];

const DEFCON_LABELS: Record<FontScale, string> = {
  normal: 'A',
  large: 'A+',
  xlarge: 'A++',
};

// Indicador de prontidão tática (DEFCON) — valor fixo de demonstração.
function ReadinessIndicator() {
  return (
    <div
      className="flex items-center gap-2 rounded border border-tactical-amber/40 bg-tactical-amber/10 px-3 py-1.5"
      aria-label="Nível de prontidão estratégica: DEFCON 3 — Alerta Elevado"
      title="Prontidão Estratégica: DEFCON 3 (Alerta Elevado)"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-treat-pulse rounded-full bg-tactical-amber" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-tactical-amber" />
      </span>
      <span className="font-display text-xs font-semibold tracking-wider text-tactical-amberGlow">
        DEFCON 3
      </span>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { fontScale, setFontScale, highContrast, toggleHighContrast, theme, toggleTheme } = useAccessibility();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-command-border bg-command-dark/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500">
          <Shield className="text-military-500" size={22} aria-hidden="true" />
          <span className="font-display text-base font-bold tracking-wide text-slate-100">
            PENTAGON<span className="text-military-500">-MIND</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-widest text-slate-500 sm:inline">
            Command Center
          </span>
        </Link>

        <form onSubmit={onSearchSubmit} role="search" className="hidden items-center md:flex" aria-label="Busca global">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar…"
              aria-label="Termo de busca global"
              className="w-36 rounded border border-command-border bg-command-bg py-1.5 pl-7 pr-2 text-xs text-slate-200 placeholder:text-slate-500 focus:w-48 focus:border-military-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
            />
          </div>
        </form>

        <nav aria-label="Navegação principal" className="hidden flex-wrap items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
                pathname === l.href ? 'bg-military-900 text-military-50' : 'text-slate-300 hover:bg-command-surface',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ReadinessIndicator />

          {/* Seletor de acessibilidade: tamanho de fonte A/A+/A++ */}
          <div
            className="hidden items-center gap-1 rounded border border-command-border bg-command-bg px-1.5 py-1 sm:flex"
            role="group"
            aria-label="Tamanho da fonte"
          >
            {(['normal', 'large', 'xlarge'] as FontScale[]).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={fontScale === s}
                onClick={() => setFontScale(s)}
                className={cn(
                  'rounded px-2 py-0.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
                  fontScale === s ? 'bg-military-500 text-white' : 'text-slate-300 hover:bg-command-surface',
                )}
              >
                <Type size={12} className="mr-1 inline" aria-hidden="true" />
                {DEFCON_LABELS[s]}
              </button>
            ))}
          </div>

          {/* Alto contraste */}
          <button
            type="button"
            aria-pressed={highContrast}
            onClick={toggleHighContrast}
            title="Alternar alto contraste"
            className={cn(
              'flex items-center gap-1 rounded border border-command-border bg-command-bg px-2 py-1.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
              highContrast ? 'bg-military-500 text-white' : 'text-slate-300 hover:bg-command-surface',
            )}
          >
            <Contrast size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Contraste</span>
          </button>

          {/* Tema claro/escuro */}
          <button
            type="button"
            aria-pressed={theme === 'light'}
            onClick={toggleTheme}
            title={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
            className={cn(
              'flex items-center gap-1 rounded border border-command-border bg-command-bg px-2 py-1.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
              theme === 'light' ? 'bg-military-500 text-white' : 'text-slate-300 hover:bg-command-surface',
            )}
          >
            {theme === 'light' ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}
            <span className="hidden sm:inline">{theme === 'light' ? 'Escuro' : 'Claro'}</span>
          </button>

          <Link
            href="/contato"
            className="hidden items-center gap-1 rounded bg-military-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-military-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500 sm:flex"
          >
            <Eye size={14} aria-hidden="true" />
            Contato
          </Link>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded border border-command-border p-2 text-slate-200 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <nav aria-label="Navegação móvel" className="border-t border-command-border bg-command-dark px-4 py-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
                    pathname === l.href ? 'bg-military-900 text-military-50' : 'text-slate-300 hover:bg-command-surface',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contato"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded bg-military-500 px-3 py-2 text-center text-sm font-semibold text-white"
          >
            Contato
          </Link>
        </nav>
      )}
    </header>
  );
}
