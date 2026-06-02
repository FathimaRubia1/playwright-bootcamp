const { test, expect } = require('@playwright/test');

test.describe('TodoMVC Homework', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const input = page.getByPlaceholder('What needs to be done?');
    for (const todo of ['Buy milk', 'Call mom', 'Finish bootcamp']) {
      await input.fill(todo);
      await input.press('Enter');
    }
  });

  test('should edit a todo item by double-clicking', async ({ page }) => {
    const todoItem = page.locator('.todo-list li').filter({ hasText: 'Call mom' });

    // Double-click to enter edit mode
    await todoItem.dblclick();

    // Clear and type new text
    const editInput = todoItem.getByRole('textbox');
    await editInput.fill('Call dad');
    await editInput.press('Enter');

    // Assert the todo text was updated (re-locate since text changed)
    await expect(page.locator('.todo-list li').nth(1)).toContainText('Call dad');
    // Assert total count is still 3
    await expect(page.locator('.todo-list li')).toHaveCount(3);
  });

  test('should filter active and completed todos', async ({ page }) => {
    // Mark first todo complete
    const items = page.locator('.todo-list li');
    await items.filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').check();

    // Click "Active" filter
    await page.getByRole('link', { name: 'Active' }).click();

    // Only 2 active todos should be visible
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toContainText('Call mom');

    // Click "Completed" filter
    await page.getByRole('link', { name: 'Completed' }).click();

    // Only 1 completed todo visible
    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText('Buy milk');

    // Click "All" to see everything again
    await page.getByRole('link', { name: 'All' }).click();
    await expect(items).toHaveCount(3);
  });
});
