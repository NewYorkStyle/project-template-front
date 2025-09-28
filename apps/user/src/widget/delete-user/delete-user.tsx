import style from './delete-user.module.less';
import {profileStore} from '../../entities';
import {
  Button,
  Flex,
  Form,
  Input,
  Typography,
  designTokens,
  useModal,
} from '@common';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

export const DeleteUser = observer(() => {
  const {t} = useTranslation();
  const {closeModal, openModal} = useModal();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: {password: string}) => {
    openModal({
      content: t('Profile.Delete.ConfirmationDialog.Content'),
      id: 'user-delete-modal',
      okButtonProps: {color: 'danger', variant: 'solid'},
      onOk: () => {
        profileStore.deleteProfile(values.password, () => navigate('/auth'));
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
          >
            {t('Profile.Delete.Delete')}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
});
