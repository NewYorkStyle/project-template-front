import {type ReactNode} from 'react';

import {type ButtonProps, type ModalProps} from 'antd';
import {makeAutoObservable} from 'mobx';

import {type TMetricsProps} from '../types';

type TExtendedButtonProps = ButtonProps & {analyticProps?: TMetricsProps};

export type TModalConfig = Omit<
  ModalProps,
  'open' | 'okButtonProps' | 'cancelButtonProps'
> & {
  id: string;
  content: ReactNode;
  open?: boolean;
  okButtonProps?: TExtendedButtonProps;
  cancelButtonProps?: TExtendedButtonProps;
};

class ModalService {
  modals: TModalConfig[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (config: Omit<TModalConfig, 'open'>) => {
    // Закрываем предыдущие модалки с таким же id
    this.closeModal(config.id);

    this.modals.push({
      ...config,
      open: true,
    });
  };

  closeModal = (id: string) => {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  };

  updateModal = (id: string, updates: Partial<TModalConfig>) => {
    const index = this.modals.findIndex((modal) => modal.id === id);
    if (index !== -1) {
      this.modals[index] = {...this.modals[index], ...updates};
    }
  };

  getModal = (id: string) => {
    return this.modals.find((modal) => modal.id === id);
  };
}

export const modalService = new ModalService();
