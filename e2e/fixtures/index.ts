export * from '@playwright/test';
import {test as base} from '@playwright/test';

import {AuthPage, HomePage, ProfilePage} from '../pages';
import {createTestUser, deleteTestUser, type TCreatedTestUser} from '../shared';

export type TFixtures = {
  authPage: AuthPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  testUser: TCreatedTestUser;
  createdUserIds: string[];
};

const waitForAppReady = async (page: any) => {
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('body', {state: 'attached'});
};

export const test = base.extend<TFixtures>({
  page: async ({page}, use) => {
    await waitForAppReady(page);
    await use(page);
  },

  authPage: async ({page}, use) => {
    await use(new AuthPage(page));
  },

  homePage: async ({page}, use) => {
    await use(new HomePage(page));
  },

  profilePage: async ({page}, use) => {
    await use(new ProfilePage(page));
  },

  testUser: async ({request}, use) => {
    const user = await createTestUser(request);

    try {
      await use(user);
    } finally {
      await deleteTestUser(request, user.id);
    }
  },

  createdUserIds: async ({request}, use) => {
    const ids: string[] = [];

    try {
      await use(ids);
    } finally {
      for (const id of ids) {
        try {
          await deleteTestUser(request, id);
        } catch (e) {
          console.warn(`Не удалось удалить пользователя: ${id}`);
        }
      }
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
