import { expect, test } from '../base';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should log in with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword(process.env.PASSWORD!);
    await loginPage.submit();
    const isHeaderVisible = await homePage.isHomePageLoaded();
    expect(isHeaderVisible).toBeTruthy();
  });

  test('should not log in with invalid credentials', async ({ loginPage }) => {
    await loginPage.fillUsername('invalid_user');
    await loginPage.fillPassword('invalid_password');
    await loginPage.submit();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('should display error message for empty credentials', async ({ loginPage }) => {
      await loginPage.fillUsername('');
      await loginPage.fillPassword('');
      await loginPage.submit();

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Epic sadface: Username is required');
  }); 

  test('should display error message for locked out user', async ({ loginPage }) => {
      await loginPage.fillUsername('locked_out_user');
      await loginPage.fillPassword(process.env.PASSWORD!);
      await loginPage.submit();

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should display error message for missing password', async ({ loginPage }) => {
      await loginPage.fillUsername('standard_user');
      await loginPage.fillPassword('');
      await loginPage.submit();

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Epic sadface: Password is required');
  });

  test('should display error message for missing username', async ({ loginPage }) => {
      await loginPage.fillUsername('');
      await loginPage.fillPassword(process.env.PASSWORD!);
      await loginPage.submit();

      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Epic sadface: Username is required');
  });
});