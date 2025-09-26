import style from './placeholder.module.less';
import {
  Button,
  E_ANALYTIC_NAMESPACES,
  Flex,
  Typography,
  designTokens,
  paramsStore,
} from '@common';
import noop from 'lodash/noop';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

export const Placeholder = observer(() => {
  const {
    i18n: {changeLanguage},
    t,
  } = useTranslation();
  const {language} = paramsStore;

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

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
          namespace: E_ANALYTIC_NAMESPACES.PLACEHOLDER,
        }}
        onClick={noop}
      >
        {t('Placeholder.didntWork')}
      </Button>
    </Flex>
  );
});
