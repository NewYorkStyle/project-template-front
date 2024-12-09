import * as React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const Main = React.lazy(() => import('main/Module'));

export const App = () => {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path='*' element={<Navigate to='/main' />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </React.Suspense>
  );
};

export default App;
