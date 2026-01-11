<script lang='ts'>
  import type { Match } from '$lib/types/match.type';

  interface Props {
    nextMatch: Pick<Match, 'white' | 'blue' | 'id'> | undefined;
    view?: boolean;
  }

  const { nextMatch, view = false }: Props = $props();
</script>

{#if nextMatch && nextMatch.id}
  <div
    class='
      mb-4 card preset-outlined p-2 wrap-break-word
      md:mb-0
    '
    class:spacer={view}
    class:text-5xl={view}
    data-testid='next-match'
  >
    <p>Prossimo incontro</p>
    <p class:text-5xl={view} class:text-sm={!view}>
      <b>{nextMatch.white?.name}</b> - <b>{nextMatch?.blue?.name}</b>
    </p>
  </div>
{:else}
  <div class:spacerView={view}></div>
{/if}

<style lang='postcss'>
  @reference "tailwindcss";

  .spacerView {
    @apply h-18;
  }
</style>
