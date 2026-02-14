import type { Category } from '../types/category.type';
import type { Match } from '../types/match.type';

import {
  getByeWinner,
  needSkipMatch,
} from '../models/categories/brackets/auto-update-next-match';
import { updateBrackets } from '../models/categories/brackets/update-brackets';
import { updateDoublePool } from '../models/categories/doublePool/update-double-pool';
import { updateSinglePool } from '../models/categories/singlePool/update-single-pool';
import { categoriesCollection } from './categories-collection';
import { createCategory } from './create-cateogry';
import { getCategory } from './get-category';

function removeCategory(id: string) {
  return categoriesCollection.doc(id).delete();
}

export async function editCategory(
  categoryId: string,
  categoryEdit: Pick<
    Category,
    'name' | 'athletes' | 'type' | 'duration' | 'tournament'
  >,
) {
  const newId = await createCategory(categoryEdit);
  await removeCategory(categoryId);

  return newId;
}

function updateCategory(category: Category, matchUpdated: Match) {
  if (category.type === 'pool') {
    return updateSinglePool(category, matchUpdated);
  }
  if (category.type === 'brackets') {
    return updateBrackets(category, matchUpdated);
  }
  if (category.type === 'double_pool') {
    return updateDoublePool(category, matchUpdated);
  }
  return category;
}

export async function saveMatch(
  categoryId: string,
  matchUpdated: Match,
  loop?: number,
): Promise<Category | undefined> {
  const category = await getCategory(categoryId);
  if (!category) {
    return;
  }

  const categoryUpdated = updateCategory(category, matchUpdated);

  const { id, ...categoryToUpdate } = categoryUpdated;
  await categoriesCollection.doc(id).update({ ...categoryToUpdate });

  const currentLoop
    = loop !== undefined ? loop - 1 : categoryUpdated.matches.length;

  if (
    category.type === 'brackets'
    && needSkipMatch(categoryUpdated)
    && currentLoop >= 0
  ) {
    const nextMatch = categoryUpdated.matches.find(
      match => match.id === categoryUpdated.currentMatch,
    )!;
    const nextMatchByeWinner = getByeWinner(nextMatch);
    return saveMatch(
      categoryUpdated.id,
      { ...nextMatch, winner: nextMatchByeWinner },
      currentLoop,
    );
  }

  return categoryUpdated;
}
