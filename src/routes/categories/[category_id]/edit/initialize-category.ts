import type { Category } from '$lib/types/category.type';

import { athletesState } from '$lib/state/category-edit/athletes-state.svelte';
import { categoryNameState } from '$lib/state/category-edit/category-name-state.svelte';
import { categoryTypeState } from '$lib/state/category-edit/category-type-state.svelte';
import { durationState } from '$lib/state/category-edit/duration-state.svelte';
import {
  originalCategoryIdState,
} from '$lib/state/category-edit/original-cateogry-id-state.svelte';

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
