import type { Category } from '$lib/types/category.type';

import { athletesState } from '../../../../lib/state/athletes-state.svelte';
import { categoryNameState } from '../../../../lib/state/category-name-state.svelte';
import { categoryTypeState } from '../../../../lib/state/category-type-state.svelte';
import { durationState } from '../../../../lib/state/duration-state.svelte';
import { originalCategoryIdState } from '../../../../lib/state/original-cateogry-id-state.svelte';

export function initializeCategory(category?: Category) {
  if (!category) {
    return;
  }
  categoryTypeState.type = category.type;
  durationState.duration = category.duration;
  athletesState.athletes = category.athletes;
  categoryNameState.name = category.name;
  originalCategoryIdState.id = category.id;
}
