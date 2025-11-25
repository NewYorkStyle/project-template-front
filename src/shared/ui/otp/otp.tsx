import {useState} from 'react';

import {
  Button,
  Flex,
  Form,
  Input,
  Statistic,
  TEST_IDS,
  type TMetricsProps,
  Typography,
  designTokens,
} from '@shared';

type TProps = {
  currentStep: 'button' | 'otp';
  isLoading?: boolean;
  onGetOtpClick: () => void;
  onSendOtp: (otp: string) => void;
  sendOtpLabel: string;
  otpTitle: string;
  sendNewLabel: string;
  submitLabel: string;
  getOtpDisabled?: boolean;
  analyticProps?: TMetricsProps;
};

export const OTP = ({
  analyticProps,
  currentStep,
  getOtpDisabled,
  isLoading,
  onGetOtpClick,
  onSendOtp,
  otpTitle,
  sendNewLabel,
  sendOtpLabel,
  submitLabel,
}: TProps) => {
  const [timerFinished, setTimerFinished] = useState(false);

  const handleGetOtpClick = () => {
    onGetOtpClick();
    setTimerFinished(false);
  };

  const handleSubmitOtp = (values: {otp: string}) => {
    onSendOtp(values.otp);
  };

  const getCurrentlyStep = () => {
    switch (currentStep) {
      case 'button':
        return (
          <Button
            onClick={handleGetOtpClick}
            disabled={isLoading || getOtpDisabled}
            loading={isLoading}
            analyticProps={
              analyticProps && {
                label: `${analyticProps.label} - Get OTP button`,
                namespace: analyticProps.namespace,
              }
            }
            data-testid={TEST_IDS.OTP.GET_OTP}
          >
            {sendOtpLabel}
          </Button>
        );

      case 'otp':
        return (
          <>
            <Form onFinish={handleSubmitOtp}>
              <Flex vertical gap={designTokens.spacing.xs} align='flex-start'>
                <Typography.Text>{otpTitle}</Typography.Text>
                <Flex gap={designTokens.spacing.sm} align='center'>
                  <Form.Item noStyle rules={[{required: true}]} name='otp'>
                    <Input.OTP
                      length={6}
                      disabled={timerFinished}
                      data-testid={TEST_IDS.OTP.INPUT}
                    />
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
                    analyticProps={
                      analyticProps && {
                        label: `${analyticProps.label} - Send OTP button`,
                        namespace: analyticProps.namespace,
                      }
                    }
                    data-testid={TEST_IDS.OTP.SUBMIT}
                  >
                    {submitLabel}
                  </Button>
                  {timerFinished && (
                    <Button
                      onClick={handleGetOtpClick}
                      disabled={isLoading}
                      loading={isLoading}
                      analyticProps={
                        analyticProps && {
                          label: `${analyticProps.label} - Get new OTP button`,
                          namespace: analyticProps.namespace,
                        }
                      }
                      data-testid={TEST_IDS.OTP.GET_NEW_OTP}
                    >
                      {sendNewLabel}
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

  return getCurrentlyStep();
};
