import {Layout, Menu} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import {AppHeader} from '@features';
import {APP_ROUTES, HomeIcon} from '@shared';

import styles from './app-layout.module.less';

export const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout className={styles.fullLayout}>
      <AppHeader />
      <Layout>
        <Sider collapsible defaultCollapsed className={styles.sider}>
          <Menu
            mode='inline'
            style={{height: '100%'}}
            items={[
              {
                icon: (
                  <span>
                    <HomeIcon size={32} />
                  </span>
                ),
                key: 'home',
                label: 'Home',
                onClick: () => navigate(APP_ROUTES.ROOT),
              },
            ]}
            selectable={false}
          />
        </Sider>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
