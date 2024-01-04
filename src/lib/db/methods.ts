import { nanoid } from 'nanoid';
import { getByeWinner, needSkipMatch } from '../models/categories/brackets/auto-update-next-match';
import { createBrackets, updateBrackets } from '../models/categories/brackets/brackets';
import { createDoublePool } from '../models/categories/doublePool/create-double-pool';
import { updateDoublePool } from '../models/categories/doublePool/update-double-pool';
import { createSinglePool } from '../models/categories/singlePool/create-single-pool';
import { updateSinglePool } from '../models/categories/singlePool/update-single-pool';
import type { Category } from '../types/category.type';
import type { Match } from '../types/match.type';
import { db } from './db';

export const createCategory = (
  name: Category['name'],
  athletes: Category['athletes'],
  type: Category['type'],
  duration: Category['duration']
) => {
  if (!db) {
    return;
  }
  if (typeof localStorage !== 'undefined') {
    const category = generateCategory({ name, athletes, type, duration });
    const _id = nanoid();
    db.data.categories.push({ ...category, _id });
    db.write();
    return _id;
  }
};

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

export const getAllCategories = () => {
  if (!db) {
    return [];
  }
  return db.data.categories;
};

export const getSettings = () => {
  if (!db) {
    return {};
  }
  return db.data.settings || {};
};

export const addClub = (newClub: string) => {
  if (!db) {
    return;
  }
  const { settings = {} } = db.data;
  const { clubs = [] } = settings;
  const clubsUpdated = [...clubs, newClub];
  const settingsUpdated = {
    ...settings,
    clubs: clubsUpdated
  };

  db.data.settings = settingsUpdated;
  db.write();
};

export const removeClub = (clubToRemove: string) => {
  if (!db) {
    return;
  }
  const { settings = {} } = db.data;
  const { clubs = [] } = settings;
  const clubsUpdated = clubs.filter((club) => club !== clubToRemove);
  const settingsUpdated = {
    ...settings,
    clubs: clubsUpdated
  };

  db.data.settings = settingsUpdated;
  db.write();
};

export const getCategory = (id: string | null) =>
  db ? db.data.categories.find((category) => category._id === id) : undefined;

export const saveMatch = (categoryId: string, matchUpdated: Match): Category | undefined => {
  if (!db) {
    return;
  }
  const category = db.data.categories.find((c) => c._id === categoryId);
  if (!category) {
    return;
  }
  const categoryUpdated = updateCategory(category, matchUpdated);
  const categoriesUpdated = updateCategories(categoryId, categoryUpdated);
  if (!categoriesUpdated) {
    return;
  }
  db.data.categories = categoriesUpdated;
  db.write();

  if (category.type === 'brackets' && needSkipMatch(categoryUpdated)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- checked before
    const nextMatch = categoryUpdated.matches.find(
      (match) => match.id === categoryUpdated.currentMatch
    )!;
    const nextMatchByeWinner = getByeWinner(nextMatch);
    return saveMatch(categoryUpdated._id, { ...nextMatch, winner: nextMatchByeWinner });
  }

  return categoryUpdated;
};

export const deleteAll = () => {
  if (!db) {
    return;
  }
  db.data.categories = [];
  db.write();
};

function updateCategories(categoryId: string, categoryUpdated: Category) {
  if (!db) {
    return;
  }
  return db.data.categories.map((category) => {
    if (category._id !== categoryId) {
      return category;
    }
    return categoryUpdated;
  });
}

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

const removeCategory = (categoryId: string) => {
  if (!db) {
    return;
  }
  db.data.categories = db.data.categories.filter((category) => category._id !== categoryId);
  db.write();
};

export const editCategory = (
  categoryId: string,
  categoryEdit: {
    name: Category['name'];
    athletes: Category['athletes'];
    type: Category['type'];
    duration: Category['duration'];
  }
) => {
  const newId = createCategory(
    categoryEdit.name,
    categoryEdit.athletes,
    categoryEdit.type,
    categoryEdit.duration
  );
  removeCategory(categoryId);

  return newId;
};
