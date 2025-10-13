import {api} from '@shared';

import {type TProfileData} from '../types';

export const geteProfileApi = (): Promise<TProfileData> => {
  return api.get<TProfileData>('/users/getProfile');
};
