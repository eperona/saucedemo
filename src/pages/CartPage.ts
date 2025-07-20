import { Page } from '@playwright/test';

export class CartPage {
    private readonly cartItemsSelector = ".cart_item";
    private readonly checkoutButtonSelector = ".checkout_button";
    private readonly cartPageUrl = process.env.URL! + 'cart.html';
    private readonly continueShoppingButtonSelector = ".continue-shopping";

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(this.cartPageUrl);
    }

    async isCartItemVisible() {
        return await this.page.locator(this.cartItemsSelector).isVisible();
    }

    async isCheckoutButtonVisible() {
        return await this.page.locator(this.checkoutButtonSelector).isVisible();
    }

    async clickContinueShopping() {
        await this.page.locator(this.continueShoppingButtonSelector).click();
    }

    async getCartItemsCount(): Promise<number> {
        const items = await this.page.locator(this.cartItemsSelector).count();
        return items;
    }
}