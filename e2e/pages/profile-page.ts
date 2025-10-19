import {type Page, type Locator} from '@playwright/test';

import {APP_ROUTES, TEST_IDS} from '../shared';

import {BasePage} from './base-page';

export class ProfilePage extends BasePage {
  // OTP элементы
  readonly otpGetButton: Locator;
  readonly otpInputs: Locator; // Все OTP инпуты
  readonly otpSubmitButton: Locator;
  readonly otpGetNewButton: Locator;

  // Секции профиля
  readonly emailVerificationSection: Locator;
  readonly emailChangeSection: Locator;

  constructor(page: Page) {
    super(page);

    // OTP элементы
    this.otpGetButton = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.GET_OTP}"]`
    );

    // OTP инпуты - каждый отдельный символ
    this.otpInputs = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.INPUT}"] input`
    );

    this.otpSubmitButton = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.SUBMIT}"]`
    );
    this.otpGetNewButton = this.page.locator(
      `[data-testid="${TEST_IDS.OTP.GET_NEW_OTP}"]`
    );

    // Секции профиля
    this.emailVerificationSection = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_VERIFICATION_SECTION}"]`
    );
    this.emailChangeSection = this.page.locator(
      `[data-testid="${TEST_IDS.USER.EMAIL_CHANGE_SECTION}"]`
    );
  }

  async open(): Promise<void> {
    await this.goto(APP_ROUTES.USER.ROOT);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.body.waitFor({state: 'visible'});
  }

  isOnProfilePage(): boolean {
    const currentUrl = this.getUrl();
    return currentUrl.includes(APP_ROUTES.USER.ROOT);
  }

  // OTP методы
  async startEmailVerification(): Promise<void> {
    await this.otpGetButton.click();
  }

  async fillOtp(otp: string): Promise<void> {
    // Ждем пока появятся все OTP инпуты
    await this.otpInputs.first().waitFor({state: 'visible'});

    // Заполняем каждый символ в отдельный input
    const otpDigits = otp.split('');

    for (let i = 0; i < otpDigits.length; i++) {
      if (i < (await this.otpInputs.count())) {
        await this.otpInputs.nth(i).fill(otpDigits[i]);
      }
    }
  }

  async submitOtp(): Promise<void> {
    await this.otpSubmitButton.click();
  }

  async requestNewOtp(): Promise<void> {
    await this.otpGetNewButton.click();
  }

  async isEmailVerificationVisible(): Promise<boolean> {
    return await this.emailVerificationSection.isVisible();
  }

  async isEmailChangeVisible(): Promise<boolean> {
    return await this.emailChangeSection.isVisible();
  }

  async waitForOtpForm(): Promise<void> {
    await this.otpInputs.first().waitFor({state: 'visible'});
  }

  // Дополнительные методы для работы с OTP
  async getOtpInputCount(): Promise<number> {
    return await this.otpInputs.count();
  }

  async clearOtp(): Promise<void> {
    const count = await this.getOtpInputCount();
    for (let i = 0; i < count; i++) {
      await this.otpInputs.nth(i).fill('');
    }
  }
}
