import {api} from '@shared';

import {type TProfileData} from '../types';

export const updateProfileApi = (data: TProfileData): Promise<TProfileData> => {
  return api.post<TProfileData>('/users/update', data);
};
