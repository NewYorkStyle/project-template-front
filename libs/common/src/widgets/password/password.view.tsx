import {TSuggestion} from './password';
import style from './password.module.less';
import {Password} from 'primereact/password';

/**
 * @prop {string} [placeholder] Плейсхолдер.
 * @prop {string} value Текущее значение.
 * @prop {(value: string) => void} onChange Обработчик изменения.
 * @prop {boolean} [toggleMask] "Глаз" рядом с поля ввода, переключающий маску.
 * @prop {boolean} [feedback] Сложность пароля.
 * @prop {TSuggestion} [suggestions] Подсказка при вводе пароля.
 * @prop {(e: React.KeyboardEvent<HTMLInputElement>) => void} onEnterClick Обработчик нажатия Enter.
 */
type TProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  toggleMask?: boolean;
  feedback?: boolean;
  suggestions?: TSuggestion;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  onEnterClick?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const PasswordView = ({
  className,
  feedback,
  mediumLabel,
  onChange,
  onEnterClick,
  placeholder,
  promptLabel,
  strongLabel,
  suggestions,
  toggleMask,
  value,
  weakLabel,
}: TProps) => {
  const footer = () => (
    <>
      <p>{suggestions?.header}</p>
      <ul>
        {suggestions?.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </>
  );

  return (
    <Password
      value={value}
      onChange={onChange}
      toggleMask={toggleMask}
      placeholder={placeholder}
      className={`${style.root} ${className}`}
      feedback={feedback}
      inputClassName={`${style.root} ${className}`}
      footer={suggestions && footer()}
      promptLabel={promptLabel}
      weakLabel={weakLabel}
      mediumLabel={mediumLabel}
      strongLabel={strongLabel}
      onKeyDown={onEnterClick}
    />
  );
};
