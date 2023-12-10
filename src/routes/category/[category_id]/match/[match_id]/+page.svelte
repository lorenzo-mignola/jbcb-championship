<script lang="ts">
  import { getOpponentType } from '../../../../../lib/utils/judoka';
  import { timer } from './$timer';
  import Judoka from './judoka/judoka.svelte';
  import PlayPauseButton from './play-pause-button.svelte';
  import SaveButton from './save-button.svelte';
  import Timer from './timer.svelte';

  export let data;
  $: ({ category, match } = data);

  function setWinner(type: 'white' | 'blue') {
    if (!match) {
      return;
    }
    match!.winner = type;
    match.finalTime = $timer;
  }

  function setDisqualification(type: 'white' | 'blue') {
    if (!match) {
      return;
    }
    const opponent = getOpponentType(type);
    if (opponent) {
      match![opponent].ippon = 1;
      match!.winner = opponent;
    }
    match.finalTime = $timer;
  }

  const athleteType = ['white', 'blue'] as const;
</script>

<div class="text-xl">
  {#if category?.name}
    {category.name}
  {:else}
    &nbsp;
  {/if}
</div>

{#if match}
  {#each athleteType as type}
    <Judoka
      {type}
      athlete={match[type]}
      end={Boolean(match.winner)}
      {setWinner}
      {setDisqualification}
    />
  {/each}
{/if}

<Timer />

<PlayPauseButton disabled={Boolean(match?.winner)} />

{#if Boolean(match?.winner) && category?.id && match}
  <SaveButton categoryId={category.id} {match} />
{/if}
