import {api} from '../../../shared';

export const refreshToken = async (): Promise<string> => {
  return api.get<string>('/auth/refresh');
};
