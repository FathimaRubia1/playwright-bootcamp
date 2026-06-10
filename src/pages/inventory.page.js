exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;

    // SECTION::: Element Locators
    this.cartLink = () => this.page.getByRole('link', { name: /cart/i });
    this.cartBadge = () => this.page.locator('.shopping_cart_badge');
    this.itemContainer = (name) => this.page.locator(`.inventory_item:has-text("${name}")`);

    // SECTION::: Page Actions
    // (methods below)

    // SECTION::: Verification Methods
    // (methods below)
  }

  /**
   * Navigate to the inventory page (relative to baseURL)
   */
  async goto() {
    await this.page.goto('/inventory.html');
    return this;
  }

  /**
   * Add a specific item to the cart by visible name.
   * Uses role-based button lookup scoped to the item container.
   * @param {string} itemName
   */
  async addItemToCart(itemName) {
    const item = this.itemContainer(itemName);
    const addButton = item.getByRole('button', { name: /add to cart/i });
    await addButton.click();
    return true; // expect.soft-friendly boolean return
  }

  /**
   * Return the numeric cart item count shown in the UI badge.
   * Returns 0 when no badge is present.
   */
  async getCartItemCount() {
    const badge = this.cartBadge();
    if (await badge.count() === 0) return 0;
    const text = await badge.innerText();
    const n = parseInt(text, 10);
    return Number.isNaN(n) ? 0 : n;
  }

  /**
   * Click the cart icon/link to navigate to the cart page.
   */
  async clickCart() {
    await this.cartLink().click();
    return this;
  }
};
