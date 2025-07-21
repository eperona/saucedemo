import { get } from 'http';
import {expect, test} from '../base';
import { faker } from '@faker-js/faker';

[
    {username: 'standard_user', productName: 'Sauce Labs Backpack'},
    {username: 'problem_user', productName: 'Sauce Labs Bike Light'},
    {username: 'performance_glitch_user', productName: 'Sauce Labs Fleece Jacket'},
    {username: 'error_user', productName: 'Sauce Labs Onesie'},
    {username: 'visual_user', productName: 'Sauce Labs Bolt T-Shirt'}
].forEach(({username, productName}) => {
    test(`End-to-end test for user "${username}"`, async ({ 
                    loginPage, 
                    homePage, 
                    productDetailsPage, 
                    cartPage,
                    checkoutPage,
                    checkoutOverviewPage,
                    checkoutCompletePage 
                }) => {

        await test.step(`Login with user "${username}"`, async () => {
            await loginPage.goto();
            await loginPage.login(username, process.env.PASSWORD!);
        });

        expect(await homePage.isHomePageLoaded()).toBeTruthy();

        let productPrice = await homePage.getProductPrice(productName);
        let productDescription = await homePage.getProductDescription(productName);

        //verifying product in Product Details Page
        await homePage.clickProductLink(productName);
        expect(await productDetailsPage.isProductDetailsPageLoaded()).toBeTruthy();
        expect(await productDetailsPage.checkIfImageIsCorrect(productName)).toBeTruthy();
        expect(await productDetailsPage.checkIfPriceIsCorrect(productPrice)).toBeTruthy();
        expect(await productDetailsPage.checkIfDescriptionIsCorrect(productDescription)).toBeTruthy();

        await productDetailsPage.clickAddToCartButton();
        expect(await productDetailsPage.isRemoveButtonVisible).toBeTruthy();

        //verifying product in Cart Page then remove
        await productDetailsPage.clickCartButton();
        expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        expect(await cartPage.getCartItemsCount()).toBe(1);
        expect(await cartPage.checkIfProductNameIsCorrect(productName)).toBeTruthy();
        expect(await cartPage.checkIfDescriptionIsCorrect(productName, productDescription)).toBeTruthy();
        expect(await cartPage.checkIfPriceIsCorrect(productName, productPrice)).toBeTruthy();
        await cartPage.clickRemoveButtonInCartPage(productName);
        expect(await cartPage.isCartItemVisible()).toBeFalsy();
        await cartPage.clickContinueShopping();

        // start of product order from Home Page
        expect(await homePage.isHomePageLoaded()).toBeTruthy();
        await homePage.addProductToCart(productName);
        expect(await homePage.isAddToCartButtonVisible(productName)).toBeFalsy();   
        expect(await homePage.isRemoveButtonVisible(productName)).toBeTruthy();
        await homePage.clickCartIcon();
        expect(await cartPage.isCartPageLoaded()).toBeTruthy();
        expect(await cartPage.getCartItemsCount()).toBe(1);
        expect(await cartPage.checkIfProductNameIsCorrect(productName)).toBeTruthy();
        await cartPage.clickCheckoutButton();

        //start of Checkout Page
        expect(await checkoutPage.isOpened()).toBeTruthy();
        await checkoutPage.fillFirstName(username);
        await checkoutPage.fillLastName(faker.person.lastName());
        await checkoutPage.fillPostCode(faker.location.zipCode());
        await checkoutPage.clickContinueButton();

        //start of Checkout Overview Page
        expect(await checkoutOverviewPage.isOpened()).toBeTruthy();
        expect(await checkoutOverviewPage.getSubtotal()).toContain(productPrice);

        const tax = await checkoutOverviewPage.getTax();
        const subtotal = await checkoutOverviewPage.getSubtotal()
        const totalAmount = await checkoutOverviewPage.getTotalAmount();       

        expect(subtotal).toContain(productPrice);
        expect(totalAmount).toContain(
            subtotal !== null
                ? ("Total: $" + (
                    parseFloat(subtotal.replace(/[^0-9.-]+/g,"")) +
                    (tax !== null ? parseFloat(tax.replace(/[^0-9.-]+/g,"")) : 0)
                  ).toFixed(2))
                : null
        );  
        await checkoutOverviewPage.clickFinishButton();

        //Checkout Complete Page
        expect(await checkoutCompletePage.isOpened()).toBeTruthy();
        await checkoutCompletePage.clickBackHomeButton();
        expect(await homePage.isHomePageLoaded()).toBeTruthy();

    });
});