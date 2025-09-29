import {TSignUpFormValues} from '../../../shared';
import i18nAuthenticationInstance from '../../../shared/lib/i18n/i18n-init';
import {signUpApi} from '../api';
import {notificationService, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

class SignUpStore {
  private _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  signUp = async (values: TSignUpFormValues) => {
    this._isLoading = true;

    try {
      await signUpApi(values.login, values.password, values.email);

      runInAction(() => {
        userStore.isUserLogged = true;
      });
    } catch (error) {
      notificationService.error(
        i18nAuthenticationInstance.t('Authentication.SignIn.AuthError')
      );
    } finally {
      this._isLoading = false;
    }
  };

  clear = () => {
    this._isLoading = false;
  };
}

export const signUpStore = new SignUpStore();
