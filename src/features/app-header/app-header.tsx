import {Header} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';

import {userStore} from '@entities';
import {appStore, BurgerIcon, designTokens, Flex} from '@shared';

import {LanguageSelect} from '../language-select';
import {ThemeChange} from '../theme-change';

import style from './app-header.module.less';
import {UserIcon} from './ui';

/**
 * Шапка страницы.
 */
export const AppHeader = observer(() => {
  const {isUserLogged} = userStore;
  const {closeMenu, openMenu, showMenu} = appStore;

  return (
    <Header className={style.header}>
      <Flex align='center' justify='space-between' className={style.root}>
        <div className={style.burger} onClick={showMenu ? closeMenu : openMenu}>
          <BurgerIcon size={32} />
        </div>
        <Flex align='center' gap={designTokens.spacing.sm}>
          <ThemeChange />
          <LanguageSelect />
          {isUserLogged ? <UserIcon /> : <div className={style.emptyIcon} />}
        </Flex>
      </Flex>
    </Header>
  );
});
