import style from './profile-footer.module.less';
import {Button} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  isSaveDisabled: boolean;
  onSaveClick: () => void;
} & WithTranslation;

export const ProfileFooterView = withTranslation()(({
  i18n: {t},
  isSaveDisabled,
  onSaveClick,
}: TProps) => {
  return (
    <footer className={style.footer}>
      <Button disabled={isSaveDisabled} onClick={onSaveClick}>
        {t('Profile.Footer.Save')}
      </Button>
    </footer>
  );
});
