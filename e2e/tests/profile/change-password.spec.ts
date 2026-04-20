import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {APP_ROUTES} from '../../shared';

/** Отличается от пароля при создании пользователя (TEST_USER_PASSWORD). */
const NEW_VALID_PASSWORD = 'AnotherPass9';

test.describe('Смена пароля', () => {
  test.beforeEach(async ({authPage, profilePage, testUser}) => {
    await authPage.open();
    await authPage.loginForm.fillCredentials(
      testUser.username,
      testUser.password
    );
    await authPage.loginForm.submit();
    await profilePage.page.waitForURL(`**${APP_ROUTES.HOME.ROOT}**`);
    await profilePage.open();
    await profilePage.switchToPasswordTab();
  });

  test('Поля формы отображаются @profile', async ({profilePage}) => {
    await allure.displayName('Поля формы смены пароля');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Смена пароля');
    await allure.severity('normal');

    await profilePage.changePasswordSection.waitForVisible();
  });

  test('Успешная смена пароля @profile', async ({
    page,
    profilePage,
    testUser,
  }) => {
    await allure.displayName('Успешная смена пароля');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Смена пароля');
    await allure.severity('critical');

    const responsePromise = page.waitForResponse(
      (resp) =>
        resp.url().includes('changePassword') &&
        resp.request().method() === 'POST' &&
        resp.ok()
    );

    await profilePage.changePasswordSection.fillForm({
      currentPassword: testUser.password,
      newPassword: NEW_VALID_PASSWORD,
      confirmPassword: NEW_VALID_PASSWORD,
    });
    await profilePage.changePasswordSection.submit();

    await expect(responsePromise).resolves.toBeTruthy();
    await profilePage.changePasswordSection.expectSuccessNotification();
  });

  test('Ошибка валидации при слабом новом пароле @profile', async ({
    profilePage,
    testUser,
  }) => {
    await allure.displayName('Слабый новый пароль');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Смена пароля');
    await allure.severity('normal');

    await profilePage.changePasswordSection.fillForm({
      currentPassword: testUser.password,
      newPassword: 'weak',
      confirmPassword: 'weak',
    });
    await profilePage.changePasswordSection.submit();

    await profilePage.changePasswordSection.expectFieldError(
      'newPassword',
      'Пароль не соответствует условиям'
    );
  });

  test('Ошибка при несовпадении нового пароля и подтверждения @profile', async ({
    profilePage,
    testUser,
  }) => {
    await allure.displayName('Несовпадение паролей');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Смена пароля');
    await allure.severity('normal');

    await profilePage.changePasswordSection.fillForm({
      currentPassword: testUser.password,
      newPassword: 'StrongPass1',
      confirmPassword: 'StrongPass2',
    });
    await profilePage.changePasswordSection.submit();

    await profilePage.changePasswordSection.expectFieldError(
      'newPasswordConfirm',
      'Пароль не соответствует введённому!'
    );
  });

  test('Ошибка при пустом текущем пароле @profile', async ({profilePage}) => {
    await allure.displayName('Пустой текущий пароль');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Смена пароля');
    await allure.severity('normal');

    await profilePage.changePasswordSection.fillForm({
      currentPassword: '',
      newPassword: NEW_VALID_PASSWORD,
      confirmPassword: NEW_VALID_PASSWORD,
    });
    await profilePage.changePasswordSection.submit();

    await profilePage.changePasswordSection.expectFieldError(
      'currentPassword',
      'Пожалуйста, введите свой пароль!'
    );
  });

  test('Ошибка при неверном текущем пароле @profile', async ({profilePage}) => {
    await allure.displayName('Неверный текущий пароль');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Смена пароля');
    await allure.severity('normal');

    await profilePage.changePasswordSection.fillForm({
      currentPassword: 'WrongPass999',
      newPassword: NEW_VALID_PASSWORD,
      confirmPassword: NEW_VALID_PASSWORD,
    });
    await profilePage.changePasswordSection.submit();

    await profilePage.changePasswordSection.expectChangePasswordErrorNotification();
  });
});
