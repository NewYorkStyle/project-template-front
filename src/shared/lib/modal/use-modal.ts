import {useCallback} from 'react';

import {type TModalConfig, modalService} from './modal-service';

export const useModal = () => {
  const openModal = useCallback((config: Omit<TModalConfig, 'open'>) => {
    modalService.openModal(config);
  }, []);

  const closeModal = useCallback((id: string) => {
    modalService.closeModal(id);
  }, []);

  const updateModal = useCallback(
    (id: string, updates: Partial<TModalConfig>) => {
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
