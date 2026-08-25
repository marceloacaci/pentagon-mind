import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Política de Privacidade (LGPD)',
  description: 'Como o PENTAGON-MIND trata dados pessoais conforme a Lei Geral de Proteção de Dados.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <article className="prose-command mx-auto max-w-3xl space-y-4">
      <header>
        <Badge variant="amber">LGPD</Badge>
        <h1 className="section-title mt-2">Política de Privacidade</h1>
      </header>

      <p>
        Esta Política de Privacidade descreve como o portal <strong>PENTAGON-MIND</strong> coleta,
        utiliza e protege os dados pessoais, em conformidade com a Lei nº 13.709/2018 (Lei Geral de
        Proteção de Dados — LGPD).
      </p>

      <h3>1. Dados Coletados</h3>
      <p>
        Coletamos apenas os dados informados voluntariamente no formulário de contato: nome, e-mail,
        instituição (opcional), assunto, mensagem e tipo de solicitação. Nenhum dado é vendido a
        terceiros.
      </p>

      <h3>2. Finalidade</h3>
      <p>
        Os dados são utilizados exclusivamente para responder à solicitação de análise ou dúvida
        enviada pelo usuário.
      </p>

      <h3>3. Base Legal e Consentimento</h3>
      <p>
        O tratamento fundamenta-se no consentimento do titular (art. 7º, I, LGPD), obtido por meio da
        caixa de seleção obrigatória no formulário. Sem o consentimento, não é possível enviar a
        mensagem.
      </p>

      <h3>4. Segurança e Anti-Abuso</h3>
      <p>
        O formulário utiliza campo honeypot e rate limiting para mitigar spam e bots. Em produção, o
        rate limiting é reforçado por serviço externo (Upstash Redis).
      </p>

      <h3>5. Direitos do Titular</h3>
      <p>
        Você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso,
        a correção ou a eliminação de seus dados, bem como a revogação do consentimento, pelos canais
        de contato do portal.
      </p>

      <h3>6. Conteúdo e Fontes</h3>
      <p>
        O conteúdo é educativo e baseado em fontes primárias de domínio público dos EUA (CRS, RAND,
        CSIS, DoD). Imagens de órgãos federais dos EUA são domínio público (17 U.S.C. §105). O portal
        não é afiliado ao Departamento de Defesa dos EUA.
      </p>
    </article>
  );
}
