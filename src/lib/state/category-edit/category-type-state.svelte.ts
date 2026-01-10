import type { Category } from '../../types/category.type';

export const typeToLabel: Record<Category['type'], string> = {
  brackets: '2 KO',
  double_pool: 'Pool doppia',
  pool: 'Pool singola',
};

class CategoryTypeState {
  type = $state<Category['type'] | null>(null);
}

export const categoryTypeState = new CategoryTypeState();
