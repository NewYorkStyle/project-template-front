import {UserIconView} from './user-icon.view';
import {E_ANALYTIC_NAMESPACES, sendClickEvent, userStore} from '@common';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';

/**
 * Компонент иконки юзера.
 */
export const UserIcon = observer(() => {
  const {isUserLogged, loggout} = userStore;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleUserIconClick = () => {
    setIsPopoverOpen((prevState) => {
      sendClickEvent({
        label: `Icon ${prevState ? 'close' : 'open'}`,
        namespace: E_ANALYTIC_NAMESPACES.USER_ICON,
      });

      return !prevState;
    });
  };

  const handlePopoverClose = () => {
    sendClickEvent({
      label: 'Icon close',
      namespace: E_ANALYTIC_NAMESPACES.USER_ICON,
    });
    setIsPopoverOpen(false);
  };

  const handleLogout = () => {
    setIsPopoverOpen(false);
    sendClickEvent({
      label: 'Log out',
      namespace: E_ANALYTIC_NAMESPACES.USER_ICON,
    });
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
