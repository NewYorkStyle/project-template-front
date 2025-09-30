import {api} from '@common';

export const signInApi = (
  username: string,
  password: string
): Promise<{accessToken: string}> => {
  return api.post<{accessToken: string}>('/auth/signIn', {password, username});
};
