import { defineConfig, devices } from '@playwright/test';

// Configuração do Playwright para os testes E2E dos módulos interativos.
// NOTA: a execução dos navegadores pode não ser possível no ambiente de CI
// sem `npx playwright install`. Os specs abaixo documentam os 4 fluxos do
// plano de implementação e devem rodar com `npm run test:e2e` após a instalação.
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
