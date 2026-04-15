import {useEffect} from 'react';

import {useTranslation} from 'react-i18next';

import {HOME_ONBOARDING_TOUR_KEY, Placeholder, useTourClient} from '@features';
import {Page} from '@shared';

export const Home = () => {
  const {t} = useTranslation('Main');
  const {requestTourIfAllowed} = useTourClient();

  useEffect(() => {
    requestTourIfAllowed(HOME_ONBOARDING_TOUR_KEY);
  }, [requestTourIfAllowed]);

  return (
    <Page title={t('Title')}>
      <Placeholder />
    </Page>
  );
};
