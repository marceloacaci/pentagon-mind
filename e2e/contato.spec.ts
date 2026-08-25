import { test, expect } from '@playwright/test';

// Fluxo 4 (plano): envio do formulário de contato, incluindo bypass do honeypot.
test.describe('Contato (honeypot)', () => {
  test('deve rejeitar envio com honeypot preenchido (silencioso)', async ({ page }) => {
    await page.goto('/contato');
    await page.fill('#name', 'Bot Spammer');
    await page.fill('#email', 'bot@spam.com');
    await page.fill('#subject', 'Teste');
    await page.fill('#message', 'Mensagem de teste automatizado.');
    // Honeypot oculto
    const hp = page.locator('#company-url');
    await hp.evaluate((el) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      setter?.call(el, 'spam');
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.check('#lgpdConsent');
    await page.getByRole('button', { name: /Enviar solicitação/i }).click();
    // O honeypot retorna 200 silencioso; o formulário deve continuar na página.
    await expect(page).toHaveURL(/contato/);
  });

  test('deve validar consentimento LGPD ausente', async ({ page }) => {
    await page.goto('/contato');
    await page.fill('#name', 'Ana');
    await page.fill('#email', 'ana@exemplo.br');
    await page.fill('#subject', 'Dúvida');
    await page.fill('#message', 'Gostaria de mais informações sobre JADC2.');
    await page.getByRole('button', { name: /Enviar solicitação/i }).click();
    // Erro de validação deve aparecer (consentimento obrigatório)
    await expect(page.getByText(/consentimento|LGPD/i)).toBeVisible();
  });
});
