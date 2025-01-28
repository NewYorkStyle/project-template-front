import {DialogView} from './dialog.view';
import {ReactNode} from 'react';

/**
 * @prop {boolean} visible Флаг показа модального окна.
 * @prop {() => void} onClose Обработчик закрытия.
 * @prop {string} [header] Заголовок.
 * @prop {string} [footer] Футер.
 */
type TProps = {
  visible: boolean;
  onClose: () => void;
  header?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const Dialog = ({
  children,
  footer,
  header,
  onClose,
  visible,
}: TProps) => {
  return (
    <DialogView
      header={header}
      onClose={onClose}
      visible={visible}
      footer={footer}
    >
      {children}
    </DialogView>
  );
};
