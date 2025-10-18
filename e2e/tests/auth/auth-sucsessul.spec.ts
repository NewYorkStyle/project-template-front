import {test, expect} from '../../fixtures';

test('@auth успешная авторизация и переход на домашнюю страницу', async ({
  authPage,
  homePage,
  testUsers,
}) => {
  // 1. Открываем страницу авторизации
  await authPage.open();

  // Проверяем что находимся на странице авторизации и форма видима
  expect(authPage.isOnAuthPage()).toBe(true);
  expect(await authPage.isAuthFormVisible()).toBe(true);

  // 2. Заполняем форму валидными данными
  await authPage.fillCredentials(
    testUsers.admin.username,
    testUsers.admin.password
  );

  // Проверяем что данные введены корректно
  expect(await authPage.usernameInput.inputValue()).toBe(
    testUsers.admin.username
  );
  expect(await authPage.passwordInput.inputValue()).toBe(
    testUsers.admin.password
  );

  // 3. Отправляем форму
  await authPage.submit();

  // 4. Ждем редирект на домашнюю страницу
  await homePage.page.waitForURL('**/home**', {timeout: 10000});

  // 5. Проверяем что отрисовалась домашняя страница
  expect(homePage.isOnHomePage()).toBe(true);
  expect(await homePage.isLoaded()).toBe(true);

  // 6. Проверяем что установились cookies авторизации
  const cookies = await homePage.page.context().cookies();
  const authCookies = cookies.filter((cookie) =>
    ['accessToken', 'refreshToken', 'userId', 'isUserLoggedIn'].includes(
      cookie.name
    )
  );

  expect(authCookies.length).toBeGreaterThan(0);
});
