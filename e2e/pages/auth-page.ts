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
    await this.goto(APP_ROUTES.AUTH.ROOT);
    await this.waitForAuthForm();
  }

  async waitForAuthForm(): Promise<void> {
    await this.usernameInput.waitFor({state: 'visible'});
    await this.passwordInput.waitFor({state: 'visible'});
    await this.signInButton.waitFor({state: 'visible'});
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

  async isAuthFormVisible(): Promise<boolean> {
    return (
      (await this.usernameInput.isVisible()) &&
      (await this.passwordInput.isVisible()) &&
      (await this.signInButton.isVisible())
    );
  }

  async areInputsEmpty(): Promise<boolean> {
    const usernameValue = await this.usernameInput.inputValue();
    const passwordValue = await this.passwordInput.inputValue();
    return usernameValue === '' && passwordValue === '';
  }

  isOnAuthPage(): boolean {
    const currentUrl = this.getUrl();
    return (
      currentUrl === APP_ROUTES.AUTH.ROOT ||
      currentUrl.includes(APP_ROUTES.AUTH.ROOT)
    );
  }
}
