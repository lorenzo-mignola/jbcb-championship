import { browser } from '$app/env';

export class PersistLocalStore<T> {
  #value = $state<T>() as T;
  #key = '';

  constructor(key: string, value: T) {
    this.#key = key;
    this.#value = value;

    if (browser) {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          this.#value = this.#deserialize(item);
        }
      } catch {
        // localStorage might be unavailable or restricted
      }

      window.addEventListener('storage', (event) => {
        if (event.key === this.#key && event.newValue !== null) {
          this.#value = this.#deserialize(event.newValue);
        }
      });
    }

    $effect.root(() => {
      $effect(() => {
        if (browser) {
          try {
            localStorage.setItem(this.#key, this.#serialize(this.#value));
          } catch {
            // handle quota exceeded or private mode
          }
        }
      });
      return () => { };
    });
  }

  #serialize(value: T): string {
    return JSON.stringify(value);
  }

  #deserialize(item: string): T {
    try {
      return JSON.parse(item);
    } catch {
      return item as unknown as T;
    }
  }

  get current(): T {
    return this.#value;
  }

  set current(value: T) {
    this.#value = value;
  }
}

export function persistLocalStore<T>(key: string, value: T) {
  return new PersistLocalStore(key, value);
}
