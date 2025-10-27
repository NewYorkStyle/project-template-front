import {useEffect} from 'react';

import {metricsService} from '@shared';

import {type TParam} from '../types';

export const useMetrics = (params: TParam | undefined) => {
  useEffect(() => {
    if (params?.ym_counter) {
      metricsService.setYmCounter(params.ym_counter);
      metricsService.initYm();
    }
  }, [params?.ym_counter]);
};
