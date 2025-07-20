import {expect, Page} from '@playwright/test';
import { test as base } from "@playwright/test";

export class HomePage {
    private readonly appLogoSelector = ".app_logo";
    private readonly inventoryPageUrl = process.env.URL! + 'inventory.html';
    private readonly cartIconSelector = ".shopping_cart_link";

    
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(this.inventoryPageUrl);
    }

    async clickCartIcon() {
        await this.page.locator(this.cartIconSelector).click();
    }

    async addProductToCart(productName: string) {
        const productSelector = `.inventory_item:has-text("${productName}") .btn_inventory`;
        await this.page.locator(productSelector).click();
        const removeButtonSelector = `.inventory_item:has-text("${productName}") .btn_secondary`;
        await this.page.waitForSelector(removeButtonSelector, { state: 'visible' });
    }

    async removeProductFromCart(productName: string) {
        const removeButtonSelector = `.inventory_item:has-text("${productName}") .btn_secondary`;
        await this.page.locator(removeButtonSelector).click();
    }

    async isAppLogoVisible() {
        return await this.page.locator(this.appLogoSelector).isVisible();
    }
}