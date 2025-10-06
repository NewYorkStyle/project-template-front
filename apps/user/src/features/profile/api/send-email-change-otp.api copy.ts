import {api} from '@common';

export const sendEmailChangeOtpApi = (otp: string): Promise<void> => {
  return api.post<void>('/users/emailChange', {otp});
};
