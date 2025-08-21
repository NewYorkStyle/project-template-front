import {initPersonalData} from '../../shared/contants';
import i18nUserInstance from '../../shared/utils/i18n-init';
import {deleteProfileApi, geteProfileApi, updateProfileApi} from '../api';
import {TProfileData} from '../models';
import {E_TOAST_SEVERITY, showToast, userStore} from '@common';
import isEqual from 'lodash/isEqual';
import {makeAutoObservable, runInAction} from 'mobx';

class ProfileStore {
  private _initData: TProfileData = {...initPersonalData};
  private _personalData: TProfileData = {...initPersonalData};
  private _password = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isSaveDisabled(): boolean {
    return isEqual(this._personalData, this._initData);
  }

  get personalData(): TProfileData {
    return this._personalData;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  getProfileData = async () => {
    try {
      const profile = await geteProfileApi();

      runInAction(() => {
        this._personalData = profile;
        this._initData = profile;
      });
    } catch (error) {
      showToast({
        severity: E_TOAST_SEVERITY.ERROR,
        summary: i18nUserInstance.t('Profile.PersonalData.ErrorGetData'),
      });
    }
  };

  saveData = async () => {
    try {
      const profile = await updateProfileApi(this._personalData);

      runInAction(() => {
        this._personalData = profile;
        this._initData = profile;

        showToast({
          severity: E_TOAST_SEVERITY.INFO,
          summary: i18nUserInstance.t(
            'Profile.PersonalData.SuccessfulySaveData'
          ),
        });
      });
    } catch (error) {
      showToast({
        severity: E_TOAST_SEVERITY.ERROR,
        summary: i18nUserInstance.t('Profile.PersonalData.ErrorSaveData'),
      });
    }
  };

  deleteProfile = async (navigateCallback: () => void) => {
    try {
      await deleteProfileApi(this._password);

      runInAction(() => {
        showToast({
          severity: E_TOAST_SEVERITY.INFO,
          summary: i18nUserInstance.t('Profile.Delete.Successfully'),
        });
        userStore.isUserLogged = false;
        navigateCallback();
      });
    } catch (error) {
      showToast({
        severity: E_TOAST_SEVERITY.ERROR,
        summary: i18nUserInstance.t('Profile.Delete.Error'),
      });
    }
  };

  changePersonalData = (
    field: keyof TProfileData,
    value: TProfileData[keyof TProfileData]
  ) => {
    this._personalData = {...this._personalData, [field]: value};
  };

  clear = () => {
    this._personalData = {...initPersonalData};
    this._initData = {...initPersonalData};
    this._password = '';
  };
}

export const profileStore = new ProfileStore();
