import {i18nAuthenticationInstance} from '../entities';
import {Router} from './router';
import {I18nextProvider} from 'react-i18next';

export const App = () => {
  return (
    <I18nextProvider i18n={i18nAuthenticationInstance}>
      <Router />
    </I18nextProvider>
  );
};

export default App;
