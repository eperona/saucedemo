import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";

export type TestOptions = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: HomePage;
    cartPage: CartPage;
};

export const test = base.extend<TestOptions>({

    productPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await loginPage.goto();
        await loginPage.login(process.env.USER!, process.env.PASSWORD!);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }, 
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }
});

export { expect } from "@playwright/test";
