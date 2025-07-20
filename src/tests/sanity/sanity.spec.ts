import {expect, test as sanity} from '../base';

sanity('Sanity Test', async ({ productPage, cartPage }) => {

    await productPage.addProductToCart('Sauce Labs Backpack');
    await productPage.addProductToCart('Sauce Labs Bike Light');
    await productPage.clickCartIcon();
    expect(await cartPage.getCartItemsCount()).toBe(2);

});