import {TIcons} from './switch';
import style from './switch.module.less';

/**
 * @prop {boolean} checked Значение свича.
 * @prop {() => void} onChange Обработчик изменения.
 * @prop {TIcons} [icons] Иконки.
 */
type TProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icons?: TIcons;
};

/**
 * Компонент для отображения свича.
 */
export const SwitchView = ({checked, icons, onChange}: TProps) => {
  return (
    <label className={style.switch}>
      <input type='checkbox' checked={checked} onChange={onChange} />
      <span className={`${style.slider} ${style.round}`}>
        {icons ? (
          <span>
            {checked ? (
              icons.checked
            ) : (
              <span className={style.unchecked}>{icons.unchecked}</span>
            )}
          </span>
        ) : null}
      </span>
    </label>
  );
};
