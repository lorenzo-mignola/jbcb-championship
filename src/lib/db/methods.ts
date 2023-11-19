import { nanoid } from 'nanoid';
import type { Athlete } from '../types/Athlete';
import { db } from './db';

export const createCategory = (name: string, athletes: Athlete[]) => {
  const id = nanoid();
  if (typeof localStorage !== 'undefined') {
    db.data.categories.push({ name, athletes, id });
    db.write();
  }
  return id;
};

export const getAllCategories = () => {
  return db.data.categories;
};
