import {Placeholder} from '../../pages';
// no main child routes imports
import {Route, Routes} from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<Placeholder />} />
      {/* no explicit child routes for main */}
      <Route path='/' element={<Placeholder />} />
    </Routes>
  );
};
