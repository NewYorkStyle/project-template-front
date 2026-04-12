const USER_ID_STORAGE_KEY = 'userId';

export const authStorage = {
  setUserId(userId: string): void {
    if (typeof window === 'undefined' || !userId) {
      return;
    }
    try {
      localStorage.setItem(USER_ID_STORAGE_KEY, userId);
    } catch {
      //
    }
  },

  getUserId(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return localStorage.getItem(USER_ID_STORAGE_KEY);
    } catch {
      return null;
    }
  },

  clear(): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.removeItem(USER_ID_STORAGE_KEY);
    } catch {
      //
    }
  },
};
