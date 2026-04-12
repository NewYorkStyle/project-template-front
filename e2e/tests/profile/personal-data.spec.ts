import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {
  APP_ROUTES,
  E_PERMISSIONS,
  grantPermissions,
  makeE2eShortToken,
  TEST_OTP,
} from '../../shared';

test.describe('Личный кабинет', () => {
  test.beforeEach(async ({authPage, profilePage, testUser}) => {
    await authPage.open();
    await authPage.loginForm.fillCredentials(
      testUser.username,
      testUser.password
    );
    await authPage.loginForm.submit();
    await profilePage.page.waitForURL(`**${APP_ROUTES.HOME.ROOT}**`);
    await profilePage.open();
  });

  test.describe('Email', () => {
    test('Успешная верификация email @profile', async ({profilePage}) => {
      await allure.displayName('Успешная верификация email');
      await allure.epic('Личный кабинет');
      await allure.feature('Профиль пользователя');
      await allure.story('Верификация email');
      await allure.severity('critical');

      await profilePage.emailSection.waitForVerificationSectionVisible();
      await profilePage.emailSection.clickVerifyEmail();
      await profilePage.emailSection.waitForVerificationOtpForm();
      await profilePage.emailSection.submitOtpAndWaitForVerificationCompleted(
        TEST_OTP
      );

      await profilePage.emailSection.waitForChangeSectionVisible();
    });
  });

  test.describe('Смена email', () => {
    test.beforeEach(async ({profilePage, request, testUser}) => {
      await grantPermissions(request, testUser.email, [
        E_PERMISSIONS.EMAIL_VERIFIED,
      ]);
      await profilePage.page.reload();
    });

    test('Успешная смена email @profile', async ({profilePage}) => {
      await allure.displayName('Успешная смена email');
      await allure.epic('Личный кабинет');
      await allure.feature('Профиль пользователя');
      await allure.story('Смена email');
      await allure.severity('critical');

      const uniqueId = makeE2eShortToken();
      const newEmail = `e2e_new_changed_${uniqueId}@example.com`;

      await profilePage.emailSection.waitForChangeSectionVisible();
      await profilePage.emailSection.changeEmail(newEmail);
      await profilePage.emailSection.requestEmailChangeOtp();
      await profilePage.emailSection.waitForEmailChangeOtpForm();
      await profilePage.emailSection.confirmEmailChangeWithOtp(TEST_OTP);

      await profilePage.emailSection.expectEmailChanged();
    });

    test('Ошибка при невалидном email @profile', async ({profilePage}) => {
      await allure.displayName('Ошибка при невалидном email');
      await allure.epic('Личный кабинет');
      await allure.feature('Профиль пользователя');
      await allure.story('Валидация email');
      await allure.severity('normal');

      await profilePage.emailSection.changeEmail('invalid-email');
      await profilePage.emailSection.emailChangeInput.blur();

      await profilePage.emailSection.expectInvalidEmailError();
    });
  });

  test.describe('Редактирование профиля', () => {
    test('Отображение данных профиля @profile', async ({profilePage}) => {
      await allure.displayName('Отображение данных профиля');
      await allure.epic('Личный кабинет');
      await allure.feature('Профиль пользователя');
      await allure.story('Редактирование профиля');
      await allure.severity('normal');

      await expect(profilePage.profileInfo.surnameInput).toBeVisible();
      await expect(profilePage.profileInfo.nameInput).toBeVisible();
      await expect(profilePage.profileInfo.patronymicInput).toBeVisible();
    });

    test('Ошибка при пустых обязательных полях @profile', async ({
      profilePage,
    }) => {
      await allure.displayName('Ошибка при пустых обязательных полях');
      await allure.epic('Личный кабинет');
      await allure.feature('Профиль пользователя');
      await allure.story('Валидация профиля');
      await allure.severity('normal');

      await profilePage.profileInfo.surnameInput.fill('');
      await profilePage.profileInfo.surnameInput.blur();

      await profilePage.profileInfo.expectFieldError(
        'surname',
        'Пожалуйста, введите свою фамилию!'
      );

      await profilePage.profileInfo.nameInput.fill('');
      await profilePage.profileInfo.nameInput.blur();

      await profilePage.profileInfo.expectFieldError(
        'name',
        'Пожалуйста, введите свое имя!'
      );
    });

    test('Кнопка сохранения неактивна при отсутствии изменений @profile', async ({
      profilePage,
    }) => {
      await allure.displayName(
        'Кнопка сохранения неактивна при отсутствии изменений'
      );
      await allure.epic('Личный кабинет');
      await allure.feature('Профиль пользователя');
      await allure.story('Редактирование профиля');
      await allure.severity('minor');

      await expect(profilePage.profileInfo.saveButton).toBeDisabled();
    });
  });
});
