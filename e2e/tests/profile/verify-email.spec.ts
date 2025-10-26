import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {validOTP} from '../../mocks';
import {APP_ROUTES} from '../../shared';

test('Успешная авторизация и верификация email через OTP @auth', async ({
  authPage,
  profilePage,
  testUsers,
}) => {
  await allure.displayName(
    'Успешная авторизация и верификация email через OTP'
  );
  await allure.epic('Профиль');
  await allure.feature('Верификация email');
  await allure.story('Успешная верификация');
  await allure.severity('critical');

  await allure.step('Пройти авторизацию', async () => {
    await authPage.open();
    await authPage.fillCredentials(
      testUsers.admin.username,
      testUsers.admin.password
    );
    await authPage.submit();
  });

  await allure.step('Переход на страницу профиля', async () => {
    await profilePage.open();
  });

  await allure.step('Проверить редирект на страницу профиля', async () => {
    await profilePage.page.waitForURL(`**${APP_ROUTES.USER.ROOT}**`, {
      timeout: 15000,
    });
    expect(profilePage.isOnProfilePage()).toBe(true);
  });

  await allure.step(
    'Проверить отображение секции верификации email',
    async () => {
      await expect(profilePage.emailVerificationSection).toBeVisible({
        timeout: 10000,
      });
      await expect(profilePage.otpGetButton).toBeVisible({
        timeout: 10000,
      });
    }
  );

  await allure.step('Запросить OTP код для верификации', async () => {
    await profilePage.startEmailVerification();
    await profilePage.waitForOtpForm();

    const inputCount = await profilePage.getOtpInputCount();
    expect(inputCount).toBeGreaterThan(0);
    await expect(profilePage.otpSubmitButton).toBeVisible({
      timeout: 10000,
    });
  });

  await allure.step('Ввести валидный OTP код', async () => {
    await profilePage.fillOtp(validOTP);

    for (let i = 0; i < validOTP.length; i++) {
      const inputValue = await profilePage.otpInputs.nth(i).inputValue();
      expect(inputValue).toBe(validOTP[i]);
    }
  });

  await allure.step('Отправить OTP код на проверку', async () => {
    await profilePage.submitOtp();
  });

  await allure.step('Проверить успешную верификацию email', async () => {
    await expect(profilePage.emailChangeSection).toBeVisible({
      timeout: 10000,
    });
    await expect(profilePage.emailVerificationSection).not.toBeVisible({
      timeout: 5000,
    });
  });
});
