import { test, expect } from '@playwright/test';

// Fluxo 3 (plano): navegação por teclado completa no Simulador de Wargame (sem mouse).
test.describe('Simulador de Crise (teclado)', () => {
  test('deve navegar pelas opções do cenário apenas com teclado', async ({ page }) => {
    await page.goto('/simulador-crise');
    // Foca o primeiro botão de opção e usa Enter/Tab
    const options = page.getByRole('button', { name: /Opção|Opção A|Opção B|Opção C/i });
    await expect(options.first()).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    // Resumo linear presente (alternativa textual)
    const summary = page.getByText(/Resumo linear do cenário/i);
    await expect(summary).toBeVisible();
  });
});
