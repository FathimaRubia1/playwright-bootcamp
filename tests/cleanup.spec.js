const { test, expect } = require('@playwright/test');
const { DBQueries } = require('../src/utilities/db-queries');
const { buildCase } = require('../src/utilities/test-data-builder');

test.describe('Cleanup', () => {
  test('@cleanup removes auto-created cases', async () => {
    const db = new DBQueries();

    // insert 5 auto cases
    for (let i = 0; i < 5; i++) {
      // buildCase generates titles like Auto-ERCase-<n>
      await db.insertAutoCase(buildCase());
    }

    // delete by prefix and assert count
    const deleted = await db.deleteAutoCasesByPrefix('Auto-ERCase');
    expect.soft(deleted).toBe(5);
  });
});
