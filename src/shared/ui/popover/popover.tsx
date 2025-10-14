import {Popover as AntdPopover, type PopoverProps} from 'antd';

type TProps = PopoverProps;

export const Popover = ({...restProps}: TProps) => {
  return <AntdPopover {...restProps} />;
};
