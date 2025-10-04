import {api} from '@common';

export const getOtpApi = (): Promise<void> => {
  return api.get<void>('/users/requestEmailVerification');
};
