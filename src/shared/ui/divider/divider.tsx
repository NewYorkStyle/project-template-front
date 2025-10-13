import {Divider as AntdDivider, type DividerProps} from 'antd';

type TProps = DividerProps;

export const Divider = (props: TProps) => {
  return <AntdDivider {...props} />;
};
