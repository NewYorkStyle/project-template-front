import {api} from '@common';

export const getEmailChangeOtpApi = (newEmail: string): Promise<void> => {
  return api.post<void>('/users/emailChangeRequest', {newEmail});
};
