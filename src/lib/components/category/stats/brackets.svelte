<script lang="ts" strictEvents>
  import type { Rounds } from '$lib/types/rounds.type';
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
  {#each winnerRounds as matches, index (index)}
    <div class="flex flex-col justify-center">
      <RoundBrackets goldMatch={index === winnerRounds.length - 1} {matches} />
    </div>
  {/each}
</div>

{#if showRepechage}
  <hr />
  <p class="font-bold mt-3 ml-4">Ripescaggio</p>
  <div class="flex overflow-auto">
    <!-- loserRounds -->
    {#each loserRounds as matches, index (index)}
      <div class="flex flex-col justify-center">
        <RoundBrackets bronzeMatch={index === loserRounds.length - 1} {matches} />
      </div>
    {/each}
  </div>
{/if}
