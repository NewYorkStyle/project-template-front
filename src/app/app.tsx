import '@ant-design/v5-patch-for-react-19';
import './styles/global.less';

import {useWebVitalsMetrics} from '@shared';

import {AppProviders} from './model';

const App = () => {
  useWebVitalsMetrics();

  return <AppProviders />;
};

export default App;
