import {api} from '../../shared/utils/api';
import {TParam} from '../models/params.types';

export const userLogout = async (): Promise<TParam> => {
  return api.get<TParam>('/auth/logOut');
};
