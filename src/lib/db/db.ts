import type { LowSync } from 'lowdb';
import { LocalStoragePreset } from 'lowdb/browser';
import type { Category } from '../types/Category';

export interface DB {
  categories: Category[];
}

const defaultData: DB = { categories: [] };

export let db: LowSync<DB>;
if (typeof localStorage !== 'undefined') {
  db = LocalStoragePreset<DB>('jbcb-championship', defaultData);
}
