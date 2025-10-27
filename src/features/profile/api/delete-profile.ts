import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {useAuth} from '@entities';
import {api, notificationService} from '@shared';

export const useDeleteProfile = () => {
  const {t} = useTranslation('User');
  const queryClient = useQueryClient();
  const {clearAuth} = useAuth();

  return useMutation({
    mutationFn: (password: string) =>
      api.post<string>('/users/delete', {password}),

    onSuccess: () => {
      queryClient.removeQueries({queryKey: ['profile']});

      notificationService.success(t('Profile.Delete.Successfully'));

      clearAuth();
    },

    onError: () => {
      notificationService.error(t('Profile.Delete.Error'));
    },
  });
};
