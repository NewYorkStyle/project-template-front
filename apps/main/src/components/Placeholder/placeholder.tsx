import style from './placeholder.module.less';
import {Button, i18nStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Placeholder = withTranslation()(
  observer(({i18n: {changeLanguage, t}}: TProps) => {
    const {language} = i18nStore;

    useEffect(() => {
      changeLanguage(language);
    }, [language]);

    return (
      <div className={style.root}>
        <span className={style.placeholder}>{t('Placeholder.Ad')}</span>
        <Button className={style.button}>{t('Placeholder.didntWork')}</Button>
      </div>
    );
  })
);
