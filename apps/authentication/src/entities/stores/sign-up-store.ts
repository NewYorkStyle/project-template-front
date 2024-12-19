import i18nAuthenticationInstance from '../../shared/utils/i18n-init';
import {signUpApi} from '../api';
import {E_TOAST_SEVERITY, showToast, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

class SignUpStore {
  private _singUpLoading = false;

  public login = '';
  public password = '';
  public passwordConfirm = '';

  get singUpLoading(): boolean {
    return this._singUpLoading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  signUp = async () => {
    this._singUpLoading = true;

    try {
      await signUpApi(this.login, this.password);

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
}

export const signUpStore = new SignUpStore();
