import { createBrackets } from '../models/categories/brackets/createBrackets';
import { createDoublePool } from '../models/categories/doublePool/createDoublePool';
import { createSinglePool } from '../models/categories/singlePool/createSinglePool';
import type { Category } from '../types/Category';
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
      throw new Error(`No type ${type} found`);
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
