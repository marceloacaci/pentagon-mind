'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { flashpointsData } from '@/data/threatMap';
import type { FlashpointThreat } from '@/types';
import { cn } from '@/lib/cn';

// Projeção equiretangular simples (world-110m). Coordenadas em porcentagem
// (0-1000 x, 0-500 y) mapeadas para o viewBox 1000x500 do mapa base.
const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const THREAT_COLOR: Record<FlashpointThreat['threatLevel'], string> = {
  'DEFCON 1': '#d9534f',
  'DEFCON 2': '#ff6b6b',
  'DEFCON 3': '#c9a227',
  'DEFCON 4': '#2f7fb5',
  'DEFCON 5': '#28a745',
  'Alerta Crítico': '#d9534f',
  Monitoramento: '#20c997',
};

export function ThreatMapViewer({
  onSelect,
}: {
  onSelect?: (fp: FlashpointThreat) => void;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="card-theme p-3">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165 }}
        width={1000}
        height={500}
        style={{ width: '100%', height: 'auto' }}
        aria-label="Mapa mundial de teatros de operações e níveis de ameaça"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: '#14161a', stroke: '#2a2f37', strokeWidth: 0.5, outline: 'none' },
                  hover: { fill: '#1d222a', outline: 'none' },
                  pressed: { fill: '#181c22', outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {flashpointsData.map((fp) => (
          <Marker
            key={fp.id}
            coordinates={[(fp.coordinates.x / 1000) * 360 - 180, 90 - (fp.coordinates.y / 500) * 180] as [number, number]}
          >
            <circle
              r={active === fp.id ? 9 : 6}
              fill={THREAT_COLOR[fp.threatLevel]}
              stroke="#0e1116"
              strokeWidth={1.5}
              className="animate-threat-pulse cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`${fp.theaterName} — ${fp.threatLevel}`}
              onClick={() => {
                setActive(fp.id);
                onSelect?.(fp);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActive(fp.id);
                  onSelect?.(fp);
                }
              }}
            />
          </Marker>
        ))}
      </ComposableMap>
      <p className="mt-2 text-xs text-slate-500">
        Marcos pulsantes indicam flashpoints. Selecione um marco para ver o resumo tático.
      </p>
    </div>
  );
}

// Alternativa acessível em tabela (correção WCAG do plano v3).
export function ThreatMapTable() {
  return (
    <div className="card-theme overflow-x-auto p-3">
      <table className="w-full border-collapse text-sm">
        <caption className="mb-2 text-left text-xs text-slate-500">
          Teatros de operações e nível de ameaça (alternativa textual ao mapa)
        </caption>
        <thead>
          <tr className="border-b border-command-borderStrong text-left text-xs uppercase tracking-wide text-slate-400">
            <th scope="col" className="px-3 py-2">Teatro</th>
            <th scope="col" className="px-3 py-2">Região</th>
            <th scope="col" className="px-3 py-2">Nível</th>
            <th scope="col" className="px-3 py-2">Adversário</th>
            <th scope="col" className="px-3 py-2">Forças dos EUA</th>
          </tr>
        </thead>
        <tbody>
          {flashpointsData.map((fp) => (
            <tr key={fp.id} className="border-b border-command-border odd:bg-command-bg even:bg-command-surface/40">
              <th scope="row" className="px-3 py-2 text-left font-medium text-slate-100">{fp.theaterName}</th>
              <td className="px-3 py-2 text-slate-200">{fp.region}</td>
              <td className="px-3 py-2">
                <span
                  className="font-semibold"
                  style={{ color: THREAT_COLOR[fp.threatLevel] }}
                >
                  {fp.threatLevel}
                </span>
              </td>
              <td className="px-3 py-2 text-slate-300">{fp.primaryAdversary}</td>
              <td className="px-3 py-2 text-slate-300">{fp.usForcesDeployed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ThreatMapLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs text-slate-300">
      {Object.entries(THREAT_COLOR).map(([lvl, color]) => (
        <span key={lvl} className="inline-flex items-center gap-1.5">
          <span className={cn('h-3 w-3 rounded-full')} style={{ backgroundColor: color }} aria-hidden="true" />
          {lvl}
        </span>
      ))}
    </div>
  );
}
