import {TProfileData} from '../models';
import {api} from '@common';

export const updateProfileApi = (data: TProfileData): Promise<TProfileData> => {
  return api.post<TProfileData>('/users/update', data);
};
