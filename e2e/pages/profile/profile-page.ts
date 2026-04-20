import {type Locator, type Page} from '@playwright/test';

import {APP_ROUTES, TEST_IDS} from '../../shared';
import {BasePage} from '../base';

import {
  ChangePasswordSection,
  DangerZone,
  EmailSection,
  ProfileInfoSection,
} from './components';

export class ProfilePage extends BasePage {
  readonly changePasswordSection: ChangePasswordSection;
  readonly deleteTab: Locator;
  readonly emailSection: EmailSection;
  readonly passwordTab: Locator;
  readonly personalDataTab: Locator;
  readonly profileInfo: ProfileInfoSection;
  readonly dangerZone: DangerZone;

  constructor(page: Page) {
    super(page);

    this.changePasswordSection = new ChangePasswordSection(page);
    this.emailSection = new EmailSection(page);
    this.profileInfo = new ProfileInfoSection(page);
    this.dangerZone = new DangerZone(page);
    this.personalDataTab = this.page.locator(
      `[data-testid="${TEST_IDS.USER.TAB_PERSONAL_DATA}"]`
    );
    this.passwordTab = this.page.locator(
      `[data-testid="${TEST_IDS.USER.TAB_PASSWORD}"]`
    );
    this.deleteTab = this.page.locator(
      `[data-testid="${TEST_IDS.USER.TAB_DELETE}"]`
    );
  }

  async open(): Promise<void> {
    await this.goto(APP_ROUTES.USER.ROOT);
    await this.expectProfileLoaded();
  }

  async expectProfileLoaded(): Promise<void> {
    await this.profileInfo.waitForVisible();
  }

  isOnProfilePage(): boolean {
    const currentUrl = this.getUrl();
    return currentUrl.includes(APP_ROUTES.USER.ROOT);
  }

  async switchToDeleteTab(): Promise<void> {
    await this.deleteTab.click();
    await this.dangerZone.waitForVisible();
  }

  async switchToPersonalDataTab(): Promise<void> {
    await this.personalDataTab.click();
    await this.profileInfo.waitForVisible();
  }

  async switchToPasswordTab(): Promise<void> {
    await this.passwordTab.click();
    await this.changePasswordSection.waitForVisible();
  }

  isOnLoginPage(): boolean {
    const currentUrl = this.getUrl();
    return currentUrl.includes(APP_ROUTES.AUTH.ROOT);
  }
}
