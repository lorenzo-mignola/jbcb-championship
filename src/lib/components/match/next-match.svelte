<script lang="ts" strictEvents>
  import type { Match } from '$lib/types/match.type';

  export let nextMatch: Pick<Match, 'white' | 'blue' | 'id'> | undefined;
  export let view = false;
</script>

{#if nextMatch && nextMatch.id}
  <div
    class="card variant-ringed mb-4 break-words p-2 md:mb-0"
    class:spacer={view}
    class:text-5xl={view}
    data-testid="next-match"
  >
    <p>Prossimo incontro</p>
    <p class:text-5xl={view} class:text-sm={!view}>
      <b>{nextMatch.white?.name}</b> - <b>{nextMatch?.blue?.name}</b>
    </p>
  </div>
{:else}
  <div class:spacerView={view}>&nbsp;</div>
{/if}

<style lang="postcss">
  .spacerView {
    @apply h-[72px];
  }
</style>
