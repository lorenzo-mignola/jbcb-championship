import type { Category } from '../types/category.type';

class CategoriesNotStartedState {
  categoriesNotStarted = $state<Pick<Category, 'id' | 'name'>[]>([]);

  length() {
    return this.categoriesNotStarted.length;
  }
}

export const categoriesNotStartedState = new CategoriesNotStartedState();
