import { cn } from '@/lib/cn';

type Variant = 'default' | 'amber' | 'red' | 'green' | 'blue' | 'military' | 'cyan' | 'outline';

const variants: Record<Variant, string> = {
  default: 'bg-command-border text-slate-200 border border-command-border',
  amber: 'bg-tactical-amber/15 text-tactical-amber border border-tactical-amber/40',
  red: 'bg-tactical-red/15 text-tactical-red border border-tactical-red/40',
  green: 'bg-tactical-green/15 text-tactical-green border border-tactical-green/40',
  blue: 'bg-military-500/15 text-military-400 border border-military-500/40',
  cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40',
  military: 'bg-military-500/15 text-military-400 border border-military-500/40',
  outline: 'bg-transparent text-slate-300 border border-command-borderStrong',
};

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-mono uppercase tracking-wide',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
