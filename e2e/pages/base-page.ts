import {type Page, type Locator} from '@playwright/test';

import {APP_ROUTES} from '../shared/constants';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string = APP_ROUTES.ROOT): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  getUrl(): string {
    return this.page.url();
  }

  get body(): Locator {
    return this.page.locator('body');
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.body.waitFor({state: 'visible', timeout: 10000});
      return true;
    } catch {
      return false;
    }
  }
}
