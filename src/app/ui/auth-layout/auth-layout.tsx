import {type PropsWithChildren} from 'react';

import {Layout} from 'antd';
import {Content} from 'antd/es/layout/layout';

import {AppHeader} from '@widgets';

import styles from './auth-layout.module.scss';

export const AuthLayout = ({children}: PropsWithChildren) => {
  return (
    <Layout className={styles.authLayout}>
      <AppHeader />
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};
