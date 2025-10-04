import {Divider as AntdDivider, DividerProps} from 'antd';

type TProps = DividerProps;

export const Divider = (props: TProps) => {
  return <AntdDivider {...props} />;
};
