<script lang="ts">
  import { goto } from '$app/navigation';
  import { saveMatch } from '$lib/db/methods';
  import type { Match } from '../../../../../lib/types/Match';

  export let match: Match;
  export let categoryId: string;
  const handleClick = () => {
    const categoryUpdated = saveMatch(categoryId, match);
    if (!categoryUpdated) {
      return;
    }
    if (categoryUpdated.currentMatch) {
      goto(`/category/${categoryUpdated.id}/match/${categoryUpdated?.currentMatch}`);
      return;
    }
    goto(`/category/${categoryUpdated.id}`);
  };
</script>

<button class="btn variant-filled-secondary mt-5 text-2xl w-full p-5" on:click={handleClick}
  >Salva incontro</button
>
