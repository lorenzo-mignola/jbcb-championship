import { nanoid } from 'nanoid';
import type { Athlete } from '../types/Athlete';
import { db } from './db';

export const createCategory = (name: string, athletes: Athlete[]) => {
  const id = nanoid();
  if (typeof localStorage !== 'undefined') {
    db.data.categories.push({ name, athletes, id, rounds: [] });
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
