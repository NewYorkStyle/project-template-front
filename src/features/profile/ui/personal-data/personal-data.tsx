import {useEffect, useMemo, useState} from 'react';

import isEqual from 'lodash/isEqual';
import {useTranslation} from 'react-i18next';

import {E_PERMISSIONS, usePermissionCheck} from '@entities';
import {
  APLHABETIC,
  Button,
  Divider,
  EMAIL,
  E_METRICS_NAMESPACES,
  Flex,
  Form,
  Input,
  OTP,
  TEST_IDS,
  Typography,
  designTokens,
  notificationService,
} from '@shared';

import {
  useConfirmEmailChange,
  useProfile,
  useRequestEmailChange,
  useRequestEmailVerification,
  useUpdateProfile,
  useVerifyEmail,
} from '../../api';
import {type TProfileData} from '../../types';

import style from './personal-data.module.scss';

export const PersonalData = () => {
  const {t} = useTranslation('User');

  const {hasPermission} = usePermissionCheck();

  const {data: profileData, error, isLoading: isProfileLoading} = useProfile();
  const {isPending: isUpdating, mutate: updateProfile} = useUpdateProfile();

  const {
    isPending: isVerificationOtpRequesting,
    mutate: requestVerificationOtp,
  } = useRequestEmailVerification();

  const {isPending: isVerificationOtpSending, mutate: sendVerificationOtp} =
    useVerifyEmail();

  const {isPending: isEmailChangeOtpRequesting, mutate: requestEmailChangeOtp} =
    useRequestEmailChange();

  const {isPending: isEmailChangeOtpSending, mutate: confirmEmailChange} =
    useConfirmEmailChange();

  const [emailFieldStep, setEmailFieldStep] = useState<'button' | 'otp'>(
    'button'
  );

  const [personalDataForm] = Form.useForm();
  const [emailForm] = Form.useForm();

  const isEmailVerified = useMemo(
    () => hasPermission(E_PERMISSIONS.EMAIL_VERIFIED),
    [hasPermission]
  );

  const [isPersonalDataFormChanged, setIsPersonalDataFormChanged] =
    useState(false);
  const [isEmailChangeButtonDisabled, setIsEmailChangeButtonDisabled] =
    useState(true);

  // Инициализация формы данными из кэша
  useEffect(() => {
    if (profileData) {
      const initData = {
        name: profileData.name,
        patronymic: profileData.patronymic,
        surname: profileData.surname,
      };
      personalDataForm.setFieldsValue(initData);
      setIsPersonalDataFormChanged(false);
    }
  }, [profileData, personalDataForm]);

  // Обработка ошибок загрузки профиля
  useEffect(() => {
    if (error) {
      notificationService.error(t('Profile.PersonalData.ErrorGetData'));
    }
  }, [error, t]);

  const handleFormChange = () => {
    const currentValues = personalDataForm.getFieldsValue();
    const initData = profileData
      ? {
          name: profileData.name,
          patronymic: profileData.patronymic,
          surname: profileData.surname,
        }
      : null;

    const hasChanges = initData && !isEqual(currentValues, initData);
    setIsPersonalDataFormChanged(!!hasChanges);
  };

  const handleSubmit = (values: TProfileData) => {
    updateProfile(values);
  };

  // Функция для фильтрации только букв
  const handleValidateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '');
  };

  const handleEmailVerificationGetOtpClick = () => {
    requestVerificationOtp(undefined, {
      onSuccess: () => {
        setEmailFieldStep('otp');
      },
    });
  };

  const handleEmailVerificationSubmitOtp = (otp: string) => {
    sendVerificationOtp(otp, {
      onSuccess: () => {
        setEmailFieldStep('button');
      },
    });
  };

  const handleEmailFormChange = (
    _changedValues: {email: string},
    allValues: {email: string}
  ) => {
    const email = allValues.email || '';
    const isValidEmail = EMAIL.test(email);
    setIsEmailChangeButtonDisabled(!email || !isValidEmail);
  };

  const handleEmailChangeGetOtpClick = () => {
    const email = emailForm.getFieldValue('email');
    requestEmailChangeOtp(email, {
      onSuccess: () => {
        setEmailFieldStep('otp');
      },
    });
  };

  const handleEmailChangeSubmitOtp = (otp: string) => {
    confirmEmailChange(otp, {
      onSuccess: () => {
        setEmailFieldStep('button');
        emailForm.resetFields();
      },
    });
  };

  const isLoading = isProfileLoading || isUpdating;
  const isVerificationLoading =
    isVerificationOtpRequesting || isVerificationOtpSending;
  const isEmailChangeLoading =
    isEmailChangeOtpRequesting || isEmailChangeOtpSending;

  return (
    <>
      <Form
        form={personalDataForm}
        initialValues={
          profileData
            ? {
                name: profileData.name,
                patronymic: profileData.patronymic,
                surname: profileData.surname,
              }
            : undefined
        }
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
        <Flex
          vertical
          gap={designTokens.spacing.sm}
          align='flex-start'
          data-testid={TEST_IDS.USER.EMAIL_CHANGE_SECTION}
        >
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
            isLoading={isEmailChangeLoading}
          />
        </Flex>
      ) : (
        <div data-testid={TEST_IDS.USER.EMAIL_VERIFICATION_SECTION}>
          <OTP
            currentStep={emailFieldStep}
            onGetOtpClick={handleEmailVerificationGetOtpClick}
            onSendOtp={(otp: string) => handleEmailVerificationSubmitOtp(otp)}
            sendOtpLabel={t('Profile.PersonalData.EmailVerification.Verify')}
            otpTitle={t('Profile.PersonalData.EmailVerification.OtpLabel')}
            sendNewLabel={t('Profile.PersonalData.EmailVerification.SendNew')}
            submitLabel={t('Profile.PersonalData.EmailVerification.Submit')}
            isLoading={isVerificationLoading}
          />
        </div>
      )}
    </>
  );
};
