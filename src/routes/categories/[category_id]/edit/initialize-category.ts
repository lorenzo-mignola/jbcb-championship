import { athletes } from '$lib/store/$athletes';
import { categoryName } from '$lib/store/$category-name';
import { duration } from '$lib/store/$duration';
import { type } from '$lib/store/$type';
import type { Category } from '$lib/types/category.type';
import { originalCategoryId } from '../../../../lib/store/$original-category-id';

export const initializeCategory = (category?: Category) => {
  if (!category) {
    return;
  }
  type.set(category.type);
  duration.set(category.duration);
  athletes.set(category.athletes);
  categoryName.set(category.name);
  originalCategoryId.set(category.id);
};
