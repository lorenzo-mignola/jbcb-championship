import { writable } from 'svelte/store';

export const duration = writable<number>(4 * 60 * 10);
