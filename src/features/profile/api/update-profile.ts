import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {api, notificationService} from '@shared';

import {type TProfileData} from '../types';

export const useUpdateProfile = () => {
  const {t} = useTranslation('User');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TProfileData) =>
      api.post<TProfileData>('/users/update', data),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['profile'], updatedData);

      notificationService.success(
        t('Profile.PersonalData.SuccessfulySaveData')
      );
    },
    onError: () => {
      notificationService.error(t('Profile.PersonalData.ErrorSaveData'));
    },
  });
};
