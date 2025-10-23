import {Drawer as AntdDrawer, type DrawerProps} from 'antd';

type TProps = DrawerProps;

export const Drawer = (props: TProps) => {
  return <AntdDrawer {...props} />;
};
