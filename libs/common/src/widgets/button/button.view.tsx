import style from './button.module.less';
import {E_BUTTON_SEVERITY} from '../../shared';
import {Button} from 'primereact/button';
import {ReactNode} from 'react';

/**
 * @prop {() => void} onClick Обработчик клика.
 * @prop {boolean} [disabled] Обработчик клика.
 * @prop {boolean} [rounded] Круглая кнопка.
 * @prop {ReactNode} [icon] Иконка.
 * @prop {boolean} [link] Кнопка как ссылка.
 * @prop {E_BUTTON_SEVERITY} [severity] Стили кнопок.
 */
type TProps = {
  onClick: () => void;
  children?: string;
  className?: string;
  disabled?: boolean;
  rounded?: boolean;
  icon?: ReactNode;
  link?: boolean;
  severity?: E_BUTTON_SEVERITY;
};

/**
 * Компонент обёртка над Primereact для отображения кнопки.
 */
export const ButtonView = ({
  children,
  className,
  disabled,
  icon,
  link,
  onClick,
  rounded,
  severity,
}: TProps) => {
  return link ? (
    <span className={`${style.link} ${className}`} onClick={onClick}>
      {children}
    </span>
  ) : (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      rounded={rounded}
      icon={icon}
      severity={severity}
    >
      {children}
    </Button>
  );
};
