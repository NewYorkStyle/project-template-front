import {E_COLORS} from '../../lib/constants';

type TProps = {
  size?: number;
  color?: E_COLORS;
};

export const BurgerIcon = ({
  color = E_COLORS.TEXT_PRIMARY,
  size = 24,
}: TProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 18L20 18'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M4 12L20 12'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
      />
      <path
        d='M4 6L20 6'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
      />
    </svg>
  );
};
