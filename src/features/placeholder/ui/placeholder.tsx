import {Flex} from '@new_york_style/project-template-ui';
import {useTranslation} from 'react-i18next';

import {HOME_ONBOARDING_TOUR_KEY, useTourClient} from '@features';
import {Button, designTokens, E_METRICS_NAMESPACES, Typography} from '@shared';

import style from './placeholder.module.scss';

export const Placeholder = () => {
  const {t} = useTranslation('Main');
  const {requestTour} = useTourClient();

  return (
    <Flex
      vertical
      justify='center'
      align='center'
      className={style.root}
      gap={designTokens.spacing.lg}
    >
      <Typography.Title className={style.title}>
        {t('Placeholder.Welcome')}
      </Typography.Title>
      <Button
        analyticProps={{
          label: 'start-tour',
          namespace: E_METRICS_NAMESPACES.PLACEHOLDER,
        }}
        onClick={() => requestTour(HOME_ONBOARDING_TOUR_KEY)}
      >
        {t('Placeholder.StartTour')}
      </Button>
    </Flex>
  );
};
