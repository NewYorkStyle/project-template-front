import {beforeEach, describe, expect, it, vi} from 'vitest';

import {authStorage} from '../auth-storage';

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('sets, gets and clears user id', () => {
    authStorage.setUserId('user-1');

    expect(authStorage.getUserId()).toBe('user-1');

    authStorage.clear();

    expect(authStorage.getUserId()).toBeNull();
  });

  it('does not save empty user id', () => {
    authStorage.setUserId('');

    expect(authStorage.getUserId()).toBeNull();
  });

  it('handles setItem errors gracefully', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });

    expect(() => authStorage.setUserId('user-2')).not.toThrow();
  });

  it('returns null when getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(authStorage.getUserId()).toBeNull();
  });

  it('handles removeItem errors gracefully', () => {
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(() => authStorage.clear()).not.toThrow();
  });
});
