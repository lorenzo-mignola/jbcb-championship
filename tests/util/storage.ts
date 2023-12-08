import type { Category } from '../../src/lib/types/Category';
import mockStorage from '../storage/category.json' assert { type: 'json' };

export const getCategoryMock = (): Category | null => {
  const storage: { categories: Category[] } | null = JSON.parse(
    mockStorage.origins[0].localStorage.find((item) => item.name === 'jbcb-championship')?.value ??
      'null'
  );
  if (!storage) {
    return null;
  }

  return storage.categories[0];
};
