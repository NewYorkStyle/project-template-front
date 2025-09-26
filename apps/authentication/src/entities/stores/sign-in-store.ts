import {TSignInFormValues} from '../../shared';
import i18nAuthenticationInstance from '../../shared/utils/i18n-init';
import {signInApi} from '../api';
import {E_TOAST_SEVERITY, showToast, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

class SignInStore {
  private _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  signIn = async (values: TSignInFormValues) => {
    this._isLoading = true;

    try {
      await signInApi(values.login, values.password);

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
      this._isLoading = false;
    }
  };

  clear = () => {
    this._isLoading = false;
  };
}

export const signInStore = new SignInStore();
