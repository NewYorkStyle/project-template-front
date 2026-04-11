import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {APP_ROUTES} from '../../shared';

test.describe('Авторизация', () => {
  test('Успешная авторизация и переход на домашнюю страницу @auth', async ({
    authPage,
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

    await authPage.open();
    await authPage.loginForm.fillCredentials(
      testUser.username,
      testUser.password
    );
    await authPage.loginForm.submit();

    await expect(page).toHaveURL(new RegExp(APP_ROUTES.HOME.ROOT));
  });

  test.describe('Негативные сценарии', () => {
    test.beforeEach(async ({authPage}) => {
      await authPage.open();
    });

    test('Ошибка при неверном пароле @auth', async ({authPage, testUser}) => {
      await allure.displayName('Ошибка при неверном пароле');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('Неверный пароль');
      await allure.severity('critical');

      await authPage.loginForm.fillCredentials(
        testUser.username,
        'wrongPassword123'
      );
      await authPage.loginForm.submit();

      await authPage.loginForm.expectError('Ошибка аутентификации');
    });

    test('Ошибка для несуществующего пользователя @auth', async ({
      authPage,
    }) => {
      await allure.displayName('Ошибка для несуществующего пользователя');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('Несуществующий пользователь');
      await allure.severity('critical');

      await authPage.loginForm.fillCredentials(
        'nonexistent_user',
        'somepassword'
      );
      await authPage.loginForm.submit();

      await authPage.loginForm.expectError('Ошибка аутентификации');
    });
  });

  test.describe('Валидация формы', () => {
    test.beforeEach(async ({authPage}) => {
      await authPage.open();
    });

    test('Пустая форма @auth', async ({authPage}) => {
      await allure.displayName('Валидация пустой формы');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('Пустая форма');
      await allure.severity('normal');

      await authPage.loginForm.submit();

      await authPage.loginForm.expectFieldError(
        'username',
        'Пожалуйста, введите свой логин!'
      );
      await authPage.loginForm.expectFieldError(
        'password',
        'Пожалуйста, введите свой пароль!'
      );
    });

    test('Невалидный формат логина @auth', async ({authPage}) => {
      await allure.displayName('Ошибка при невалидном формате логина');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('Невалидный логин');
      await allure.severity('normal');

      await authPage.loginForm.fillCredentials('  ', 'somepassword');
      await authPage.loginForm.submit();

      await authPage.loginForm.expectFieldError(
        'username',
        'Пожалуйста, введите свой логин!'
      );
    });

    test('Ошибка валидации исчезает при корректном вводе @auth', async ({
      authPage,
    }) => {
      await allure.displayName('Исчезновение ошибки валидации');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('UX формы');
      await allure.severity('normal');

      await authPage.loginForm.submit();

      await authPage.loginForm.expectFieldError(
        'username',
        'Пожалуйста, введите свой логин!'
      );

      await authPage.loginForm.fillCredentials('valid_user', '');
      await authPage.loginForm.usernameInput.blur();

      await expect(authPage.loginForm.usernameInput).not.toHaveAttribute(
        'aria-describedby',
        /.+/
      );
    });

    test('Успешный логин после ошибки валидации @auth', async ({
      authPage,
      page,
      testUser,
    }) => {
      await allure.displayName('Успешный логин после ошибки валидации');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('UX формы');
      await allure.severity('normal');

      await authPage.loginForm.submit();

      await authPage.loginForm.expectFieldError(
        'username',
        'Пожалуйста, введите свой логин!'
      );

      await authPage.loginForm.fillCredentials(
        testUser.username,
        testUser.password
      );
      await authPage.loginForm.submit();

      await expect(page).toHaveURL(new RegExp(APP_ROUTES.HOME.ROOT));
    });
  });

  test.describe('Активная сессия', () => {
    test('Редирект на /home при активной сессии @auth', async ({
      authPage,
      page,
      testUser,
    }) => {
      await allure.displayName('Редирект при активной сессии');
      await allure.epic('Авторизация');
      await allure.feature('Вход в систему');
      await allure.story('Активная сессия');
      await allure.severity('critical');

      await authPage.open();
      await authPage.loginForm.fillCredentials(
        testUser.username,
        testUser.password
      );
      await authPage.loginForm.submit();

      await expect(page).toHaveURL(new RegExp(APP_ROUTES.HOME.ROOT));

      await page.goto(APP_ROUTES.AUTH.ROOT, {waitUntil: 'domcontentloaded'});

      await expect(page).toHaveURL(new RegExp(APP_ROUTES.HOME.ROOT));
    });
  });

  test.describe('Защита приватных роутов', () => {
    test('Редирект на /auth при попытке доступа к /home @auth', async ({
      page,
    }) => {
      await allure.displayName('Редирект неавторизованного пользователя');
      await allure.epic('Авторизация');
      await allure.feature('Защита роутов');
      await allure.story('Приватные роуты');
      await allure.severity('critical');

      await page.goto(APP_ROUTES.HOME.ROOT, {waitUntil: 'domcontentloaded'});

      await expect(page).toHaveURL(new RegExp(APP_ROUTES.AUTH.ROOT));
    });
  });
});
