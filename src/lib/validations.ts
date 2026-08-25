import { z } from 'zod';
import { contactFormSchema, type ContactInput } from './schemas';

export { contactFormSchema };
export type { ContactInput };

export interface ValidationResult {
  ok: boolean;
  data?: ContactInput;
  errors?: Record<string, string>;
}

// Validação do formulário de contato via Zod.
// Também aplica verificação de honeypot (anti-spam) e consentimento LGPD.
export function validateContactForm(input: unknown): ValidationResult {
  const result = contactFormSchema.safeParse(input);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'form';
      errors[key] = issue.message;
    }
    return { ok: false, errors };
  }
  return { ok: true, data: result.data };
}

// Verificação de honeypot (campo oculto que bots costumam preencher).
export function isHoneypotFilled(input: Record<string, unknown>): boolean {
  const v = input['honeypot'];
  return typeof v === 'string' && v.length > 0;
}

// Re-validação explícita de consentimento LGPD.
export const lgpdConsentSchema = z.literal(true, {
  errorMap: () => ({ message: 'Consentimento LGPD obrigatório para envio.' }),
});
