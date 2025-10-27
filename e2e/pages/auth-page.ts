import {type Page, type Locator} from '@playwright/test';

import {TEST_IDS, APP_ROUTES} from '../shared';

import {BasePage} from './base-page';

export class AuthPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = this.page.locator(
      `[data-testid="${TEST_IDS.AUTH.USER_NAME}"]`
    );
    this.passwordInput = this.page.locator(
      `[data-testid="${TEST_IDS.AUTH.PASSWORD}"]`
    );
    this.signInButton = this.page.locator(
      `[data-testid="${TEST_IDS.AUTH.SIGN_IN}"]`
    );
  }

  async open(): Promise<void> {
    await this.page.goto(APP_ROUTES.AUTH.ROOT, {
      waitUntil: 'networkidle',
      timeout: 15000,
    });

    await this.waitForAuthForm();
  }

  async waitForAuthForm(): Promise<void> {
    await this.page.waitForSelector(
      `[data-testid="${TEST_IDS.AUTH.USER_NAME}"]`,
      {
        state: 'visible',
        timeout: 10000,
      }
    );

    await this.page.waitForSelector(
      `[data-testid="${TEST_IDS.AUTH.PASSWORD}"]`,
      {
        state: 'visible',
        timeout: 10000,
      }
    );

    await this.page.waitForSelector(
      `[data-testid="${TEST_IDS.AUTH.SIGN_IN}"]`,
      {
        state: 'visible',
        timeout: 10000,
      }
    );
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.signInButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.submit();
  }

  isOnAuthPage(): boolean {
    const currentUrl = this.getUrl();
    return (
      currentUrl === APP_ROUTES.AUTH.ROOT ||
      currentUrl.includes(APP_ROUTES.AUTH.ROOT)
    );
  }
}
