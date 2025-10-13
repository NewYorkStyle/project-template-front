import {Flex as AntdFlex, type FlexProps} from 'antd';

type TProps = FlexProps;

export const Flex = (props: TProps) => {
  return <AntdFlex {...props} />;
};
