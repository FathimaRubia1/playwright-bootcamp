const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await use(page);
  },
});

module.exports = { test, expect };
