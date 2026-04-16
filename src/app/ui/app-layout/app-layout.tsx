import {Drawer, Icon} from '@new_york_style/project-template-ui';
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
  TOUR_SELECTORS,
  useWindowSize,
} from '@shared';
import {AppHeader} from '@widgets';

import style from './app-layout.module.scss';

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
              <Icon name='home' size={32} />
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
    <Layout className={style.fullLayout}>
      <AppHeader />
      <Layout>
        {/* Sider для десктопной версии */}
        {!isMobile && (
          <Sider
            collapsed={!showMenu}
            className={style.sider}
            data-tour={TOUR_SELECTORS.HOME_SIDEBAR}
          >
            {menuContent}
          </Sider>
        )}

        {/* Drawer для мобильной версии */}
        {isMobile && (
          <Drawer
            placement='bottom'
            onClose={closeMenu}
            open={showMenu}
            size='100%'
            styles={{body: {padding: 0}}}
            className={style.drawer}
            data-tour={TOUR_SELECTORS.HOME_SIDEBAR}
          >
            {menuContent}
          </Drawer>
        )}

        <Content className={style.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
});
