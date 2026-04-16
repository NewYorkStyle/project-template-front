import {useEffect, useMemo, useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {Divider, Flex, Form, Input} from '@new_york_style/project-template-ui';
import {useQueryClient} from '@tanstack/react-query';
import {useForm, useWatch} from 'react-hook-form';
import {FormItem} from 'react-hook-form-antd';
import {useTranslation} from 'react-i18next';

import {
  useUsersControllerEmailChange,
  useUsersControllerEmailChangeRequest,
  useUsersControllerFindById,
  useUsersControllerRequestEmailVerification,
  useUsersControllerUpdate,
  useUsersControllerVerifyEmail,
} from '@api/endpoints/users';
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
import {createPersonalDataSchema, createProfileEmailSchema} from '../../model';
import {
  type TPersonalDataFormValues,
  type TProfileEmailFormValues,
} from '../../types';

import style from './personal-data.module.scss';

export const PersonalData = () => {
  const {t} = useTranslation('User');
  const queryClient = useQueryClient();

  const personalDataSchema = createPersonalDataSchema(t);
  const profileEmailSchema = createProfileEmailSchema(t);

  const {hasPermission, permissions, permissionsQueryKey} =
    usePermissionCheck();

  const {
    data: profileData,
    error,
    isLoading: isProfileLoading,
  } = useUsersControllerFindById();

  const {isPending: isUpdating, mutate: updateProfile} =
    useUsersControllerUpdate();

  const {
    isFetching: isVerificationOtpRequesting,
    refetch: requestVerificationOtp,
  } = useUsersControllerRequestEmailVerification({
    query: {enabled: false},
  });

  const {isPending: isVerificationOtpSending, mutate: sendVerificationOtp} =
    useUsersControllerVerifyEmail();

  const {isPending: isEmailChangeOtpRequesting, mutate: requestEmailChangeOtp} =
    useUsersControllerEmailChangeRequest();

  const {isPending: isEmailChangeOtpSending, mutate: confirmEmailChange} =
    useUsersControllerEmailChange();

  const [emailFieldStep, setEmailFieldStep] = useState<'button' | 'otp'>(
    'button'
  );

  const personalDataDefaultValues = useMemo(() => {
    if (!profileData) return undefined;

    return {
      name: profileData.name ?? '',
      patronymic: profileData.patronymic ?? '',
      surname: profileData.surname ?? '',
    };
  }, [profileData]);

  const {
    control: personalDataControl,
    formState: {isDirty: isPersonalDataFormChanged},
    handleSubmit: handlePersonalDataSubmit,
    reset,
    setValue: setPersonalDataValue,
  } = useForm<TPersonalDataFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(personalDataSchema),
  });

  const {
    control: emailControl,
    formState: {isValid: isEmailValid},
    handleSubmit: handleEmailSubmit,
    reset: resetEmailForm,
  } = useForm<TProfileEmailFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileEmailSchema),
  });

  const emailValue = useWatch({control: emailControl, name: 'email'});

  const isEmailVerified = useMemo(
    () => hasPermission(E_PERMISSIONS.EMAIL_VERIFIED),
    [permissions]
  );

  useEffect(() => {
    if (personalDataDefaultValues) {
      reset(personalDataDefaultValues);
    }
  }, [personalDataDefaultValues, reset]);

  useEffect(() => {
    if (error) {
      notificationService.error(t('Profile.PersonalData.ErrorGetData'));
    }
  }, [error, t]);

  const onSubmit = (values: TPersonalDataFormValues) => {
    updateProfile({data: values});
  };

  const handleValidateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return e.target.value.replace(/[^a-zA-Zа-яА-Я\s-]/g, '');
  };

  const handleEmailVerificationGetOtpClick = async () => {
    const res = await requestVerificationOtp();
    if (res.isSuccess) {
      setEmailFieldStep('otp');
    }
  };

  const handleEmailVerificationSubmitOtp = (otp: string) => {
    sendVerificationOtp(
      {data: {otp}},
      {
        onSuccess: () => {
          setEmailFieldStep('button');

          queryClient.invalidateQueries({
            queryKey: permissionsQueryKey,
          });
        },
      }
    );
  };

  const handleEmailChangeGetOtpClick = () => {
    void handleEmailSubmit(({email}) => {
      requestEmailChangeOtp(
        {data: {newEmail: email}},
        {
          onSuccess: () => setEmailFieldStep('otp'),
        }
      );
    })();
  };

  const handleEmailChangeSubmitOtp = (otp: string) => {
    confirmEmailChange(
      {data: {otp}},
      {
        onSuccess: () => {
          setEmailFieldStep('button');
          resetEmailForm();
        },
      }
    );
  };

  const isLoading = isProfileLoading || isUpdating;
  const isVerificationLoading =
    isVerificationOtpRequesting || isVerificationOtpSending;
  const isEmailChangeLoading =
    isEmailChangeOtpRequesting || isEmailChangeOtpSending;

  const isEmailChangeButtonDisabled =
    !emailValue || !EMAIL.test(emailValue) || !isEmailValid;

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
              const value = handleValidateInput(e);
              setPersonalDataValue('surname', value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <Input data-testid={TEST_IDS.USER.SURNAME_INPUT} />
          </FormItem>

          <FormItem
            control={personalDataControl}
            name='name'
            label={t('Profile.PersonalData.Name')}
            labelCol={{className: style.label}}
            overrideFieldOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = handleValidateInput(e);
              setPersonalDataValue('name', value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <Input data-testid={TEST_IDS.USER.NAME_INPUT} />
          </FormItem>

          <FormItem
            control={personalDataControl}
            name='patronymic'
            label={t('Profile.PersonalData.Patronymic')}
            labelCol={{className: style.label}}
            overrideFieldOnChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = handleValidateInput(e);
              setPersonalDataValue('patronymic', value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
          >
            <Input data-testid={TEST_IDS.USER.PATRONYMIC_INPUT} />
          </FormItem>
        </Flex>

        <Form.Item className={style.submitButton}>
          <Button
            type='primary'
            htmlType='submit'
            disabled={!isPersonalDataFormChanged || isLoading}
            loading={isLoading}
            data-testid={TEST_IDS.USER.FULL_NAME_SAVE_BUTTON}
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
              <Input data-testid={TEST_IDS.USER.EMAIL_CHANGE_INPUT} />
            </FormItem>
          </Form>

          <OTP
            currentStep={emailFieldStep}
            onGetOtpClick={handleEmailChangeGetOtpClick}
            onSendOtp={handleEmailChangeSubmitOtp}
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
            onSendOtp={handleEmailVerificationSubmitOtp}
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
