import {api} from '@shared';

export const sendEmailChangeOtpApi = (otp: string): Promise<void> => {
  return api.post<void>('/users/emailChange', {otp});
};
