import {DeleteUserView} from './delete-user.view';
import {profileStore} from '../../entities';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const DeleteUser = observer(() => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(Boolean);
  const navigate = useNavigate();

  const handleDelete = () => {
    profileStore.deleteProfile(() => navigate('/auth'));
    setShowConfirmationModal(false);
  };

  return (
    <DeleteUserView
      onPasswordChange={(value: string) => (profileStore.password = value)}
      password={profileStore.password}
      onDelete={handleDelete}
      onConfirmationClose={() => setShowConfirmationModal(false)}
      showConfirmation={showConfirmationModal}
      onConfirmationShow={() => setShowConfirmationModal(true)}
    />
  );
});
