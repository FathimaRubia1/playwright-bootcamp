const { test, expect } = require('@playwright/test');

test.describe('Todo App', () => {
  test('should add todos and mark one complete', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    const input = page.getByPlaceholder('What needs to be done?');
    const todos = ['Buy milk', 'Call mom', 'Finish bootcamp'];

    for (const todo of todos) {
      await input.fill(todo);
      await input.press('Enter');
    }

    // Assert: 3 todos exist
    const items = page.locator('.todo-list li');
    await expect(items).toHaveCount(3);

    // Assert: visible text of second todo
    await expect(items.nth(1)).toContainText('Call mom');

    // Mark first todo complete
    await items.filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').check();

    // Assert: first todo is marked completed
    const firstItem = items.filter({ hasText: 'Buy milk' });
    await expect(firstItem).toHaveClass(/completed/);
  });
});