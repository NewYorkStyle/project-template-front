import {zodResolver} from '@hookform/resolvers/zod';
import {Form, Input} from '@new_york_style/project-template-ui';
import {useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {useAuthControllerSignIn} from '@api/endpoints/auth';
import {useAuth} from '@entities';
import {
  APP_ROUTES,
  authStorage,
  Button,
  E_METRICS_NAMESPACES,
  TEST_IDS,
  notificationService,
} from '@shared';

import {createSignInSchema} from '../../model/sign-in.schema';
import {type TSignInFormValues} from '../../types';

import style from './sing-in.module.scss';

export const SignIn = () => {
  const {t} = useTranslation('Auth');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {setUserLogged} = useAuth();

  const {isPending: isLoading, mutate: signIn} = useAuthControllerSignIn({
    mutation: {
      onSuccess: (data) => {
        if (typeof data?.userId === 'string') {
          authStorage.setUserId(data.userId);
        }
        setUserLogged(true);
        queryClient.invalidateQueries({queryKey: ['permissions']});
        navigate(APP_ROUTES.HOME.ROOT, {replace: true});
      },
      onError: () => {
        notificationService.error(t('Authentication.SignIn.AuthError'));
      },
    },
  });
  const signInSchema = createSignInSchema(t);

  const onSubmit = (values: TSignInFormValues) => {
    signIn({data: values});
  };

  const initialValues: TSignInFormValues = {
    username: '',
    password: '',
  };
  const {control, handleSubmit} = useForm<TSignInFormValues>({
    defaultValues: initialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  return (
    <div className={style.root}>
      <Form<TSignInFormValues>
        name='sign-in'
        onFinish={() => void handleSubmit(onSubmit)()}
        autoComplete='off'
        disabled={isLoading}
      >
        <FormItem control={control} name='username'>
          <Input
            placeholder={t('Authentication.SignIn.LoginPlaceholder')}
            data-testid={TEST_IDS.AUTH.USER_NAME}
          />
        </FormItem>
        <FormItem control={control} name='password'>
          <Input.Password
            visibilityToggle
            placeholder={t('Authentication.SignIn.PasswordPlaceholder')}
            data-testid={TEST_IDS.AUTH.PASSWORD}
          />
        </FormItem>
        <Form.Item noStyle>
          <Button
            className={style.submitButton}
            analyticProps={{
              label: 'Sign in button',
              namespace: E_METRICS_NAMESPACES.AUTH,
            }}
            htmlType='submit'
            loading={isLoading}
            data-testid={TEST_IDS.AUTH.SIGN_IN}
          >
            {t('Authentication.SignIn.Label')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
