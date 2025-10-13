import {api} from '@shared';

export const getOtpApi = (): Promise<void> => {
  return api.get<void>('/users/requestEmailVerification');
};
