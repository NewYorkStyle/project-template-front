import {api} from '@shared';

export const signUpApi = (
  username: string,
  password: string,
  email: string
): Promise<{accessToken: string}> => {
  return api.post<{accessToken: string}>('/auth/signUp', {
    email,
    password,
    username,
  });
};
