import {analyticsStore} from './analytics-store';
import {getParamsApi} from '../api/get-params';
import {TParam} from '../models/params.types';
import {makeAutoObservable, runInAction} from 'mobx';

class ParamsStore {
  private _params?: TParam = undefined;
  private _paramsLoading = false;

  get params(): TParam | undefined {
    return this._params;
  }

  get paramsLoading(): boolean {
    return this._paramsLoading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  getParams = async () => {
    this._paramsLoading = true;

    try {
      const data = await getParamsApi();

      runInAction(() => {
        this._params = data;

        analyticsStore.setYmCounter(this._params.ym_counter);
        analyticsStore.initYm();
      });
    } catch (error) {
      console.error(error);
    } finally {
      this._paramsLoading = false;
    }
  };
}

export const paramsStore = new ParamsStore();
