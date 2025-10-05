import style from './personal-data.module.less';
import {profileStore} from '../../model';
import {TProfileData} from '../../types';
import {
  APLHABETIC,
  Button,
  Divider,
  E_METRICS_NAMESPACES,
  Flex,
  Form,
  Input,
  Statistic,
  Typography,
  designTokens,
} from '@common';
import isEqual from 'lodash/isEqual';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

export const PersonalData = observer(() => {
  const {t} = useTranslation();
  const {
    clear,
    emailVerificationState,
    getOtp,
    getProfileData,
    initData,
    isLoading,
    saveData,
    sendOtp,
  } = profileStore;
  const [userForm] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    getProfileData();

    return () => clear();
  }, []);

  useEffect(() => {
    if (initData) {
      userForm.setFieldsValue(initData);
      setIsFormChanged(false);
    }
  }, [initData, userForm]);

  const handleFormChange = () => {
    const currentValues = userForm.getFieldsValue();
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

  const handleGetOtpClick = () => {
    getOtp();
    setTimerFinished(false);
  };

  const handleSubmitOtp = (values: {otp: string}) => {
    sendOtp(values.otp);
  };

  const getEmailVerifySection = () => {
    switch (emailVerificationState) {
      case 'button':
        return (
          <Button
            onClick={handleGetOtpClick}
            disabled={isLoading}
            loading={isLoading}
            analyticProps={{
              label: 'Get OTP button',
              namespace: E_METRICS_NAMESPACES.AUTH,
            }}
          >
            {t('Profile.PersonalData.EmailVerification.Verify')}
          </Button>
        );

      case 'otp':
        return (
          <>
            <Form onFinish={handleSubmitOtp}>
              <Flex vertical gap={designTokens.spacing.xs} align='flex-start'>
                <Typography.Text>
                  {t('Profile.PersonalData.EmailVerification.OtpLabel')}
                </Typography.Text>
                <Flex gap={designTokens.spacing.sm} align='center'>
                  <Form.Item noStyle rules={[{required: true}]} name='otp'>
                    <Input.OTP length={6} disabled={timerFinished} />
                  </Form.Item>
                  <Statistic.Timer
                    type='countdown'
                    value={Date.now() + 300000}
                    format='mm:ss'
                    onFinish={() => setTimerFinished(true)}
                  />
                </Flex>
                <Flex gap={designTokens.spacing.sm}>
                  <Button
                    htmlType='submit'
                    disabled={timerFinished}
                    analyticProps={{
                      label: 'Send OTP button',
                      namespace: E_METRICS_NAMESPACES.AUTH,
                    }}
                  >
                    {t('Profile.PersonalData.EmailVerification.Submit')}
                  </Button>
                  {timerFinished && (
                    <Button
                      onClick={handleGetOtpClick}
                      disabled={isLoading}
                      loading={isLoading}
                      analyticProps={{
                        label: 'Get new OTP button',
                        namespace: E_METRICS_NAMESPACES.AUTH,
                      }}
                    >
                      {t('Profile.PersonalData.EmailVerification.SendNew')}
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Form
        form={userForm}
        initialValues={initData}
        onFinish={handleSubmit}
        onFieldsChange={handleFormChange}
        className={style.form}
        requiredMark={false}
      >
        <Typography.Title level={4}>
          {t('Profile.PersonalData.Header')}
        </Typography.Title>

        <Flex vertical gap={designTokens.spacing.sm} align='flex-start'>
          <Form.Item
            name='surname'
            label={t('Profile.PersonalData.Surname')}
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
              onChange={(e) => {
                const filteredValue = handleInputChange(e);
                // Обновляем значение в форме
                if (e.target.value !== filteredValue) {
                  userForm.setFieldValue('surname', filteredValue);
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name='name'
            label={t('Profile.PersonalData.Name')}
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
              onChange={(e) => {
                const filteredValue = handleInputChange(e);
                if (e.target.value !== filteredValue) {
                  userForm.setFieldValue('name', filteredValue);
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name='patronymic'
            label={t('Profile.PersonalData.Patronymic')}
            labelCol={{className: style.label}}
            rules={[
              {
                message: t('Profile.PersonalData.OnlyLettersAllowed'),
                pattern: APLHABETIC,
              },
            ]}
          >
            <Input
              onChange={(e) => {
                const filteredValue = handleInputChange(e);
                if (e.target.value !== filteredValue) {
                  userForm.setFieldValue('patronymic', filteredValue);
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
            analyticProps={{
              label: 'Save button',
              namespace: E_METRICS_NAMESPACES.AUTH,
            }}
          >
            {t('Profile.PersonalData.Save')}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      {getEmailVerifySection()}
    </>
  );
});
