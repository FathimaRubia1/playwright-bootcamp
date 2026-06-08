exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;

    // SECTION::: Element Locators
    this.cartItems = () => this.page.locator('.cart_item');
    this.itemName = (item) => item.locator('.inventory_item_name');
    this.checkoutButton = () => this.page.getByRole('button', { name: /checkout/i });

    // SECTION::: Page Actions
    // (methods below)

    // SECTION::: Verification Methods
    // (methods below)
  }

  /**
   * Return array of visible item names in the cart.
   * @returns {Promise<string[]>}
   */
  async getItemNames() {
    const items = this.cartItems();
    const names = [];
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const nameLocator = this.itemName(item);
      const text = await nameLocator.innerText();
      names.push(text.trim());
    }
    return names;
  }

  /**
   * Click the checkout button to proceed to checkout flow.
   */
  async proceedToCheckout() {
    await this.checkoutButton().click();
    return this;
  }
};
