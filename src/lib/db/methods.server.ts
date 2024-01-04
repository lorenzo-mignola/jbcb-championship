import { ObjectId } from 'mongodb';
import { getByeWinner, needSkipMatch } from '../models/categories/brackets/auto-update-next-match';
import { createBrackets } from '../models/categories/brackets/create-brackets';
import { updateBrackets } from '../models/categories/brackets/update-brackets';
import { createDoublePool } from '../models/categories/doublePool/create-double-pool';
import { updateDoublePool } from '../models/categories/doublePool/update-double-pool';
import { createSinglePool } from '../models/categories/singlePool/create-single-pool';
import { updateSinglePool } from '../models/categories/singlePool/update-single-pool';
import type { Category } from '../types/category.type';
import type { Match } from '../types/match.type';
import { db } from './client.server';

const toSerializable = (category: Category) => ({
  ...category,
  _id: category._id.toString()
});

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
  return newCategory.insertedId.toString();
};

export const getCategory = async (id: string) => {
  const _id = new ObjectId(id);
  const category = await db.collection<Category>('categories').findOne({ _id });
  if (!category) {
    return undefined;
  }
  return toSerializable(category);
};

export const getAllCategories = async () => {
  const categories = await db.collection<Category>('categories').find().toArray();
  return categories.map(toSerializable);
};

const removeCategory = (id: string) => {
  const _id = new ObjectId(id);

  return db.collection<Category>('categories').deleteOne({ _id });
};

export const editCategory = async (
  categoryId: string,
  categoryEdit: Pick<Category, 'name' | 'athletes' | 'type' | 'duration'>
) => {
  const newId = await createCategory(categoryEdit);
  await removeCategory(categoryId);

  return newId;
};

function updateCategory(category: Category, matchUpdated: Match) {
  if (category.type === 'pool') {
    return updateSinglePool(category, matchUpdated);
  }
  if (category.type === 'brackets') {
    return updateBrackets(category, matchUpdated);
  }
  // eslint-disable-next-line svelte/@typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unnecessary-condition -- used as switch
  if (category.type === 'double_pool') {
    return updateDoublePool(category, matchUpdated);
  }
  return category;
}

export const saveMatch = async (
  categoryId: string,
  matchUpdated: Match
): Promise<Category | undefined> => {
  const category = await getCategory(categoryId);
  if (!category) {
    return;
  }

  const categoryUpdated = updateCategory(category, matchUpdated);

  const { _id: id, ...categoryToUpdate } = categoryUpdated;
  const _id = new ObjectId(id);
  await db.collection<Category>('categories').updateOne({ _id }, { $set: { ...categoryToUpdate } });

  if (category.type === 'brackets' && needSkipMatch(categoryUpdated)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
    const nextMatch = categoryUpdated.matches.find(
      (match) => match.id === categoryUpdated.currentMatch
    )!;
    const nextMatchByeWinner = getByeWinner(nextMatch);
    return saveMatch(categoryUpdated._id.toString(), { ...nextMatch, winner: nextMatchByeWinner });
  }

  return categoryUpdated;
};
