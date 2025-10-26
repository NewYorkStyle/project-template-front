import {useMutation} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {api, notificationService} from '@shared';

export const useRequestEmailVerification = () => {
  const {t} = useTranslation('User');

  return useMutation({
    mutationFn: () => api.get<void>('/users/requestEmailVerification'),
    onError: () => {
      notificationService.error(
        t('Profile.PersonalData.EmailVerification.ErrorGet')
      );
    },
  });
};
