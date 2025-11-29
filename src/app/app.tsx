import './styles/global.scss';

import {useWebVitalsMetrics} from '@shared';

import {AppProviders} from './model';

const App = () => {
  useWebVitalsMetrics();

  return <AppProviders />;
};

export default App;
