import {Page} from '@playwright/test';

export default class HomePage {
    private readonly appLogoSelector = ".app_logo";


  constructor(private page: Page) {}

  async isAppLogoVisible() {
    return await this.page.locator(this.appLogoSelector).isVisible();
  }
}