import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {Button, E_METRICS_NAMESPACES, Form, Input} from '@shared';

import {signInStore} from '../model';
import {type TSignInFormValues} from '../types';

import style from './sing-in.module.less';

export const SignIn = observer(() => {
  const {t} = useTranslation('Auth');
  const {isLoading, signIn} = signInStore;

  const handleSubmit = (values: TSignInFormValues) => {
    signIn(values);
  };

  const initialValues: TSignInFormValues = {
    login: '',
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
          name='login'
          rules={[
            {
              message: t('Authentication.SignIn.LoginRequired'),
              required: true,
            },
          ]}
        >
          <Input placeholder={t('Authentication.SignIn.LoginPlaceholder')} />
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
          >
            {t('Authentication.SignIn.Label')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
