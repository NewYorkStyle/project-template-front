import {analyticsStore} from './analytics-store';
import {api} from '../../shared/utils/api';
import {TParam} from '../models/params.types';
import {makeAutoObservable, runInAction} from 'mobx';

class ParamsStore {
  private _params?: TParam = undefined;
  private _paramsLoading = false;

  get params(): TParam | undefined {
    return this._params;
  }

  public get paramsLoading(): boolean {
    return this._paramsLoading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  getParams = async () => {
    this._paramsLoading = true;

    try {
      const data = await api.get<TParam>('/common/params/getParams');

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
