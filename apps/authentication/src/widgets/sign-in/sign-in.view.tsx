import style from './sing-in.module.less';
import {
  Button,
  E_ANALYTIC_NAMESPACES,
  E_KEY_FILTER,
  Input,
  Password,
} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  onLoginChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignInClick: () => void;
  login: string;
  password: string;
  isSendButtonDisabled: boolean;
  isLoading: boolean;
  onEnterClick: () => void;
} & WithTranslation;

export const SignInView = withTranslation()(({
  i18n: {t},
  isLoading,
  isSendButtonDisabled,
  login,
  onEnterClick,
  onLoginChange,
  onPasswordChange,
  onSignInClick,
  password,
}: TProps) => {
  return (
    <div className={style.root}>
      <Input
        onChange={onLoginChange}
        value={login}
        keyfilter={E_KEY_FILTER.ALPHA_NUM}
        placeholder={t('Authentication.SignIn.LoginPlaceholder')}
        className={style.input}
        onEnterClick={onEnterClick}
      />
      <Password
        onChange={onPasswordChange}
        value={password}
        placeholder={t('Authentication.SignIn.PasswordPlaceholder')}
        className={style.input}
        toggleMask
        onEnterClick={onEnterClick}
      />
      <Button
        className={style.button}
        onClick={onSignInClick}
        disabled={isSendButtonDisabled || isLoading}
        analyticProps={{
          label: 'Sign in button',
          namespace: E_ANALYTIC_NAMESPACES.AUTH,
        }}
      >
        {t('Authentication.SignIn.Label')}
      </Button>
    </div>
  );
});
