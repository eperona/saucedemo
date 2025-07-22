import {expect, test } from '../base';

test.describe('Order Product Test', () => {
    const product1Name = 'Sauce Labs Backpack';
    const product2Name = 'Sauce Labs Bike Light';

    //productPage is HomePage but with login already performed

    test('Add and remove products from cart', async ({ productPage, cartPage }) => {  
        await productPage.addProductToCart(product1Name);
        await productPage.addProductToCart(product2Name);
        await productPage.isHomePageLoaded();
        await productPage.clickCartIcon();
        expect(await cartPage.getCartItemsCount()).toBe(2);
        await cartPage.clickRemoveButtonInCartPage(product1Name);
        expect(await cartPage.getCartItemsCount()).toBe(1);
    });

    test('Continue shopping from cart', async ({ productPage, cartPage }) => {
        await productPage.addProductToCart(product1Name);
        await productPage.clickCartIcon();
        await cartPage.isCartItemVisible();
        await cartPage.clickContinueShopping();
        await productPage.isHomePageLoaded();
    });

    test('Checkout button visibility', async ({ productPage, cartPage }) => {
        await productPage.addProductToCart(product1Name);
        await productPage.clickCartIcon();
        await cartPage.isCheckoutButtonVisible();
    });

    test('Remove product from product page', async ({ productPage }) => {
        await productPage.addProductToCart(product1Name);
        await productPage.clickRemoveButtonInProductPage(product1Name);
        await productPage.isHomePageLoaded();
        await productPage.isAddToCartButtonVisible(product1Name);
    });

    test('Remove product from cart page', async ({ productPage, cartPage }) => {
        await productPage.addProductToCart(product1Name);
        await productPage.clickCartIcon();
        await cartPage.isCartItemVisible();
        await cartPage.clickRemoveButtonInCartPage(product1Name);
        expect(await cartPage.getCartItemsCount()).toBe(0);
    });

    test('Cart icon visibility', async ({ productPage }) => {
        await productPage.isHomePageLoaded();
        await productPage.isCartIconVisible();
    });

    test('Cart icon click navigates to cart page', async ({ productPage, cartPage }) => {
        await productPage.addProductToCart('Sauce Labs Backpack');
        await productPage.clickCartIcon();
        await cartPage.isCartItemVisible();
    });
}); 
