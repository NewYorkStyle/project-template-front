import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {useAuth} from '@entities';
import {api, APP_ROUTES, notificationService} from '@shared';

export const useSignIn = () => {
  const {t} = useTranslation('Auth');
  const queryClient = useQueryClient();
  const {setUserLogged} = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: {username: string; password: string}) =>
      api.post<void>('/auth/signIn', values),
    onSuccess: () => {
      setUserLogged(true);
      queryClient.invalidateQueries({queryKey: ['permissions']});
      navigate(APP_ROUTES.HOME.ROOT, {replace: true});
    },
    onError: () => {
      notificationService.error(t('Authentication.SignIn.AuthError'));
    },
  });
};
