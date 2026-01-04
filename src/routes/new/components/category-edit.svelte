<script lang='ts'>
  import type { Snippet } from 'svelte';

  import LoadingSpinner from '$lib/components/loading-spinner.svelte';
  import { categoryNameState } from '$lib/state/category-name-state.svelte';
  import { categoryTypeState } from '$lib/state/category-type-state.svelte';

  import Athletes from './athletes.svelte';
  import CategoryDuration from './category-duration.svelte';
  import CategoryName from './category-name.svelte';
  import CategoryType from './category-type.svelte';
  import NewAthlete from './new-athlete.svelte';

  interface Props {
    handleClick: () => void;
    labelButton: Snippet;
  }

  const { handleClick, labelButton }: Props = $props();

  const canClick = $derived(
    [
      categoryNameState.name.trim().length > 0,
      categoryTypeState.type !== null,
    ].every(Boolean),
  );

  let loading = $state(false);
</script>

<div class='flex flex-col gap-4'>
  <CategoryName />
  <CategoryDuration />
</div>

<div class='my-7'>
  <Athletes />
  <NewAthlete />
</div>

<CategoryType />

<button
  class='
    mx-auto mt-10 mb-1 btn flex w-full items-end preset-filled-secondary-500
    btn-lg
  '
  disabled={!canClick || loading}
  type='submit'
  onclick={() => {
    loading = true;
    handleClick();
  }}
>
  {@render labelButton()}

  {#if loading}
    <LoadingSpinner />
  {/if}
</button>
