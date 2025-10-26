import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

import {api, APP_ROUTES, notificationService} from '@shared';

import {useAuth} from '../lib';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const {clearAuth} = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.get<void>('/auth/logout'),
    onSuccess: () => {
      queryClient.clear();
      clearAuth();
      navigate(APP_ROUTES.AUTH.ROOT, {replace: true});
    },
    onError: (error) => {
      notificationService.error(error.message);
      queryClient.clear();
      clearAuth();
      navigate(APP_ROUTES.AUTH.ROOT, {replace: true});
    },
  });
};
