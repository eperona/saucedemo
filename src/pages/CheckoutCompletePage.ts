import { Page } from '@playwright/test';
import { step } from '../tests/base';

export default class CheckoutCompletePage {

    private readonly backHomeButtonSelector = "#back-to-products";
    private readonly completeHeaderSelector = ".complete-header";
    private readonly completeTextSelector = ".complete-text";

    constructor(private page: Page) {}

    @step('Checkout Complete Page is opened')
    async isOpened() {
        return this.page.url().includes('/checkout-complete')&&
        await this.page.locator(this.backHomeButtonSelector).isVisible() 
    }

    @step('Click on Back Home button')
    async clickBackHomeButton() {
        await this.page.locator(this.backHomeButtonSelector).click();
    }
}