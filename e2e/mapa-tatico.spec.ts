import { test, expect } from '@playwright/test';

test.describe('Mapa Tático', () => {
  test('abre marcador e alterna para tabela', async ({ page }) => {
    await page.goto('/mapa-tatico');
    // O mapa SVG deve renderizar marcadores
    const markers = page.locator('svg circle.animate-threat-pulse');
    await expect(markers.first()).toBeVisible();

    // Clicar em um marcador revela detalhes
    await markers.first().click();
    await expect(page.getByText('Teatros de Operações — Tabela')).toBeVisible();

    // A tabela acessível deve estar presente
    const table = page.locator('table');
    await expect(table.first()).toBeVisible();
  });
});
