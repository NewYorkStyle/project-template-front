import {api} from '../../../shared';

export const userLogout = async (): Promise<void> => {
  return api.get('/auth/logOut');
};
