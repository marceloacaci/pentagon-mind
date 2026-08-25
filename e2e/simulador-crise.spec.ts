import { test, expect } from '@playwright/test';

test.describe('Simulador de Wargame (teclado)', () => {
  test('navegação completa por teclado sem mouse', async ({ page }) => {
    await page.goto('/simulador-crise');
    const listbox = page.getByRole('listbox', { name: 'Opções de comando' });
    await expect(listbox).toBeVisible();

    // Foca a lista e navega com setas + Enter
    await listbox.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // O resumo da opção escolhida deve aparecer
    await expect(page.getByText('Risco:').first()).toBeVisible();
  });
});
