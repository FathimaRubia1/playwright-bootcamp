const users = require('../../test-data/users.json');
const { faker } = require('@faker-js/faker');

/**
 * Build a user object from a template in test-data/users.json
 * @param {string} templateName
 * @param {object} overrides
 * @returns {object}
 */
function buildUser(templateName, overrides = {}) {
  const template = users[templateName];
  if (!template) throw new Error(`Unknown user template: ${templateName}`);
  const generated = Object.assign({}, template, {
    displayName: `Auto-User-${faker.number.int(99999)}`,
    email: faker.internet.email()
  });
  return Object.assign({}, generated, overrides);
}

/**
 * Build a case object with randomized fields
 * @param {object} overrides
 * @returns {object}
 */
function buildCase(overrides = {}) {
  const base = {
    caseTitle: `Auto-ERCase-${faker.number.int(99999)}`,
    description: faker.lorem.sentence(),
    priority: faker.helpers.arrayElement(['Low', 'Medium', 'High'])
  };
  return Object.assign({}, base, overrides);
}

module.exports = { buildUser, buildCase };
