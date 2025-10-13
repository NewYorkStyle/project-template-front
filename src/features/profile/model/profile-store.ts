import {makeAutoObservable, runInAction} from 'mobx';

import {userStore} from '@entities';

import {i18nInstance, notificationService} from '../../../shared';
import {
  deleteProfileApi,
  getEmailChangeOtpApi,
  getOtpApi,
  geteProfileApi,
  sendEmailChangeOtpApi,
  sendOtpApi,
  updateProfileApi,
} from '../api';
import {initPersonalData} from '../lib';
import {type TProfileData} from '../types';

class ProfileStore {
  private _initData: TProfileData = {...initPersonalData};
  private _isLoading = false;
  private _emailFieldStep: 'button' | 'otp' = 'button';

  constructor() {
    makeAutoObservable(this);
  }

  get initData() {
    return this._initData;
  }

  get isLoading() {
    return this._isLoading;
  }

  get emailFieldStep() {
    return this._emailFieldStep;
  }

  getProfileData = async () => {
    this._isLoading = true;

    try {
      const profile = await geteProfileApi();

      runInAction(() => {
        this._initData = {
          name: profile.name,
          patronymic: profile.patronymic,
          surname: profile.surname,
        };
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.PersonalData.ErrorGetData', {ns: 'User'})
      );
    } finally {
      this._isLoading = false;
    }
  };

  saveData = async (data: TProfileData) => {
    this._isLoading = true;

    try {
      const profile = await updateProfileApi(data);

      runInAction(() => {
        this._initData = {
          name: profile.name,
          patronymic: profile.patronymic,
          surname: profile.surname,
        };

        notificationService.success(
          i18nInstance.t('Profile.PersonalData.SuccessfulySaveData', {
            ns: 'User',
          })
        );
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.PersonalData.ErrorSaveData')
      );
    } finally {
      this._isLoading = false;
    }
  };

  deleteProfile = async (password: string) => {
    this._isLoading = true;

    try {
      await deleteProfileApi(password);

      runInAction(() => {
        notificationService.success(
          i18nInstance.t('Profile.Delete.Successfully', {ns: 'User'})
        );

        userStore.clearCookies();
        userStore.clear();
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.Delete.Error', {ns: 'User'})
      );
    } finally {
      this._isLoading = false;
    }
  };

  getVerificationOtp = async () => {
    this._isLoading = true;

    try {
      await getOtpApi();

      runInAction(() => {
        this._emailFieldStep = 'otp';
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.PersonalData.EmailVerification.ErrorGet', {
          ns: 'User',
        })
      );
    } finally {
      this._isLoading = false;
    }
  };

  sendVerificationOtp = async (otp: string) => {
    this._isLoading = true;

    try {
      await sendOtpApi(otp);

      runInAction(() => {
        this._emailFieldStep = 'button';
        userStore.getPermissions();
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.PersonalData.EmailVerification.ErrorSend', {
          ns: 'User',
        })
      );
    } finally {
      this._isLoading = false;
    }
  };

  getEmailChangeOtp = async (email: string) => {
    this._isLoading = true;

    try {
      await getEmailChangeOtpApi(email);

      runInAction(() => {
        this._emailFieldStep = 'otp';
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.PersonalData.ChangeEmail.ErrorGet', {
          ns: 'User',
        })
      );
    } finally {
      this._isLoading = false;
    }
  };

  sendEmailChangeOtp = async (otp: string) => {
    this._isLoading = true;

    try {
      await sendEmailChangeOtpApi(otp);

      runInAction(() => {
        this._emailFieldStep = 'button';
        notificationService.success(
          i18nInstance.t('Profile.PersonalData.ChangeEmail.EmailChanged', {
            ns: 'User',
          })
        );
      });
    } catch (_error) {
      notificationService.error(
        i18nInstance.t('Profile.PersonalData.ChangeEmail.ErrorSend', {
          ns: 'User',
        })
      );
    } finally {
      this._isLoading = false;
    }
  };

  clear = () => {
    this._initData = {...initPersonalData};
    this._isLoading = false;
  };
}

export const profileStore = new ProfileStore();
