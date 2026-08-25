'use client';

import type { ReactNode } from 'react';
import { AccessibilityProvider } from '@/components/a11y/AccessibilityProvider';
import { ToastProvider } from '@/components/ui/Toast';

// Wrapper de providers client-side (Context API precisa de client component).
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AccessibilityProvider>
      <ToastProvider>{children}</ToastProvider>
    </AccessibilityProvider>
  );
}
