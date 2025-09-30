import {notificationService} from '../../../shared';
import {refreshToken, userLogout} from '../api';
import Cookies from 'js-cookie';
import {makeAutoObservable, runInAction} from 'mobx';

class UserStore {
  private _isUserLogged = Cookies.get('isUserLoggedIn') === 'true';

  constructor() {
    makeAutoObservable(this);
  }

  get isUserLogged(): boolean {
    return this._isUserLogged;
  }

  refresh = async () => {
    try {
      await refreshToken();

      runInAction(() => {
        this._isUserLogged = true;
      });
    } catch (error) {
      this._isUserLogged = false;
    }
  };

  loggout = async () => {
    try {
      await userLogout();
    } catch (error: any) {
      notificationService.error(error);
    } finally {
      runInAction(() => {
        this.clear();
        this.clearCookies();
      });
    }
  };

  clearCookies = () => {
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    Cookies.remove('userId');
    Cookies.remove('isUserLoggedIn');
  };

  setUserLogger = (value: boolean) => {
    this._isUserLogged = value;
  };

  clear = () => {
    this._isUserLogged = false;
  };
}

export const userStore = new UserStore();
