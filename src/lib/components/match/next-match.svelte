<script lang="ts" strictEvents>
  import type { Match } from '$lib/types/match.type';

  export let nextMatch: Pick<Match, 'white' | 'blue' | 'id'> | undefined;
  export let view = false;
</script>

{#if nextMatch && nextMatch.id}
  <div class="card variant-ringed p-2 mb-4 md:mb-0 break-words" class:text-xl={view}>
    <p>Prossimo incontro</p>
    <p class:text-sm={!view} class:text-xl={view}>
      <b>{nextMatch.white?.name}</b> - <b>{nextMatch?.blue?.name}</b>
    </p>
  </div>
{/if}
