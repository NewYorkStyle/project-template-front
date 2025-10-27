import {useEffect} from 'react';

import {useQuery} from '@tanstack/react-query';

import {api, notificationService} from '@shared';

import {type E_PERMISSIONS} from '../lib';

export const usePermissions = () => {
  const queryResult = useQuery<E_PERMISSIONS[], Error>({
    queryKey: ['permissions'],
    queryFn: () => api.get<E_PERMISSIONS[]>('/users/permissions'),
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (queryResult.error) {
      notificationService.error(queryResult.error.message);
    }
  }, [queryResult.error]);

  return queryResult;
};
