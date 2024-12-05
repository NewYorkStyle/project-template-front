import * as React from 'react';
import {Link, Navigate, Route, Routes} from 'react-router-dom';

const Main = React.lazy(() => import('main/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to='/main'>Main</Link>
        </li>
      </ul>
      <Routes>
        <Route path='*' element={<Navigate to='/main' />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
