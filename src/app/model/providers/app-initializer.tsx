import {UiProvider} from '@new_york_style/project-template-ui';
import {App} from 'antd';
import {I18nextProvider} from 'react-i18next';

import {useParamsControllerGetParams} from '@api/endpoints/params';
import {useLanguage, useMetrics, useTheme, type TParam} from '@entities';
import {
  NotificationProvider,
  ModalProvider,
  i18nInstance,
  ErrorBoundary,
  designTokens,
} from '@shared';

import {Router} from '../../lib';

export const AppInitializer = () => {
  const {data: params} = useParamsControllerGetParams<TParam, Error>({
    query: {
      queryKey: ['params'],
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  });
  const {theme} = useTheme();
  const {language} = useLanguage();

  useMetrics(params);

  return (
    <UiProvider tokens={designTokens.colors[theme]} language={language}>
      <I18nextProvider i18n={i18nInstance}>
        <ErrorBoundary>
          <App>
            <ModalProvider />
            <NotificationProvider />
            <Router />
          </App>
        </ErrorBoundary>
      </I18nextProvider>
    </UiProvider>
  );
};
