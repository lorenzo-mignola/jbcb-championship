<script lang="ts">
  import type { MatchJudoka } from '../../../types/Match';

  export let athlete: MatchJudoka | undefined;
  export let points: number;
</script>

<div class="flex justify-between">
  <span>{athlete?.name ?? '-'}</span>
  {#if athlete}
    <span>
      {#if athlete.shido === 3}
        <span class="mr-1">🟥</span>
      {:else}
        <!--  eslint-disable-next-line @typescript-eslint/no-unused-vars -->
        {#each { length: athlete.shido } as _}
          <span class="mr-1">🟨</span>
        {/each}
      {/if}
      <span class="points">{points}</span>
    </span>
  {/if}
</div>

<style>
  .points {
    letter-spacing: 0.8rem;
  }
</style>
