import type { LowSync } from 'lowdb';
import { LocalStoragePreset } from 'lowdb/browser';
import type { Category } from '../types/category.type';

export interface DB {
  categories: Category[];
  settings?: {
    clubs?: string[];
  };
}

const defaultData: DB = { categories: [], settings: { clubs: [] } };

// eslint-disable-next-line import/no-mutable-exports -- created above
export let db: LowSync<DB> | undefined;
if (typeof localStorage !== 'undefined') {
  db = LocalStoragePreset<DB>('jbcb-championship', defaultData);
}
