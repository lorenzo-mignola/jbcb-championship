<script lang='ts'>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { athletesState } from '$lib/state/athletes-state.svelte';
  import { categoryNameState } from '$lib/state/category-name-state.svelte';
  import { categoryTypeState } from '$lib/state/category-type-state.svelte';
  import { durationState } from '$lib/state/duration-state.svelte';
  import { tournamentState } from '$lib/state/tournament-state';
  import ky from 'ky';

  import CategoryEdit from './components/category-edit.svelte';

  const reset = () => {
    athletesState.resetAthletes();
    categoryNameState.categoryName = '';
  };

  async function handleCreate() {
    if (!categoryNameState.categoryName || !categoryTypeState.type) {
      return;
    }
    const newCategoryId = await ky.post<string>('/api/categories', {
      json: {
        athletes: athletesState.athletes,
        duration: durationState.duration,
        name: categoryNameState.categoryName.trim(),
        tournament: tournamentState.tournament,
        type: categoryTypeState.type,
      },
    }).json();

    reset();
    goto(`${base}/categories/${newCategoryId}`);
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  {#snippet labelButton()}
    Crea Categoria
  {/snippet}
</CategoryEdit>
