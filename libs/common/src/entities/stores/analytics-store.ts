import {TAnalyticsEventProps} from '../../shared';
import {makeAutoObservable} from 'mobx';

declare global {
  interface Window {
    ym: any;
  }
}

class AnalyticsStore {
  private _ymInited = false;
  private _ymCounter = 0;

  public get ymInited(): boolean {
    return this._ymInited;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setYmCounter = (ymCounter: string) => {
    this._ymCounter = Number(ymCounter);
  };

  initYm = () => {
    if (!this._ymInited) {
      window.ym(this._ymCounter, 'init', {
        accurateTrackBounce: true,
        clickmap: true,
        trackLinks: true,
        webvisor: true,
      });

      this._ymInited = true;
    }
  };

  sendYm = (data: TAnalyticsEventProps) => {
    window.ym(this._ymCounter, 'params', {
      ...{[data.namespace]: {[data.event]: data.label}},
    });
  };
}

export const analyticsStore = new AnalyticsStore();
