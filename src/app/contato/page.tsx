import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Contato & Solicitação de Análise',
  description: 'Solicite análise ou entre em contato. Formulário com validação, honeypot anti-spam e consentimento LGPD.',
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <Badge variant="military">CONTATO</Badge>
        <h1 className="section-title mt-2">Solicitação de Análise / Contato</h1>
        <p className="muted mt-1">
          Preencha o formulário. Os dados são tratados conforme a Política de Privacidade (LGPD).
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
