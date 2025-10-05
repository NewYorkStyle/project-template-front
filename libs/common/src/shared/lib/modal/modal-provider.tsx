import {TModalConfig, modalService} from './modal.service';
import {E_METRICS_EVENTS} from '../../constants';
import {sendEvent} from '../metrics';
import {Modal} from 'antd';
import {observer} from 'mobx-react-lite';
import React from 'react';

export const ModalProvider: React.FC = observer(() => {
  const handleClose = (modal: TModalConfig) => {
    const analytics =
      modal.cancelButtonProps && modal.cancelButtonProps.analyticProps;
    if (analytics) {
      sendEvent({
        event: E_METRICS_EVENTS.CLICK,
        label: analytics.label,
        namespace: analytics.namespace,
      });
    }
    if (modal.onCancel) {
      modal.onCancel(
        undefined as unknown as React.MouseEvent<HTMLButtonElement>
      );
    } else {
      modalService.closeModal(modal.id);
    }
  };

  const handleOk = (modal: TModalConfig) => {
    const analytics = modal.okButtonProps && modal.okButtonProps.analyticProps;
    if (analytics) {
      sendEvent({
        event: E_METRICS_EVENTS.CLICK,
        label: analytics.label,
        namespace: analytics.namespace,
      });
    }
    if (modal.onOk) {
      modal.onOk(undefined as unknown as React.MouseEvent<HTMLButtonElement>);
    } else {
      modalService.closeModal(modal.id);
    }
  };

  return (
    <>
      {modalService.modals.map((modal) => (
        <Modal
          {...modal}
          key={modal.id}
          open={modal.open}
          onOk={() => handleOk(modal)}
          onCancel={() => handleClose(modal)}
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
});
