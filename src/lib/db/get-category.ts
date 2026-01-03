import type { Category } from '../types/category.type';

import { isNotByeMatch } from '../models/ranking/category';
import { categoriesCollection } from './categories-collection';

export async function getCategory(id: string): Promise<Category | undefined> {
  const category = await categoriesCollection.doc(id).get();
  if (!category.exists) {
    return undefined;
  }
  return { id: category.id, ...category.data() } as Category;
}

export async function getAllCategories(
  tournament: string,
): Promise<Category[]> {
  const categories = await categoriesCollection
    .where('tournament', '==', tournament)
    .get();
  if (categories.empty) {
    return [];
  }
  return categories.docs.map(
    category => ({ id: category.id, ...category.data() }) as Category,
  );
}

export async function getNotStartedCategory(
  tournament: string,
): Promise<Category[]> {
  const categories = await categoriesCollection
    .where('tournament', '==', tournament)
    .get();
  if (categories.empty) {
    return [];
  }
  return categories.docs
    .filter((category) => {
      const matches = category.data().matches.filter(isNotByeMatch);
      if (matches.length === 0) {
        return true;
      }
      const [firstMatch] = matches;
      return !firstMatch.winner;
    })
    .map(category => ({ id: category.id, ...category.data() }) as Category);
}

export async function getAllEndedCategories(
  tournament: string,
): Promise<Category[]> {
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

  return categories.docs.map(
    category => ({ id: category.id, ...category.data() }) as Category,
  );
}
