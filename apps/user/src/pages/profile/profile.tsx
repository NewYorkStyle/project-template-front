import style from './profile.module.less';
import {profileStore} from '../../entities';
import {DeleteUser} from '../../widget/delete-user/delete-user';
import {PersonalData} from '../../widget/personal-data/presonal-data';
import {ProfileFooter} from '../../widget/profile-footer/profile-footer';
import {Divider, paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const Profile = withTranslation()(
  observer(({i18n: {changeLanguage}}: TProps) => {
    const {language} = paramsStore;

    useEffect(() => {
      changeLanguage(language);
    }, [language]);

    useEffect(() => {
      profileStore.getProfileData();

      return () => profileStore.clear();
    }, []);

    return (
      <div className={style.root}>
        <div className={style.content}>
          <section className={style.section}>
            <PersonalData />
          </section>
          <Divider />
          <section className={style.section}>
            <DeleteUser />
          </section>
          <Divider />
        </div>
        <ProfileFooter />
      </div>
    );
  })
);
