import {PersonalDataField} from './personal-data-field.view';
import style from './personal-data.module.less';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  name: string;
  onNameChange: (value: string) => void;
  onPatronymicChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
  patronymic: string;
  surname: string;
} & WithTranslation;

export const PersonalDataView = withTranslation()(({
  i18n: {t},
  name,
  onNameChange,
  onPatronymicChange,
  onSurnameChange,
  patronymic,
  surname,
}: TProps) => {
  return (
    <>
      <div className={style.header}>{t('Profile.PersonalData.Header')}</div>
      <PersonalDataField
        label={t('Profile.PersonalData.Surname')}
        onChange={onSurnameChange}
        value={surname}
      />
      <PersonalDataField
        label={t('Profile.PersonalData.Name')}
        onChange={onNameChange}
        value={name}
      />
      <PersonalDataField
        label={t('Profile.PersonalData.Patronymic')}
        onChange={onPatronymicChange}
        value={patronymic}
      />
    </>
  );
});
