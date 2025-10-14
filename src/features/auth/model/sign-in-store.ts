import {makeAutoObservable, runInAction} from 'mobx';

import {userStore} from '@entities';

import {i18nInstance, notificationService} from '../../../shared';
import {signInApi} from '../api';
import {type TSignInFormValues} from '../types';

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
        userStore.setUserLogger(true);
        userStore.getPermissions();
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Authentication.SignIn.AuthError', {ns: 'Auth'})
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
