import {useQuery} from '@tanstack/react-query';

import {api} from '@shared';

import {type TProfileData} from '../types';

export const useProfile = () => {
  return useQuery<TProfileData, Error>({
    queryKey: ['profile'],
    queryFn: () => api.get<TProfileData>('/users/getProfile'),
  });
};
