import {UserIconView} from './user-icon.view';
import {userStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Компонент иконки юзера.
 */
export const UserIcon = observer(() => {
  const {isUserLogged, loggout} = userStore;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleLogout = () => {
    setIsPopoverOpen(false);
    loggout();
  };

  const handleProfileClick = () => {
    setIsPopoverOpen(false);
    navigate('/user');
  };

  return (
    <UserIconView
      isUserLogged={isUserLogged}
      onUserIconClick={handleUserIconClick}
      isPopoverOpen={isPopoverOpen}
      onPopoverClose={handlePopoverClose}
      onLoggout={handleLogout}
      onProfileClick={handleProfileClick}
    />
  );
});
