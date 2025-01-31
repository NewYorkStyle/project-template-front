import style from './profile.module.less';
import {PersonalData} from '../../widget/personal-data/presonal-data';
import {Divider, i18nStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Profile = withTranslation()(
  observer(({i18n: {changeLanguage}}: TProps) => {
    const {language} = i18nStore;

    useEffect(() => {
      changeLanguage(language);
    }, [language]);

    return (
      <div className={style.root}>
        <section className={style.personalData}>
          <PersonalData />
        </section>
        <Divider />
      </div>
    );
  })
);
