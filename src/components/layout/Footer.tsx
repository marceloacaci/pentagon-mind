import Link from 'next/link';
import { Shield, Lock, FileText } from 'lucide-react';

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-12 border-t border-command-border bg-command-dark">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="text-military-500" size={18} aria-hidden="true" />
              <span className="font-display font-bold tracking-wide text-slate-100">PENTAGON-MIND</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Portal analítico de inteligência militar e geopolítica dos EUA. Conteúdo educativo e de
              domínio público, baseado em fontes primárias (CRS, RAND, CSIS, DoD).
            </p>
          </div>

          <nav aria-label="Mapa do site">
            <h3 className="mb-2 font-display text-sm font-semibold text-slate-200">Navegação</h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li><Link href="/mapa-tatico" className="hover:text-military-400">Mapa Tático</Link></li>
              <li><Link href="/comparador" className="hover:text-military-400">Comparador de Armas</Link></li>
              <li><Link href="/simulador-crise" className="hover:text-military-400">Simulador de Crise</Link></li>
              <li><Link href="/briefings" className="hover:text-military-400">Briefings</Link></li>
              <li><Link href="/glossario" className="hover:text-military-400">Glossário</Link></li>
            </ul>
          </nav>

          <nav aria-label="Institucional">
            <h3 className="mb-2 font-display text-sm font-semibold text-slate-200">Institucional</h3>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>
                <Link href="/politica-de-privacidade" className="inline-flex items-center gap-1 hover:text-military-400">
                  <FileText size={12} aria-hidden="true" /> Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-military-400">Contato</Link>
              </li>
              <li>
                <Link href="/busca" className="hover:text-military-400">Busca Global</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-2 font-display text-sm font-semibold text-slate-200">Fontes</h3>
            <p className="flex items-start gap-1 text-xs leading-relaxed text-slate-400">
              <Lock size={12} className="mt-0.5 shrink-0 text-tactical-green" aria-hidden="true" />
              Dados de órgãos federais dos EUA são domínio público (17 U.S.C. §105). Imagens em
              DVIDS/domínio público. Verifique em <code className="text-slate-300">/SOURCES.md</code>.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-command-border pt-4 text-center text-xs text-slate-500">
          <p>
            © {year} PENTAGON-MIND — Análise independente para fins educativos. Não afiliado ao
            Departamento de Defesa dos EUA.
          </p>
        </div>
      </div>
    </footer>
  );
}
