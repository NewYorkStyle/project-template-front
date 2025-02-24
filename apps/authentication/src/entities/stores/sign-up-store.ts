import i18nAuthenticationInstance from '../../shared/utils/i18n-init';
import {signUpApi} from '../api';
import {E_TOAST_SEVERITY, showToast, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

class SignUpStore {
  private _singUpLoading = false;
  private _login = '';
  private _email = '';
  private _password = '';
  private _passwordConfirm = '';

  constructor() {
    makeAutoObservable(this);
  }

  get singUpLoading(): boolean {
    return this._singUpLoading;
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

  get passwordConfirm(): string {
    return this._passwordConfirm;
  }

  set passwordConfirm(value: string) {
    this._passwordConfirm = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  signUp = async () => {
    this._singUpLoading = true;

    try {
      await signUpApi(this._login, this._password, this._email);

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
      this._singUpLoading = false;
    }
  };

  clear = () => {
    this._singUpLoading = false;
    this._login = '';
    this._email = '';
    this._password = '';
    this._passwordConfirm = '';
  };
}

export const signUpStore = new SignUpStore();
