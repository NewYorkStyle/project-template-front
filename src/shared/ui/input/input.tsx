import {Input as AntdInput, type InputProps} from 'antd';

type TProps = InputProps;

const {
  OTP: AntdOTP,
  Password: AntdPassword,
  Search: AntdSearch,
  TextArea: AntdTextArea,
} = AntdInput;

export const Input = (props: TProps) => {
  return <AntdInput {...props} />;
};

Input.TextArea = AntdTextArea;
Input.Search = AntdSearch;
Input.Password = AntdPassword;
Input.OTP = AntdOTP;
