import {useState} from 'react';

import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {useLogout} from '@entities';
import {
  Popover,
  Flex,
  Typography,
  Button,
  designTokens,
  E_METRICS_NAMESPACES,
  Profile,
  APP_ROUTES,
} from '@shared';

/**
 * Компонент иконки юзера.
 */
export const UserIcon = () => {
  const {t} = useTranslation('AppHeader');
  const {isPending: isLoggingOut, mutate: logout} = useLogout();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleUserIconClick = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    setIsPopoverOpen(false);
    logout();
  };

  const handleProfileClick = () => {
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      trigger='click'
      open={isPopoverOpen}
      content={
        <Flex vertical gap={designTokens.spacing.sm}>
          <Link to={APP_ROUTES.USER.ROOT}>
            <Typography.Link
              onClick={handleProfileClick}
              analyticProps={{
                label: 'Profile',
                namespace: E_METRICS_NAMESPACES.USER,
              }}
            >
              {t('UserIcon.Profile')}
            </Typography.Link>
          </Link>

          <Typography.Link
            onClick={handleLogout}
            disabled={isLoggingOut}
            analyticProps={{
              label: 'Log out',
              namespace: E_METRICS_NAMESPACES.USER,
            }}
          >
            {t('UserIcon.LogOut')}
          </Typography.Link>
        </Flex>
      }
    >
      <Button
        icon={<Profile />}
        shape='circle'
        onClick={handleUserIconClick}
        disabled={isLoggingOut}
        analyticProps={{
          label: `Icon ${isPopoverOpen ? 'close' : 'open'}`,
          namespace: E_METRICS_NAMESPACES.USER,
        }}
      />
    </Popover>
  );
};
