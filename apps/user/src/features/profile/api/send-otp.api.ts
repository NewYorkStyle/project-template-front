import {api} from '@common';

export const sendOtpApi = (otp: string): Promise<void> => {
  return api.post<void>('/users/verifyEmail', {otp});
};
