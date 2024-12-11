import style from './theme-change.module.less';
import {E_ANALYTIC_NAMESPACES, MoonIcon, SunIcon, Switch} from '@common';
import {useState} from 'react';

export const ThemeChange = () => {
  const [checked, setChecked] = useState(false);

  const onChange = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <div className={style.root}>
      {checked ? <SunIcon /> : <MoonIcon size={18} />}
      <Switch
        analyticProps={{
          label: 'dark-mode',
          namespace: E_ANALYTIC_NAMESPACES.APP_HEADER,
        }}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
