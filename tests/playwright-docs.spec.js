const { test, expect } = require('@playwright/test');

test('Playwright docs navigation', async ({ page }) => {
  await page.goto('https://playwright.dev');

  await expect(page).toHaveTitle(/Playwright/);

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveURL(/.*\/docs\/intro/);
});
