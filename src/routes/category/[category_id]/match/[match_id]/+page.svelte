<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { getOpponentType } from '../../../../../lib/utils/judoka';
  import { match } from './$match';
  import { isPlaying, timer, togglePlay } from './$timer';
  import Judoka from './judoka/judoka.svelte';
  import PlayPauseButton from './play-pause-button.svelte';
  import SaveButton from './save-button.svelte';
  import Timer from './timer.svelte';

  export let data;
  $: ({ category, match: matchData } = data);

  onMount(() => {
    if (matchData) {
      match.set(matchData);
    }
  });

  onDestroy(() => {
    match.set(undefined);
  });

  function setWinner(type: 'white' | 'blue') {
    if (!$match) {
      return;
    }
    match.set({
      ...$match,
      winner: type,
      finalTime: $timer
    });
    if ($isPlaying) {
      togglePlay();
    }
  }

  function setDisqualification(type: 'white' | 'blue') {
    if (!$match) {
      return;
    }
    const opponent = getOpponentType(type);
    if (opponent && $match[opponent]) {
      match.set({
        ...$match,
        [opponent]: {
          ...$match[opponent],
          ippon: 1
        },
        winner: opponent,
        finalTime: $timer
      });
    }
    if ($isPlaying) {
      togglePlay();
    }
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
    <Judoka {type} {setWinner} {setDisqualification} />
  {/each}
{/if}

<Timer />

<PlayPauseButton />

{#if category?.id && match}
  <SaveButton categoryId={category.id} />
{/if}
