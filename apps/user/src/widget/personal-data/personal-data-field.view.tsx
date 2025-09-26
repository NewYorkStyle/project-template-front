import style from './personal-data.module.less';

type TProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const PersonalDataField = ({label, onChange, value}: TProps) => {
  return (
    <div className={style.inputField}>
      <span className={style.label}>{label}</span>
      {/* <Input
        onChange={onChange}
        value={value}
        placeholder={label}
      /> */}
    </div>
  );
};
