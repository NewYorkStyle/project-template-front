import style from './personal-data.module.less';
import {OTP} from '../../../../widgets';
import {profileStore} from '../../model';
import {TProfileData} from '../../types';
import {
  APLHABETIC,
  Button,
  Divider,
  EMAIL,
  E_METRICS_NAMESPACES,
  E_PERMISSIONS,
  Flex,
  Form,
  Input,
  Typography,
  designTokens,
  userStore,
} from '@common';
import isEqual from 'lodash/isEqual';
import {observer} from 'mobx-react-lite';
import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';

export const PersonalData = observer(() => {
  const {t} = useTranslation();
  const {
    clear,
    emailFieldStep,
    getEmailChangeOtp,
    getProfileData,
    getVerificationOtp,
    initData,
    isLoading,
    saveData,
    sendEmailChangeOtp,
    sendVerificationOtp,
  } = profileStore;

  const [personalDataForm] = Form.useForm();
  const [emailForm] = Form.useForm();

  const isEmailVerified = useMemo(
    () => userStore.permissions.includes(E_PERMISSIONS.EMAIL_VERIFIED),
    [userStore.permissions]
  );

  const [isPersonalDataFormChanged, setIsPersonalDataFormChanged] =
    useState(false);
  const [isEmailChangeButtonDisabled, setIsEmailChangeButtonDisabled] =
    useState(true);

  useEffect(() => {
    getProfileData();

    return () => clear();
  }, []);

  useEffect(() => {
    if (initData) {
      personalDataForm.setFieldsValue(initData);
      setIsPersonalDataFormChanged(false);
    }
  }, [initData, personalDataForm]);

  const handleFormChange = () => {
    const currentValues = personalDataForm.getFieldsValue();
    const hasChanges = !isEqual(currentValues, initData);

    setIsPersonalDataFormChanged(hasChanges);
  };

  const handleSubmit = (values: TProfileData) => {
    saveData(values);
  };

  // Функция для фильтрации только букв
  const handleValidateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Оставляем только русские и английские буквы, а также пробелы и дефисы
    return value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '');
  };

  const handleEmailVerificationGetOtpClick = () => {
    getVerificationOtp();
  };

  const handleEmailVerificationSubmitOtp = (otp: string) => {
    sendVerificationOtp(otp);
  };

  const handleEmailFormChange = (
    _changedValues: {email: string},
    allValues: {email: string}
  ) => {
    // Проверяем валидность email
    const email = allValues.email || '';
    const isValidEmail = EMAIL.test(email);

    // Если email пустой или невалидный - disabled = true, иначе false
    setIsEmailChangeButtonDisabled(!email || !isValidEmail);
  };

  const handleEmailChangeGetOtpClick = () => {
    getEmailChangeOtp(emailForm.getFieldValue('email'));
  };

  const handleEmailChangeSubmitOtp = (otp: string) => {
    sendEmailChangeOtp(otp);
  };

  return (
    <>
      <Form
        form={personalDataForm}
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
                const filteredValue = handleValidateInput(e);
                // Обновляем значение в форме
                if (e.target.value !== filteredValue) {
                  personalDataForm.setFieldValue('surname', filteredValue);
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
                const filteredValue = handleValidateInput(e);
                if (e.target.value !== filteredValue) {
                  personalDataForm.setFieldValue('name', filteredValue);
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
                const filteredValue = handleValidateInput(e);
                if (e.target.value !== filteredValue) {
                  personalDataForm.setFieldValue('patronymic', filteredValue);
                }
              }}
            />
          </Form.Item>
        </Flex>

        <Form.Item className={style.submitButton}>
          <Button
            type='primary'
            htmlType='submit'
            disabled={!isPersonalDataFormChanged || isLoading}
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
      {isEmailVerified ? (
        <Flex vertical gap={designTokens.spacing.sm} align='flex-start'>
          <Form
            form={emailForm}
            requiredMark={false}
            onValuesChange={handleEmailFormChange}
          >
            <Form.Item
              name='email'
              label={t('Profile.PersonalData.ChangeEmail.Email')}
              labelCol={{className: style.label}}
              rules={[
                {
                  message: t('Profile.PersonalData.ChangeEmail.EmailRequired'),
                  required: true,
                },

                {
                  message: t('Profile.PersonalData.ChangeEmail.EmailRules'),
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
          <OTP
            currentStep={emailFieldStep}
            onGetOtpClick={handleEmailChangeGetOtpClick}
            onSendOtp={(otp: string) => handleEmailChangeSubmitOtp(otp)}
            sendOtpLabel={t('Profile.PersonalData.ChangeEmail.Verify')}
            otpTitle={t('Profile.PersonalData.ChangeEmail.OtpLabel')}
            sendNewLabel={t('Profile.PersonalData.ChangeEmail.SendNew')}
            submitLabel={t('Profile.PersonalData.ChangeEmail.Submit')}
            getOtpDisabled={isEmailChangeButtonDisabled}
          />
        </Flex>
      ) : (
        <OTP
          currentStep={emailFieldStep}
          onGetOtpClick={handleEmailVerificationGetOtpClick}
          onSendOtp={(otp: string) => handleEmailVerificationSubmitOtp(otp)}
          sendOtpLabel={t('Profile.PersonalData.EmailVerification.Verify')}
          otpTitle={t('Profile.PersonalData.EmailVerification.OtpLabel')}
          sendNewLabel={t('Profile.PersonalData.EmailVerification.SendNew')}
          submitLabel={t('Profile.PersonalData.EmailVerification.Submit')}
        />
      )}
    </>
  );
});
