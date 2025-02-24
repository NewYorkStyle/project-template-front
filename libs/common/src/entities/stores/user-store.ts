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

  set isUserLogged(value: boolean) {
    this._isUserLogged = value;
  }

  refresh = async () => {
    try {
      await refreshToken();

      runInAction(() => {
        this.isUserLogged = true;
      });
    } catch (error) {
      this.isUserLogged = false;
    }
  };

  loggout = async () => {
    await userLogout();

    runInAction(() => {
      this.clear();
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      Cookies.remove('userId');
      Cookies.remove('isUserLoggedIn');
    });
  };

  clear = () => {
    this.isUserLogged = false;
  };
}

export const userStore = new UserStore();
