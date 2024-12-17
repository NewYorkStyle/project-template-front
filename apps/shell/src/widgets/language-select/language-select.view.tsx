import {Dropdown, E_ANALYTIC_NAMESPACES, TDropdownOption} from '@common';
import {DropdownChangeEvent} from 'primereact/dropdown';

/**
 * @prop {TDropdownOption[]} languageOptions Поддерживаемые языки.
 * @prop {(e: DropdownChangeEvent) => void} handleLanguageChange Обработчик выбора языка.
 * @prop {string} language Выбранный язык.
 */
type TProps = {
  languageOptions: TDropdownOption[];
  handleLanguageChange: (e: DropdownChangeEvent) => void;
  selectedLanguage: string;
};

/**
 * Компонент выбора языка.
 */
export const LanguageSelectView = ({
  handleLanguageChange,
  languageOptions,
  selectedLanguage,
}: TProps) => {
  return (
    <Dropdown
      options={languageOptions}
      onChange={handleLanguageChange}
      value={selectedLanguage}
      analyticProps={{
        label: 'language-select',
        namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
      }}
    />
  );
};
