import {ModalConfig, modalService} from './modal.service';
import {Modal} from 'antd';
import {observer} from 'mobx-react-lite';
import React from 'react';

export const ModalProvider: React.FC = observer(() => {
  const handleClose = (modal: ModalConfig) => {
    if (modal.onCancel) {
      modal.onCancel(null as any);
    } else {
      modalService.closeModal(modal.id);
    }
  };

  const handleOk = (modal: ModalConfig) => {
    if (modal.onOk) {
      modal.onOk(null as any);
    } else {
      modalService.closeModal(modal.id);
    }
  };

  return (
    <>
      {modalService.modals.map((modal) => (
        <Modal
          key={modal.id}
          open={modal.open}
          onOk={() => handleOk(modal)}
          onCancel={() => handleClose(modal)}
          {...modal}
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
});
