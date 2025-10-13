import {api} from '@shared';

import {type TParam} from '../model';

export const getParamsApi = (): Promise<TParam> => {
  return api.get<TParam>('/common/params/getParams');
};
