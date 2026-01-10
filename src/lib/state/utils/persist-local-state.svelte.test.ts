import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PersistLocalStore } from './persist-local-state.svelte';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    clear: () => {
      store = {};
    },
    getItem: (key: string) => store[key] || null,
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
  };
})();

// @ts-expect-error - Testing in Node environment
globalThis.localStorage = localStorageMock;

vi.mock('$app/environment', () => ({
  browser: true,
}));

describe('persistLocalStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getter - current', () => {
    it('should return the current value', () => {
      const store = new PersistLocalStore('test-key', 'test-value');
      expect(store.current).toBe('test-value');
    });

    it('should return the updated value after mutation', () => {
      const store = new PersistLocalStore('test-key', { count: 0 });
      store.current = { count: 5 };
      expect(store.current).toEqual({ count: 5 });
    });
  });

  describe('setter - current', () => {
    it('should update the value', () => {
      const store = new PersistLocalStore('test-key', 'initial');
      store.current = 'updated';
      expect(store.current).toBe('updated');
    });

    it('should update object values', () => {
      const store = new PersistLocalStore<{ name: string; value?: number }>(
        'test-key',
        { name: 'test' },
      );
      store.current = { name: 'updated', value: 123 };
      expect(store.current).toEqual({ name: 'updated', value: 123 });
    });
  });
});
