import {expect, Page} from '@playwright/test';
import { step } from '../tests/base';

export default class HomePage {
    private readonly headerProductSelector = ".title:has-text('Products')";
    private readonly inventoryPageUrl = process.env.URL! + 'inventory.html';
    private readonly cartIconSelector = ".shopping_cart_link";
    private readonly productSortSelector = ".product_sort_container";

    constructor(private page: Page) {}

    @step('Go to Product page')
    async goto() {  
        await this.page.goto(this.inventoryPageUrl);
    }

    @step('Click the icon cart')
    async clickCartIcon() {
        await this.isCartIconVisible();
        await this.page.locator(this.cartIconSelector).click();
    }

    @step('Check if cart icon is visible')
    async isCartIconVisible() {
        return await this.page.locator(this.cartIconSelector).isVisible();
    }

    @step('Click Add to Cart button')
    async addProductToCart(productName: string) {
        const productSelector = `.inventory_item:has-text("${productName}") .btn_inventory:has-text("Add to cart")`;
        await this.page.locator(productSelector).click();
    }

    @step('Click Remove button')
    async clickRemoveButtonInProductPage(productName: string) {
        const removeButtonSelector = `.inventory_item:has-text("${productName}") .btn_secondary:has-text("Remove")`;
        await this.page.locator(removeButtonSelector).click();
    }

    @step('Check if Home Page is loaded')
    async isHomePageLoaded() {
        return await this.page.locator(this.headerProductSelector).isVisible() &&
               await this.page.locator(this.productSortSelector).isVisible();
    }

    @step('Check if add to Add to Cart button is visible')
    async isAddToCartButtonVisible(productName: string) {
        const addButtonSelector = `.inventory_item:has-text("${productName}") .btn_primary:has-text("Add to cart")`;
        return await this.page.locator(addButtonSelector).isVisible();
    }

    @step('Check if remove button is visible')
    async isRemoveButtonVisible(productName: string) {
        const removeButtonSelector = `.inventory_item:has-text("${productName}") .btn_secondary:has-text("Remove")`;
        return await this.page.locator(removeButtonSelector).isVisible();
    }

    @step('Click on Product link')
    async clickProductLink(productName: string) {
        const productLinkSelector = `.inventory_item:has-text("${productName}") .inventory_item_name`;
        await this.page.locator(productLinkSelector).click();
    }

    @step('Click on Product image')
    async clickOnProductImage(productName: string) {
        await this.page.getByAltText(productName).click();
    }

    @step('Get product price')
    async getProductPrice(productName: string): Promise<string> {
        const priceSelector = `.inventory_item:has-text("${productName}") .inventory_item_price`;
        return await this.page.locator(priceSelector).textContent() || '';
    }

    @step('Get Product description')
    async getProductDescription(productName: string): Promise<string> {
        const descriptionSelector = `.inventory_item:has-text("${productName}") .inventory_item_desc`;
        return await this.page.locator(descriptionSelector).textContent() || '';
    }

    @step('Check if product is in product page')
    async checkIfProductIsInProductPage(productName: string): Promise<boolean> {
        const productSelector = `.inventory_item:has-text("${productName}")`;
        return await this.page.locator(productSelector).isVisible();
    }
}