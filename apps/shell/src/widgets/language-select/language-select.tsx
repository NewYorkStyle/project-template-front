import {LanguageSelectView} from './language-select.view';
import {E_LANGUAGE} from '../../shared/constants';
import {FlagEn, FlagRu, TDropdownOption} from '@common';
import {i18nStore} from '@common';
import {observer} from 'mobx-react-lite';
import {DropdownChangeEvent} from 'primereact/dropdown';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

/**
 * Компонент выбора языка.
 */
export const LanguageSelect = withTranslation()(
  observer(({i18n: {changeLanguage, t}}: TProps) => {
    const {language, setLanguage} = i18nStore;

    const handleLanguageChange = (event: DropdownChangeEvent) => {
      setLanguage(event.value);
      changeLanguage(event.value);
      localStorage.setItem('language', event.value);
    };

    const languageOptions: TDropdownOption[] = [
      {
        analyticsLabel: 'ru',
        icon: <FlagRu size={20} />,
        label: t('Languages.ru'),
        value: E_LANGUAGE.RUS,
      },
      {
        analyticsLabel: 'eng',
        icon: <FlagEn size={20} />,
        label: t('Languages.eng'),
        value: E_LANGUAGE.ENG,
      },
    ];

    return (
      <LanguageSelectView
        languageOptions={languageOptions}
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={language}
      />
    );
  })
);
