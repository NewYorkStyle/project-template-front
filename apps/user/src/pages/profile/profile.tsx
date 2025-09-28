import style from './profile.module.less';
import {DeleteUser} from '../../widget/delete-user/delete-user';
import {PersonalData} from '../../widget/personal-data/presonal-data';
import {E_ANALYTIC_NAMESPACES, TTabItem, Tabs, paramsStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export const Profile = observer(() => {
  const {
    i18n: {changeLanguage},
    t,
  } = useTranslation();
  const {language} = paramsStore;

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  const tabConfig: TTabItem[] = [
    {
      analyticsLabel: 'personal data',
      children: <PersonalData />,
      key: 'personal-data',
      label: t('Profile.PersonalData.Header'),
    },
    {
      analyticsLabel: 'delete',
      children: <DeleteUser />,
      key: 'delete',
      label: t('Profile.Delete.Header'),
    },
  ];

  return (
    <div className={style.root}>
      <Tabs
        items={tabConfig}
        analyticProps={{
          label: 'Profile tabs',
          namespace: E_ANALYTIC_NAMESPACES.USER,
        }}
        tabPosition='left'
        className={style.fullHeightTabs}
      />
    </div>
  );
});
