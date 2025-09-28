// libs/common/src/lib/modal/modal.service.ts
import {ModalProps} from 'antd';
import {makeAutoObservable} from 'mobx';

export interface ModalConfig extends Omit<ModalProps, 'open'> {
  id: string;
  content: React.ReactNode;
  open?: boolean;
}

class ModalService {
  modals: ModalConfig[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (config: Omit<ModalConfig, 'open'>) => {
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

  updateModal = (id: string, updates: Partial<ModalConfig>) => {
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
