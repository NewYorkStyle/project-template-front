import {Spin as AntdSpin, SpinProps} from 'antd';

type TProps = SpinProps;

export const Spin = (props: TProps) => {
  return <AntdSpin {...props} />;
};
