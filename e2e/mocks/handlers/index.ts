import {setupAuthMocks} from './auth';
import {setupParamsMocks} from './params';
import {setupUsersMocks} from './user';

export const setupAllMocks = (page: any) => {
  setupAuthMocks(page);
  setupUsersMocks(page);
  setupParamsMocks(page);
};
