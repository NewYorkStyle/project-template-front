import {zodResolver} from '@hookform/resolvers/zod';
import {Flex, Form, Input, Popover} from '@new_york_style/project-template-ui';
import {isAxiosError} from 'axios';
import {useForm} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';

import {useUsersControllerChangePassword} from '@api/endpoints/users';
import {
  Button,
  E_METRICS_NAMESPACES,
  TEST_IDS,
  Typography,
  designTokens,
  notificationService,
  useWindowSize,
} from '@shared';

import {createChangePasswordSchema} from '../../model';
import {type TChangePasswordFormValues} from '../../types';

import style from './change-password.module.scss';

const PASSWORD_HINT_MIN_LENGTH = 8;

export const ChangePassword = () => {
  const {t} = useTranslation(['User', 'Auth']);
  const {width} = useWindowSize();
  const changePasswordSchema = createChangePasswordSchema(t);

  const {control, handleSubmit, reset} = useForm<TChangePasswordFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(changePasswordSchema),
  });

  const {isPending: isChanging, mutate: changePassword} =
    useUsersControllerChangePassword({
      mutation: {
        onSuccess: () => {
          notificationService.success(t('Profile.ChangePassword.Success'));
          reset({
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          });
        },
        onError: (error) => {
          let message = t('Profile.ChangePassword.Error');
          if (isAxiosError(error)) {
            const data = error.response?.data;
            if (typeof data === 'string' && data.trim()) {
              message = data;
            }
          }
          notificationService.error(message);
        },
      },
    });

  const onSubmit = ({
    currentPassword,
    newPassword,
  }: TChangePasswordFormValues) => {
    changePassword({data: {currentPassword, newPassword}});
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Typography.Title level={4}>
        {t('Profile.ChangePassword.Header')}
      </Typography.Title>

      <Flex vertical gap={designTokens.spacing.sm} align='flex-start'>
        <FormItem
          control={control}
          name='currentPassword'
          label={t('Profile.ChangePassword.CurrentPassword')}
          labelCol={{className: style.label}}
        >
          <Input.Password
            className={style.input}
            visibilityToggle
            data-testid={TEST_IDS.USER.CHANGE_PASSWORD_CURRENT}
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
                {t('Authentication.SignUp.PasswordSuggestions.Header', {
                  ns: 'Auth',
                })}
              </Typography.Text>
              <ul>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.LowerCase', {
                      ns: 'Auth',
                    })}
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.UpperCase', {
                      ns: 'Auth',
                    })}
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.Numeric', {
                      ns: 'Auth',
                    })}
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text>
                    {t('Authentication.SignUp.PasswordSuggestions.MinLength', {
                      ns: 'Auth',
                      minLength: PASSWORD_HINT_MIN_LENGTH,
                    })}
                  </Typography.Text>
                </li>
              </ul>
            </>
          }
        >
          <div style={{position: 'relative'}} />
          <FormItem
            control={control}
            name='newPassword'
            label={t('Profile.ChangePassword.NewPassword')}
            labelCol={{className: style.label}}
          >
            <Input.Password
              className={style.input}
              visibilityToggle
              data-testid={TEST_IDS.USER.CHANGE_PASSWORD_NEW}
            />
          </FormItem>
        </Popover>

        <FormItem
          control={control}
          name='newPasswordConfirm'
          label={t('Profile.ChangePassword.ConfirmPassword')}
          labelCol={{className: style.label}}
        >
          <Input.Password
            className={style.input}
            visibilityToggle
            data-testid={TEST_IDS.USER.CHANGE_PASSWORD_CONFIRM}
          />
        </FormItem>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={isChanging}
            data-testid={TEST_IDS.USER.CHANGE_PASSWORD_SUBMIT}
            analyticProps={{
              label: 'Change password submit',
              namespace: E_METRICS_NAMESPACES.USER,
            }}
          >
            {t('Profile.ChangePassword.Submit')}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
