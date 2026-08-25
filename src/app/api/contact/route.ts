import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas';
import { rateLimit } from '@/lib/rateLimit';

// Rota de contato: validação Zod + honeypot + rate limiting externo (Upstash,
// com stub em memória para dev/build local). Retorna JSON.
export async function POST(request: Request) {
  // Rate limit por IP (ou cabeçalho de encaminhamento em serverless).
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous';
  const rl = await rateLimit(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em alguns instantes.', retryAfter: Math.ceil((rl.reset - Date.now()) / 1000) },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 });
  }

  // Honeypot (campo oculto) — preenchido por bots.
  const hp = (body as Record<string, unknown>)?.honeypot;
  if (typeof hp === 'string' && hp.length > 0) {
    // Resposta neutra para não revelar o bloqueio ao bot.
    return NextResponse.json({ message: 'Recebido.' }, { status: 200 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Consentimento LGPD obrigatório (z.literal(true) já garantiu).
  // Em produção: persistir em CRM/banco e disparar notificação.
  // Aqui registramos apenas (demo educativa).
  console.info('[api/contact] nova solicitação de', parsed.data.email, '-', parsed.data.inquiryType);

  return NextResponse.json(
    { message: 'Solicitação recebida. Nossa equipe responderá conforme a Política de Privacidade.', ok: true },
    { status: 200 },
  );
}
