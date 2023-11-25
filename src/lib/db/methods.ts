import { nanoid } from 'nanoid';
import type { Category } from '../types/Category';
import { db } from './db';

export const createCategory = (
  name: Category['name'],
  athletes: Category['athletes'],
  type: Category['type']
) => {
  const id = nanoid();
  if (typeof localStorage !== 'undefined') {
    db.data.categories.push({ name, athletes, id, rounds: [], type });
    db.write();
  }
  return id;
};

export const getAllCategories = () => {
  if (!db) {
    return [];
  }
  return db.data.categories;
};

export const getCategory = (id: string | null) =>
  db ? db.data.categories.find((category) => category.id === id) : undefined;
