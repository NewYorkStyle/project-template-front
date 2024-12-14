import {makeAutoObservable} from 'mobx';

class I18nStore {
  private _language = localStorage.getItem('language') ?? 'ru';

  get language(): string {
    return this._language;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage = (newLanguage: string) => {
    this._language = newLanguage;
  };
}

export const i18nStore = new I18nStore();
