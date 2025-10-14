import {api} from '@shared';

export const deleteProfileApi = (password: string): Promise<string> => {
  return api.post<string>('/users/delete', {password});
};
