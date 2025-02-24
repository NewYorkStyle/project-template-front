import style from './personal-data.module.less';
import {E_KEY_FILTER, Input} from '@common';

type TProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const PersonalDataField = ({label, onChange, value}: TProps) => {
  return (
    <div className={style.inputField}>
      <span className={style.label}>{label}</span>
      <Input
        onChange={onChange}
        value={value}
        keyfilter={E_KEY_FILTER.ALPHA}
        placeholder={label}
      />
    </div>
  );
};
