import style from './authentication.module.less';
import {Auth} from '../../features';
import {paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export const Authentication = observer(() => {
  const {
    i18n: {changeLanguage},
  } = useTranslation();
  const {language} = paramsStore;

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return (
    <div className={style.root}>
      <Auth />
    </div>
  );
});
