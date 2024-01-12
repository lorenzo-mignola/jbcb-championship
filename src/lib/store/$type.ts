import { writable } from 'svelte/store';
import type { Category } from '../types/category.type';

export const type = writable<Category['type'] | null>(null);

export const typeToLabel: Record<Category['type'], string> = {
  double_pool: 'Pool doppia',
  pool: 'Pool singola',
  brackets: '2 KO'
};
