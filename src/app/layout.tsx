import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';

const SITE_URL = 'https://pentagon-mind.example';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PENTAGON-MIND — Command Center de Inteligência Militar e Geopolítica',
    template: '%s · PENTAGON-MIND',
  },
  description:
    'Portal analítico de defesa dos EUA: mapa tático global, doutrinas, arsenal, comparador de armas, simulador de crise (wargame), JADC2, orçamento de defesa (NDAA) e briefings. Conteúdo educativo baseado em fontes primárias (CRS, RAND, CSIS, DoD).',
  keywords: [
    'defesa dos EUA',
    'geopolítica',
    'Pentágono',
    'JADC2',
    'DOU',
    'NDAA',
    'wargame',
    'A2/AD',
    'tríade nuclear',
    'análise militar',
  ],
  authors: [{ name: 'PENTAGON-MIND' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'PENTAGON-MIND',
    title: 'PENTAGON-MIND — Command Center de Inteligência Militar e Geopolítica',
    description:
      'Análise de defesa dos EUA: mapa tático, doutrinas, arsenal, comparador de armas, simulador de crise e orçamento NDAA. Conteúdo educativo baseado em fontes primárias.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PENTAGON-MIND — Command Center de Inteligência Militar',
    description:
      'Portal analítico de defesa dos EUA: mapa tático, arsenal, comparador, wargame e orçamento NDAA.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-command-dark font-sans text-slate-200 antialiased">
        <a href="#conteudo" className="skip-link rounded bg-military-500 px-3 py-2 text-sm font-semibold text-white">
          Pular para o conteúdo
        </a>
        <Providers>
          {/* Topbar tática */}
          <div className="border-b border-tactical-amber/20 bg-command-darkest py-1 text-center text-[11px] uppercase tracking-[0.2em] text-tactical-amber/80">
            ⚠ Análise educativa · Domínio público · Fonte primária verificada
          </div>
          <Navbar />
          <main id="conteudo" className="mx-auto max-w-7xl px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
