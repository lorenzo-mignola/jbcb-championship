import { athletesState } from '$lib/state/athletes-state.svelte';
import { categoriesNotStartedState } from '$lib/state/categories-not-started-state.svelte';
import { categoryNameState } from '$lib/state/category-name-state.svelte';
import { originalCategoryIdState } from '$lib/state/original-cateogry-id-state.svelte';

export function reset() {
  athletesState.resetAthletes();
  categoryNameState.name = '';
  originalCategoryIdState.id = '';
  categoriesNotStartedState.categoriesNotStarted = [];
}
