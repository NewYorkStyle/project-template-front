import {Popover as AntdPopover, PopoverProps} from 'antd';

type TProps = PopoverProps;

export const Popover = ({...restProps}: TProps) => {
  return <AntdPopover {...restProps} />;
};
