import type { LowSync } from 'lowdb';
import { LocalStoragePreset } from 'lowdb/browser';
import type { Category } from '../types/Category';

export interface DB {
  categories: Category[];
  settings?: {
    clubs?: string[];
  };
}

const defaultData: DB = { categories: [], settings: { clubs: [] } };

export let db: LowSync<DB>;
if (typeof localStorage !== 'undefined') {
  db = LocalStoragePreset<DB>('jbcb-championship', defaultData);
}
