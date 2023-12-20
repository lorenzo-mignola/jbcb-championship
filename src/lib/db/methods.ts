import { createBrackets } from '../models/categories/brackets';
import { createSinglePool } from '../models/categories/singlePool';
import type { Category } from '../types/Category';
import type { Match } from '../types/Match';
import { db } from './db';

export const createCategory = (
  name: Category['name'],
  athletes: Category['athletes'],
  type: Category['type']
) => {
  if (typeof localStorage !== 'undefined') {
    const category = generateCategory({ name, athletes, type });
    db.data.categories.push(category);
    db.write();
    return category.id;
  }
};

const generateCategory = ({
  name,
  athletes,
  type
}: Pick<Category, 'name' | 'athletes' | 'type'>) => {
  switch (type) {
    case 'pool':
      return createSinglePool(name, athletes);
    case 'brackets':
      return createBrackets(name, athletes);
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

export const getCategory = (id: string | null) =>
  db ? db.data.categories.find((category) => category.id === id) : undefined;

export const saveMatch = (categoryId: string, matchUpdated: Match) => {
  if (!db) {
    return;
  }
  const category = db.data.categories.find((category) => category.id === categoryId);
  if (!category) {
    return;
  }
  const categoryUpdated: Category = updateCategory(category, matchUpdated);
  const categoriesUpdated = updateCategories(categoryId, categoryUpdated);
  db.data.categories = categoriesUpdated;
  db.write();
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
  throw new Error(`Unknown category type ${category.type}`);
}

function updateSinglePool(category: Category, matchUpdated: Match) {
  const nextMatch = category.matches.findIndex((match) => match.id === matchUpdated.id);
  const done = nextMatch === category.matches.length - 1;
  const categoryUpdated: Category = {
    ...category,
    currentMatch: done ? undefined : category.matches[nextMatch + 1].id,
    matches: category.matches.map((match) => {
      if (match.id !== matchUpdated.id) {
        return match;
      }
      return matchUpdated;
    })
  };
  return categoryUpdated;
}
