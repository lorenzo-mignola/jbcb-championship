<script lang='ts'>
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // import { onDestroy } from 'svelte';
  import ky from 'ky';
  import { onDestroy } from 'svelte';

  import { athletesState } from '$lib/state/athletes-state.svelte';
  import { categoriesNotStartedState } from '$lib/state/categories-not-started-state.svelte';
  import { categoryNameState } from '$lib/state/category-name-state.svelte';
  import { categoryTypeState } from '$lib/state/category-type-state.svelte';
  import { durationState } from '$lib/state/duration-state.svelte';
  import { toaster } from '$lib/state/toaster-state.js';
  import { tournamentState } from '$lib/state/tournament-state';

  import CategoryEdit from '../../../new/components/category-edit.svelte';
  import { initializeCategory } from './initialize-category';
  import { reset } from './reset';

  const { data } = $props();

  const category = $derived(data.category);
  const notStartedCategoriesData = $derived(data.notStartedCategories);

  $effect.pre(() => {
    initializeCategory(category);
  });

  $effect.pre(() => {
    categoriesNotStartedState.categoriesNotStarted = notStartedCategoriesData;
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

  onDestroy(() => {
    reset();
  });
</script>

<CategoryEdit handleClick={handleEdit}>
  {#snippet labelButton()}
    <span>Modifica categoria</span>
  {/snippet}
</CategoryEdit>
