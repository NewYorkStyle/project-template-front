import {Router} from './router';
import i18nAuthenticationInstance from '../shared/lib/i18n/i18n-init';
import {I18nextProvider} from 'react-i18next';

export const App = () => {
  return (
    <I18nextProvider i18n={i18nAuthenticationInstance}>
      <Router />
    </I18nextProvider>
  );
};

export default App;
