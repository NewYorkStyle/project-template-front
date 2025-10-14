import {Statistic as AntdStatistic, type StatisticProps} from 'antd';

type TProps = StatisticProps;

const {Timer: AntdTimer} = AntdStatistic;

export const Statistic = (props: TProps) => {
  return <AntdStatistic {...props} />;
};

Statistic.Timer = AntdTimer;
