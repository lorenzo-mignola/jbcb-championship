import { SinglePool } from '../models/categories/SinglePool';
import type { Category } from '../types/Category';
import { db } from './db';

export const createCategory = (
  name: Category['name'],
  athletes: Category['athletes'],
  type: Category['type']
) => {
  if (typeof localStorage !== 'undefined') {
    const category = generateCategory({ name, athletes, type });
    db.data.categories.push(category);
    db.write();
    return category.id;
  }
};

const generateCategory = ({
  name,
  athletes,
  type
}: Pick<Category, 'name' | 'athletes' | 'type'>) => {
  switch (type) {
    case 'pool':
      return new SinglePool(name, athletes);
    default:
      throw new Error(`No type ${type} found`);
  }
};

export const getAllCategories = () => {
  if (!db) {
    return [];
  }
  return db.data.categories;
};

export const getCategory = (id: string | null) =>
  db ? db.data.categories.find((category) => category.id === id) : undefined;
