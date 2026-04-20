import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS} from '../../../shared';

export type TChangePasswordField =
  | 'currentPassword'
  | 'newPassword'
  | 'newPasswordConfirm';

export class ChangePasswordSection {
  readonly currentInput: Locator;
  readonly newInput: Locator;
  readonly confirmInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.currentInput = this.page.getByTestId(
      TEST_IDS.USER.CHANGE_PASSWORD_CURRENT
    );
    this.newInput = this.page.getByTestId(TEST_IDS.USER.CHANGE_PASSWORD_NEW);
    this.confirmInput = this.page.getByTestId(
      TEST_IDS.USER.CHANGE_PASSWORD_CONFIRM
    );
    this.submitButton = this.page.getByTestId(
      TEST_IDS.USER.CHANGE_PASSWORD_SUBMIT
    );
  }

  async waitForVisible(): Promise<void> {
    await expect(this.currentInput).toBeVisible();
    await expect(this.newInput).toBeVisible();
    await expect(this.confirmInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async fillForm(options: {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    const {confirmPassword, currentPassword, newPassword} = options;

    await this.currentInput.fill(currentPassword);
    await this.newInput.fill(newPassword);
    await this.confirmInput.fill(confirmPassword);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  private inputForField(field: TChangePasswordField): Locator {
    const map = {
      currentPassword: this.currentInput,
      newPassword: this.newInput,
      newPasswordConfirm: this.confirmInput,
    } as const;

    return map[field];
  }

  async expectFieldError(
    field: TChangePasswordField,
    message: string
  ): Promise<void> {
    const input = this.inputForField(field);

    await expect(input).toHaveAttribute('aria-describedby', /.+/);

    const describedBy = await input.getAttribute('aria-describedby');
    const ids = describedBy?.split(/\s+/).filter(Boolean) ?? [];

    const error = this.page.locator(
      ids.map((id) => `#${id} .ant-form-item-explain-error`).join(', ')
    );

    await expect(error).toBeVisible();
    await expect(error).toHaveText(message);
  }

  async expectSuccessNotification(): Promise<void> {
    const notice = this.page.locator('.ant-notification-notice', {
      hasText: /Пароль успешно изменён|Password changed successfully/i,
    });

    await expect(notice).toBeVisible();
  }

  async expectChangePasswordErrorNotification(): Promise<void> {
    const notice = this.page.locator('.ant-notification-notice', {
      hasText:
        /Не удалось сменить пароль|Could not change password|неверн|invalid|incorrect/i,
    });

    await expect(notice).toBeVisible();
  }
}
