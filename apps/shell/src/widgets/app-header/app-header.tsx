import style from './app-header.module.less';
import {LanguageSelect} from '../language-select/language-select';
import {ThemeChange} from '../theme-change/theme-change';
import {UserIcon} from '../user-icon/user-icon';
import {Flex, HomeIcon, designTokens} from '@common';
import {Header} from 'antd/es/layout/layout';
import {Link} from 'react-router-dom';

/**
 * Шапка страницы.
 */
export const AppHeader = () => {
  return (
    <Header className={style.header}>
      <Flex align='center' justify='space-between' className={style.root}>
        <Link to='main'>
          <HomeIcon size={36} />
        </Link>
        <Flex align='center' gap={designTokens.spacing.sm}>
          <ThemeChange />
          <LanguageSelect />
          <UserIcon />
        </Flex>
      </Flex>
    </Header>
  );
};
