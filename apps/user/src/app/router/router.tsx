import {Profile} from '../../pages';
import {Navigate, Route, Routes} from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<Navigate to='/user/profile' />} />
    </Routes>
  );
};
