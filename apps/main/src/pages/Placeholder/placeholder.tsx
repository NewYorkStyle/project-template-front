import style from './placeholder.module.less';
import {Button, E_ANALYTIC_NAMESPACES, i18nStore} from '@common';
import noop from 'lodash/noop';
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
        <Button
          className={style.button}
          analyticProps={{
            label: 'didnt-work',
            namespace: E_ANALYTIC_NAMESPACES.PLACEHOLDER,
          }}
          onClick={noop}
        >
          {t('Placeholder.didntWork')}
        </Button>
      </div>
    );
  })
);
