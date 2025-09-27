import style from './personal-data.module.less';
import {profileStore} from '../../entities';
import {TProfileData} from '../../entities/models';
import {
  APLHABETIC,
  Button,
  Flex,
  Form,
  Input,
  Typography,
  designTokens,
} from '@common';
import isEqual from 'lodash/isEqual';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

export const PersonalData = observer(() => {
  const {t} = useTranslation();
  const {clear, getProfileData, initData, isLoading, saveData} = profileStore;
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    getProfileData();

    return () => clear();
  }, []);

  useEffect(() => {
    if (initData) {
      form.setFieldsValue(initData);
      setIsFormChanged(false);
    }
  }, [initData, form]);

  const handleFormChange = () => {
    const currentValues = form.getFieldsValue();
    const hasChanges = !isEqual(currentValues, initData);

    setIsFormChanged(hasChanges);
  };

  const handleSubmit = (values: TProfileData) => {
    saveData(values);
  };

  // Функция для фильтрации только букв
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Оставляем только русские и английские буквы, а также пробелы и дефисы
    return value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '');
  };

  return (
    <Form
      form={form}
      initialValues={initData}
      onFinish={handleSubmit}
      onFieldsChange={handleFormChange}
      className={style.form}
      requiredMark={false}
    >
      <Typography.Title level={4}>
        {t('Profile.PersonalData.Header')}
      </Typography.Title>

      <Flex vertical gap={designTokens.spacing.sm}>
        <Form.Item
          name='surname'
          label={t('Profile.PersonalData.Surname')}
          className={style.formItem}
          labelCol={{className: style.label}}
          rules={[
            {
              message: t('Profile.PersonalData.SurnameRequired'),
              required: true,
            },
            {
              message: t('Profile.PersonalData.OnlyLettersAllowed'),
              pattern: APLHABETIC,
            },
          ]}
        >
          <Input
            className={style.input}
            onChange={(e) => {
              const filteredValue = handleInputChange(e);
              // Обновляем значение в форме
              if (e.target.value !== filteredValue) {
                form.setFieldValue('surname', filteredValue);
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name='name'
          label={t('Profile.PersonalData.Name')}
          className={style.formItem}
          labelCol={{className: style.label}}
          rules={[
            {message: t('Profile.PersonalData.NameRequired'), required: true},
            {
              message: t('Profile.PersonalData.OnlyLettersAllowed'),
              pattern: APLHABETIC,
            },
          ]}
        >
          <Input
            className={style.input}
            onChange={(e) => {
              const filteredValue = handleInputChange(e);
              if (e.target.value !== filteredValue) {
                form.setFieldValue('name', filteredValue);
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name='patronymic'
          label={t('Profile.PersonalData.Patronymic')}
          className={style.formItem}
          labelCol={{className: style.label}}
          rules={[
            {
              message: t('Profile.PersonalData.OnlyLettersAllowed'),
              pattern: APLHABETIC,
            },
          ]}
        >
          <Input
            className={style.input}
            onChange={(e) => {
              const filteredValue = handleInputChange(e);
              if (e.target.value !== filteredValue) {
                form.setFieldValue('patronymic', filteredValue);
              }
            }}
          />
        </Form.Item>
      </Flex>

      <Form.Item className={style.submitButton}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={!isFormChanged || isLoading}
          loading={isLoading}
        >
          {t('Profile.PersonalData.Save')}
        </Button>
      </Form.Item>
    </Form>
  );
});
