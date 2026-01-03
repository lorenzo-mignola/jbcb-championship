<script lang='ts'>
  import type { Rounds } from '$lib/types/rounds.type';

  import RoundBrackets from './round-brackets.svelte';

  interface Props {
    rounds: Rounds;
    showRepechage?: boolean | undefined;
  }

  const { rounds, showRepechage = true }: Props = $props();

  const winnerRounds = $derived(rounds.map(({ winner }) => winner));
  const loserRounds = $derived(rounds
    .flatMap(({ loser, repechage }) => [
      loser,
      repechage.map(repechageMatch => ({ ...repechageMatch, offset: true })),
    ])
    .filter(matches => matches.length > 0));
</script>

<div class='flex overflow-auto'>
  <!-- winner -->
  {#each winnerRounds as matches, index (index)}
    <div class='flex flex-col justify-center'>
      <RoundBrackets goldMatch={index === winnerRounds.length - 1} {matches} />
    </div>
  {/each}
</div>

{#if showRepechage}
  <hr />
  <p class='mt-3 ml-4 font-bold'>Ripescaggio</p>
  <div class='flex overflow-auto'>
    <!-- loserRounds -->
    {#each loserRounds as matches, index (index)}
      <div class='flex flex-col justify-center'>
        <RoundBrackets bronzeMatch={index === loserRounds.length - 1} {matches} />
      </div>
    {/each}
  </div>
{/if}
