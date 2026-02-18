<script lang='ts'>
  import type { MatchJudoka, Points } from '$lib/types/match.type';

  import { pointsToString } from '$lib/state/match/judoka-points-state.svelte';

  interface Props {
    athlete: MatchJudoka | undefined;
    points: Points;
  }

  const { athlete, points }: Props = $props();
</script>

<div class='flex justify-between'>
  <span>{athlete?.name ?? '-'}</span>
  {#if athlete}
    <span>
      {#if athlete.shido === 3}
        <span class='mr-1' data-testid='shido-red'>🟥</span>
      {:else}
        {#each { length: athlete.shido } as _}
          <span class='mr-1' data-testid='shido-yellow'>🟨</span>
        {/each}
      {/if}
      <span class='local-points' data-testid='judoka-score'>{pointsToString(points)}</span>
    </span>
  {/if}
</div>

<style lang='postcss'>
  .local-points {
    letter-spacing: 0.8rem;
    font-family: 'Azeret Mono', ui-monospace, monospace;
  }
</style>
