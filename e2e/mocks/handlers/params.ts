import {type Page} from '@playwright/test';

export const setupParamsMocks = (page: Page) => {
  // Получение параметров - GET /common/params/getParams
  page.route('**/api/common/params/getParams', (route) => {
    return route.fulfill({
      body: JSON.stringify({
        ym_counter: '12345678',
      }),
      contentType: 'application/json',
      status: 200,
    });
  });
};
