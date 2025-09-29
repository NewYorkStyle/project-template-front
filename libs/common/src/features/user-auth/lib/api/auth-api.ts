import {api} from '../../../../shared';
import {TParam} from '../../../params-management';

export const userLogout = async (): Promise<TParam> => {
  return api.get<TParam>('/auth/logOut');
};

export const refreshToken = async (): Promise<string> => {
  return api.get<string>('/auth/refresh');
};
