import * as allure from 'allure-js-commons';

import {test, expect} from '../../fixtures';
import {APP_ROUTES, TEST_OTP} from '../../shared';

test('Успешная авторизация и верификация email через OTP @auth @profile', async ({
  authPage,
  profilePage,
  testUser,
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
    await authPage.fillCredentials(testUser.username, testUser.password);
    await authPage.submit();
    await profilePage.page.waitForURL(`**${APP_ROUTES.HOME.ROOT}**`, {
      waitUntil: 'domcontentloaded',
    });
  });

  await allure.step('Переход на страницу профиля', async () => {
    await profilePage.open();
  });

  await allure.step('Проверить редирект на страницу профиля', () => {
    expect(profilePage.isOnProfilePage()).toBe(true);
  });

  await allure.step(
    'Проверить отображение секции верификации email',
    async () => {
      await expect(profilePage.emailVerificationSection).toBeVisible();
      await expect(profilePage.otpGetButton).toBeVisible();
    }
  );

  await allure.step('Запросить OTP код для верификации', async () => {
    const maxAttempts = 3;
    let otpFormShown = false;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await profilePage.waitForOtpForm();
        otpFormShown = true;
        break;
      } catch {
        await expect(profilePage.otpGetButton).toBeEnabled();
        await profilePage.startEmailVerification();
      }

      try {
        await profilePage.waitForOtpForm();
        otpFormShown = true;
        break;
      } catch {
        if (attempt === maxAttempts) {
          throw new Error('OTP form did not appear after retries');
        }
      }
    }

    expect(otpFormShown).toBe(true);

    const inputCount = await profilePage.getOtpInputCount();
    expect(inputCount).toBeGreaterThan(0);
    await expect(profilePage.otpSubmitButton).toBeVisible();
  });

  await allure.step('Ввести валидный OTP код', async () => {
    await profilePage.fillOtp(TEST_OTP);

    for (let i = 0; i < TEST_OTP.length; i++) {
      const inputValue = await profilePage.otpInputs.nth(i).inputValue();
      expect(inputValue).toBe(TEST_OTP[i]);
    }
  });

  await allure.step('Отправить OTP код на проверку', async () => {
    await profilePage.submitOtpAndWaitForVerificationCompleted();
  });

  await allure.step('Проверить успешную верификацию email', async () => {
    await expect(profilePage.emailChangeSection).toBeVisible();
    await expect(profilePage.emailVerificationSection).not.toBeVisible();
  });
});
