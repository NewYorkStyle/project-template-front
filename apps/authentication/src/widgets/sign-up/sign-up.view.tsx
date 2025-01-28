import style from './sing-up.module.less';
import {
  Button,
  E_ANALYTIC_NAMESPACES,
  E_KEY_FILTER,
  Input,
  Password,
  TSuggestion,
} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  onLoginChange: (value: string) => void;
  login: string;
  email: string;
  onPasswordChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  password: string;
  passwordSuggestions: TSuggestion;
  onPasswordConfirmChange: (value: string) => void;
  passwordConfirm: string;
  onSignUpClick: () => void;
  onEnterClick: () => void;
  isSendButtonDisabled: boolean;
} & WithTranslation;

export const SignUpView = withTranslation()(({
  email,
  i18n: {t},
  isSendButtonDisabled,
  login,
  onEmailChange,
  onEnterClick,
  onLoginChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSignUpClick,
  password,
  passwordConfirm,
  passwordSuggestions,
}: TProps) => {
  return (
    <div className={style.root}>
      <Input
        onChange={onLoginChange}
        value={login}
        keyfilter={E_KEY_FILTER.ALPHA_NUM}
        placeholder={t('Authentication.SignUp.LoginPlaceholder')}
        className={style.input}
        onEnterClick={onEnterClick}
      />
      <Input
        onChange={onEmailChange}
        value={email}
        placeholder={t('Authentication.SignUp.EmailPlaceholder')}
        className={style.input}
        onEnterClick={onEnterClick}
      />
      <Password
        onChange={onPasswordChange}
        value={password}
        placeholder={t('Authentication.SignUp.PasswordPlaceholder')}
        className={style.input}
        toggleMask
        suggestions={passwordSuggestions}
        feedback
        promptLabel={t('Authentication.SignUp.PasswordStrength.EnterPassword')}
        weakLabel={t('Authentication.SignUp.PasswordStrength.WeakLabel')}
        mediumLabel={t('Authentication.SignUp.PasswordStrength.MediumLabel')}
        strongLabel={t('Authentication.SignUp.PasswordStrength.StrongLabel')}
        onEnterClick={onEnterClick}
      />
      <Password
        onChange={onPasswordConfirmChange}
        value={passwordConfirm}
        placeholder={t('Authentication.SignUp.PasswordConfirmPlaceholder')}
        className={style.input}
        toggleMask
        onEnterClick={onEnterClick}
      />
      <Button
        className={style.button}
        onClick={onSignUpClick}
        disabled={isSendButtonDisabled}
        analyticProps={{
          label: 'Sign up button',
          namespace: E_ANALYTIC_NAMESPACES.AUTH,
        }}
      >
        {t('Authentication.SignUp.Label')}
      </Button>
    </div>
  );
});
