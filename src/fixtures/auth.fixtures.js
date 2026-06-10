const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

// Extend Playwright's base test to add a `loggedInPage` fixture.
// We accept `request` in the fixture signature so tests that destructure
// `{ loggedInPage, request }` receive both built-in and custom fixtures.
const test = base.extend({
  loggedInPage: async ({ page, request }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    // Provide the raw `page` object as `loggedInPage` so Page Objects can use it.
    await use(page);
  },
});

module.exports = { test, expect };
