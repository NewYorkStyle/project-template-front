import {Placeholder} from '../pages/Placeholder';
import {Route, Routes} from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<Placeholder />} />
      <Route path='/' element={<Placeholder />} />
    </Routes>
  );
};
