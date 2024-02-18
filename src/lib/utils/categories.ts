import { always, ascend, pipe, prop, replace, sortWith, when, type Ord } from 'ramda';
import type { Category } from '../types/category.type';

type PartialCategory = Pick<Category, 'id' | 'name' | 'currentMatch'>;
type Sex = 'F' | 'M';
type PartialCategoryWithValues = PartialCategory & {
  category: string;
  sex: Sex | 'NO SEX';
  weight: number;
};
type CategoryArray = PartialCategory[];

const getFromRegex = (regex: RegExp, value: string) => (regex.exec(value) || [null])[0];

const getCategory = (name: string) => getFromRegex(/U\d{1,2}/, name);

const getSex = (name: string): Sex | undefined =>
  getFromRegex(/F|M/, name)?.trim() as Sex | undefined;

const getWeight = (name: string) => {
  const weightString = getFromRegex(/(?<sign>\+|-)\d{1,3}/, name);
  if (weightString === null) {
    return -Infinity;
  }
  return Number(weightString);
};

const mapCategoryNameToValues = (partialCategory: PartialCategory): PartialCategoryWithValues => {
  const { name } = partialCategory;

  return {
    ...partialCategory,
    category: getCategory(name) || 'OTHER CATEGORY',
    sex: getSex(name) || 'NO SEX',
    weight: getWeight(name)
  };
};

const sortByCategory: (value: PartialCategoryWithValues) => Ord = pipe(
  prop('category'),
  replace('U', ''),
  Number,
  when<Ord, number>(Number.isNaN, always(Number(Infinity)))
);

const sortBySex = (a: PartialCategoryWithValues, b: PartialCategoryWithValues) => {
  const sexA = prop('sex', a);
  const sexB = prop('sex', b);
  if (sexA === 'F') {
    return -1;
  }
  if (sexB === 'F') {
    return 1;
  }
  if (sexA === 'NO SEX') {
    return 1;
  }
  if (sexB === 'NO SEX') {
    return -1;
  }
  return 0;
};

// sort ascend
const sortByWeight = (a: PartialCategoryWithValues, b: PartialCategoryWithValues) =>
  prop('weight', b) - prop('weight', a);

export const sortCategories = (categories: CategoryArray): CategoryArray => {
  const categoriesWithValues = categories.map(mapCategoryNameToValues);

  const sorted = sortWith<PartialCategoryWithValues>([
    ascend(sortByCategory),
    sortBySex,
    sortByWeight
  ])(categoriesWithValues);
  console.log(sorted);

  return sorted.map((category) => ({
    id: category.id,
    name: category.name,
    currentMatch: category.currentMatch
  }));
};
