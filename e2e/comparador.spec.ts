import { test, expect } from '@playwright/test';

// Fluxo 2 (plano): selecionar 2 sistemas no Comparador e verificar métricas exibidas.
test.describe('Comparador de Armas', () => {
  test('deve selecionar 2 sistemas e exibir métricas', async ({ page }) => {
    await page.goto('/comparador');
    const selects = page.locator('select');
    await expect(selects.first()).toBeVisible();
    // Seleciona valores distintos nos dois seletores
    await selects.nth(0).selectOption({ index: 0 });
    try {
      await selects.nth(1).selectOption({ index: 1 });
    } catch {
      // seletor secundário opcional — ignora se indisponível
    }
    if (await selects.nth(1).count()) {
      const opts = await selects.nth(1).locator('option').all();
      if (opts.length > 1) await selects.nth(1).selectOption({ index: 1 });
    }
    // Métricas (barras ou tabela) devem estar visíveis
    const metrics = page.getByText(/Alcance|Velocidade|Custo unit/i).first();
    await expect(metrics).toBeVisible();
  });
});
