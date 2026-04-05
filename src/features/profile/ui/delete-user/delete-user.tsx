import {zodResolver} from '@hookform/resolvers/zod';
import {Flex, Form, Input} from '@new_york_style/project-template-ui';
import {useForm} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';

import {
  Button,
  E_METRICS_NAMESPACES,
  Typography,
  designTokens,
  useModal,
} from '@shared';
import {useUsersControllerRemove} from '@shared/api/generated/endpoints/users';

import {createDeleteUserSchema} from '../../model';
import {type TDeleteUserFormValues} from '../../types';

import style from './delete-user.module.scss';

export const DeleteUser = () => {
  const {t} = useTranslation('User');
  const {closeModal, openModal} = useModal();
  const deleteUserSchema = createDeleteUserSchema(t);

  const {isPending: isDeleting, mutate: deleteProfile} =
    useUsersControllerRemove();

  const onSubmit = (values: TDeleteUserFormValues) => {
    openModal({
      cancelButtonProps: {
        analyticProps: {
          label: 'Delete profile cancel',
          namespace: E_METRICS_NAMESPACES.USER,
        },
      },
      content: t('Profile.Delete.ConfirmationDialog.Content'),
      id: 'user-delete-modal',
      okButtonProps: {
        analyticProps: {
          label: 'Delete profile confirm',
          namespace: E_METRICS_NAMESPACES.USER,
        },
        color: 'danger',
        variant: 'solid',
        loading: isDeleting,
      },
      onOk: () => {
        deleteProfile({data: {...values}});
        closeModal('user-delete-modal');
      },
      title: t('Profile.Delete.ConfirmationDialog.Header'),
      width: 500,
    });
  };

  const {control, handleSubmit} = useForm<TDeleteUserFormValues>({
    defaultValues: {password: ''},
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(deleteUserSchema),
  });

  return (
    <Form onFinish={() => void handleSubmit(onSubmit)()}>
      <Typography.Title level={4}>
        {t('Profile.Delete.Header')}
      </Typography.Title>
      <Flex vertical gap={designTokens.spacing.sm}>
        <FormItem
          control={control}
          name='password'
          label={t('Profile.Delete.Password')}
        >
          <Input.Password
            className={style.input}
            placeholder={t('Profile.Delete.PasswordPlaceholder')}
          />
        </FormItem>
        <Form.Item>
          <Button
            type='primary'
            color='danger'
            variant='solid'
            htmlType='submit'
            loading={isDeleting}
            analyticProps={{
              label: 'Delete profile button',
              namespace: E_METRICS_NAMESPACES.USER,
            }}
          >
            {t('Profile.Delete.Delete')}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
