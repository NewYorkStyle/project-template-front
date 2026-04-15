import {useTranslation} from 'react-i18next';

import {E_LANGUAGE, useLanguage} from '@entities';
import {E_METRICS_NAMESPACES, Select, TOUR_SELECTORS} from '@shared';

import style from './language-select.module.scss';

/**
 * Компонент выбора языка.
 */
export const LanguageSelect = () => {
  const {i18n, t} = useTranslation('AppHeader');

  const {language, setLanguage} = useLanguage();

  const handleLanguageChange = (value: E_LANGUAGE) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  const languageOptions = [
    {
      analyticsLabel: 'ru',
      label: t('Languages.ru'),
      value: E_LANGUAGE.RUS,
    },
    {
      analyticsLabel: 'eng',
      label: t('Languages.eng'),
      value: E_LANGUAGE.ENG,
    },
  ];

  return (
    <Select
      options={languageOptions}
      onChange={handleLanguageChange}
      value={language}
      analyticProps={{
        label: 'language-select',
        namespace: E_METRICS_NAMESPACES.APP_HEADER,
      }}
      className={style.root}
      data-tour={TOUR_SELECTORS.HOME_LANGUAGE_SWITCH}
    />
  );
};
