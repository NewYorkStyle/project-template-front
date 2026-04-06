import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {APP_ROUTES} from '../../shared';

test('Успешная авторизация и переход на домашнюю страницу @auth', async ({
  authPage,
  homePage,
  page,
  testUser,
}) => {
  await allure.displayName(
    'Успешная авторизация и переход на домашнюю страницу'
  );
  await allure.epic('Авторизация');
  await allure.feature('Вход в систему');
  await allure.story('Успешная авторизация');
  await allure.severity('critical');

  await allure.step('Открыть страницу авторизации', async () => {
    await authPage.open();

    const currentUrl = page.url();
    expect(currentUrl).toContain(APP_ROUTES.AUTH.ROOT);
  });

  await allure.step('Заполнить форму авторизации', async () => {
    await authPage.fillCredentials(testUser.username, testUser.password);
  });

  await allure.step('Отправить форму', async () => {
    await authPage.submit();
  });

  await allure.step('Проверить редирект', async () => {
    await homePage.page.waitForURL(`**${APP_ROUTES.HOME.ROOT}**`);
    expect(homePage.isOnHomePage()).toBe(true);
  });
});
