import {api} from '@shared';

import {type E_PERMISSIONS} from '../lib';

export const getPermissionsApi = (): Promise<E_PERMISSIONS[]> => {
  return api.get('/users/permissions');
};
