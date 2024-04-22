import { writable } from 'svelte/store';

import type { Category } from '../types/category.type';

export const categoriesNotStarted = writable<Pick<Category, 'id' | 'name'>[]>([]);
