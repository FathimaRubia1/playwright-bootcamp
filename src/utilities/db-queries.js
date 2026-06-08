const { faker } = require('@faker-js/faker');

/**
 * Lightweight in-memory repository used for demos and tests.
 */
class DBQueries {
  constructor() {
    // Private-ish in-memory state seeded with a few users
    this._users = [
      { id: 1, username: 'standard_user', role: 'customer' },
      { id: 2, username: 'locked_out_user', role: 'customer' },
      { id: 3, username: 'problem_user', role: 'customer' },
    ];
    this._cases = [];
  }

  /**
   * Look up a user by username.
   * @param {string} username
   * @returns {Promise<{id:number,username:string,role:string} | null>}
   */
  async getUserByUsername(username) {
    const u = this._users.find((x) => x.username === username);
    if (!u) return null;
    return { id: u.id, username: u.username, role: u.role };
  }

  /**
   * Return a fake company configuration object.
   * @param {string|number} companyId
   * @returns {Promise<{companyId: (string|number), featureFlags: object, region: string}>}
   */
  async getCompanyConfiguration(companyId) {
    return {
      companyId,
      featureFlags: { aiEnabled: true, betaTesting: false },
      region: 'us-east-1',
    };
  }

  /**
   * Insert an auto-created case into the in-memory store.
   * @param {{caseTitle:string,description?:string,priority?:string}} caseData
   * @returns {Promise<{insertedId:number}>}
   */
  async insertAutoCase(caseData) {
    const insertedId = faker.number.int(999999);
    const record = Object.assign({ id: insertedId }, caseData);
    this._cases.push(record);
    return { insertedId };
  }

  /**
   * Delete all cases whose `caseTitle` starts with the provided prefix.
   * @param {string} prefix
   * @returns {Promise<number>} number of records deleted
   */
  async deleteAutoCasesByPrefix(prefix) {
    const before = this._cases.length;
    this._cases = this._cases.filter((c) => !String(c.caseTitle).startsWith(prefix));
    const after = this._cases.length;
    return before - after;
  }
}

module.exports = { DBQueries };
