import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {api, notificationService} from '@shared';

export const useVerifyEmail = () => {
  const {t} = useTranslation('User');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (otp: string) => api.post<void>('/users/verifyEmail', {otp}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['permissions']});
    },
    onError: () => {
      notificationService.error(
        t('Profile.PersonalData.EmailVerification.ErrorSend')
      );
    },
  });
};
