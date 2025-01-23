import style from './input.module.less';
import {E_KEY_FILTER} from '../../shared';
import {InputText} from 'primereact/inputtext';

/**
 * @prop {string} [placeholder] Плейсхолдер.
 * @prop { E_KEY_FILTER | RegExp} [keyfilter] Фильтр вводимых значений.
 * @prop {string} value Текущее значение.
 * @prop {(value: string) => void} onChange Обработчик изменения.
 */
type TProps = {
  placeholder?: string;
  keyfilter?: E_KEY_FILTER | RegExp;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

/**
 * Компонент обёртка над Primereact для отображения поля ввода.
 */
export const InputView = ({
  className,
  keyfilter,
  onChange,
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
    />
  );
};
