import {i18nUserInstance} from '../../../entities';
import {initPersonalData} from '../../../shared';
import {
  deleteProfileApi,
  getEmailChangeOtpApi,
  getOtpApi,
  geteProfileApi,
  sendEmailChangeOtpApi,
  sendOtpApi,
  updateProfileApi,
} from '../api';
import {TProfileData} from '../types';
import {notificationService, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

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
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.ErrorGetData')
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
          i18nUserInstance.t('Profile.PersonalData.SuccessfulySaveData')
        );
      });
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.ErrorSaveData')
      );
    } finally {
      this._isLoading = false;
    }
  };

  deleteProfile = async (password: string, navigateCallback: () => void) => {
    this._isLoading = true;

    try {
      await deleteProfileApi(password);

      runInAction(() => {
        notificationService.success(
          i18nUserInstance.t('Profile.Delete.Successfully')
        );

        userStore.clearCookies();
        userStore.clear();
        navigateCallback();
      });
    } catch (error) {
      notificationService.error(i18nUserInstance.t('Profile.Delete.Error'));
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
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.EmailVerification.ErrorGet')
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
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.EmailVerification.ErrorSend')
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
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.ChangeEmail.ErrorGet')
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
          i18nUserInstance.t('Profile.PersonalData.ChangeEmail.EmailChanged')
        );
      });
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.ChangeEmail.ErrorSend')
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
