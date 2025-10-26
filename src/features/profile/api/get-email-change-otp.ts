import {useMutation} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {api, notificationService} from '@shared';

export const useRequestEmailChange = () => {
  const {t} = useTranslation('User');

  return useMutation({
    mutationFn: (newEmail: string) =>
      api.post<void>('/users/emailChangeRequest', {newEmail}),
    onError: () => {
      notificationService.error(t('Profile.PersonalData.ChangeEmail.ErrorGet'));
    },
  });
};
