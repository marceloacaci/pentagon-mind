// Declaração de módulo mínima para react-simple-maps (sem tipos oficiais).
// Tipagem pragmática suficiente para o uso no ThreatMapViewer.
declare module 'react-simple-maps' {
  import type { ComponentType, ReactNode, SVGProps } from 'react';

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string | ((...args: unknown[]) => unknown);
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    children?: ReactNode;
  }
  export const ComposableMap: ComponentType<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object | unknown[];
    children: (data: { geographies: GeoProps[] }) => ReactNode;
    parseGeographies?: (features: unknown[]) => unknown[];
  }
  export const Geographies: ComponentType<GeographiesProps>;

  export interface GeoProps {
    rsmKey: string;
    geography?: unknown;
    [key: string]: unknown;
  }

  export interface GeographyProps {
    geography: GeoProps;
    style?: {
      default?: Record<string, unknown>;
      hover?: Record<string, unknown>;
      pressed?: Record<string, unknown>;
    };
    [key: string]: unknown;
  }
  export const Geography: ComponentType<GeographyProps>;

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    [key: string]: unknown;
  }
  export const Marker: ComponentType<MarkerProps>;

  export const ZoomableGroup: ComponentType<Record<string, unknown>>;
  export const Line: ComponentType<Record<string, unknown>>;
  export const Annotation: ComponentType<Record<string, unknown>>;
}
