import {analyticsStore} from './analytics-store';
import {getParamsApi} from '../api/get-params';
import {TParam} from '../models/params.types';
import {makeAutoObservable, runInAction} from 'mobx';

class ParamsStore {
  private _params?: TParam = undefined;
  private _paramsLoading = false;
  private _theme: 'dark' | 'light' = 'light';
  private _language = 'ru';

  get params(): TParam | undefined {
    return this._params;
  }

  get paramsLoading(): boolean {
    return this._paramsLoading;
  }

  get theme() {
    return this._theme;
  }

  get language() {
    return this._language;
  }

  constructor() {
    makeAutoObservable(this);
  }

  init = () => {
    this.initializeTheme();
    this.initializeLanguage();
    this.getParams();
  };

  private getParams = async () => {
    this._paramsLoading = true;

    try {
      const data = await getParamsApi();

      runInAction(() => {
        this._params = data;

        analyticsStore.setYmCounter(this._params.ym_counter);
        analyticsStore.initYm();
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      this._paramsLoading = false;
    }
  };

  private initializeTheme = () => {
    // Проверяем сохраненную тему или системные предпочтения
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      this._theme = savedTheme;
    } else if (systemPrefersDark) {
      this._theme = 'dark';
    }

    if (this._theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    }
  };

  private initializeLanguage = () => {
    const savedLanguage = localStorage.getItem('language');

    if (savedLanguage) {
      this._language = savedLanguage;
    } else {
      this._language = 'ru';
      localStorage.setItem('language', 'ru');
    }
  };

  toggleTheme = () => {
    if (this._theme === 'light') {
      document.body.setAttribute('data-theme', 'dark');
      this._theme = 'dark';
    } else {
      document.body.removeAttribute('data-theme');
      this._theme = 'light';
    }

    localStorage.setItem('theme', this._theme);

    // Диспатчим событие для синхронизации между вкладками
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'theme',
        newValue: this._theme,
      })
    );
  };

  setTheme = (newTheme: 'dark' | 'light') => {
    this._theme = newTheme;

    localStorage.setItem('theme', newTheme);
  };

  setLanguage = (newLanguage: string) => {
    this._language = newLanguage;
    localStorage.setItem('language', newLanguage);

    // Диспатчим событие для синхронизации между вкладками
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'language',
        newValue: newLanguage,
      })
    );
  };
}

export const paramsStore = new ParamsStore();
