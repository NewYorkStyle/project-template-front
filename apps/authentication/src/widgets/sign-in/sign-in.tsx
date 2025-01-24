import {SignInView} from './sign-in.view';
import {signInStore} from '../../entities/stores';
import {E_ANALYTIC_NAMESPACES, sendClickEvent} from '@common';
import {observer} from 'mobx-react-lite';

export const SignIn = observer(() => {
  const isSendButtonDisabled = !signInStore.login || !signInStore.password;

  const handleLoginChange = (value: string) => {
    signInStore.login = value;
  };

  const handlePasswordChange = (value: string) => {
    signInStore.password = value;
  };

  const handleSignInClick = () => {
    if (!isSendButtonDisabled) {
      sendClickEvent({
        label: 'Sign in button',
        namespace: E_ANALYTIC_NAMESPACES.AUTH,
      });
      signInStore.signIn();
    }
  };

  const handleEnterClick = () => {
    if (!isSendButtonDisabled) {
      sendClickEvent({
        label: 'Sign in enter',
        namespace: E_ANALYTIC_NAMESPACES.AUTH,
      });
      signInStore.signIn();
    }
  };

  return (
    <SignInView
      login={signInStore.login}
      password={signInStore.password}
      onLoginChange={handleLoginChange}
      onPasswordChange={handlePasswordChange}
      onSignInClick={handleSignInClick}
      isSendButtonDisabled={isSendButtonDisabled}
      isLoading={signInStore.loginLoading}
      onEnterClick={handleEnterClick}
    />
  );
});
