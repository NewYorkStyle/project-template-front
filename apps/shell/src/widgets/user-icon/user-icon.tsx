import {
  Button,
  E_ANALYTIC_NAMESPACES,
  Flex,
  Popover,
  Profile,
  Typography,
  designTokens,
  userStore,
} from '@common';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

/**
 * Компонент иконки юзера.
 */
export const UserIcon = observer(() => {
  const {t} = useTranslation();
  const {loggout} = userStore;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleUserIconClick = () => {
    setIsPopoverOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    setIsPopoverOpen(false);
    loggout();
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
          <Link to='user'>
            <Typography.Link
              onClick={handleProfileClick}
              analyticProps={{
                label: 'Log out',
                namespace: E_ANALYTIC_NAMESPACES.USER,
              }}
            >
              {t('UserIcon.Profile')}
            </Typography.Link>
          </Link>

          <Typography.Link
            onClick={handleLogout}
            analyticProps={{
              label: 'Log out',
              namespace: E_ANALYTIC_NAMESPACES.USER,
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
        analyticProps={{
          label: `Icon ${isPopoverOpen ? 'close' : 'open'}`,
          namespace: E_ANALYTIC_NAMESPACES.USER,
        }}
      />
    </Popover>
  );
});
