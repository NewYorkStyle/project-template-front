import {i18nUserInstance} from '../entities';
import {Router} from './router';
import {I18nextProvider} from 'react-i18next';

export const App = () => {
  return (
    <I18nextProvider i18n={i18nUserInstance}>
      <Router />
    </I18nextProvider>
  );
};

export default App;
