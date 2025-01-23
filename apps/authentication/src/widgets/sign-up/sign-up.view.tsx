import style from './sing-up.module.less';
import {Button, E_KEY_FILTER, Input, Password, TSuggestion} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  handleLoginChange: (value: string) => void;
  login: string;
  handlePasswordChange: (value: string) => void;
  password: string;
  passwordSuggestions: TSuggestion;
  handlePasswordConfirmChange: (value: string) => void;
  passwordConfirm: string;
  handleSignUpClick: () => void;
  isSendButtonDisabled: boolean;
} & WithTranslation;

export const SignUpView = withTranslation()(({
  handleLoginChange,
  handlePasswordChange,
  handlePasswordConfirmChange,
  handleSignUpClick,
  i18n: {t},
  isSendButtonDisabled,
  login,
  password,
  passwordConfirm,
  passwordSuggestions,
}: TProps) => {
  return (
    <div className={style.root}>
      <Input
        onChange={handleLoginChange}
        value={login}
        keyfilter={E_KEY_FILTER.ALPHA_NUM}
        placeholder={t('Authentication.SignUp.LoginPlaceholder')}
        className={style.input}
      />
      <Password
        onChange={handlePasswordChange}
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
      />
      <Password
        onChange={handlePasswordConfirmChange}
        value={passwordConfirm}
        placeholder={t('Authentication.SignUp.PasswordConfirmPlaceholder')}
        className={style.input}
        toggleMask
      />
      <Button
        className={style.button}
        onClick={handleSignUpClick}
        disabled={isSendButtonDisabled}
      >
        {t('Authentication.SignUp.Label')}
      </Button>
    </div>
  );
});
