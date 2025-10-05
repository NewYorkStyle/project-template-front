import {E_PERMISSIONS, api} from '../../../shared';

export const getPermissionsApi = (): Promise<E_PERMISSIONS[]> => {
  return api.get('/users/permissions');
};
