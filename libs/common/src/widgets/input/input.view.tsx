import style from './input.module.less';
import {E_KEY_FILTER} from '../../shared';
import {InputText} from 'primereact/inputtext';

/**
 * @prop {string} [placeholder] Плейсхолдер.
 * @prop { E_KEY_FILTER | RegExp} [keyfilter] Фильтр вводимых значений.
 * @prop {string} value Текущее значение.
 * @prop {(value: string) => void} onChange Обработчик изменения.
 * @prop {(e: React.KeyboardEvent<HTMLInputElement>) => void} onEnterClick Обработчик нажатия Enter.
 */

type TProps = {
  placeholder?: string;
  keyfilter?: E_KEY_FILTER | RegExp;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onEnterClick?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

/**
 * Компонент обёртка над Primereact для отображения поля ввода.
 */
export const InputView = ({
  className,
  keyfilter,
  onChange,
  onEnterClick,
  placeholder,
  value,
}: TProps) => {
  return (
    <InputText
      keyfilter={keyfilter}
      placeholder={placeholder}
      className={style.root}
      value={value}
      onChange={onChange}
      pt={{root: {className: className}}}
      onKeyDown={onEnterClick}
    />
  );
};
