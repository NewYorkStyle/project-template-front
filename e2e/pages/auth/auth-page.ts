import {type Page, type Locator} from '@playwright/test';

import {APP_ROUTES, TEST_IDS} from '../../shared';
import {BasePage} from '../base';

import {LoginForm, RegisterForm} from './components';

export class AuthPage extends BasePage {
  readonly loginForm: LoginForm;
  readonly loginTab: Locator;
  readonly registerForm: RegisterForm;
  readonly registerTab: Locator;

  constructor(page: Page) {
    super(page);

    this.loginForm = new LoginForm(page);
    this.registerForm = new RegisterForm(page);
    this.loginTab = this.page.locator(
      `[data-testid="${TEST_IDS.AUTH.TAB_LOGIN}"]`
    );
    this.registerTab = this.page.locator(
      `[data-testid="${TEST_IDS.AUTH.TAB_REGISTER}"]`
    );
  }

  async open(): Promise<void> {
    await this.page.goto(APP_ROUTES.AUTH.ROOT, {
      waitUntil: 'domcontentloaded',
    });

    await this.switchToLogin();
  }

  async switchToLogin(): Promise<void> {
    await this.loginTab.click();
    await this.loginForm.waitForVisible();
  }

  async switchToRegister(): Promise<void> {
    await this.registerTab.click();
    await this.registerForm.waitForVisible();
  }

  isOnAuthPage(): boolean {
    const currentUrl = this.getUrl();
    return (
      currentUrl === APP_ROUTES.AUTH.ROOT ||
      currentUrl.includes(APP_ROUTES.AUTH.ROOT)
    );
  }
}
