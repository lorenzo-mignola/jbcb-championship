import { resetAthletes } from '../../../../lib/store/$athletes';
import { categoriesNotStarted } from '../../../../lib/store/$categories-not-started';
import { categoryName } from '../../../../lib/store/$category-name';
import { originalCategoryId } from '../../../../lib/store/$original-category-id';

export const reset = () => {
  resetAthletes();
  categoryName.set('');
  originalCategoryId.set('');
  categoriesNotStarted.set([]);
};
