import {type Page} from '@playwright/test';

import {APP_ROUTES} from '../../shared';
import {BasePage} from '../base';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto(APP_ROUTES.HOME.ROOT);
  }

  isOnHomePage(): boolean {
    const currentUrl = this.getUrl();

    return currentUrl.includes(APP_ROUTES.HOME.ROOT);
  }
}
