import { describe, it, expect } from 'vitest';
import { validateContactForm, isHoneypotFilled } from './validations';

describe('validateContactForm', () => {
  const base = {
    name: 'Ana Souza',
    email: 'ana@universidade.edu.br',
    subject: 'Dúvida sobre doutrina',
    message: 'Gostaria de saber mais sobre JADC2 e MDO.',
    inquiryType: 'Pesquisa Acadêmica' as const,
    lgpdConsent: true,
  };

  it('aceita um formulário válido', () => {
    const r = validateContactForm(base);
    expect(r.ok).toBe(true);
    expect(r.data?.name).toBe('Ana Souza');
  });

  it('rejeita e-mail inválido', () => {
    const r = validateContactForm({ ...base, email: 'nao-e-email' });
    expect(r.ok).toBe(false);
    expect(r.errors?.email).toBeDefined();
  });

  it('exige consentimento LGPD', () => {
    const r = validateContactForm({ ...base, lgpdConsent: false });
    expect(r.ok).toBe(false);
    expect(r.errors?.lgpdConsent).toBeDefined();
  });

  it('rejeita mensagem curta', () => {
    const r = validateContactForm({ ...base, message: 'curto' });
    expect(r.ok).toBe(false);
    expect(r.errors?.message).toBeDefined();
  });

  it('aceita campo institution opcional', () => {
    const r = validateContactForm({ ...base, institution: 'MIT' });
    expect(r.ok).toBe(true);
  });
});

describe('isHoneypotFilled', () => {
  it('detecta honeypot preenchido por bot', () => {
    expect(isHoneypotFilled({ honeypot: 'spam' })).toBe(true);
  });
  it('permite honeypot vazio', () => {
    expect(isHoneypotFilled({ honeypot: '' })).toBe(false);
    expect(isHoneypotFilled({})).toBe(false);
  });
});
