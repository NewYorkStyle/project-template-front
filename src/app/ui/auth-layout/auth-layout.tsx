import {type PropsWithChildren} from 'react';

import {Layout} from 'antd';
import {Content} from 'antd/es/layout/layout';

import {AppHeader} from '@widgets';

import style from './auth-layout.module.scss';

export const AuthLayout = ({children}: PropsWithChildren) => {
  return (
    <Layout className={style.authLayout}>
      <AppHeader />
      <Content className={style.content}>{children}</Content>
    </Layout>
  );
};
