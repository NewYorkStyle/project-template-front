import style from './home.module.less';
import {Button, E_ANALYTIC_NAMESPACES, HomeIcon} from '@common';

/**
 * @prop {() => void} onHomeClick Клик по иконке "Домой".
 */
type TProps = {
  onHomeClick: () => void;
};

export const HomeView = ({onHomeClick}: TProps) => {
  return (
    <Button
      className={style.button}
      icon={<HomeIcon size={28} />}
      rounded
      onClick={onHomeClick}
      analyticProps={{
        label: 'home icon',
        namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
      }}
    />
  );
};
