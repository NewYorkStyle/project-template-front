import style from './delete-user.module.less';
import {Button, Dialog, E_BUTTON_SEVERITY, Password} from '@common';
import {WithTranslation, withTranslation} from 'react-i18next';

type TProps = {
  password: string;
  onPasswordChange: (value: string) => void;
  onConfirmationShow: () => void;
  onDelete: () => void;
  showConfirmation: boolean;
  onConfirmationClose: () => void;
} & WithTranslation;

export const DeleteUserView = withTranslation()(({
  i18n: {t},
  onConfirmationClose,
  onConfirmationShow,
  onDelete,
  onPasswordChange,
  password,
  showConfirmation,
}: TProps) => {
  const footerContent = (
    <div>
      <Button severity={E_BUTTON_SEVERITY.DANGER} onClick={onDelete}>
        {t('Profile.Delete.ConfirmationDialog.Delete')}
      </Button>
      <Button onClick={onConfirmationClose}>
        {t('Profile.Delete.ConfirmationDialog.Cancel')}
      </Button>
    </div>
  );

  return (
    <>
      <div className={style.header}>{t('Profile.Delete.DeleteProfile')}</div>
      <div className={style.password}>
        <span className={style.label}>{t('Profile.Delete.Password')}</span>
        <Password
          value={password}
          onChange={onPasswordChange}
          placeholder={t('Profile.Delete.PasswordPlaceholder')}
        />
      </div>
      <Button
        className={style.button}
        onClick={onConfirmationShow}
        disabled={!password}
        severity={E_BUTTON_SEVERITY.DANGER}
      >
        {t('Profile.Delete.Delete')}
      </Button>
      <Dialog
        header={t('Profile.Delete.ConfirmationDialog.Header')}
        visible={showConfirmation}
        onClose={onConfirmationClose}
        footer={footerContent}
      >
        {t('Profile.Delete.ConfirmationDialog.Content')}
      </Dialog>
    </>
  );
});
