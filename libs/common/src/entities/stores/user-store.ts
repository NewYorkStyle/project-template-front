import {refreshToken, userLogout} from '../api';
import Cookies from 'js-cookie';
import {makeAutoObservable, runInAction} from 'mobx';

class UserStore {
  private _isUserLogged = Cookies.get('isUserLoggedIn') === 'true';

  get isUserLogged(): boolean {
    return this._isUserLogged;
  }

  set isUserLogged(value: boolean) {
    this._isUserLogged = value;
  }

  constructor() {
    makeAutoObservable(this);
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
    await userLogout();

    runInAction(() => {
      this._isUserLogged = false;
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      Cookies.remove('userId');
      Cookies.remove('isUserLoggedIn');
    });
  };
}

export const userStore = new UserStore();
