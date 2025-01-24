import style from './user-icon.module.less';
import {
  Button,
  E_ANALYTIC_NAMESPACES,
  E_POPOVER_POSITION,
  Logged,
  NotLogged,
  Popover,
} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

/**
 * @prop {boolean} isPopoverOpen Флаг открытия поповера.
 * @prop {boolean} isUserLogged Флаг авторизации юзера.
 * @prop {() => void} onLoggout Обработчик выхода юзера.
 * @prop {() => void} onPopoverClose Обработчик закрытия поповера.
 * @prop {() => void} onUserIconClick Обработчик клика по иконке юзера.
 */
type TProps = {
  isPopoverOpen: boolean;
  isUserLogged: boolean;
  onLoggout: () => void;
  onPopoverClose: () => void;
  onUserIconClick: () => void;
} & WithTranslation;

/**
 * Компонент иконки юзера.
 */
export const UserIconView = withTranslation()(({
  i18n: {t},
  isPopoverOpen,
  isUserLogged,
  onLoggout,
  onPopoverClose,
  onUserIconClick,
}: TProps) => {
  return (
    <div className={style.root}>
      {isUserLogged ? (
        <Popover
          isOpen={isPopoverOpen}
          onClose={onPopoverClose}
          position={E_POPOVER_POSITION.BOTTOM}
          content={
            <Button
              onClick={onLoggout}
              link
              analyticProps={{
                label: 'Log out',
                namespace: E_ANALYTIC_NAMESPACES.USER_ICON,
              }}
            >
              {t('UserIcon.LogOut')}
            </Button>
          }
        >
          <Button
            className={style.button}
            icon={<Logged />}
            rounded
            onClick={onUserIconClick}
            analyticProps={{
              label: `Icon ${isPopoverOpen ? 'close' : 'open'}`,
              namespace: E_ANALYTIC_NAMESPACES.USER_ICON,
            }}
          />
        </Popover>
      ) : (
        <NotLogged size={28} />
      )}
    </div>
  );
});
