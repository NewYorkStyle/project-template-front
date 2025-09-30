import {i18nUserInstance} from '../../../entities';
import {initPersonalData} from '../../../shared';
import {deleteProfileApi, geteProfileApi, updateProfileApi} from '../api';
import {TProfileData} from '../types';
import {notificationService, userStore} from '@common';
import {makeAutoObservable, runInAction} from 'mobx';

class ProfileStore {
  private _initData: TProfileData = {...initPersonalData};
  private _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get initData(): TProfileData {
    return this._initData;
  }

  get isLoading(): boolean {
    return this._isLoading;
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

  clear = () => {
    this._initData = {...initPersonalData};
  };
}

export const profileStore = new ProfileStore();
