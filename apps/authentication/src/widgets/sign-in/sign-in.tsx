import {SignInView} from './sign-in.view';
import {signInStore} from '../../entities/stores';
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
    signInStore.signIn();
  };

  return (
    <SignInView
      login={signInStore.login}
      password={signInStore.password}
      handleLoginChange={handleLoginChange}
      handlePasswordChange={handlePasswordChange}
      handleSignInClick={handleSignInClick}
      isSendButtonDisabled={isSendButtonDisabled}
      isLoading={signInStore.loginLoading}
    />
  );
});
