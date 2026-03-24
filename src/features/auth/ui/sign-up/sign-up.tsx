import {zodResolver} from '@hookform/resolvers/zod';
import {Form, Input, Popover} from '@new_york_style/project-template-ui';
import {useForm} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';

import {
  Button,
  E_METRICS_NAMESPACES,
  Typography,
  useWindowSize,
  designTokens,
} from '@shared';

import {useSignUp} from '../../api';
import {PASSWORD_MIN_LENGTH} from '../../lib';
import {createSignUpSchema} from '../../model/sing-up.schema';
import {type TSignUpFormValues} from '../../types';

import style from './sing-up.module.scss';

export const SignUp = () => {
  const {t} = useTranslation('Auth');
  const {isPending: isLoading, mutate: signUp} = useSignUp();
  const {width} = useWindowSize();
  const signUpSchema = createSignUpSchema(t);

  const initialValues: TSignUpFormValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const onSubmit = (values: TSignUpFormValues) => {
    signUp(values);
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
          <Input placeholder={t('Authentication.SignUp.LoginPlaceholder')} />
        </FormItem>
        <FormItem control={control} name='email'>
          <Input placeholder={t('Authentication.SignUp.EmailPlaceholder')} />
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
            />
          </FormItem>
        </Popover>

        <FormItem control={control} name='passwordConfirm'>
          <Input.Password
            visibilityToggle
            placeholder={t('Authentication.SignUp.PasswordConfirmPlaceholder')}
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
          >
            {t('Authentication.SignUp.Label')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
