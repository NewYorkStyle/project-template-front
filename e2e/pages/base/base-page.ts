import {type Page} from '@playwright/test';

import {APP_ROUTES} from '../../shared';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string = APP_ROUTES.ROOT): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });

    await this.page.waitForSelector('body', {
      state: 'attached',
      timeout: 5000,
    });
  }

  getUrl(): string {
    return this.page.url();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
