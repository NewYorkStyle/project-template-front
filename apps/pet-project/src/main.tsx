import App from './app/app';
import {Button} from '@common';
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Button></Button>
    <App />
  </StrictMode>
);
