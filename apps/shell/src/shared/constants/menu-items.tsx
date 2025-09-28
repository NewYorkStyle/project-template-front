import {HomeIcon} from '@common';
import {MenuProps} from 'antd';
import {useNavigate} from 'react-router-dom';

export const getMenuItems = (): MenuProps['items'] => {
  const navigate = useNavigate();

  return [
    {
      icon: (
        <span>
          <HomeIcon size={32} />
        </span>
      ),
      key: 'home',
      label: 'Home',
      onClick: () => navigate('/main'),
    },
  ];
};
