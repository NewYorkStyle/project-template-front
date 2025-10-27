import {useQuery} from '@tanstack/react-query';

import {api} from '@shared';

import {type TParam} from '../types';

export const useParams = () => {
  return useQuery<TParam, Error>({
    queryKey: ['params'],
    queryFn: () => api.get<TParam>('/common/params/getParams'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
