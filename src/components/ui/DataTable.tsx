import { cn } from '@/lib/cn';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

// Alias para compatibilidade.
export type Column<T> = DataTableColumn<T>;

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  caption?: string;
  className?: string;
}

// Tabela de dados acessível (fallback textual para módulos visuais).
// caption + thead conspícuo atendem WCAG 1.1.1/1.4.1 e permitem verificação de fonte.
export function DataTable<T>({ columns, rows, caption, className }: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-sm">
        {caption && (
          <caption className="mb-2 text-left text-xs text-slate-500">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-command-borderStrong text-left text-xs uppercase tracking-wide text-slate-400">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn('px-3 py-2 font-semibold', c.className)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-command-border odd:bg-command-bg even:bg-command-surface/40"
            >
              {columns.map((c) => (
                <td key={c.key} className={cn('px-3 py-2 text-slate-200', c.className)}>
                  {c.render ? c.render(row) : (row as Record<string, React.ReactNode>)[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
