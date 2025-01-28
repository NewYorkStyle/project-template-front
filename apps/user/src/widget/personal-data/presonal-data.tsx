import {PersonalDataView} from './presonal-data.view';
import {profileStore} from '../../entities';
import {observer} from 'mobx-react-lite';

export const PersonalData = observer(() => {
  const {
    changePersonalData,
    personalData: {name, patronymic, surname},
  } = profileStore;

  return (
    <PersonalDataView
      name={name}
      onNameChange={(value: string) => changePersonalData('name', value)}
      onPatronymicChange={(value: string) =>
        changePersonalData('patronymic', value)
      }
      onSurnameChange={(value: string) => changePersonalData('surname', value)}
      patronymic={patronymic}
      surname={surname}
    />
  );
});
