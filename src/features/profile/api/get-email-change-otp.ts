import {api} from '@shared';

export const getEmailChangeOtpApi = (newEmail: string): Promise<void> => {
  return api.post<void>('/users/emailChangeRequest', {newEmail});
};
