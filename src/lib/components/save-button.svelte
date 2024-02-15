<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import axios from 'redaxios';
  import { onMount } from 'svelte';
  import { getByeWinner } from '../models/categories/brackets/auto-update-next-match';
  import { isByeMatch } from '../models/ranking/category';
  import { match } from '../store/$match';
  import { reset } from '../store/$timer';
  import type { Category } from '../types/category.type';
  import type { Match } from '../types/match.type';
  import LoadingSpinner from './loading-spinner.svelte';

  export let categoryId: string;
  let loading = false;

  onMount(() => {
    if (!$match) {
      return;
    }
    const isBye = isByeMatch($match);
    if (isBye) {
      const byeWinner = getByeWinner($match);
      save({ ...$match, winner: byeWinner });
    }
  });

  const save = async (matchToUpdate: Match) => {
    loading = true;
    const { data: categoryUpdated } = await axios.patch<Category | undefined>(
      `/api/categories/${categoryId}/match`,
      matchToUpdate
    );

    if (!categoryUpdated) {
      loading = false;
      return;
    }
    if (categoryUpdated.currentMatch) {
      reset();
      goto(`/categories/${categoryUpdated.id}/match/${categoryUpdated.currentMatch}`, {
        invalidateAll: true
      });
      loading = false;
      return;
    }
    reset();
    goto(`/categories/${categoryUpdated.id}`, {
      invalidateAll: true
    });
    loading = false;
  };

  const handleClick = () => {
    if (!$match) {
      return;
    }
    save($match);
  };

  $: winner = $match?.winner;
</script>

<button
  class="variant-filled-secondary btn mt-5 flex w-full items-end p-5 text-2xl"
  class:hidden={!winner}
  disabled={loading}
  type="button"
  on:click|preventDefault={handleClick}
>
  <span class="ml-2"> Termina incontro </span>
  {#if loading}
    <LoadingSpinner />
  {/if}
</button>
