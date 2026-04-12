import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS} from '../../../shared';

export class DangerZone {
  readonly passwordInput: Locator;
  readonly deleteButton: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly deleteModal: Locator;

  constructor(private readonly page: Page) {
    this.passwordInput = this.page.locator(
      `[data-testid="${TEST_IDS.USER.DELETE_ACCOUNT_INPUT}"]`
    );
    this.deleteButton = this.page.locator(
      `[data-testid="${TEST_IDS.USER.DELETE_ACCOUNT_BUTTON}"]`
    );
    this.deleteModal = this.page.locator(
      `[data-testid="${TEST_IDS.USER.DELETE_MODAL}"]`
    );
    this.confirmButton = this.page.locator(
      `[data-testid="${TEST_IDS.USER.DELETE_MODAL_CONFIRM}"]`
    );
    this.cancelButton = this.page.locator(
      `[data-testid="${TEST_IDS.USER.DELETE_MODAL_CANCEL}"]`
    );
  }

  async waitForVisible(): Promise<void> {
    await expect(this.passwordInput).toBeVisible();
    await expect(this.deleteButton).toBeVisible();
  }

  async deleteAccount(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.deleteButton.click();
  }

  async waitForModalVisible(): Promise<void> {
    await expect(this.deleteModal).toBeVisible();
  }

  async confirmDeletion(): Promise<void> {
    await this.waitForModalVisible();
    await this.confirmButton.click();
  }

  async cancelDeletion(): Promise<void> {
    await this.waitForModalVisible();
    await this.cancelButton.click();
  }

  async expectFieldError(message: string): Promise<void> {
    const input = this.passwordInput;

    await expect(input).toHaveAttribute('aria-describedby', /.+/);

    const describedBy = await input.getAttribute('aria-describedby');

    const error = this.page.locator(
      `#${describedBy} .ant-form-item-explain-error`
    );

    await expect(error).toBeVisible();
    await expect(error).toHaveText(message);
  }

  async expectModalVisible(): Promise<void> {
    await expect(this.deleteModal).toBeVisible();
  }

  async expectModalNotVisible(): Promise<void> {
    await expect(this.deleteModal).not.toBeVisible();
  }
}
