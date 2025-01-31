import {refreshToken, userLogout} from '../api';
import Cookies from 'js-cookie';
import {makeAutoObservable, runInAction} from 'mobx';

class UserStore {
  public isUserLogged = Cookies.get('isUserLoggedIn') === 'true';
  public name = '';
  public patronymic = '';
  public surname = '';

  constructor() {
    makeAutoObservable(this);
  }

  refresh = async () => {
    try {
      await refreshToken();

      runInAction(() => {
        this.isUserLogged = true;
      });
    } catch (error) {
      this.isUserLogged = false;
    }
  };

  loggout = async () => {
    await userLogout();

    runInAction(() => {
      this.clear();
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      Cookies.remove('userId');
      Cookies.remove('isUserLoggedIn');
    });
  };

  clear = () => {
    this.isUserLogged = false;
    this.name = '';
    this.patronymic = '';
    this.surname = '';
  };
}

export const userStore = new UserStore();
