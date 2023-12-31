<script lang="ts">
  import Back from '$lib/icons/back.svelte';
  import type { Match } from '../../types/Match';

  export let categoryId: string;
  export let nextMatch: Match | undefined;
</script>

<footer class="py-14 flex justify-between items-center flex-col-reverse md:flex-row">
  <div>
    <a href={`/category/${categoryId}`} class="btn btn-sm variant-soft-surface shadow-md">
      <span><Back /></span>
      <span>Visualizza categoria</span>
    </a>
  </div>

  {#if nextMatch}
    <div class="card variant-soft p-2 mb-4 md:mb-0 break-words shadow-md">
      <p>Prossimo incontro</p>
      <p class="text-sm">
        <b>{nextMatch.white?.name}</b> - <b>{nextMatch?.blue?.name}</b>
      </p>
    </div>
  {/if}
</footer>
