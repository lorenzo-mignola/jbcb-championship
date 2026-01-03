import type { Ord } from 'ramda';

import {
  always,
  ascend,
  map,
  omit,
  pipe,
  prop,
  replace,
  sortWith,
  when,
} from 'ramda';

import type { Category } from '../types/category.type';

type Sex = 'F' | 'M';

interface CategoryValues {
  category: string;
  sex: Sex | 'NO SEX';
  weight: number;
}

type CategoryWithValues = Category & CategoryValues;

function getFromRegex(regex: RegExp, value: string) {
  return (regex.exec(value) ?? [null])[0];
}

const getCategory = (name: string) => getFromRegex(/U\d{1,2}/, name);

function getSex(name: string): Sex | undefined {
  return getFromRegex(/F|M/, name)?.trim() as Sex | undefined;
}

function getWeight(name: string) {
  const weightString = getFromRegex(/(?<sign>\+|-)\d{1,3}/, name);
  if (weightString === null) {
    return -Infinity;
  }
  const weightNumber = Number(weightString);
  if (weightNumber <= 0) {
    return Math.abs(weightNumber);
  }

  return weightNumber + 1;
}

function mapCategoryNameToValues(category: Category): CategoryWithValues {
  const { name } = category;

  return {
    ...category,
    category: getCategory(name) ?? 'OTHER CATEGORY',
    sex: getSex(name) ?? 'NO SEX',
    weight: getWeight(name),
  };
}

const sortByCategory: (value: CategoryWithValues) => Ord = pipe(
  prop('category'),
  replace('U', ''),
  Number,
  when<Ord, number>(Number.isNaN, always(Number(Infinity))),
);

const sortBySex = pipe(prop('sex'));

const sortByWeight = prop('weight');

export function sortCategories(categories: Category[]): Category[] {
  const categoriesWithValues = map(mapCategoryNameToValues)(categories);

  const sorted = sortWith<CategoryWithValues>([
    ascend(sortByCategory),
    ascend(sortBySex),
    ascend(sortByWeight),
  ])(categoriesWithValues);

  return map<CategoryWithValues, Category>(
    category => omit(['category', 'sex', 'weight'], category) as Category,
  )(sorted);
}
