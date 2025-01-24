import {InputView} from './input.view';
import {E_KEY_FILTER} from '../../shared';

/**
 * @prop {string} [placeholder] Плейсхолдер.
 * @prop { E_KEY_FILTER | RegExp} [keyfilter] Фильтр вводимых значений.
 * @prop {string} value Текущее значение.
 * @prop {(value: string) => void} onChange Обработчик изменения.
 * @prop {() => void} onEnterClick Обработчик нажатия Enter.
 */
type TProps = {
  placeholder?: string;
  keyfilter?: E_KEY_FILTER | RegExp;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  onEnterClick?: () => void;
};

/**
 * Компонент обёртка над Primereact для отображения поля ввода. Содержит логику.
 */
export const Input = ({
  className,
  keyfilter,
  onChange,
  onEnterClick,
  placeholder,
  value,
}: TProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnterClick && e.key === 'Enter') {
      onEnterClick();
    }
  };

  return (
    <InputView
      keyfilter={keyfilter}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      className={className}
      onEnterClick={handleEnterClick}
    />
  );
};
