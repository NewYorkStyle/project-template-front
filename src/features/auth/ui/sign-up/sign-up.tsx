import {zodResolver} from '@hookform/resolvers/zod';
import {Form, Input, Popover} from '@new_york_style/project-template-ui';
import {useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {useAuthControllerSignUp} from '@api/endpoints/auth';
import {
  getUsersControllerFindByIdQueryKey,
  getUsersControllerGetMyPermissionsQueryKey,
} from '@api/endpoints/users';
import {useAuth} from '@entities';
import {
  APP_ROUTES,
  authStorage,
  Button,
  E_METRICS_NAMESPACES,
  TEST_IDS,
  Typography,
  notificationService,
  useWindowSize,
  designTokens,
} from '@shared';

import {PASSWORD_MIN_LENGTH} from '../../lib';
import {createSignUpSchema} from '../../model/sing-up.schema';
import {type TSignUpFormValues} from '../../types';

import style from './sing-up.module.scss';

export const SignUp = () => {
  const {t} = useTranslation('Auth');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {setUserLogged} = useAuth();

  const {isPending: isLoading, mutate: signUp} = useAuthControllerSignUp({
    mutation: {
      onSuccess: (data) => {
        if (typeof data?.userId === 'string') {
          authStorage.setUserId(data.userId);
        }
        setUserLogged(true);
        queryClient.invalidateQueries({
          queryKey: getUsersControllerGetMyPermissionsQueryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: getUsersControllerFindByIdQueryKey(),
        });
        navigate(APP_ROUTES.HOME.ROOT, {replace: true});
      },
      onError: () => {
        notificationService.error(t('Authentication.SignUp.AuthError'));
      },
    },
  });
  const {width} = useWindowSize();
  const signUpSchema = createSignUpSchema(t);

  const initialValues: TSignUpFormValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const onSubmit = (values: TSignUpFormValues) => {
    const {email, password, username} = values;

    signUp({
      data: {email, password, username},
    });
  };

  const {control, handleSubmit} = useForm<TSignUpFormValues>({
    defaultValues: initialValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div className={style.root}>
      <Form<TSignUpFormValues>
        name='sign-up'
        onFinish={() => void handleSubmit(onSubmit)()}
        autoComplete='off'
        disabled={isLoading}
      >
        <FormItem control={control} name='username'>
          <Input
            placeholder={t('Authentication.SignUp.LoginPlaceholder')}
            data-testid={TEST_IDS.REGISTER.USER_NAME}
          />
        </FormItem>
        <FormItem control={control} name='email'>
          <Input
            placeholder={t('Authentication.SignUp.EmailPlaceholder')}
            data-testid={TEST_IDS.REGISTER.EMAIL}
          />
        </FormItem>
        <Popover
          trigger='focus'
          placement={
            width < designTokens.breakpoints.tabletLg ? 'top' : 'right'
          }
          content={
            <>
              <Typography.Text>
                {t('Authentication.SignUp.PasswordSuggestions.Header')}
              </Typography.Text>
              <ul>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.LowerCase')}
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.UpperCase')}
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.Numeric')}
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.MinLength', {
                      minLength: PASSWORD_MIN_LENGTH,
                    })}
                  </Typography.Text>
                </li>
              </ul>
            </>
          }
        >
          {/**
           * Прикол antd - если обернуть Form.Item в Popover, он улетает в верхний левый угол (видимо улетает на body)
           * Если обернуть Input, то Popover становится потомком Item и считывается его значение, а не инпута.
           * Решение - внутрь Popover кладётся див рядом с Form.Item, который и является тригером
           */}
          <div style={{position: 'relative'}} />
          <FormItem control={control} name='password'>
            <Input.Password
              visibilityToggle
              placeholder={t('Authentication.SignUp.PasswordPlaceholder')}
              data-testid={TEST_IDS.REGISTER.PASSWORD}
            />
          </FormItem>
        </Popover>

        <FormItem control={control} name='passwordConfirm'>
          <Input.Password
            visibilityToggle
            placeholder={t('Authentication.SignUp.PasswordConfirmPlaceholder')}
            data-testid={TEST_IDS.REGISTER.PASSWORD_CONFIRM}
          />
        </FormItem>
        <Form.Item noStyle>
          <Button
            className={style.submitButton}
            analyticProps={{
              label: 'Sign up button',
              namespace: E_METRICS_NAMESPACES.AUTH,
            }}
            htmlType='submit'
            loading={isLoading}
            data-testid={TEST_IDS.AUTH.SIGN_UP}
          >
            {t('Authentication.SignUp.Label')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
