import {Authentication} from '../../pages';
import {Route, Routes} from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path='*' element={<Authentication />} />
      <Route path='/' element={<Authentication />} />
    </Routes>
  );
};
