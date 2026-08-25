import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, id, error, hint, className, name, ...props }: InputProps) {
  const inputId = id || name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-200">
          {label}
          {props.required && <span className="ml-0.5 text-tactical-amber">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          'rounded border bg-command-dark px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
          error ? 'border-tactical-red' : 'border-command-border',
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-tactical-red">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, id, error, hint, className, name, ...props }: TextAreaProps) {
  const inputId = id || name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-200">
          {label}
          {props.required && <span className="ml-0.5 text-tactical-amber">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={cn(
          'min-h-[120px] rounded border bg-command-dark px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
          error ? 'border-tactical-red' : 'border-command-border',
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-tactical-red">
          {error}
        </p>
      )}
    </div>
  );
}

// Alias para compatibilidade com páginas que usam `TextArea`.
export const TextArea = Textarea;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, id, error, options, className, name, ...props }: SelectProps) {
  const inputId = id || name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <select
        id={inputId}
        name={name}
        aria-invalid={!!error}
        className={cn(
          'rounded border bg-command-dark px-3 py-2 text-sm text-slate-100',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-military-500',
          error ? 'border-tactical-red' : 'border-command-border',
          className,
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-command-dark">
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-tactical-red">
          {error}
        </p>
      )}
    </div>
  );
}
