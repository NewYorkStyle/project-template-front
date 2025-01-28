import {PersonalDataView} from './presonal-data.view';
import {userStore} from '@common';
import {observer} from 'mobx-react-lite';

export const PersonalData = observer(() => {
  const handleNameChange = (value: string) => {
    userStore.name = value;
  };

  const handlePatronymicChange = (value: string) => {
    userStore.patronymic = value;
  };

  const handleSurnameChange = (value: string) => {
    userStore.surname = value;
  };

  return (
    <PersonalDataView
      name={userStore.name}
      onNameChange={handleNameChange}
      onPatronymicChange={handlePatronymicChange}
      onSurnameChange={handleSurnameChange}
      patronymic={userStore.patronymic}
      surname={userStore.surname}
    />
  );
});
