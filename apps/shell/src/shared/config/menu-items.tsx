import {HomeIcon, ROUTES} from '@common';
import {MenuProps} from 'antd';
import {NavigateFunction} from 'react-router-dom';

export const getMenuItems = (
  navigate: NavigateFunction
): MenuProps['items'] => {
  return [
    {
      icon: (
        <span>
          <HomeIcon size={32} />
        </span>
      ),
      key: 'home',
      label: 'Home',
      onClick: () => navigate(ROUTES.MAIN.ROOT),
    },
  ];
};
