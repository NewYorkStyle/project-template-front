import {Header} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';

import {userStore} from '@entities';
import {designTokens, Flex} from '@shared';

import {LanguageSelect} from '../language-select';
import {ThemeChange} from '../theme-change';

import style from './app-header.module.less';
import {UserIcon} from './ui';

/**
 * Шапка страницы.
 */
export const AppHeader = observer(() => {
  const {isUserLogged} = userStore;

  return (
    <Header className={style.header}>
      <Flex align='center' justify='right' className={style.root}>
        <Flex align='center' gap={designTokens.spacing.sm}>
          <ThemeChange />
          <LanguageSelect />
          {isUserLogged ? <UserIcon /> : <div className={style.emptyIcon} />}
        </Flex>
      </Flex>
    </Header>
  );
});
