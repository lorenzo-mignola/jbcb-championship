<script lang="ts">
  import type { Rounds } from '$lib/types/Rounds';
  import RoundBrackets from './round-brackets.svelte';

  export let rounds: Rounds;
  export let showRepechage: boolean | undefined = true;

  const winnerRounds = rounds.map(({ winner }) => winner);
  const loserRounds = rounds
    .flatMap(({ loser, repechage }) => [
      loser,
      repechage.map((repechageMatch) => ({ ...repechageMatch, offset: true }))
    ])
    .filter((matches) => matches.length > 0);
</script>

<div class="flex overflow-auto">
  <!-- winner -->
  {#each winnerRounds as matches}
    <div class="flex flex-col justify-center">
      <RoundBrackets {matches} />
    </div>
  {/each}
</div>

{#if showRepechage}
  <hr />
  <p class="font-bold mt-3 ml-4">Ripescaggio</p>
  <div class="flex overflow-auto">
    <!-- loserRounds -->
    {#each loserRounds as matches}
      <div class="flex flex-col justify-center">
        <RoundBrackets {matches} />
      </div>
    {/each}
  </div>
{/if}
