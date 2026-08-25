import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-military-500 text-white hover:bg-military-600 border border-military-600',
  secondary: 'bg-command-card text-slate-200 hover:bg-command-surface border border-command-borderStrong',
  ghost: 'bg-transparent text-slate-300 hover:bg-command-surface border border-transparent',
  danger: 'bg-tactical-red text-white hover:bg-red-600 border border-tactical-red',
  outline: 'bg-transparent text-military-400 hover:bg-military-900 border border-military-500',
};

const sizes: Record<Size, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-military-400 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
