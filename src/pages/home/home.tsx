import {useTranslation} from 'react-i18next';

import {Placeholder} from '@features';
import {Page} from '@shared';

export const Home = () => {
  const {t} = useTranslation('Main');

  return (
    <Page title={t('Title')}>
      <Placeholder />
    </Page>
  );
};
