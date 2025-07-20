import {Page} from '@playwright/test';

export class LoginPage {
    private readonly usernameInputSelector = "#user-name";
    private readonly passwordInputSelector = "#password";
    private readonly submitButtonSelector = "#login-button";

  constructor(private page: Page) {}

  async goto() {
     await this.page.goto(process.env.URL!);
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

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }
}

