import { getByeWinner, needSkipMatch } from '../models/categories/brackets/autoUpdateNextMatch';
import { createBrackets, updateBrackets } from '../models/categories/brackets/brackets';
import { createDoublePool } from '../models/categories/doublePool/createDoublePool';
import { updateDoublePool } from '../models/categories/doublePool/updateDoublePool';
import { createSinglePool } from '../models/categories/singlePool/createSinglePool';
import { updateSinglePool } from '../models/categories/singlePool/updateSinglePool';
import type { Category } from '../types/Category';
import type { Match } from '../types/Match';
import { db } from './db';

export const createCategory = (
  name: Category['name'],
  athletes: Category['athletes'],
  type: Category['type'],
  duration: Category['duration']
) => {
  if (typeof localStorage !== 'undefined') {
    const category = generateCategory({ name, athletes, type, duration });
    db.data.categories.push(category);
    db.write();
    return category.id;
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
    case 'double-pool':
      return createDoublePool(name, athletes, duration);
    default:
      throw new Error(`No type ${type} found`);
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
  db ? db.data.categories.find((category) => category.id === id) : undefined;

export const saveMatch = (categoryId: string, matchUpdated: Match): Category | undefined => {
  if (!db) {
    return;
  }
  const category = db.data.categories.find((category) => category.id === categoryId);
  if (!category) {
    return;
  }
  const categoryUpdated = updateCategory(category, matchUpdated);
  const categoriesUpdated = updateCategories(categoryId, categoryUpdated);
  db.data.categories = categoriesUpdated;
  db.write();

  if (category.type === 'brackets' && needSkipMatch(categoryUpdated)) {
    const nextMatch = categoryUpdated.matches.find(
      (match) => match.id === categoryUpdated.currentMatch
    )!;
    const nextMatchByeWinner = getByeWinner(nextMatch);
    return saveMatch(categoryUpdated.id, { ...nextMatch, winner: nextMatchByeWinner });
  }

  return categoryUpdated;
};

export const deleteAll = () => {
  db.data.categories = [];
  db.write();
};

function updateCategories(categoryId: string, categoryUpdated: Category) {
  return db.data.categories.map((category) => {
    if (category.id !== categoryId) {
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
  if (category.type === 'double-pool') {
    return updateDoublePool(category, matchUpdated);
  }
  return category;
}

const removeCategory = (categoryId: string) => {
  db.data.categories = db.data.categories.filter((category) => category.id !== categoryId);
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
