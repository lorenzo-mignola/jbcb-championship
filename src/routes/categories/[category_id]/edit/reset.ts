import { athletesState } from '#lib/state/category-edit/athletes-state.svelte';
import { categoryNameState } from '#lib/state/category-edit/category-name-state.svelte';
import { categoryTypeState } from '#lib/state/category-edit/category-type-state.svelte';
import { durationState } from '#lib/state/category-edit/duration-state.svelte';
import {
  originalCategoryIdState,
} from '#lib/state/category-edit/original-cateogry-id-state.svelte';
import { timerState } from '#lib/state/match/timer-state.svelte';
import { categoriesNotStartedState } from '#lib/state/utils/categories-not-started-state.svelte';

export function reset() {
  athletesState.resetAthletes();
  categoryNameState.name = '';
  categoryTypeState.type = null;
  durationState.duration = 4 * 60 * 10;
  originalCategoryIdState.id = '';
  categoriesNotStartedState.categoriesNotStarted = [];
  timerState.reset();
}
