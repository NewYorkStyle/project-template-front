import {type Rule} from 'antd/es/form';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {
  Button,
  E_METRICS_NAMESPACES,
  Form,
  Input,
  Popover,
  Typography,
} from '@shared';

import {PASSWORD_MIN_LENGTH} from '../lib';
import {signUpStore} from '../model';
import {type TSignUpFormValues} from '../types';

import style from './sing-up.module.less';

export const SignUp = observer(() => {
  const {t} = useTranslation('Auth');
  const {isLoading} = signUpStore;

  const initialValues: TSignUpFormValues = {
    email: '',
    login: '',
    password: '',
    passwordConfirm: '',
  };

  const handleSubmit = (values: TSignUpFormValues) => {
    signUpStore.signUp(values);
  };

  const passwordValidator = (_: Rule, value: string): Promise<void> => {
    let error = false;

    if (!value) {
      return Promise.reject(
        new Error(t('Authentication.SignUp.Rules.PasswordRequired'))
      );
    }

    // Проверка минимальной длины
    if (value.length < PASSWORD_MIN_LENGTH) {
      error = true;
    }

    // Проверка на наличие символа в нижнем регистре
    if (!/(?=.*[a-z])/.test(value)) {
      error = true;
    }

    // Проверка на наличие символа в верхнем регистре
    if (!/(?=.*[A-Z])/.test(value)) {
      error = true;
    }

    // Проверка на наличие цифры
    if (!/(?=.*\d)/.test(value)) {
      error = true;
    }

    if (error) {
      return Promise.reject(
        new Error(t('Authentication.SignUp.Rules.PasswordRules'))
      );
    }

    return Promise.resolve();
  };

  return (
    <div className={style.root}>
      <Form<TSignUpFormValues>
        name='sign-up'
        initialValues={initialValues}
        onFinish={handleSubmit}
        autoComplete='off'
        disabled={isLoading}
      >
        <Form.Item
          name='login'
          rules={[
            {
              message: t('Authentication.SignUp.Rules.LoginRequired'),
              required: true,
            },
          ]}
        >
          <Input placeholder={t('Authentication.SignUp.LoginPlaceholder')} />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            {
              message: t('Authentication.SignUp.Rules.EmailRequired'),
              required: true,
            },
            {
              message: t('Authentication.SignUp.Rules.EmailRules'),
              type: 'email',
            },
          ]}
        >
          <Input placeholder={t('Authentication.SignUp.EmailPlaceholder')} />
        </Form.Item>

        <Form.Item name='password' rules={[{validator: passwordValidator}]}>
          <Popover
            trigger='focus'
            placement='right'
            getPopupContainer={(trigger) =>
              trigger.parentElement || document.body
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
                      {t(
                        'Authentication.SignUp.PasswordSuggestions.MinLength',
                        {
                          minLength: PASSWORD_MIN_LENGTH,
                        }
                      )}
                    </Typography.Text>
                  </li>
                </ul>
              </>
            }
          >
            <Input.Password
              visibilityToggle
              placeholder={t('Authentication.SignUp.PasswordPlaceholder')}
            />
          </Popover>
        </Form.Item>

        <Form.Item
          name='passwordConfirm'
          dependencies={['password']}
          rules={[
            {
              message: t('Authentication.SignUp.Rules.PasswordConfirmRequired'),
              required: true,
            },
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    t('Authentication.SignUp.Rules.PasswordConfirmRules')
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password
            visibilityToggle
            placeholder={t('Authentication.SignUp.PasswordConfirmPlaceholder')}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            className={style.submitButton}
            analyticProps={{
              label: 'Sign up button',
              namespace: E_METRICS_NAMESPACES.AUTH,
            }}
            htmlType='submit'
          >
            {t('Authentication.SignUp.Label')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});
