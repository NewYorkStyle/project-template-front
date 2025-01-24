import {api} from '../../shared/utils/api';

export const refreshToken = async (): Promise<string> => {
  return api.get<string>('/auth/refresh');
};
