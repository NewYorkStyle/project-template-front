import style from './sing-in.module.less';
import {Button, E_KEY_FILTER, Input, Password} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  handleLoginChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleSignInClick: () => void;
  login: string;
  password: string;
  isSendButtonDisabled: boolean;
  isLoading: boolean;
} & WithTranslation;

export const SignInView = withTranslation()(({
  handleLoginChange,
  handlePasswordChange,
  handleSignInClick,
  i18n: {t},
  isLoading,
  isSendButtonDisabled,
  login,
  password,
}: TProps) => {
  return (
    <div className={style.root}>
      <Input
        onChange={handleLoginChange}
        value={login}
        keyfilter={E_KEY_FILTER.ALPHA_NUM}
        placeholder={t('Authentication.SignIn.LoginPlaceholder')}
        className={style.input}
      />
      <Password
        onChange={handlePasswordChange}
        value={password}
        placeholder={t('Authentication.SignIn.PasswordPlaceholder')}
        className={style.input}
        toggleMask
      />
      <Button
        className={style.button}
        onClick={handleSignInClick}
        disabled={isSendButtonDisabled || isLoading}
      >
        {t('Authentication.SignIn.Label')}
      </Button>
    </div>
  );
});
