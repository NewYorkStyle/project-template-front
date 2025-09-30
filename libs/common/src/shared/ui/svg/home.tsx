import {E_COLORS} from '../../../shared';

type TProps = {
  size?: number;
  color?: E_COLORS;
};
export const HomeIcon = ({
  color = E_COLORS.TEXT_PRIMARY,
  size = 24,
}: TProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='-2.4 -2.4 28.80 28.80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke={color}
    >
      <g strokeWidth='0'></g>
      <g
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={color}
        strokeWidth='0.048'
      ></g>
      <g>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z'
          fill={color}
        ></path>
      </g>
    </svg>
  );
};
