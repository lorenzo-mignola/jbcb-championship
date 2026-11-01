<script lang='ts'>
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { onDestroy } from 'svelte';

  import { createCategoryCommand } from '#lib/remote/categories.remote';
  import { athletesState } from '#lib/state/category-edit/athletes-state.svelte';
  import { categoryNameState } from '#lib/state/category-edit/category-name-state.svelte';
  import { categoryTypeState } from '#lib/state/category-edit/category-type-state.svelte';
  import { durationState } from '#lib/state/category-edit/duration-state.svelte';
  import { tournamentState } from '#lib/state/settings/tournament-state';
  import { toaster } from '#lib/state/utils/toaster-state';

  import { reset } from '../categories/[category_id]/edit/reset';
  import CategoryEdit from './components/category-edit.svelte';

  onDestroy(() => {
    reset();
  });

  async function handleCreate() {
    if (!categoryNameState.name || !categoryTypeState.type) {
      toaster.error({ title: 'Compila tutti i campi' });
      return;
    }
    try {
      const newCategoryId = await createCategoryCommand({
        athletes: athletesState.athletes,
        duration: durationState.duration,
        name: categoryNameState.name.trim(),
        tournament: tournamentState.tournament,
        type: categoryTypeState.type,
      });

      reset();
      goto(resolve('/categories/[category_id]', { category_id: newCategoryId }));
    } catch (error) {
      console.error(error);
      toaster.error({ title: 'Errore durante la creazione della categoria' });
    }
  }
</script>

<CategoryEdit handleClick={handleCreate}>
  {#snippet labelButton()}
    <span>Crea Categoria</span>
  {/snippet}
</CategoryEdit>
