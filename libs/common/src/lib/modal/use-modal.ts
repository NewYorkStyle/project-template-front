// libs/common/src/lib/modal/use-modal.ts
import {ModalConfig, modalService} from './modal.service';
import {useCallback} from 'react';

export const useModal = () => {
  const openModal = useCallback((config: Omit<ModalConfig, 'open'>) => {
    modalService.openModal(config);
  }, []);

  const closeModal = useCallback((id: string) => {
    modalService.closeModal(id);
  }, []);

  const updateModal = useCallback(
    (id: string, updates: Partial<ModalConfig>) => {
      modalService.updateModal(id, updates);
    },
    []
  );

  return {
    closeModal,
    openModal,
    updateModal,
  };
};
