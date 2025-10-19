import Cookies from 'js-cookie';
import {makeAutoObservable, runInAction} from 'mobx';

import {notificationService} from '@shared';

import {getPermissionsApi, refreshTokenApi, userLogoutApi} from '../api';
import {type E_PERMISSIONS} from '../lib';

class UserStore {
  private _isUserLogged = Cookies.get('isUserLoggedIn') === 'true';
  private _permissions: E_PERMISSIONS[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isUserLogged() {
    return this._isUserLogged;
  }

  get permissions() {
    return this._permissions;
  }

  refresh = async () => {
    try {
      await refreshTokenApi();

      runInAction(() => {
        this._isUserLogged = true;
      });
    } catch (_error) {
      this._isUserLogged = false;
    }
  };

  loggout = async () => {
    try {
      await userLogoutApi();
    } catch (error) {
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

  setUserLogged = (value: boolean) => {
    this._isUserLogged = value;
  };

  getPermissions = async () => {
    try {
      const permissions = await getPermissionsApi();

      runInAction(() => {
        this._permissions = permissions;
      });
    } catch (error) {
      notificationService.error(error);
    }
  };

  clear = () => {
    this._isUserLogged = false;
  };
}

export const userStore = new UserStore();
