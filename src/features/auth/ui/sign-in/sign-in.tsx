import {useTranslation} from 'react-i18next';

import {Button, E_METRICS_NAMESPACES, Form, Input, TEST_IDS} from '@shared';

import {useSignIn} from '../../api';
import {type TSignInFormValues} from '../../types';

import style from './sing-in.module.less';

export const SignIn = () => {
  const {t} = useTranslation('Auth');
  const {isPending: isLoading, mutate: signIn} = useSignIn();

  const handleSubmit = (values: TSignInFormValues) => {
    signIn(values);
  };

  const initialValues: TSignInFormValues = {
    username: '',
    password: '',
  };

  return (
    <div className={style.root}>
      <Form<TSignInFormValues>
        name='sign-in'
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete='off'
        disabled={isLoading}
      >
        <Form.Item
          name='username'
          rules={[
            {
              message: t('Authentication.SignIn.LoginRequired'),
              required: true,
            },
          ]}
        >
          <Input
            placeholder={t('Authentication.SignIn.LoginPlaceholder')}
            data-testid={TEST_IDS.AUTH.USER_NAME}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              message: t('Authentication.SignIn.PasswordRequired'),
              required: true,
            },
          ]}
        >
          <Input.Password
            visibilityToggle
            placeholder={t('Authentication.SignIn.PasswordPlaceholder')}
            data-testid={TEST_IDS.AUTH.PASSWORD}
          />
        </Form.Item>
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
