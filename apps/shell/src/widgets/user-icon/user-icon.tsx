import {UserIconView} from './user-icon.view';
import {userStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';

/**
 * Компонент иконки юзера.
 */
export const UserIcon = observer(() => {
  const {isUserLogged, loggout} = userStore;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  return (
    <UserIconView
      isUserLogged={isUserLogged}
      onUserIconClick={handleUserIconClick}
      isPopoverOpen={isPopoverOpen}
      onPopoverClose={handlePopoverClose}
      onLoggout={handleLogout}
    />
  );
});
