import Link from 'next/link';
import { Shield, Map, Crosshair, BookOpen, Radio } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { flashpointsData } from '@/data/threatMap';
import { briefingsData } from '@/data/briefings';
import { GlossaryInspector } from '@/components/ui/GlossaryInspector';

const QUICK_LINKS = [
  { href: '/mapa-tatico', label: 'Mapa Tático', icon: Map, desc: 'Teatros de operações e flashpoints globais.' },
  { href: '/comparador', label: 'Comparador de Armas', icon: Crosshair, desc: 'Compare sistemas de armas lado a lado.' },
  { href: '/simulador-crise', label: 'Simulador de Crise', icon: Radio, desc: 'Wargame de escalada doutrinária.' },
  { href: '/briefings', label: 'Briefings', icon: BookOpen, desc: 'Dossiês analíticos com fontes primárias.' },
];

export default function DashboardPage() {
  const activeThreats = flashpointsData.filter((f) => f.threatLevel !== 'Monitoramento');

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="card-theme relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-military-900/40 to-transparent" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <Badge variant="amber">PAINEL EXECUTIVO</Badge>
          <h1 className="mt-3 font-display text-2xl font-bold text-slate-100 sm:text-3xl">
            Command Center de Inteligência Militar e Geopolítica
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            <GlossaryInspector text="Análise educativa da defesa dos EUA: do sensor ao atirador via arquitetura JADC2, doutrinas GPC/MDO, tríade nuclear e orçamento NDAA. Todo o conteúdo é baseado em fontes primárias de domínio público." />
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/mapa-tatico" className="inline-flex items-center gap-1 rounded bg-military-500 px-4 py-2 text-sm font-semibold text-white hover:bg-military-600">
              <Shield size={16} /> Abrir Mapa Tático
            </Link>
            <Link href="/busca" className="inline-flex items-center gap-1 rounded border border-command-border bg-command-surface px-4 py-2 text-sm font-medium text-slate-200 hover:bg-command-card">
              Busca Global
            </Link>
          </div>
        </div>
      </section>

      {/* Alerta estratégico */}
      <section>
        <h2 className="section-title mb-3">Alerta Estratégico Global</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeThreats.map((f) => (
            <Card key={f.id} className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-slate-100">{f.theaterName}</span>
                <Badge variant={f.threatLevel.includes('DEFCON 3') || f.threatLevel === 'Alerta Crítico' ? 'red' : 'amber'}>
                  {f.threatLevel}
                </Badge>
              </div>
              <p className="text-xs text-slate-400">{f.region}</p>
              <p className="mt-2 text-sm text-slate-300">{f.tacticalSummary}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section>
        <h2 className="section-title mb-3">Módulos de Inteligência</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((q) => {
            const Icon = q.icon;
            return (
              <Link key={q.href} href={q.href} className="card-theme group p-4 transition-colors hover:bg-command-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500">
                <Icon className="text-military-500 group-hover:text-military-400" size={24} aria-hidden="true" />
                <h3 className="mt-2 font-display font-semibold text-slate-100">{q.label}</h3>
                <p className="mt-1 text-xs text-slate-400">{q.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Últimos briefings */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="section-title">Briefings Recentes</h2>
          <Link href="/briefings" className="text-sm text-military-400 hover:underline">Ver todos</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {briefingsData.slice(0, 3).map((b) => (
            <Link key={b.id} href={`/briefings/${b.slug}`} className="card-theme block p-4 transition-colors hover:bg-command-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500">
              <CardHeader title={b.title} subtitle={b.date} />
              <CardBody>{b.summary}</CardBody>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
