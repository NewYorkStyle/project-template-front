import {E_POPOVER_POSITION} from './popover';
import styles from './popover.module.less';
import React, {ReactNode} from 'react';

type TPopoverPosition = {
  left: number;
  top: number;
};

/**
 * @prop {ReactNode} content Содержимое всплывающего окна.
 * @prop {boolean} isOpen Флаг открытия.
 * @prop {TPopoverPosition} popoverPosition Координаты для всплывающего окна.
 * @prop {React.RefObject<HTMLDivElement>} popoverRef Реф всплывающего окна.
 * @prop {E_POPOVER_POSITION} [position] Позиция всплывающего окна.
 * @prop {React.RefObject<HTMLDivElement>} triggerRef Реф контейнера.
 */
type TProps = {
  children: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  popoverPosition: TPopoverPosition;
  popoverRef: React.RefObject<HTMLDivElement>;
  position?: E_POPOVER_POSITION;
  triggerRef: React.RefObject<HTMLDivElement>;
};

/**
 * Компонент для отображения всплывающего окна.
 */
export const PopoverView: React.FC<TProps> = ({
  children,
  content,
  isOpen,
  popoverPosition,
  popoverRef,
  position,
  triggerRef,
}) => {
  return (
    <div ref={triggerRef} style={{display: 'inline-block'}}>
      {children}
      {isOpen && (
        <div
          ref={popoverRef}
          className={styles.popover}
          style={{left: popoverPosition.left, top: popoverPosition.top}}
        >
          <div className={`${styles.arrow} ${position}`} />
          {content}
        </div>
      )}
    </div>
  );
};
