import { test, expect } from '@playwright/test';

test.describe('Formulário de Contato (honeypot)', () => {
  test('rejeita envio válido sem consentimento LGPD', async ({ page }) => {
    await page.goto('/contato');
    await page.fill('input[name="name"]', 'Ana Souza');
    await page.fill('input[name="email"]', 'ana@universidade.edu.br');
    await page.fill('input[name="subject"]', 'Dúvida sobre JADC2');
    await page.fill('input[name="message"]', 'Gostaria de saber mais sobre operações multidomínio.');
    // não marca o consentimento
    await page.click('button[type="submit"]');
    await expect(page.getByText('Verifique os campos destacados.')).toBeVisible();
  });

  test('bypass do honeypot é bloqueado (resposta silenciosa)', async ({ page }) => {
    await page.goto('/contato');
    await page.fill('input[name="name"]', 'Bot');
    await page.fill('input[name="email"]', 'bot@spam.com');
    await page.fill('input[name="subject"]', 'spam');
    await page.fill('input[name="message"]', 'comprando seguidores agora mesmo');
    await page.fill('input[name="lgpdConsent"]', 'on');
    // Preenche o campo honeypot oculto (visível ao bot)
    await page.fill('input[aria-hidden="true"]', 'spam-bot-value');

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/contact')),
      page.click('button[type="submit"]'),
    ]);
    expect(response.status()).toBe(200);
  });
});
