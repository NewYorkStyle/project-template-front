import {Header} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';

import {useAuth} from '@entities';
import {appStore, BurgerIcon, designTokens, Flex, Logo} from '@shared';

import {LanguageSelect} from '../language-select';
import {ThemeChange} from '../theme-change';

import style from './app-header.module.less';
import {UserIcon} from './ui';

/**
 * Шапка страницы.
 */
export const AppHeader = observer(() => {
  const {isUserLogged} = useAuth();
  const {closeMenu, openMenu, showMenu} = appStore;

  return (
    <Header className={style.header}>
      <Flex align='center' justify='space-between' className={style.root}>
        {isUserLogged ? (
          <div
            className={style.burger}
            onClick={showMenu ? closeMenu : openMenu}
          >
            <BurgerIcon size={32} />
          </div>
        ) : (
          <div />
        )}
        <Flex align='center' gap={designTokens.spacing.sm}>
          <ThemeChange />
          <LanguageSelect />
          {isUserLogged ? <UserIcon /> : <Logo />}
        </Flex>
      </Flex>
    </Header>
  );
});
