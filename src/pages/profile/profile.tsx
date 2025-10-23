import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import {DeleteUser, PersonalData} from '@features';
import {E_METRICS_NAMESPACES, Page, type TTabItem, Tabs} from '@shared';

import style from './profile.module.less';

export const Profile = observer(() => {
  const {t} = useTranslation('User');

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
    <Page title={t('Title')}>
      <div className={style.root}>
        <Tabs
          items={tabConfig}
          analyticProps={{
            label: 'Profile tabs',
            namespace: E_METRICS_NAMESPACES.USER,
          }}
          tabPosition='left'
          className={style.fullHeightTabs}
        />
      </div>
    </Page>
  );
});
