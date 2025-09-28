import style from './language-select.module.less';
import {E_LANGUAGE} from '../../shared/constants';
import {E_ANALYTIC_NAMESPACES, Select} from '@common';
import {paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

/**
 * Компонент выбора языка.
 */
export const LanguageSelect = observer(() => {
  const {
    i18n: {changeLanguage},
    t,
  } = useTranslation();

  const {language, setLanguage} = paramsStore;

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    changeLanguage(value);
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
        namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
      }}
      className={style.root}
    />
  );
});
