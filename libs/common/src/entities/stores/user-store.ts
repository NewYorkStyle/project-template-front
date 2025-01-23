import {userLogout} from '../api';
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

  loggout = async () => {
    await userLogout();

    runInAction(() => {
      this._isUserLogged = false;
    });
  };
}

export const userStore = new UserStore();
