import {Router} from './router';
import i18nMainInstance from '../shared/utils/i18n-init';
import {I18nextProvider} from 'react-i18next';

export const App = () => {
  return (
    <I18nextProvider i18n={i18nMainInstance}>
      <Router />
    </I18nextProvider>
  );
};

export default App;
