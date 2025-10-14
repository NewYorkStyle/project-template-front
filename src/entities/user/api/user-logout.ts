import {api} from '@shared';

export const userLogoutApi = (): Promise<void> => {
  return api.get('/auth/logOut');
};
