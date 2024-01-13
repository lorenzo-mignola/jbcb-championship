import { athletes } from '$lib/store/$athletes';
import { categoryName } from '$lib/store/$category-name';
import { duration } from '$lib/store/$duration';
import { type } from '$lib/store/$type';
import type { Category } from '$lib/types/category.type';

export const initializeCategory = (category: Category) => {
  type.set(category.type);
  duration.set(category.duration);
  athletes.set(category.athletes);
  categoryName.set(category.name);
};
