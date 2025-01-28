import style from './dialog.module.less';
import {Dialog as PrimeDialog} from 'primereact/dialog';
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

export const DialogView = ({
  children,
  footer,
  header,
  onClose,
  visible,
}: TProps) => {
  return (
    <PrimeDialog
      header={header}
      visible={visible}
      onHide={onClose}
      footer={footer}
      className={style.root}
    >
      {children}
    </PrimeDialog>
  );
};
