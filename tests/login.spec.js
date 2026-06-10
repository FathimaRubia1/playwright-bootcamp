const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../src/pages/login.page');
const { buildUser } = require('../src/utilities/test-data-builder');

test.describe('Login', () => {
  let loginPage;
  let standardUser;

  test.beforeAll(() => {
    standardUser = buildUser('standardUser');
    console.log(`Generated displayName: ${standardUser.displayName}`);
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.only('successful login navigates to inventory', async ({ page }) => {
    await loginPage.login(standardUser.username, standardUser.password);   
    await expect(page).toHaveURL(/.*\/inventory\.html/);
  });

  test('locked out user sees error message', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const error = await loginPage.getErrorMessage();
    expect.soft(error).toContain('Sorry, this user has been locked out.');
  });

  test('invalid password shows mismatch error', async () => {
    await loginPage.login(standardUser.username, 'wrong_password');
    const error = await loginPage.getErrorMessage();
    expect.soft(error).toContain('Username and password do not match');
  });
});
