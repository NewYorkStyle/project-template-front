import {api} from '@shared';

export const refreshTokenApi = (): Promise<string> => {
  return api.get<string>('/auth/refresh');
};
