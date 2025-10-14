import {makeAutoObservable, runInAction} from 'mobx';

import {userStore} from '@entities';

import {i18nInstance, notificationService} from '../../../shared';
import {signUpApi} from '../api';
import {type TSignUpFormValues} from '../types';

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

export const signUpStore = new SignUpStore();
