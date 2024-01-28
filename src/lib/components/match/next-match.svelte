<script lang="ts" strictEvents>
  import type { Match } from '$lib/types/match.type';

  export let nextMatch: Pick<Match, 'white' | 'blue' | 'id'> | undefined;
  export let view = false;
</script>

{#if nextMatch && nextMatch.id}
  <div
    class="card variant-ringed p-2 mb-4 md:mb-0 break-words"
    class:spacer={view}
    class:text-xl={view}
  >
    <p>Prossimo incontro</p>
    <p class:text-sm={!view} class:text-xl={view}>
      <b>{nextMatch.white?.name}</b> - <b>{nextMatch?.blue?.name}</b>
    </p>
  </div>
{:else}
  <div class="bg-red-400" class:spacer={!view} class:spacerView={view}>&nbsp;</div>
{/if}

<style lang="postcss">
  .spacerView {
    @apply h-[72px];
  }
  .spacer {
    @apply h-[60px];
  }
</style>
