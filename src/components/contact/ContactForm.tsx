'use client';

import { useState } from 'react';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { contactFormSchema } from '@/lib/schemas';

type FormState = {
  name: string;
  email: string;
  institution: string;
  subject: string;
  message: string;
  inquiryType: string;
  lgpdConsent: boolean;
  honeypot: string;
};

const INITIAL: FormState = {
  name: '',
  email: '',
  institution: '',
  subject: '',
  message: '',
  inquiryType: 'Pesquisa Acadêmica',
  lgpdConsent: false,
  honeypot: '',
};

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    // Validação client-side (Zod).
    const parsed = contactFormSchema.safeParse({
      ...form,
      institution: form.institution || undefined,
      honeypot: form.honeypot,
    });

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path.join('.') || 'form'] = issue.message;
      }
      setErrors(errs);
      setSubmitting(false);
      toast('Verifique os campos destacados.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Falha no envio');
      }
      toast(data.message || 'Solicitação enviada com sucesso.', 'success');
      setForm(INITIAL);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Erro inesperado.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-theme space-y-4 p-5" noValidate>
      {/* Honeypot: oculto de usuários reais, preenchido por bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-url">Não preencha este campo</label>
        <input
          id="company-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => update('honeypot', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="name"
          label="Nome"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
        />
        <Input
          id="email"
          label="E-mail"
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
        />
      </div>

      <Input
        id="institution"
        label="Instituição (opcional)"
        value={form.institution}
        onChange={(e) => update('institution', e.target.value)}
        error={errors.institution}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="subject"
          label="Assunto"
          required
          value={form.subject}
          onChange={(e) => update('subject', e.target.value)}
          error={errors.subject}
        />
        <Select
          id="inquiryType"
          label="Tipo de solicitação"
          value={form.inquiryType}
          onChange={(e) => update('inquiryType', e.target.value)}
          options={[
            { value: 'Pesquisa Acadêmica', label: 'Pesquisa Acadêmica' },
            { value: 'Análise de Defesa', label: 'Análise de Defesa' },
            { value: 'Sugestão Técnica', label: 'Sugestão Técnica' },
            { value: 'Outro', label: 'Outro' },
          ]}
        />
      </div>

      <TextArea
        id="message"
        label="Mensagem"
        required
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
        error={errors.message}
      />

      <div className="flex items-start gap-2">
        <input
          id="lgpdConsent"
          type="checkbox"
          checked={form.lgpdConsent}
          onChange={(e) => update('lgpdConsent', e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-command-border bg-command-dark accent-military-500"
          aria-describedby={errors.lgpdConsent ? 'lgpd-error' : undefined}
        />
        <label htmlFor="lgpdConsent" className="text-xs leading-relaxed text-slate-300">
          Autorizo o tratamento dos meus dados conforme a Política de Privacidade (LGPD) para
          receber resposta à minha solicitação. <span className="text-tactical-amber">*</span>
        </label>
      </div>
      {errors.lgpdConsent && (
        <p id="lgpd-error" className="text-xs text-tactical-red">{errors.lgpdConsent}</p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Enviando…' : 'Enviar solicitação'}
      </Button>
    </form>
  );
}
