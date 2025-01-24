import {PasswordView} from './password.view';

export type TSuggestion = {
  header: string;
  requirements: string[];
};

/**
 * @prop {string} [placeholder] Плейсхолдер.
 * @prop {string} value Текущее значение.
 * @prop {(value: string) => void} onChange Обработчик изменения.
 * @prop {boolean} [toggleMask] "Глаз" рядом с поля ввода, переключающий маску.
 * @prop {boolean} [feedback] Сложность пароля.
 * @prop {TSuggestion} [suggestions] Подсказка при вводе пароля.
 * @prop {() => void} onEnterClick Обработчик нажатия Enter.
 */
type TProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  toggleMask?: boolean;
  feedback?: boolean;
  suggestions?: TSuggestion;
  promptLabel?: string;
  weakLabel?: string;
  mediumLabel?: string;
  strongLabel?: string;
  onEnterClick?: () => void;
};

export const Password = ({
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnterClick && e.key === 'Enter') {
      onEnterClick();
    }
  };

  return (
    <PasswordView
      value={value}
      onChange={handleChange}
      toggleMask={toggleMask}
      placeholder={placeholder}
      className={className}
      feedback={feedback}
      suggestions={suggestions}
      promptLabel={promptLabel}
      weakLabel={weakLabel}
      mediumLabel={mediumLabel}
      strongLabel={strongLabel}
      onEnterClick={handleEnterClick}
    />
  );
};
