import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS} from '../../../shared';

export class ProfileInfoSection {
  readonly surnameInput: Locator;
  readonly nameInput: Locator;
  readonly patronymicInput: Locator;
  readonly saveButton: Locator;

  constructor(private readonly page: Page) {
    this.surnameInput = this.page.locator(
      `[data-testid="${TEST_IDS.USER.SURNAME_INPUT}"]`
    );
    this.nameInput = this.page.locator(
      `[data-testid="${TEST_IDS.USER.NAME_INPUT}"]`
    );
    this.patronymicInput = this.page.locator(
      `[data-testid="${TEST_IDS.USER.PATRONYMIC_INPUT}"]`
    );
    this.saveButton = this.page.locator(
      `[data-testid="${TEST_IDS.USER.FULL_NAME_SAVE_BUTTON}"]`
    );
  }

  async waitForVisible(): Promise<void> {
    await expect(this.surnameInput).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.patronymicInput).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  async changeFullName(options: {
    name?: string;
    patronymic?: string;
    surname?: string;
  }): Promise<void> {
    const {name, patronymic, surname} = options;

    if (name !== undefined) {
      await this.nameInput.fill(name);
    }
    if (patronymic !== undefined) {
      await this.patronymicInput.fill(patronymic);
    }
    if (surname !== undefined) {
      await this.surnameInput.fill(surname);
    }
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async expectFullNameUpdated(): Promise<void> {
    await expect(this.saveButton).toBeDisabled();
  }

  async expectFieldError(
    fieldName: 'name' | 'surname' | 'patronymic',
    message: string
  ): Promise<void> {
    const fieldMap = {
      name: this.nameInput,
      patronymic: this.patronymicInput,
      surname: this.surnameInput,
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

  async expectNoFieldError(
    fieldName: 'name' | 'surname' | 'patronymic'
  ): Promise<void> {
    const fieldMap = {
      name: this.nameInput,
      patronymic: this.patronymicInput,
      surname: this.surnameInput,
    } as const;

    const input = fieldMap[fieldName];

    await expect(input).not.toHaveAttribute('aria-describedby', /.+/);
  }
}
