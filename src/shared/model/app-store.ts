import {makeAutoObservable} from 'mobx';

class AppStore {
  private _showMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  get showMenu() {
    return this._showMenu;
  }

  openMenu = () => {
    this._showMenu = true;
  };

  closeMenu = () => {
    this._showMenu = false;
  };
}

export const appStore = new AppStore();
