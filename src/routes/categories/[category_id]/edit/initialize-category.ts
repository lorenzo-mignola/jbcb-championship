import { athletes } from '$lib/store/$athletes';
import { duration } from '$lib/store/$duration';
import { type } from '$lib/store/$type';
import type { Category } from '$lib/types/Category';

export const initializeCategory = (category: Category) => {
  type.set(category.type);
  duration.set(category.duration);
  athletes.set(category.athletes);
};
