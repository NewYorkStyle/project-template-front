import {type Page, type Locator, expect} from '@playwright/test';

import {APP_ROUTES, TEST_IDS} from '../../shared';
import {BasePage} from '../base';

export class ProfilePage extends BasePage {
  readonly otpGetButton: Locator;
  readonly otpInputs: Locator;
  readonly otpSubmitButton: Locator;
  readonly otpGetNewButton: Locator;
  readonly emailVerificationSection: Locator;
  readonly emailChangeSection: Locator;

  constructor(page: Page) {
    super(page);

    this.otpGetButton = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.GET_OTP}"]`
    );

    this.otpInputs = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.INPUT}"] input`
    );

    this.otpSubmitButton = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.SUBMIT}"]`
    );
    this.otpGetNewButton = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.GET_NEW_OTP}"]`
    );

    this.emailVerificationSection = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_VERIFICATION_SECTION}"]`
    );
    this.emailChangeSection = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_CHANGE_SECTION}"]`
    );
  }

  async open(): Promise<void> {
    await this.goto(APP_ROUTES.USER.ROOT);
    await this.waitForProfilePage();
  }

  async waitForProfilePage(): Promise<void> {
    await expect(
      this.emailVerificationSection.or(this.emailChangeSection)
    ).toBeVisible();
  }

  isOnProfilePage(): boolean {
    const currentUrl = this.getUrl();
    return currentUrl.includes(APP_ROUTES.USER.ROOT);
  }

  async startEmailVerification(): Promise<void> {
    await this.otpGetButton.click();
  }

  async fillOtp(otp: string): Promise<void> {
    await this.otpInputs.first().waitFor({state: 'visible'});

    const otpDigits = otp.split('');

    for (let i = 0; i < otpDigits.length; i++) {
      if (i < (await this.otpInputs.count())) {
        await this.otpInputs.nth(i).fill(otpDigits[i]);
      }
    }
  }

  async submitOtp(): Promise<void> {
    const verifyResponsePromise = this.page
      .waitForResponse(
        (resp) =>
          resp.url().includes('/users/verifyEmail') &&
          resp.request().method() === 'POST' &&
          resp.status() === 200,
        {timeout: 30000}
      )
      .catch(() => null);

    await this.otpSubmitButton.click();
    await verifyResponsePromise;
  }

  async waitForEmailVerificationCompleted(): Promise<void> {
    await this.emailChangeSection.waitFor({
      state: 'visible',
      timeout: 30000,
    });

    await this.emailVerificationSection.waitFor({
      state: 'hidden',
      timeout: 30000,
    });
  }

  async submitOtpAndWaitForVerificationCompleted(): Promise<void> {
    const permissionsResponsePromise = this.page
      .waitForResponse(
        (resp) =>
          resp.url().includes('/users/permissions') &&
          resp.request().method() === 'GET' &&
          resp.status() === 200,
        {timeout: 30000}
      )
      .catch(() => null);

    await this.submitOtp();
    await permissionsResponsePromise;
    await this.waitForEmailVerificationCompleted();
  }

  async requestNewOtp(): Promise<void> {
    await this.otpGetNewButton.click();
  }

  async waitForOtpForm(): Promise<void> {
    await expect(this.otpInputs.first()).toBeVisible();
  }

  async getOtpInputCount(): Promise<number> {
    return await this.otpInputs.count();
  }
}
