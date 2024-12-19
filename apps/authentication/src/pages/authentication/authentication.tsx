import style from './authentication.module.less';
import {Auth} from '../../widgets';
import {i18nStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Authentication = withTranslation()(
  observer(({i18n: {changeLanguage, t}}: TProps) => {
    const {language} = i18nStore;

    useEffect(() => {
      changeLanguage(language);
    }, [language]);

    return (
      <div className={style.root}>
        <Auth />
      </div>
    );
  })
);
