import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS, APP_ROUTES} from '../../shared';
import {BasePage} from '../base';

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
      waitUntil: 'domcontentloaded',
    });

    await this.waitForAuthForm();
  }

  async waitForAuthForm(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
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
