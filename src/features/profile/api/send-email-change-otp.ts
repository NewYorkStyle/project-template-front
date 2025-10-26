import {useMutation} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {api, notificationService} from '@shared';

export const useConfirmEmailChange = () => {
  const {t} = useTranslation('User');

  return useMutation({
    mutationFn: (otp: string) => api.post<void>('/users/emailChange', {otp}),

    onSuccess: () => {
      notificationService.success(
        t('Profile.PersonalData.ChangeEmail.EmailChanged')
      );
    },

    onError: () => {
      notificationService.error(
        t('Profile.PersonalData.ChangeEmail.ErrorSend')
      );
    },
  });
};
