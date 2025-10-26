/* eslint-disable no-empty-pattern */
import {test as base} from '@playwright/test';

import {setupAllMocks} from '../mocks/handlers';
import {AuthPage, HomePage, ProfilePage} from '../pages';
import {testUsers} from '../shared';

export type TFixtures = {
  authPage: AuthPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  testUsers: typeof testUsers;
};

async function waitForAppReady(page: any) {
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('body', {state: 'attached'});
}

export const test = base.extend<TFixtures>({
  page: async ({page}, use) => {
    setupAllMocks(page);
    await waitForAppReady(page);
    await use(page);
  },

  authPage: async ({page}, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);
  },

  homePage: async ({page}, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  profilePage: async ({page}, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  testUsers: async ({}, use) => {
    await use(testUsers);
  },
});

export {expect} from '@playwright/test';
