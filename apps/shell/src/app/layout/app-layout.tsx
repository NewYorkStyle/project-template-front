import style from './app-layout.module.less';
import {getMenuItems} from '../../shared';
import {AppHeader} from '../../widgets';
import {Router} from '../router';
import {userStore} from '@common';
import {Layout, Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';
import {useNavigate} from 'react-router-dom';

export const AppLayout = observer(() => {
  const {isUserLogged} = userStore;
  const navigate = useNavigate();

  return isUserLogged ? (
    <Layout className={style.fullLayout}>
      <AppHeader />
      <Layout>
        <Sider collapsible defaultCollapsed className={style.sider}>
          <Menu
            mode='inline'
            style={{height: '100%'}}
            items={getMenuItems(navigate)}
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
