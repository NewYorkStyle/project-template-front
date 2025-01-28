import {ProfileFooterView} from './profile-footer.view';
import {profileStore} from '../../entities';
import {observer} from 'mobx-react-lite';

export const ProfileFooter = observer(() => {
  const handleSaveClick = () => {
    profileStore.saveData();
  };

  return (
    <ProfileFooterView
      isSaveDisabled={profileStore.isSaveDisabled}
      onSaveClick={handleSaveClick}
    />
  );
});
