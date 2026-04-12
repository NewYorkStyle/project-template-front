import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {APP_ROUTES, getUserIdFromPage, makeE2eShortToken} from '../../shared';

test.describe('Регистрация', () => {
  test.describe('Успешная регистрация', () => {
    test('Успешная регистрация нового пользователя @register', async ({
      authPage,
      createdUserIds,
      page,
    }) => {
      await allure.displayName('Успешная регистрация нового пользователя');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Успешная регистрация');
      await allure.severity('critical');

      const token = makeE2eShortToken();
      const username = `e2e_${token}`;
      const email = `e2e_${token}@example.com`;
      const password = 'StrongPass1';

      await authPage.open();
      await authPage.switchToRegister();
      await authPage.registerForm.register({
        email,
        password,
        passwordConfirm: password,
        username,
      });

      await expect(page).toHaveURL(new RegExp(APP_ROUTES.HOME.ROOT));

      await expect.poll(() => getUserIdFromPage(page)).not.toBeNull();

      const userId = await getUserIdFromPage(page);
      expect(userId).toBeTruthy();
      createdUserIds.push(userId!);
    });
  });

  test.describe('Негативные сценарии', () => {
    test.beforeEach(async ({authPage}) => {
      await authPage.open();
      await authPage.switchToRegister();
    });

    test('Ошибка при регистрации с существующим email @register', async ({
      authPage,
      testUser,
    }) => {
      await allure.displayName('Регистрация с существующим email');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Существующий email');
      await allure.severity('critical');

      await authPage.registerForm.fillForm({
        email: testUser.email,
        password: 'StrongPass1',
        passwordConfirm: 'StrongPass1',
        username: 'unique_username',
      });
      await authPage.registerForm.submit();

      await authPage.registerForm.expectError('Ошибка аутентификации');
    });

    test('Ошибка при регистрации с существующим username @register', async ({
      authPage,
      testUser,
    }) => {
      await allure.displayName('Регистрация с существующим username');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Существующий username');
      await allure.severity('critical');

      const token = makeE2eShortToken();

      await authPage.registerForm.fillForm({
        email: `e2e_${token}@example.com`,
        password: 'StrongPass1',
        passwordConfirm: 'StrongPass1',
        username: testUser.username,
      });
      await authPage.registerForm.submit();

      await authPage.registerForm.expectError('Ошибка аутентификации');
    });

    test('Ошибка при слабом пароле @register', async ({authPage}) => {
      await allure.displayName('Регистрация со слабым паролем');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Слабый пароль');
      await allure.severity('normal');

      const token = makeE2eShortToken();

      await authPage.registerForm.fillForm({
        email: `e2e_${token}@example.com`,
        password: 'weak',
        passwordConfirm: 'weak',
        username: `u_${token}`,
      });
      await authPage.registerForm.submit();

      await authPage.registerForm.expectFieldError(
        'password',
        'Пароль не соответствует условиям'
      );
    });

    test('Ошибка при несовпадении паролей @register', async ({authPage}) => {
      await allure.displayName('Несовпадение паролей');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Несовпадение паролей');
      await allure.severity('normal');

      const token = makeE2eShortToken();

      await authPage.registerForm.fillForm({
        email: `e2e_${token}@example.com`,
        password: 'StrongPass1',
        passwordConfirm: 'StrongPass2',
        username: `u_${token}`,
      });
      await authPage.registerForm.submit();

      await authPage.registerForm.expectFieldError(
        'passwordConfirm',
        'Пароль не соответствует введённому!'
      );
    });
  });

  test.describe('Валидация формы', () => {
    test.beforeEach(async ({authPage}) => {
      await authPage.open();
      await authPage.switchToRegister();
    });

    test('Пустая форма @register', async ({authPage}) => {
      await allure.displayName('Валидация пустой формы');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Пустая форма');
      await allure.severity('normal');

      await authPage.registerForm.submit();

      await authPage.registerForm.expectFieldError(
        'username',
        'Пожалуйста, введите свой логин!'
      );
      await authPage.registerForm.expectFieldError(
        'email',
        'Пожалуйста, введите свою почту!'
      );
      await authPage.registerForm.expectFieldError(
        'password',
        'Пожалуйста, введите свой пароль!'
      );
      await authPage.registerForm.expectFieldError(
        'passwordConfirm',
        'Пожалуйста, подтвердите свой пароль!'
      );
    });

    test('Некорректный формат email @register', async ({authPage}) => {
      await allure.displayName('Некорректный формат email');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('Валидация email');
      await allure.severity('normal');

      const token = makeE2eShortToken();

      await authPage.registerForm.fillForm({
        email: 'invalid-email',
        password: 'StrongPass1',
        passwordConfirm: 'StrongPass1',
        username: `u_${token}`,
      });
      await authPage.registerForm.submit();

      await authPage.registerForm.expectFieldError(
        'email',
        'Введите действительный email!'
      );
    });

    test('Ошибка валидации исчезает при корректном вводе @register', async ({
      authPage,
    }) => {
      await allure.displayName('Исчезновение ошибки валидации');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('UX формы');
      await allure.severity('normal');

      await authPage.registerForm.submit();

      await authPage.registerForm.expectFieldError(
        'email',
        'Пожалуйста, введите свою почту!'
      );

      const token = makeE2eShortToken();

      await authPage.registerForm.fillForm({
        email: `e2e_${token}@example.com`,
      });
      await authPage.registerForm.emailInput.blur();

      await expect(authPage.registerForm.emailInput).not.toHaveAttribute(
        'aria-describedby',
        /.+/
      );
    });

    test('Успешная регистрация после ошибки валидации @register', async ({
      authPage,
      page,
    }) => {
      await allure.displayName('Успешная регистрация после ошибки валидации');
      await allure.epic('Регистрация');
      await allure.feature('Создание аккаунта');
      await allure.story('UX формы');
      await allure.severity('normal');

      await page.route(/\/auth\/signUp$/, async (route) => {
        await route.fulfill({
          body: JSON.stringify('mock-token'),
          contentType: 'application/json',
          status: 201,
        });
      });

      await authPage.registerForm.submit();

      await authPage.registerForm.expectFieldError(
        'username',
        'Пожалуйста, введите свой логин!'
      );

      const token = makeE2eShortToken();
      const username = `e2e_${token}`;
      const email = `e2e_${token}@example.com`;
      const password = 'StrongPass1';

      await authPage.registerForm.register({
        email,
        password,
        passwordConfirm: password,
        username,
      });

      await expect(page).toHaveURL(new RegExp(APP_ROUTES.HOME.ROOT));
    });
  });
});
