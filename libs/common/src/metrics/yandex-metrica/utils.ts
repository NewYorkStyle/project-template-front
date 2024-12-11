import {TAnalyticsProps} from '../types/types';

declare global {
  interface Window {
    ym: any;
  }
}

const prepareDataForYm = (data: TAnalyticsProps) => {
  return {[data.namespace]: {[data.event]: data.label}};
};

export const sendEvent = (data: TAnalyticsProps) => {
  const preparedData = prepareDataForYm(data);
  window.ym(99185667, 'params', {
    ...preparedData,
  });
};
