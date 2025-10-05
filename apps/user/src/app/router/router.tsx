import {Profile} from '../../pages';
import {USER_CHILD_ROUTES} from '@common';
import {Navigate, Route, Routes} from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path={USER_CHILD_ROUTES.PROFILE} element={<Profile />} />
      <Route path='*' element={<Navigate to={USER_CHILD_ROUTES.PROFILE} />} />
    </Routes>
  );
};
