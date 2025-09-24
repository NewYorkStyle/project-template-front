import style from './app-layout.module.less';
import {Router} from './router';
import {AppHeader} from '../widgets';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {userStore} from '@common';
import {Layout, Menu, MenuProps} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';
import React from 'react';

const items: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    children: Array.from({length: 4}).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
    icon: React.createElement(icon),
    key: `sub${key}`,
    label: `subnav ${key}`,
  };
});

export const AppLayout = observer(() => {
  const {isUserLogged} = userStore;

  return isUserLogged ? (
    <Layout className={style.fullLayout}>
      <AppHeader />
      <Layout>
        <Sider collapsible defaultCollapsed className={style.sider}>
          <Menu mode='inline' style={{height: '100%'}} items={items} />
        </Sider>
        <Content className={style.content}>
          <Router />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Layout className={style.authLayout}>
      <Content className={style.content}>
        <Router />
      </Content>
    </Layout>
  );
});
