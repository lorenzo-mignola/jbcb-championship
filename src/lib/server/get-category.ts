import { isNotByeMatch } from '../models/ranking/category';
import type { Category } from '../types/category.type';
import { categoriesCollection } from './firebase';

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
    .filter((category) => {
      const matches = category.data().matches.filter(isNotByeMatch);
      if (matches.length === 0) {
        return true;
      }
      const [firstMatch] = matches;
      return !firstMatch.winner;
    })
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
