/**
 * HYBRID TEST PATTERN
 * -------------------
 * Why hybrid tests are faster than UI-only tests:
 * - API calls to seed data take milliseconds; UI flows take seconds.
 * - By creating data via API (fast) and verifying via UI (visual),
 *   we get the speed of API setup with the confidence of UI validation.
 * - In the real framework, cases are created via API in beforeEach,
 *   verified via UI in the test body, and cleaned up via API in afterEach.
 */
const { test, expect } = require('@playwright/test');
const { CreateUserRequestBuilder } = require('../../src/requestBuilders/users/CreateUserRequestBuilder');

test('creates a new user via API and verifies UI is reachable @api @goldenpath', async ({ request, page }) => {
    // Step 1: Seed data via API
    const response = await new CreateUserRequestBuilder(request)
        .withName('Saif')
        .withJob('Workshop Lead')
        .execute();

    expect(response.status()).toBe(201);

    const body = await response.json();
    const { id, name } = body;
    console.log(`[Hybrid] Created user — id: ${id}, name: ${name}`);
    expect.soft(id).toBeTruthy();
    expect.soft(name).toBe('Saif');

    // Step 2: Verify UI is reachable (demonstrates hybrid pattern)
    await page.goto('https://reqres.in/');
    expect.soft(page.url()).toContain('reqres.in');
});
