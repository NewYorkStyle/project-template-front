import {api} from '../../../../shared';
import {TParam} from '../../model';

export const getParamsApi = async (): Promise<TParam> => {
  return api.get<TParam>('/common/params/getParams');
};
