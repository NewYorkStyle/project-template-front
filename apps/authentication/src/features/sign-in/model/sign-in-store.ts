import {i18nAuthenticationInstance} from '../../../entities';
import {TSignInFormValues} from '../../../shared';
import {signInApi} from '../api';
import {notificationService, userStore} from '@common';
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

export const signInStore = new SignInStore();
