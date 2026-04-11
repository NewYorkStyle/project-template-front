import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS} from '../../../shared';

export class LoginForm {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(private readonly page: Page) {
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

  async waitForVisible(): Promise<void> {
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

  async expectError(message: string): Promise<void> {
    const errorNotification = this.page.locator('.ant-notification-notice', {
      hasText: message,
    });

    await expect(errorNotification).toBeVisible();
  }

  async expectFieldError(
    fieldName: 'username' | 'password',
    message: string
  ): Promise<void> {
    const input =
      fieldName === 'username' ? this.usernameInput : this.passwordInput;

    await expect(input).toHaveAttribute('aria-describedby', /.+/);

    const describedBy = await input.getAttribute('aria-describedby');

    const error = this.page.locator(
      `#${describedBy} .ant-form-item-explain-error`
    );

    await expect(error).toBeVisible();
    await expect(error).toHaveText(message);
  }
}
