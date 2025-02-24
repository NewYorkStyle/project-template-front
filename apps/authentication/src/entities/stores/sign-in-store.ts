import i18nAuthenticationInstance from '../../shared/utils/i18n-init';
import {signInApi} from '../api';
import {E_TOAST_SEVERITY, showToast, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

class SignInStore {
  private _loginLoading = false;
  private _login = '';
  private _password = '';

  constructor() {
    makeAutoObservable(this);
  }

  get loginLoading(): boolean {
    return this._loginLoading;
  }

  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  signIn = async () => {
    this._loginLoading = true;

    try {
      await signInApi(this._login, this._password);

      runInAction(() => {
        userStore.isUserLogged = true;
      });
    } catch (error) {
      showToast({
        severity: E_TOAST_SEVERITY.ERROR,
        summary: i18nAuthenticationInstance.t(
          'Authentication.SignIn.AuthError'
        ),
      });
    } finally {
      this._loginLoading = false;
    }
  };

  clear = () => {
    this._loginLoading = false;
    this._login = '';
    this._password = '';
  };
}

export const signInStore = new SignInStore();
