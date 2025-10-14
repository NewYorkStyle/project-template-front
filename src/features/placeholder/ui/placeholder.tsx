import noop from 'lodash/noop';
import {useTranslation} from 'react-i18next';

import {
  Button,
  designTokens,
  E_METRICS_NAMESPACES,
  Flex,
  Typography,
} from '@shared';

import style from './placeholder.module.less';

export const Placeholder = () => {
  const {t} = useTranslation('Main');
  return (
    <Flex
      vertical
      justify='center'
      align='center'
      className={style.root}
      gap={designTokens.spacing.lg}
    >
      <Typography.Title>{t('Placeholder.Ad')}</Typography.Title>
      <Button
        analyticProps={{
          label: 'didnt-work',
          namespace: E_METRICS_NAMESPACES.PLACEHOLDER,
        }}
        onClick={noop}
      >
        {t('Placeholder.didntWork')}
      </Button>
    </Flex>
  );
};
