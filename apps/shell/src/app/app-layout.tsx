import style from './app-layout.module.less';
import {Router} from './router';
import {getMenuItems} from '../shared';
import {AppHeader} from '../widgets';
import {userStore} from '@common';
import {Layout, Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';

export const AppLayout = observer(() => {
  const {isUserLogged} = userStore;

  return isUserLogged ? (
    <Layout className={style.fullLayout}>
      <AppHeader />
      <Layout>
        <Sider collapsible defaultCollapsed className={style.sider}>
          <Menu
            mode='inline'
            style={{height: '100%'}}
            items={getMenuItems()}
            selectable={false}
          />
        </Sider>
        <Content className={style.content}>
          <Router />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Layout className={style.authLayout}>
      <AppHeader />
      <Content className={style.content}>
        <Router />
      </Content>
    </Layout>
  );
});
