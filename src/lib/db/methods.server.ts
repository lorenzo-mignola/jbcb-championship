import { createBrackets } from '../models/categories/brackets/create-brackets';
import { createDoublePool } from '../models/categories/doublePool/create-double-pool';
import { createSinglePool } from '../models/categories/singlePool/create-single-pool';
import type { Category } from '../types/category.type';
import { db } from './client.server';

const generateCategory = ({
  name,
  athletes,
  type,
  duration
}: Pick<Category, 'name' | 'athletes' | 'type' | 'duration'>) => {
  switch (type) {
    case 'pool':
      return createSinglePool(name, athletes, duration);
    case 'brackets':
      return createBrackets(name, athletes, duration);
    case 'double_pool':
      return createDoublePool(name, athletes, duration);
    default:
      throw new Error(`No type found`);
  }
};

export const createCategory = async ({
  name,
  athletes,
  type,
  duration
}: Pick<Category, 'name' | 'athletes' | 'type' | 'duration'>) => {
  const newCategory = await db
    .collection('categories')
    .insertOne(generateCategory({ name, athletes, type, duration }));
  return newCategory.insertedId;
};
