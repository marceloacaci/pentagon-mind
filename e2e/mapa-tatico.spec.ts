import { test, expect } from '@playwright/test';

// Fluxo 1 (plano): abrir o Mapa Tático e alternar para a visualização em tabela.
test.describe('Mapa Tático → Tabela', () => {
  test('deve alternar entre mapa e tabela acessível', async ({ page }) => {
    await page.goto('/mapa-tatico');
    // Mapa presente
    const svg = page.locator('svg[role="img"][aria-label*="Global Threat Matrix"]');
    await expect(svg).toBeVisible();
    // Botão "Ver como tabela"
    const toggle = page.getByRole('button', { name: /Ver como tabela/i });
    await expect(toggle).toBeVisible();
    await toggle.click();
    // Tabela acessível aparece com caption
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });
});
