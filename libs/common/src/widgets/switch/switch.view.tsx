import style from './switch.module.less';

/**
 * @prop {boolean} checked Значение свича.
 * @prop {() => void} onChange Обработчик изменения.
 */
type TProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Компонент для отображения свича.
 */
export const SwitchView = ({checked, onChange}: TProps) => {
  return (
    <label className={style.switch}>
      <input type='checkbox' checked={checked} onChange={onChange} />
      <span className={`${style.slider} ${style.round}`}></span>
    </label>
  );
};
