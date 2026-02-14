import { browser } from '$app/environment';

export class PersistLocalStore<T> {
  #value = $state<T>() as T;
  #key = '';

  constructor(key: string, value: T) {
    this.#key = key;
    this.#value = value;

    if (browser) {
      const item = localStorage.getItem(key);
      if (item) {
        this.#value = this.#deserialize(item);
      }
    }

    $effect.root(() => {
      $effect(() => {
        localStorage.setItem(this.#key, this.#serialize(this.#value));
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
