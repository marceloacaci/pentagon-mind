'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type FontScale = 'normal' | 'large' | 'xlarge';

interface AccessibilityState {
  fontScale: FontScale;
  highContrast: boolean;
  setFontScale: (s: FontScale) => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityState | null>(null);

const FONT_CLASS: Record<FontScale, string> = {
  normal: 'font-normal-view',
  large: 'font-large-view',
  xlarge: 'font-xlarge-view',
};

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScaleState] = useState<FontScale>('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const storedFont = (localStorage.getItem('pm-font-scale') as FontScale) || 'normal';
    const storedHc = localStorage.getItem('pm-high-contrast') === '1';
    setFontScaleState(storedFont);
    setHighContrast(storedHc);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-normal-view', 'font-large-view', 'font-xlarge-view');
    root.classList.add(FONT_CLASS[fontScale]);
    localStorage.setItem('pm-font-scale', fontScale);
  }, [fontScale]);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('pm-high-contrast', highContrast ? '1' : '0');
  }, [highContrast]);

  const setFontScale = (s: FontScale) => setFontScaleState(s);
  const toggleHighContrast = () => setHighContrast((v) => !v);

  return (
    <AccessibilityContext.Provider value={{ fontScale, highContrast, setFontScale, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityState {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider');
  return ctx;
}
