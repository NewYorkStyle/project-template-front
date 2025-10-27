import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {Button, designTokens, Flex, Page, Typography} from '@shared';

import style from './not-found.module.less';

export const NotFound = () => {
  const {t} = useTranslation('Common');

  return (
    <Page title='404'>
      <Flex
        className={style.root}
        vertical
        align='center'
        justify='center'
        gap={designTokens.spacing.md}
      >
        <Typography.Title>404</Typography.Title>
        <Typography.Text>{t('PageNotFound')}</Typography.Text>
        <Link to='..' relative='path'>
          <Button>{t('Back')}</Button>
        </Link>
      </Flex>
    </Page>
  );
};
