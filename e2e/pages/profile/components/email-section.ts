import {type Page, type Locator, expect} from '@playwright/test';

import {TEST_IDS} from '../../../shared';

type TOtpBlock = {
  getButton: Locator;
  inputs: Locator;
  submit: Locator;
  getNew: Locator;
};

export class EmailSection {
  readonly verificationSection: Locator;
  readonly changeSection: Locator;
  readonly emailChangeInput: Locator;

  readonly verificationOtp: TOtpBlock;
  readonly changeOtp: TOtpBlock;

  constructor(private readonly page: Page) {
    this.verificationSection = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_VERIFICATION_SECTION}"]`
    );

    this.changeSection = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_CHANGE_SECTION}"]`
    );

    this.emailChangeInput = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_CHANGE_INPUT}"]`
    );

    this.verificationOtp = this.createOtp(this.verificationSection);
    this.changeOtp = this.createOtp(this.changeSection);
  }

  private createOtp(section: Locator): TOtpBlock {
    return {
      getButton: section.locator(`[data-testid="${TEST_IDS.OTP.GET_OTP}"]`),
      inputs: section.locator(`[data-testid="${TEST_IDS.OTP.INPUT}"] input`),
      submit: section.locator(`[data-testid="${TEST_IDS.OTP.SUBMIT}"]`),
      getNew: section.locator(`[data-testid="${TEST_IDS.OTP.GET_NEW_OTP}"]`),
    };
  }

  async waitForVerificationSectionVisible(): Promise<void> {
    await expect(this.verificationSection).toBeVisible();
  }

  async waitForChangeSectionVisible(): Promise<void> {
    await expect(this.changeSection).toBeVisible();
  }

  async clickVerifyEmail(): Promise<void> {
    await this.verificationOtp.getButton.click();
  }

  async fillOtp(otp: string, otpBlock: TOtpBlock): Promise<void> {
    await otpBlock.inputs.first().waitFor({state: 'visible'});

    const otpDigits = otp.split('');

    for (let i = 0; i < otpDigits.length; i++) {
      if (i < (await otpBlock.inputs.count())) {
        await otpBlock.inputs.nth(i).fill(otpDigits[i]);
      }
    }
  }

  async submitOtp(otpBlock: TOtpBlock): Promise<void> {
    await otpBlock.submit.click();
  }

  async submitOtpAndWaitForVerificationCompleted(otp: string): Promise<void> {
    const permissionsResponsePromise = this.page.waitForResponse(
      (resp) =>
        resp.url().includes('/users/permissions') &&
        resp.request().method() === 'GET' &&
        resp.status() === 200,
      {timeout: 30000}
    );

    await this.fillOtp(otp, this.verificationOtp);
    await this.submitOtp(this.verificationOtp);

    await expect(permissionsResponsePromise).resolves.toBeTruthy();
    await this.waitForVerificationCompleted();
  }

  async waitForVerificationCompleted(): Promise<void> {
    await this.changeSection.waitFor({state: 'visible', timeout: 30000});
    await this.verificationSection.waitFor({state: 'hidden', timeout: 30000});
  }

  async waitForVerificationOtpForm(): Promise<void> {
    await expect(this.verificationOtp.inputs.first()).toBeVisible();
  }

  async waitForEmailChangeOtpForm(): Promise<void> {
    await expect(this.changeOtp.inputs.first()).toBeVisible();
  }

  async requestNewOtp(): Promise<void> {
    await this.verificationOtp.getNew.click();
  }

  async getOtpInputCount(): Promise<number> {
    return await this.verificationOtp.inputs.count();
  }

  async changeEmail(newEmail: string): Promise<void> {
    await this.emailChangeInput.fill(newEmail);
  }

  async requestEmailChangeOtp(): Promise<void> {
    await this.changeOtp.getButton.click();
  }

  async confirmEmailChangeWithOtp(otp: string): Promise<void> {
    await this.fillOtp(otp, this.changeOtp);
    await this.submitOtp(this.changeOtp);
  }

  async expectEmailChanged(): Promise<void> {
    await expect(this.emailChangeInput).toHaveValue('');
  }

  async expectAlreadyVerifiedError(): Promise<void> {
    const errorNotification = this.page.locator('.ant-notification-notice', {
      hasText: /уже подтверждён|already verified/i,
    });

    await expect(errorNotification).toBeVisible();
  }

  async expectEmailAlreadyExistsError(): Promise<void> {
    const errorNotification = this.page.locator('.ant-notification-notice', {
      hasText: /уже используется|already exists/i,
    });

    await expect(errorNotification).toBeVisible();
  }

  async expectChangeEmailForbiddenError(): Promise<void> {
    const errorNotification = this.page.locator('.ant-notification-notice', {
      hasText: /запрещена|forbidden|not allowed/i,
    });

    await expect(errorNotification).toBeVisible();
  }

  async expectOtpError(): Promise<void> {
    const errorNotification = this.page.locator('.ant-notification-notice', {
      hasText: /неверный|invalid|ошибка|error/i,
    });

    await expect(errorNotification).toBeVisible();
  }

  async expectInvalidEmailError(): Promise<void> {
    const input = this.emailChangeInput;

    await expect(input).toHaveAttribute('aria-describedby', /.+/);

    const describedBy = await input.getAttribute('aria-describedby');

    const ids = describedBy?.split(' ') ?? [];

    const error = this.page.locator(
      ids.map((id) => `#${id} .ant-form-item-explain-error`).join(', ')
    );

    await expect(error).toBeVisible();
  }
}
