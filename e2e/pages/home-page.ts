import {type Page, type Locator} from '@playwright/test';

import {APP_ROUTES} from '../shared';

import {BasePage} from './base-page';

export class HomePage extends BasePage {
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = this.page.locator('h1, .welcome-message').first();
  }

  async open(): Promise<void> {
    await this.goto(APP_ROUTES.HOME.ROOT);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.body.waitFor({state: 'visible'});
  }

  isOnHomePage(): boolean {
    const currentUrl = this.getUrl();

    return currentUrl.includes(APP_ROUTES.HOME.ROOT);
  }
}
