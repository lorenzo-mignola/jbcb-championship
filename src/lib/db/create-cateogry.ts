import type { Category } from '../types/category.type';

import { createBrackets } from '../models/categories/brackets/create-brackets';
import { createDoublePool } from '../models/categories/doublePool/create-double-pool';
import { createSinglePool } from '../models/categories/singlePool/create-single-pool';
import { CATEGORIES_COLLECTION, db } from './firebase';

function generateCategory({
  athletes,
  duration,
  name,
  tournament,
  type,
}: Pick<Category, 'name' | 'athletes' | 'type' | 'duration' | 'tournament'>) {
  switch (type) {
    case 'pool':
      return createSinglePool(name, athletes, duration, tournament);
    case 'brackets':
      return createBrackets(name, athletes, duration, tournament);
    case 'double_pool':
      return createDoublePool(name, athletes, duration, tournament);
    default:
      throw new Error(`No type found`);
  }
}

export async function createCategory({
  athletes,
  duration,
  name,
  tournament,
  type,
}: Pick<Category, 'name' | 'athletes' | 'type' | 'duration' | 'tournament'>) {
  const doc = await db
    .collection(CATEGORIES_COLLECTION)
    .add(generateCategory({ athletes, duration, name, tournament, type }));
  return doc.id;
}
