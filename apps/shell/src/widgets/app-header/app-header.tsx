import style from './app-header.module.less';
import {LanguageSelect} from '../language-select/language-select';
import {ThemeChange} from '../theme-change/theme-change';
import {UserIcon} from '../user-icon/user-icon';
import {Flex, designTokens, userStore} from '@common';
import {Header} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';

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
