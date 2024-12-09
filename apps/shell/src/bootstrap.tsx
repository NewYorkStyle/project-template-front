import App from './app/app';
import {PrimeReactProvider} from 'primereact/api';
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/themes/lara-dark-blue/theme.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>
);
