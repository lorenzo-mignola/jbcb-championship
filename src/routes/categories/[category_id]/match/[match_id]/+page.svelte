<script lang='ts'>
  import {
    localStorageMatchState,
  } from '$lib/state/match/local-storage-match-state.svelte';
  import { matchState } from '$lib/state/match/match-state.svelte.js';
  import { timerState } from '$lib/state/match/timer-state.svelte.js';

  import Footer from './components/footer.svelte';
  import PlayPauseButton from './components/play-pause-button.svelte';
  import SaveButton from './components/save-button.svelte';
  import Timer from './components/timer.svelte';

  const { data } = $props();
  const { category, isMedalMatch, match: matchData, nextMatch } = $derived(data);

  $effect(() => {
    matchState.match = matchData;

    return () => {
      matchState.match = undefined;
    };
  });

  const isRepechage = $derived(matchState.match?.isRepechage || false);

  $effect(() => {
    localStorageMatchState.initialize({ category, isMedalMatch, isRepechage, nextMatch });
  });

  $effect(() => {
    if (category?.duration) {
      timerState.duration = category.duration;
    }
  });

// const athleteType = ['white', 'blue'] as const;
</script>

<div class='flex h-16 max-h-16 items-center justify-between gap-3 text-xl'>
  {#if category?.name}
    {category.name}
  {/if}

  {#if isMedalMatch}
    <span
      class='
        badge animate-pulse border-4 border-warning-600 text-2xl shadow-md
        shadow-warning-600
        md:text-3xl
      '
      title="Incontro valido per l'assegnazione delle medaglie">🏅</span
    >
  {/if}
  {#if isRepechage && !isMedalMatch}
    <span class='
      text-base text-gray-700 italic
      dark:text-gray-300
    '>Ripescaggio</span>
  {/if}
</div>

<!-- {#if matchData}
  {#each athleteType as type (type)}
    <Judoka {type} />
  {/each}
{/if} -->

<Timer />

<PlayPauseButton />

{#if category?.id && matchData}
  <SaveButton categoryId={category.id} />
{/if}

{#if category?.id}
  <Footer categoryId={category.id} {nextMatch} />
{/if}

<style>
  @keyframes pulse-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
