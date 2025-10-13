import {type PropsWithChildren} from 'react';

import {Layout} from 'antd';
import {Content} from 'antd/es/layout/layout';
import {observer} from 'mobx-react-lite';

import {userStore} from '@entities';
import {Authentication} from '@pages';

import styles from './auth-provider.module.less';

export const AuthProvider = observer(({children}: PropsWithChildren) => {
  const {isUserLogged} = userStore;

  if (!isUserLogged) {
    return (
      <Layout className={styles.authLayout}>
        <Content className={styles.content}>
          <Authentication />
        </Content>
      </Layout>
    );
  }

  return <>{children}</>;
});
