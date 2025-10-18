import {type Page} from '@playwright/test';

import {setupAuthMocks} from './auth';
import {setupParamsMocks} from './params';
import {setupUsersMocks} from './user';

export const setupAllMocks = (page: Page) => {
  setupAuthMocks(page);
  setupUsersMocks(page);
  setupParamsMocks(page);
};
