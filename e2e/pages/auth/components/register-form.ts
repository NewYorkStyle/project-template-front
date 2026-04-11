import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS} from '../../../shared';

export class RegisterForm {
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordConfirmInput: Locator;
  readonly signUpButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.locator(
      `[data-testid="${TEST_IDS.REGISTER.USER_NAME}"]`
    );
    this.emailInput = this.page.locator(
      `[data-testid="${TEST_IDS.REGISTER.EMAIL}"]`
    );
    this.passwordInput = this.page.locator(
      `[data-testid="${TEST_IDS.REGISTER.PASSWORD}"]`
    );
    this.passwordConfirmInput = this.page.locator(
      `[data-testid="${TEST_IDS.REGISTER.PASSWORD_CONFIRM}"]`
    );
    this.signUpButton = this.page.locator(
      `[data-testid="${TEST_IDS.AUTH.SIGN_UP}"]`
    );
  }

  async waitForVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordConfirmInput).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
  }

  async fillForm(options: {
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  }): Promise<void> {
    const {email, password, passwordConfirm, username} = options;

    if (username !== undefined) {
      await this.usernameInput.fill(username);
    }
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    if (passwordConfirm !== undefined) {
      await this.passwordConfirmInput.fill(passwordConfirm);
    }
  }

  async submit(): Promise<void> {
    await this.signUpButton.click();
  }

  async register(options: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<void> {
    await this.fillForm(options);
    await this.submit();
  }

  async expectError(message: string): Promise<void> {
    const errorNotification = this.page.locator('.ant-notification-notice', {
      hasText: message,
    });

    await expect(errorNotification).toBeVisible();
  }

  async expectFieldError(
    fieldName: 'username' | 'email' | 'password' | 'passwordConfirm',
    message: string
  ): Promise<void> {
    const fieldMap = {
      email: this.emailInput,
      password: this.passwordInput,
      passwordConfirm: this.passwordConfirmInput,
      username: this.usernameInput,
    } as const;

    const input = fieldMap[fieldName];

    await expect(input).toHaveAttribute('aria-describedby', /.+/);

    const describedBy = await input.getAttribute('aria-describedby');

    const error = this.page.locator(
      `#${describedBy} .ant-form-item-explain-error`
    );

    await expect(error).toBeVisible();
    await expect(error).toHaveText(message);
  }
}
