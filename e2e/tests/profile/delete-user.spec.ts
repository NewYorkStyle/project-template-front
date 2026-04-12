import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {APP_ROUTES} from '../../shared';

test.describe('Удаление аккаунта', () => {
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

  test('Успешное удаление аккаунта @profile', async ({
    page,
    profilePage,
    testUser,
  }) => {
    await allure.displayName('Успешное удаление аккаунта');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Удаление аккаунта');
    await allure.severity('critical');

    await profilePage.switchToDeleteTab();

    await profilePage.dangerZone.deleteAccount(testUser.password);
    await profilePage.dangerZone.confirmDeletion();

    await expect(page).toHaveURL(new RegExp(APP_ROUTES.AUTH.ROOT));
  });

  test('Ошибка при пустом пароле @profile', async ({profilePage}) => {
    await allure.displayName('Ошибка при пустом пароле');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Удаление аккаунта');
    await allure.severity('critical');

    await profilePage.switchToDeleteTab();

    await profilePage.dangerZone.deleteButton.click();

    await profilePage.dangerZone.expectFieldError(
      'Пожалуйста, введите свой пароль!'
    );
  });

  test('Отмена удаления аккаунта @profile', async ({profilePage, testUser}) => {
    await allure.displayName('Отмена удаления аккаунта');
    await allure.epic('Личный кабинет');
    await allure.feature('Профиль пользователя');
    await allure.story('Удаление аккаунта');
    await allure.severity('normal');

    await profilePage.switchToDeleteTab();

    await profilePage.dangerZone.deleteAccount(testUser.password);
    await profilePage.dangerZone.expectModalVisible();

    await profilePage.dangerZone.cancelDeletion();

    await profilePage.dangerZone.expectModalNotVisible();
  });
});
