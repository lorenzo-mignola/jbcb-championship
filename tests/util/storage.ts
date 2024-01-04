import type { Category } from '../../src/lib/types/category.type';
import mockStorage from '../storage/category.json' assert { type: 'json' };

export const getCategoryMock = (): Category | null => {
  const storage = JSON.parse(
    mockStorage.origins[0].localStorage.find((item) => item.name === 'jbcb-championship')?.value ??
      'null'
  ) as { categories: Category[] } | null;
  if (!storage) {
    return null;
  }

  return storage.categories[0];
};
