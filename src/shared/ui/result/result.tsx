import {Result as AntdResult, type ResultProps} from 'antd';

type TProps = ResultProps;

export const Result = ({...restProps}: TProps) => {
  return <AntdResult {...restProps} />;
};
