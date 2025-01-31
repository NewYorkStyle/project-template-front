import {PopoverView} from './popover.view';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const OFFSET = 5;

export enum E_POPOVER_POSITION {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * @prop {ReactNode} content Содержимое всплывающего окна.
 * @prop {E_POPOVER_POSITION} [position] Позиция всплывающего окна.
 * @prop {boolean} isOpen Флаг открытия.
 * @prop {() => void} onClose Обработчик закрытия.
 */
type TProps = {
  children: ReactNode;
  content: ReactNode;
  position?: E_POPOVER_POSITION;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

/**
 * Компонент для отображения всплывающего окна. Содержит логику.
 */
export const Popover: React.FC<TProps> = ({
  children,
  className,
  content,
  isOpen,
  onClose,
  position = E_POPOVER_POSITION.BOTTOM,
}) => {
  const [popoverPosition, setPopoverPosition] = useState({left: 0, top: 0});
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const calculatePopoverPosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newTop = 0;
    let newLeft = 0;

    switch (position) {
      case E_POPOVER_POSITION.TOP:
        newLeft =
          triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        newTop = triggerRect.top - popoverRect.height;
        break;
      case E_POPOVER_POSITION.BOTTOM:
        newLeft =
          triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2;
        newTop = triggerRect.bottom + OFFSET;
        break;
      case E_POPOVER_POSITION.LEFT:
        newLeft = triggerRect.left - popoverRect.width;
        newTop =
          triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        break;
      case E_POPOVER_POSITION.RIGHT:
        newLeft = triggerRect.right;
        newTop =
          triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
        break;
    }

    // Проверка и корректировка позиции, если Popover выходит за пределы экрана
    if (newLeft < 0) {
      newLeft = 10;
    } else if (newLeft + popoverRect.width > windowWidth) {
      newLeft = windowWidth - popoverRect.width - 10;
    }

    if (newTop < 0) {
      newTop = 10;
    } else if (newTop + popoverRect.height > windowHeight) {
      newTop = windowHeight - popoverRect.height - 10;
    }

    setPopoverPosition({left: newLeft, top: newTop});
  }, [position]);

  useEffect(() => {
    if (isOpen) {
      calculatePopoverPosition();
      window.addEventListener('resize', calculatePopoverPosition);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('resize', calculatePopoverPosition);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('resize', calculatePopoverPosition);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, calculatePopoverPosition]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  return (
    <PopoverView
      children={children}
      content={content}
      isOpen={isOpen}
      popoverPosition={popoverPosition}
      popoverRef={popoverRef}
      position={position}
      triggerRef={triggerRef}
      className={className}
    />
  );
};
