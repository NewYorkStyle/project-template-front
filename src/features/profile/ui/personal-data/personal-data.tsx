import {useEffect, useMemo, useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {Divider, Flex, Form, Input} from '@new_york_style/project-template-ui';
import isEqual from 'lodash/isEqual';
import {useForm, useWatch} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';

import {E_PERMISSIONS, usePermissionCheck} from '@entities';
import {
  Button,
  EMAIL,
  E_METRICS_NAMESPACES,
  TEST_IDS,
  Typography,
  designTokens,
  notificationService,
} from '@shared';

import {OTP} from '../../../otp';
import {
  useConfirmEmailChange,
  useProfile,
  useRequestEmailChange,
  useRequestEmailVerification,
  useUpdateProfile,
  useVerifyEmail,
} from '../../api';
import {createPersonalDataSchema, createProfileEmailSchema} from '../../model';
import {
  type TPersonalDataFormValues,
  type TProfileData,
  type TProfileEmailFormValues,
} from '../../types';

import style from './personal-data.module.scss';

export const PersonalData = () => {
  const {t} = useTranslation('User');
  const personalDataSchema = createPersonalDataSchema(t);
  const profileEmailSchema = createProfileEmailSchema(t);

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

  const {
    control: personalDataControl,
    handleSubmit: handlePersonalDataSubmit,
    reset,
    setValue: setPersonalDataValue,
  } = useForm<TPersonalDataFormValues>({
    defaultValues: {
      name: '',
      patronymic: '',
      surname: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(personalDataSchema),
  });
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    reset: resetEmailForm,
  } = useForm<TProfileEmailFormValues>({
    defaultValues: {email: ''},
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileEmailSchema),
  });
  const personalDataValues = useWatch({control: personalDataControl});
  const emailValue = useWatch({control: emailControl, name: 'email'});

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
        patronymic: profileData.patronymic ?? '',
        surname: profileData.surname,
      };
      reset(initData);
      setIsPersonalDataFormChanged(false);
    }
  }, [profileData, reset]);

  // Обработка ошибок загрузки профиля
  useEffect(() => {
    if (error) {
      notificationService.error(t('Profile.PersonalData.ErrorGetData'));
    }
  }, [error, t]);

  useEffect(() => {
    const initData = profileData
      ? {
          name: profileData.name,
          patronymic: profileData.patronymic ?? '',
          surname: profileData.surname,
        }
      : null;

    const hasChanges = initData && !isEqual(personalDataValues, initData);
    setIsPersonalDataFormChanged(!!hasChanges);
  }, [personalDataValues, profileData]);

  const onSubmit = (values: TProfileData) => {
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

  useEffect(() => {
    const email = emailValue || '';
    const isValidEmail = EMAIL.test(email);
    setIsEmailChangeButtonDisabled(!email || !isValidEmail);
  }, [emailValue]);

  const handleEmailChangeGetOtpClick = () => {
    void handleEmailSubmit(({email}) => {
      requestEmailChangeOtp(email, {
        onSuccess: () => {
          setEmailFieldStep('otp');
        },
      });
    })();
  };

  const handleEmailChangeSubmitOtp = (otp: string) => {
    confirmEmailChange(otp, {
      onSuccess: () => {
        setEmailFieldStep('button');
        resetEmailForm();
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
        onFinish={() => void handlePersonalDataSubmit(onSubmit)()}
        className={style.form}
        requiredMark={false}
      >
        <Typography.Title level={4}>
          {t('Profile.PersonalData.Header')}
        </Typography.Title>

        <Flex vertical gap={designTokens.spacing.sm} align='flex-start'>
          <FormItem
            control={personalDataControl}
            name='surname'
            label={t('Profile.PersonalData.Surname')}
            labelCol={{className: style.label}}
            overrideFieldOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const filteredValue = handleValidateInput(e);
              setPersonalDataValue('surname', filteredValue, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <Input />
          </FormItem>

          <FormItem
            control={personalDataControl}
            name='name'
            label={t('Profile.PersonalData.Name')}
            labelCol={{className: style.label}}
            overrideFieldOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const filteredValue = handleValidateInput(e);
              setPersonalDataValue('name', filteredValue, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <Input />
          </FormItem>

          <FormItem
            control={personalDataControl}
            name='patronymic'
            label={t('Profile.PersonalData.Patronymic')}
            labelCol={{className: style.label}}
            overrideFieldOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const filteredValue = handleValidateInput(e);
              setPersonalDataValue('patronymic', filteredValue, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <Input />
          </FormItem>
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
          <Form requiredMark={false} onFinish={handleEmailChangeGetOtpClick}>
            <FormItem
              control={emailControl}
              name='email'
              label={t('Profile.PersonalData.ChangeEmail.Email')}
              labelCol={{className: style.label}}
            >
              <Input />
            </FormItem>
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
