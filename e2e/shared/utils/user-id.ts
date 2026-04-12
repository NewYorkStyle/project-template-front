import {type Page} from '@playwright/test';

/**
 * Короткий уникальный токен для E2E (8 символов).
 * Вместе с префиксом `e2e_` логин остаётся ≤ 20 символов (ограничение бэка).
 */
export const makeE2eShortToken = (): string => {
  return Math.random().toString(36).slice(2, 10);
};

export const getUserIdFromPage = async (page: Page): Promise<string | null> => {
  return page.evaluate(() => localStorage.getItem('userId'));
};
