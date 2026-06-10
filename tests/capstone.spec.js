const { test, expect } = require('../src/fixtures/auth.fixtures');
const { InventoryPage } = require('../src/pages/inventory.page');
const { CartPage } = require('../src/pages/cart.page');
const { CreateUserRequestBuilder } = require('../src/requestBuilders/users/CreateUserRequestBuilder');
const { DBQueries } = require('../src/utilities/db-queries');
const { buildUser, buildCase } = require('../src/utilities/test-data-builder');

test('capstone: full stack — login, cart, API, cleanup @e2e @goldenpath', async ({ loggedInPage, request }) => {
  const user = buildUser('standardUser');
  console.log(`Capstone user: ${user.displayName}`);

  await test.step('UI: add item to cart', async () => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.goto();
    await inventory.addItemToCart('Sauce Labs Backpack');
    const count = await inventory.getCartItemCount();
    expect.soft(count).toBe(1);
    await inventory.clickCart();
  });

  await test.step('UI: verify cart contains item', async () => {
    const cart = new CartPage(loggedInPage);
    const names = await cart.getItemNames();
    expect.soft(names.includes('Sauce Labs Backpack')).toBeTruthy();
  });

  await test.step('API: create tracking record', async () => {
    const builder = new CreateUserRequestBuilder(request)
      .withName(user.displayName)
      .withJob('Workshop Capstone');
    const resp = await builder.execute();
    expect.soft(resp.status()).toBe(201);
  });

  await test.step('Repository: insert and cleanup auto case', async () => {
    const db = new DBQueries();
    await db.insertAutoCase(buildCase());
    const deleted = await db.deleteAutoCasesByPrefix('Auto-ERCase');
    expect.soft(deleted).toBeGreaterThanOrEqual(1);
  });
});
