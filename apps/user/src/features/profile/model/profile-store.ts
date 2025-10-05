import {i18nUserInstance} from '../../../entities';
import {initPersonalData} from '../../../shared';
import {
  deleteProfileApi,
  getOtpApi,
  geteProfileApi,
  sendOtpApi,
  updateProfileApi,
} from '../api';
import {TProfileData} from '../types';
import {E_PERMISSIONS, notificationService, userStore} from '@common';
import {autorun, makeAutoObservable, runInAction} from 'mobx';

class ProfileStore {
  private _initData: TProfileData = {...initPersonalData};
  private _isLoading = false;
  private _emailVerificationState: 'button' | 'otp' | 'empty' = 'empty';

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      if (userStore.permissions.includes(E_PERMISSIONS.EMAIL_VERIFIED)) {
        this._emailVerificationState = 'empty';
      } else {
        this._emailVerificationState = 'button';
      }
    });
  }

  get initData() {
    return this._initData;
  }

  get isLoading() {
    return this._isLoading;
  }

  get emailVerificationState() {
    return this._emailVerificationState;
  }

  getProfileData = async () => {
    this._isLoading = true;

    try {
      const profile = await geteProfileApi();

      runInAction(() => {
        // TODO Вернуть email после реализации функционала
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
        // TODO Вернуть email после реализации функционала
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

  getOtp = async () => {
    this._isLoading = true;

    try {
      await getOtpApi();

      runInAction(() => {
        this._emailVerificationState = 'otp';
      });
    } catch (error) {
      notificationService.error(
        i18nUserInstance.t('Profile.PersonalData.EmailVerification.ErrorGet')
      );
    } finally {
      this._isLoading = false;
    }
  };

  sendOtp = async (otp: string) => {
    this._isLoading = true;

    try {
      await sendOtpApi(otp);

      runInAction(() => {
        this._emailVerificationState = 'empty';
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

  clear = () => {
    this._initData = {...initPersonalData};
    this._isLoading = false;
  };
}

export const profileStore = new ProfileStore();
