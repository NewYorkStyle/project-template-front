export * from '@playwright/test';
import {test as base} from '@playwright/test';

import {AuthPage, HomePage, ProfilePage} from '../pages';
import {createTestUser, deleteTestUser, type TCreatedTestUser} from '../shared';

export type TFixtures = {
  authPage: AuthPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  testUser: TCreatedTestUser;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function waitForAppReady(page: any) {
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('body', {state: 'attached'});
}

export const test = base.extend<TFixtures>({
  page: async ({page}, use) => {
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

  testUser: async ({request}, use) => {
    const user = await createTestUser(request);

    try {
      await use(user);
    } finally {
      await deleteTestUser(request, user.email);
    }
  },
});

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.beforeEach(async ({context}) => {
  await context.clearCookies();
});

test.afterEach(async ({context}) => {
  await context.clearCookies();
});
