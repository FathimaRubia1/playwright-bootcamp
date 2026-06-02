const { test, expect } = require('../src/fixtures/auth.fixtures');

test.describe('Inventory', () => {
  test('displays 6 inventory items', async ({ loggedInPage }) => {
    const items = loggedInPage.locator('.inventory_item');
    await expect.soft(items).toHaveCount(6);
  });
});
