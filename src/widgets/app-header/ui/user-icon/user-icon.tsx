import {useState} from 'react';

import {Flex, Icon, Popover} from '@new_york_style/project-template-ui';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from 'react-router-dom';

import {useAuth} from '@entities';
import {
  Typography,
  Button,
  designTokens,
  E_METRICS_NAMESPACES,
  APP_ROUTES,
  notificationService,
} from '@shared';
import {useAuthControllerLogout} from '@shared/api/generated/endpoints/auth';

/**
 * Компонент иконки юзера.
 */
export const UserIcon = () => {
  const {t} = useTranslation('AppHeader');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {clearAuth} = useAuth();

  const {isFetching: isLoggingOut, refetch: logout} = useAuthControllerLogout({
    query: {
      enabled: false,
    },
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleUserIconClick = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    setIsPopoverOpen(false);
    const res = await logout();

    if (!res.isSuccess) {
      notificationService.error('Logout error');
    }

    queryClient.clear();
    clearAuth();
    navigate(APP_ROUTES.AUTH.ROOT, {replace: true});
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
        icon={<Icon name='profile' />}
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
