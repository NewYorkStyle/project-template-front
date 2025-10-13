import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {paramsStore} from '@entities';
import {E_METRICS_NAMESPACES, Select} from '@shared';

import {E_LANGUAGE} from '../lib';

import style from './language-select.module.less';

/**
 * Компонент выбора языка.
 */
export const LanguageSelect = observer(() => {
  const {i18n, t} = useTranslation('AppHeader');

  const {language, setLanguage} = paramsStore;

  const handleLanguageChange = (value: string) => {
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
    />
  );
});
