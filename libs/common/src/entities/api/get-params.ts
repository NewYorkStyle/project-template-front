import {api} from '../../shared/utils/api';
import {TParam} from '../models/params.types';

export const getParamsApi = async (): Promise<TParam> => {
  return api.get<TParam>('/common/params/getParams');
};
