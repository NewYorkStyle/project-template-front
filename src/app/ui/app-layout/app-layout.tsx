import {Layout, Menu} from 'antd';
import {Content} from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import {observer} from 'mobx-react-lite';
import {Outlet} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import {
  APP_ROUTES,
  appStore,
  designTokens,
  Drawer,
  HomeIcon,
  useWindowSize,
} from '@shared';
import {AppHeader} from '@widgets';

import styles from './app-layout.module.less';

export const AppLayout = observer(() => {
  const navigate = useNavigate();
  const {closeMenu, showMenu} = appStore;

  const {width} = useWindowSize();
  const isMobile = width < designTokens.breakpoints.tablet;

  const menuContent = (
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
          onClick: () => {
            navigate(APP_ROUTES.ROOT);
            closeMenu();
          },
        },
      ]}
      selectable={false}
    />
  );

  return (
    <Layout className={styles.fullLayout}>
      <AppHeader />
      <Layout>
        {/* Sider для десктопной версии */}
        {!isMobile && (
          <Sider collapsed={!showMenu} className={styles.sider}>
            {menuContent}
          </Sider>
        )}

        {/* Drawer для мобильной версии */}
        {isMobile && (
          <Drawer
            placement='bottom'
            onClose={closeMenu}
            open={showMenu}
            width='100%'
            height='100%'
            styles={{body: {padding: 0}}}
            className={styles.drawer}
          >
            {menuContent}
          </Drawer>
        )}

        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
});
