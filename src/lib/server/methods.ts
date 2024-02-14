import { getByeWinner, needSkipMatch } from '../models/categories/brackets/auto-update-next-match';
import { createBrackets } from '../models/categories/brackets/create-brackets';
import { updateBrackets } from '../models/categories/brackets/update-brackets';
import { createDoublePool } from '../models/categories/doublePool/create-double-pool';
import { updateDoublePool } from '../models/categories/doublePool/update-double-pool';
import { createSinglePool } from '../models/categories/singlePool/create-single-pool';
import { updateSinglePool } from '../models/categories/singlePool/update-single-pool';
import { type Category } from '../types/category.type';
import type { Match } from '../types/match.type';
import { CATEGORIES_COLLECTION, categoriesCollection, db } from './firebase';

const generateCategory = ({
  name,
  athletes,
  type,
  duration,
  tournament
}: Pick<Category, 'name' | 'athletes' | 'type' | 'duration' | 'tournament'>) => {
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
};

export const createCategory = async ({
  name,
  athletes,
  type,
  duration,
  tournament
}: Pick<Category, 'name' | 'athletes' | 'type' | 'duration' | 'tournament'>) => {
  const doc = await db
    .collection(CATEGORIES_COLLECTION)
    .add(generateCategory({ name, athletes, type, duration, tournament }));
  return doc.id;
};

export const getCategory = async (id: string): Promise<Category | undefined> => {
  const category = await categoriesCollection.doc(id).get();
  if (!category.exists) {
    return undefined;
  }
  return { id: category.id, ...category.data() } as Category;
};

export const getAllCategories = async (tournament: string): Promise<Category[]> => {
  const categories = await categoriesCollection.where('tournament', '==', tournament).get();
  if (categories.empty) {
    return [];
  }
  return categories.docs.map((category) => ({ id: category.id, ...category.data() }) as Category);
};

export const getNotStartedCategory = async (
  tournament: string
): Promise<Pick<Category, 'id' | 'name'>[]> => {
  const categories = await categoriesCollection.where('tournament', '==', tournament).get();
  if (categories.empty) {
    return [];
  }
  return categories.docs
    .filter((category) => !category.data().matches[0].winner)
    .map((category) => ({ id: category.id, name: category.data().name }));
};

export const getAllEndedCategories = async (tournament: string): Promise<Category[]> => {
  if (!tournament) {
    return [];
  }

  const categories = await categoriesCollection
    .where('tournament', '==', tournament)
    .where('currentMatch', '==', null)
    .get();

  if (categories.empty) {
    return [];
  }

  return categories.docs.map((category) => ({ id: category.id, ...category.data() }) as Category);
};

const removeCategory = (id: string) => {
  return categoriesCollection.doc(id).delete();
};

export const editCategory = async (
  categoryId: string,
  categoryEdit: Pick<Category, 'name' | 'athletes' | 'type' | 'duration' | 'tournament'>
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
  matchUpdated: Match,
  loop?: number
): Promise<Category | undefined> => {
  const category = await getCategory(categoryId);
  if (!category) {
    return;
  }

  const categoryUpdated = updateCategory(category, matchUpdated);

  const { id, ...categoryToUpdate } = categoryUpdated;
  await categoriesCollection.doc(id).update({ ...categoryToUpdate });

  const currentLoop = loop !== undefined ? loop - 1 : categoryUpdated.matches.length;

  if (category.type === 'brackets' && needSkipMatch(categoryUpdated) && currentLoop >= 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
    const nextMatch = categoryUpdated.matches.find(
      (match) => match.id === categoryUpdated.currentMatch
    )!;
    const nextMatchByeWinner = getByeWinner(nextMatch);
    return saveMatch(categoryUpdated.id, { ...nextMatch, winner: nextMatchByeWinner }, currentLoop);
  }

  return categoryUpdated;
};
