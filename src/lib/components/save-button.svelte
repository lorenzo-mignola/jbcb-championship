<script lang="ts" strictEvents>
  import { goto } from '$app/navigation';
  import axios from 'redaxios';
  import { onMount } from 'svelte';
  import { getByeWinner } from '../models/categories/brackets/auto-update-next-match';
  import { match } from '../store/$match';
  import { reset } from '../store/$timer';
  import type { Match } from '../types/match.type';
  import { isByeMatch } from '../utils/category';

  export let categoryId: string;

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
    const { data: categoryUpdated } = await axios.patch(
      `/api/categories/${categoryId}/match`,
      matchToUpdate
    );

    if (!categoryUpdated) {
      return;
    }
    if (categoryUpdated.currentMatch) {
      goto(`/categories/${categoryUpdated._id}/match/${categoryUpdated.currentMatch}`, {
        invalidateAll: true
      });
      reset();
      return;
    }
    reset();
    goto(`/categories/${categoryUpdated._id}`, {
      invalidateAll: true
    });
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
  class="btn variant-filled-secondary mt-5 text-2xl w-full p-5"
  class:hidden={!winner}
  type="button"
  on:click|preventDefault={handleClick}>Termina incontro</button
>
