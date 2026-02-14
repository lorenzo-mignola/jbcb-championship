<script lang='ts'>
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import ky from 'ky';

  import { athletesState } from '$lib/state/category-edit/athletes-state.svelte.js';
  import { categoryNameState } from '$lib/state/category-edit/category-name-state.svelte.js';
  import { categoryTypeState } from '$lib/state/category-edit/category-type-state.svelte.js';
  import { durationState } from '$lib/state/category-edit/duration-state.svelte.js';
  import { tournamentState } from '$lib/state/settings/tournament-state.js';
  import {
    categoriesNotStartedState,
  } from '$lib/state/utils/categories-not-started-state.svelte.js';
  import { toaster } from '$lib/state/utils/toaster-state.js';

  import CategoryEdit from '../../../new/components/category-edit.svelte';
  import { initializeCategory } from './initialize-category';
  import { reset } from './reset';

  const { data } = $props();

  const category = $derived(data.category);
  const notStartedCategoriesData = $derived(data.notStartedCategories);

  $effect(() => {
    initializeCategory(category);
    categoriesNotStartedState.categoriesNotStarted = notStartedCategoriesData;

    return () => {
      reset();
    };
  });

  async function handleEdit() {
    if (categoryNameState.name || categoryTypeState.type || !category) {
      return;
    }

    try {
      const idNewCategory = await ky.patch<string>(`/api/categories/${category.id}`, { json: {
        athletes: athletesState.athletes,
        duration: durationState.duration,
        name: categoryNameState.name.trim(),
        tournament: tournamentState.tournament,
        type: categoryTypeState.type,
      } }).json();

      reset();
      goto(resolve(`/categories/${idNewCategory}`));
    } catch (error) {
      toaster.error({ title: 'Errore durante il salvataggio delle modifiche' });
      console.error((error as { data: any }).data);
    }
  }
</script>

<CategoryEdit handleClick={handleEdit}>
  {#snippet labelButton()}
    <span>Modifica categoria</span>
  {/snippet}
</CategoryEdit>
