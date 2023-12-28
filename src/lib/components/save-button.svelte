<script lang="ts">
  import { goto } from '$app/navigation';
  import { saveMatch } from '$lib/db/methods';
  import { onMount } from 'svelte';
  import { getByeWinner } from '../models/categories/brackets/autoUpdateNextMatch';
  import { match } from '../store/$match';
  import type { Match } from '../types/Match';
  import { isByeMatch } from '../utils/category';
  import { reset } from './osaekomi/$osaekomi-timer';

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

  const save = (matchToUpdate: Match) => {
    const categoryUpdated = saveMatch(categoryId, matchToUpdate);
    if (!categoryUpdated) {
      return;
    }
    if (categoryUpdated.currentMatch) {
      goto(`/category/${categoryUpdated.id}/match/${categoryUpdated?.currentMatch}`);
      reset();
      return;
    }
    reset();
    goto(`/category/${categoryUpdated.id}`);
  };

  const handleClick = () => {
    if (!$match) {
      return;
    }
    save($match);
  };
</script>

<button
  class="btn variant-filled-secondary mt-5 text-2xl w-full p-5"
  class:hidden={!$match?.winner}
  on:click={handleClick}>Salva incontro</button
>
