import {type FallbackProps} from 'react-error-boundary';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {APP_ROUTES} from '../../lib';
import {Button} from '../button';
import {Flex} from '../flex';
import {Result} from '../result';

import styles from './error-boundary.module.less';

type TProps = FallbackProps;

export const ErrorFallback: React.FC<TProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const {t} = useTranslation();

  const handleGoHome = () => {
    resetErrorBoundary();
  };

  return (
    <Result
      className={styles.root}
      status='error'
      title={t('ErrorBoundary.Title')}
      subTitle={
        <Flex vertical>
          <span>{t('ErrorBoundary.SubTitle')}</span>

          {process.env.NODE_ENV === 'development' && (
            <details>{error?.message}</details>
          )}
        </Flex>
      }
      extra={[
        <Link to={APP_ROUTES.HOME.ROOT} key='home'>
          <Button type='primary' onClick={handleGoHome}>
            {t('ErrorBoundary.Home')}
          </Button>
        </Link>,
      ]}
    />
  );
};
