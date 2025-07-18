import test from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
  });

  test('should log in with valid credentials', async () => {
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.submit();

    // Verify that the home page is displayed
    const isLogoVisible = await homePage.isAppLogoVisible();
    test.expect(isLogoVisible).toBeTruthy();
  });

  test('should not log in with invalid credentials', async () => {
    await loginPage.fillUsername('invalid_user');
    await loginPage.fillPassword('invalid_password');
    await loginPage.submit();

    // Verify that the error message is displayed
    const errorMessage = await loginPage.getErrorMessage();
    test.expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });
    test('should display error message for empty credentials', async () => {
        await loginPage.fillUsername('');
        await loginPage.fillPassword('');
        await loginPage.submit();

        // Verify that the error message is displayed
        const errorMessage = await loginPage.getErrorMessage();
        test.expect(errorMessage).toContain('Epic sadface: Username is required');
    }); 

    test('should display error message for locked out user', async () => {
        await loginPage.fillUsername('locked_out_user');
        await loginPage.fillPassword('secret_sauce');
        await loginPage.submit();

        // Verify that the error message is displayed
        const errorMessage = await loginPage.getErrorMessage();
        test.expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

    test('should display error message for missing password', async () => {
        await loginPage.fillUsername('standard_user');
        await loginPage.fillPassword('');
        await loginPage.submit();

        // Verify that the error message is displayed
        const errorMessage = await loginPage.getErrorMessage();
        test.expect(errorMessage).toContain('Epic sadface: Password is required');
    });

    test('should display error message for missing username', async () => {
        await loginPage.fillUsername('');
        await loginPage.fillPassword('secret_sauce');
        await loginPage.submit();

        // Verify that the error message is displayed
        const errorMessage = await loginPage.getErrorMessage();
        test.expect(errorMessage).toContain('Epic sadface: Username is required');
        });

    test.afterEach(async ({ page }) => {
        // Optionally, you can add cleanup code here if needed
        await page.close();     
    });
    
});