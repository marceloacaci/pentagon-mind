import { cn } from '@/lib/cn';

export function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'card-theme rounded-lg border border-command-border bg-command-card p-4 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('font-display text-lg text-slate-100', className)}>{children}</h3>;
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-2 text-sm text-slate-300', className)}>{children}</div>;
}

export function CardHeader({
  title,
  subtitle,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-2', className)}>
      <h3 className="font-display text-lg font-semibold text-slate-100">{title}</h3>
      {subtitle && <p className="font-mono text-xs uppercase tracking-wide text-tactical-amber">{subtitle}</p>}
    </div>
  );
}
