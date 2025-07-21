import {expect, test as sanity} from '../base';

sanity('Sanity Test', async ({ productPage, cartPage }) => {

    expect(await productPage.isHomePageLoaded()).toBeTruthy();
    await productPage.addProductToCart('Sauce Labs Backpack');
    await productPage.addProductToCart('Sauce Labs Bike Light');
    await productPage.clickCartIcon();
    expect(await cartPage.isCartPageLoaded()).toBeTruthy();
    expect(await cartPage.getCartItemsCount()).toBe(2);

});
