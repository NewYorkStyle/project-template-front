import {Profile} from '../pages/profile';
import {Route, Routes} from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<Profile />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
};
