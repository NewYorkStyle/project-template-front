import {SignUpView} from './sign-up.view';
import {signUpStore} from '../../entities/stores';
import {PASSWORD_MIN_LENGTH} from '../../shared';
import {TSuggestion} from '@common';
import {observer} from 'mobx-react-lite';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = WithTranslation;

export const SignUp = withTranslation()(
  observer(({i18n: {t}}: TProps) => {
    const isSendButtonDisabled =
      !signUpStore.login ||
      !signUpStore.password ||
      !signUpStore.passwordConfirm ||
      signUpStore.singUpLoading;

    const passwordSuggestions: TSuggestion = {
      header: t('Authentication.SignUp.PasswordSuggestions.Header'),
      requirements: [
        t('Authentication.SignUp.PasswordSuggestions.LowerCase'),
        t('Authentication.SignUp.PasswordSuggestions.UpperCase'),
        t('Authentication.SignUp.PasswordSuggestions.Numeric'),
        t('Authentication.SignUp.PasswordSuggestions.MinLength', {
          minLength: PASSWORD_MIN_LENGTH,
        }),
      ],
    };

    const handleLoginChange = (value: string) => {
      signUpStore.login = value;
    };

    const handlePasswordChange = (value: string) => {
      signUpStore.password = value;
    };

    const handlePasswordConfirmChange = (value: string) => {
      signUpStore.passwordConfirm = value;
    };

    const handleSignUpClick = () => {
      if (!isSendButtonDisabled) {
        signUpStore.signUp();
      }
    };

    return (
      <SignUpView
        onLoginChange={handleLoginChange}
        onPasswordChange={handlePasswordChange}
        onPasswordConfirmChange={handlePasswordConfirmChange}
        onSignUpClick={handleSignUpClick}
        isSendButtonDisabled={isSendButtonDisabled}
        login={signUpStore.login}
        password={signUpStore.password}
        passwordConfirm={signUpStore.passwordConfirm}
        passwordSuggestions={passwordSuggestions}
        onEnterClick={handleSignUpClick}
      />
    );
  })
);
