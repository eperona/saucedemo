import {Page} from '@playwright/test';

export default class LoginPage {
    private readonly usernameInputSelector = "#user-name";
    private readonly passwordInputSelector = "#password";
    private readonly submitButtonSelector = "#login-button";

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
  }

  async submit() {
    await this.page
    .locator(this.submitButtonSelector)
    .click()
    .catch((error) => {
      console.error("Error clicking the Login button:", error);
    });
  }

  async getErrorMessage(): Promise<string> {
    const errorMessage = await this.page.textContent('[data-test="error"]');
    return errorMessage ?? "";
  }
}

