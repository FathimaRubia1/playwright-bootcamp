// @ts-check
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

// support environment overrides for CI/local via .env
const BASE_URL_LOCAL = process.env.BASE_URL_LOCAL || 'https://www.saucedemo.com';
const BASE_URL_STAGING = process.env.BASE_URL_STAGING || 'https://demo.playwright.dev/todomvc';

/**
 * Playwright test configuration (CommonJS)
 * Defines two projects: local-chrome and staging-chrome
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* Shared settings for all projects */
  use: {
    headless: true,
    //trace: 'retain-on-failure', //If we want for only failed tests
    //trace: 'off',  //If we do not want traces at all
    trace: 'on',  //If we want for all tests, not just failures
    screenshot: 'on',
  },

  projects: [
    {
      name: 'local-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL_LOCAL,
      },
    },
    {
      name: 'staging-chrome',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL_STAGING,
      },
    },
  ],
});

