// Rate limiting para a rota /api/contact.
//
// CORREÇÃO DO PLANO (§3): memória local NÃO é compartilhada entre instâncias
// serverless da Vercel e não protegeria o endpoint de fato. Em produção usamos
// Upstash Redis + @upstash/ratelimit (compatível com edge/serverless).
//
// COMPORTAMENTO:
//  - Se UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN existirem no ambiente,
//    usa o cliente @upstash/ratelimit inicializado LAZILY (só no primeiro uso).
//  - CASO CONTRÁRIO, cai num STUB em memória documentado. Este stub é APENAS
//    para dev/build local e NÃO oferece proteção real em produção distribuída.
//    Não quebra o build nem o runtime — apenas registra um aviso.
//
// Para ativar a proteção real: `npm i @upstash/ratelimit @upstash/redis` e defina
// as variáveis de ambiente no painel da Vercel.

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // epoch ms
  limit: number;
  usingRedis: boolean;
}

const WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 5; // por janela

// Stub em memória (apenas dev/local). Documentado; não seguro em produção serverless.
interface MemBucket {
  count: number;
  reset: number;
}
const memStore = new Map<string, MemBucket>();

// Lazy holder para o ratelimiter do Upstash (inicializado sob demanda).
let ratelimitInstance: { limit: (key: string) => Promise<{ success: boolean; remaining: number; reset: number; limit: number }> } | null = null;
let ratelimitInitAttempted = false;

async function getRatelimiter() {
  if (ratelimitInitAttempted) return ratelimitInstance;
  ratelimitInitAttempted = true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({ url, token });
    ratelimitInstance = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_MS / 1000} s`),
      prefix: 'pm_contact_rl',
      analytics: false,
    });
  } catch (err) {
    console.warn('[rateLimit] Falha ao inicializar Upstash, usando stub em memória:', (err as Error).message);
    ratelimitInstance = null;
  }
  return ratelimitInstance;
}

export async function rateLimit(key: string): Promise<RateLimitResult> {
  const rl = await getRatelimiter();
  if (rl) {
    try {
      const res = await rl.limit(key);
      return {
        success: res.success,
        remaining: res.remaining,
        reset: res.reset,
        limit: res.limit,
        usingRedis: true,
      };
    } catch (err) {
      // Em caso de falha de rede com o Redis, falha aberta (permite) mas avisa.
      console.warn('[rateLimit] Upstash falhou, liberando requisição:', (err as Error).message);
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[rateLimit] AVISO: usando stub em memória em PRODUÇÃO. Defina UPSTASH_REDIS_REST_URL/TOKEN para proteção real.',
    );
  }

  // Stub em memória.
  const now = Date.now();
  const bucket = memStore.get(key);
  if (!bucket || bucket.reset < now) {
    memStore.set(key, { count: 1, reset: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1, reset: now + WINDOW_MS, limit: MAX_REQUESTS, usingRedis: false };
  }
  bucket.count += 1;
  return {
    success: bucket.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - bucket.count),
    reset: bucket.reset,
    limit: MAX_REQUESTS,
    usingRedis: false,
  };
}
