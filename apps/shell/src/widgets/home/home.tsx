import {HomeView} from './home.view';
import {userStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';

export const Home = observer(() => {
  const navigate = useNavigate();
  const {isUserLogged} = userStore;

  const handleHomeClick = () => {
    navigate('/main');
  };

  return isUserLogged && <HomeView onHomeClick={handleHomeClick} />;
});
