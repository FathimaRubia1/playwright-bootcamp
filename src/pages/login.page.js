exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;

        // SECTION::: Element Locators
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorBanner = page.locator('[data-test="error"]');
    }

    // SECTION::: Page Actions

    /**
     * Navigate to the Sauce Demo login page.
     */
    async goto() {
        await this.page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });
    }

    /**
     * Fill username and password fields, then click the login button.
     * @param {string} username - The username to enter.
     * @param {string} password - The password to enter.
     */
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // SECTION::: Verification Methods

    /**
     * Get the text content of the error banner.
     * @returns {Promise<string>} The error message text.
     */
    async getErrorMessage() {
        return await this.errorBanner.textContent();
    }
};
