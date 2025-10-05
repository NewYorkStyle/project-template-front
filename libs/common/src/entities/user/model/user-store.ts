import {E_PERMISSIONS, notificationService} from '../../../shared';
import {getPermissionsApi, refreshTokenApi, userLogoutApi} from '../api';
import Cookies from 'js-cookie';
import {makeAutoObservable, runInAction} from 'mobx';

class UserStore {
  private _isUserLogged = Cookies.get('isUserLoggedIn') === 'true';
  private _permissions: E_PERMISSIONS[] = [];

  constructor() {
    makeAutoObservable(this);

    this.getPermissions();
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
    } catch (error) {
      this._isUserLogged = false;
    }
  };

  loggout = async () => {
    try {
      await userLogoutApi();
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

  getPermissions = async () => {
    try {
      const permissions = await getPermissionsApi();

      runInAction(() => {
        this._permissions = permissions;
      });
    } catch (error: any) {
      notificationService.error(error);
    }
  };

  clear = () => {
    this._isUserLogged = false;
  };
}

export const userStore = new UserStore();
