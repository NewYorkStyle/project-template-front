import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {
  Button,
  E_METRICS_NAMESPACES,
  Flex,
  Form,
  Input,
  Typography,
  designTokens,
  useModal,
} from '@shared';

import {profileStore} from '../../model';

import style from './delete-user.module.less';

export const DeleteUser = observer(() => {
  const {t} = useTranslation('User');
  const {closeModal, openModal} = useModal();
  const [form] = Form.useForm();

  const onFinish = (values: {password: string}) => {
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
      },
      onOk: () => {
        profileStore.deleteProfile(values.password);
        closeModal('user-delete-modal');
      },
      title: t('Profile.Delete.ConfirmationDialog.Header'),
      width: 500,
    });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Typography.Title level={4}>
        {t('Profile.Delete.Header')}
      </Typography.Title>
      <Flex vertical gap={designTokens.spacing.sm}>
        <Form.Item
          name='password'
          label={t('Profile.Delete.Password')}
          rules={[
            {
              message: t('Profile.Delete.PasswordRequired'),
              required: true,
            },
          ]}
        >
          <Input.Password
            className={style.input}
            placeholder={t('Profile.Delete.PasswordPlaceholder')}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            color='danger'
            variant='solid'
            htmlType='submit'
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
});
