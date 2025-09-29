import {TProfileData} from '../types';
import {api} from '@common';

export const geteProfileApi = (): Promise<TProfileData> => {
  return api.get<TProfileData>('/users/getProfile');
};
