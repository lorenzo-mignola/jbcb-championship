import type { Category } from '../types/category.type';
import type { Match } from '../types/match.type';

import {
  getByeWinner,
  needSkipMatch,
} from '../models/categories/brackets/auto-update-next-match';
import { updateBrackets } from '../models/categories/brackets/update-brackets';
import { updateDoublePool } from '../models/categories/doublePool/update-double-pool';
import { updateSinglePool } from '../models/categories/singlePool/update-single-pool';
import { isNotByeMatch } from '../models/ranking/category';
import { categoriesCollection } from './categories-collection';
import { generateCategory } from './create-cateogry';
import { db } from './firebase';
import { getCategory } from './get-category';

export async function editCategory(
  categoryId: string,
  categoryEdit: Pick<
    Category,
    'name' | 'athletes' | 'type' | 'duration' | 'tournament'
  >,
) {
  const categoryRef = categoriesCollection.doc(categoryId);

  await db.runTransaction(async (transaction) => {
    const category = await transaction.get(categoryRef);
    if (!category.exists) {
      throw new Error(`Category ${categoryId} not found`);
    }

    const categoryData = category.data();
    const existingCategory = {
      id: category.id,
      ...categoryData,
    } as Category;

    const hasCompletedMatches = existingCategory.matches
      .filter(isNotByeMatch)
      .some(match => Boolean(match.winner));

    const isStructuralChange = getIsStructuralChange(existingCategory, categoryEdit);

    if (hasCompletedMatches && isStructuralChange) {
      throw new Error(
        'Cannot change athletes or category type after matches have been played',
      );
    }

    if (hasCompletedMatches) {
      transaction.update(categoryRef, {
        duration: categoryEdit.duration,
        name: categoryEdit.name,
        tournament: categoryEdit.tournament,
      });
    } else {
      const regenerated = generateCategory(categoryEdit);
      transaction.set(categoryRef, regenerated);
    }
  });

  return categoryId;
}

function getIsStructuralChange(
  existingCategory: Category,
  categoryEdit: Pick<Category, 'type' | 'athletes' | 'name' | 'duration' | 'tournament'>,
) {
  const athleteIdsBefore = existingCategory.athletes
    .map(athlete => athlete.id)
    .sort()
    .join(',');

  const athleteIdsAfter = categoryEdit.athletes
    .map(athlete => athlete.id)
    .sort()
    .join(',');

  return existingCategory.type !== categoryEdit.type
    || athleteIdsBefore !== athleteIdsAfter;
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
    = loop !== undefined
      ? loop - 1
      : categoryUpdated.matches.length;

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
