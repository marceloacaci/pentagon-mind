import { test, expect } from '@playwright/test';

test.describe('Comparador de Armamentos', () => {
  test('seleciona dois sistemas e exibe métricas', async ({ page }) => {
    await page.goto('/comparador');
    const selects = page.locator('select');
    await expect(selects.nth(0)).toBeVisible();

    // Selecionar sistemas distintos
    await selects.nth(0).selectOption({ index: 0 });
    await selects.nth(1).selectOption({ index: 1 });

    // A matriz e a tabela de métricas devem aparecer
    await expect(page.getByText('Matriz Comparativa')).toBeVisible();
    await expect(page.getByText('Tabela de Métricas')).toBeVisible();
  });
});
