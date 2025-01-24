import style from './button.module.less';
import {Button} from 'primereact/button';
import {ReactNode} from 'react';

/**
 * @prop {() => void} onClick Обработчик клика.
 * @prop {boolean} [disabled] Обработчик клика.
 * @prop {boolean} [rounded] Круглая кнопка.
 * @prop {ReactNode} [icon] Иконка.
 * @prop {boolean} [link] Кнопка как ссылка.
 */
type TProps = {
  onClick: () => void;
  children?: string;
  className?: string;
  disabled?: boolean;
  rounded?: boolean;
  icon?: ReactNode;
  link?: boolean;
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
    >
      {children}
    </Button>
  );
};
