<script lang="ts" strictEvents>
  import type { MatchJudoka } from '../../../types/match.type';

  interface Props {
    athlete: MatchJudoka | undefined;
    points: number;
  }

  let { athlete, points }: Props = $props();
</script>

<div class="flex justify-between">
  <span>{athlete?.name ?? '-'}</span>
  {#if athlete}
    <span>
      {#if athlete.shido === 3}
        <span class="mr-1" data-testid="shido-red">🟥</span>
      {:else}
        <!--  eslint-disable-next-line @typescript-eslint/no-unused-vars eslint-disable-next-line svelte/require-each-key no-unused-vars -->
        {#each { length: athlete.shido } as _}
          <span class="mr-1" data-testid="shido-yellow">🟨</span>
        {/each}
      {/if}
      <span class="points" data-testid="judoka-score">{points}</span>
    </span>
  {/if}
</div>

<style lang="postcss">
  .points {
    letter-spacing: 0.8rem;
  }
</style>
