<script lang="ts" strictEvents>
  import Footer from '$lib/components/match/footer.svelte';
  import Judoka from '$lib/components/match/judoka/judoka.svelte';
  import Timer from '$lib/components/match/timer.svelte';
  import PlayPauseButton from '$lib/components/play-pause-button.svelte';
  import SaveButton from '$lib/components/save-button.svelte';
  import {
    getMatchType,
    localStorageCategoryName,
    localStorageMatchType,
    localStorageNextMatch
  } from '$lib/store/$local-storage-match';
  import { match } from '$lib/store/$match';
  import { setDuration, timer } from '$lib/store/$timer';
  import { onDestroy } from 'svelte';

  export let data;
  $: ({ category, match: matchData, nextMatch, isMedalMatch } = data);

  $: match.set(matchData);
  $: isRepechage = $match?.isRepechage || false;
  $: localStorageMatchType.set(getMatchType(isMedalMatch, isRepechage));
  $: localStorageCategoryName.set(category?.name || '');
  $: localStorageNextMatch.update(() => {
    if (!nextMatch) {
      return {
        id: '',
        finalTime: null,
        goldenScore: null
      };
    }
    return {
      id: nextMatch.id,
      white: nextMatch.white,
      blue: nextMatch.blue
    };
  });

  $: if (category?.duration) {
    setDuration(category.duration);
    timer.set(category.duration);
  }

  onDestroy(() => {
    match.set(undefined);
  });

  const athleteType = ['white', 'blue'] as const;
</script>

<div class="flex h-16 max-h-16 items-center justify-between gap-3 text-xl">
  {#if category?.name}
    {category.name}
  {:else}
    &nbsp;
  {/if}

  {#if isMedalMatch}
    <span
      class="pulse badge border-4 border-warning-600 text-2xl shadow-md shadow-warning-600 md:text-3xl"
      title="Incontro valido per l'assegnazione delle medaglie">🏅</span
    >
  {/if}
  {#if isRepechage && !isMedalMatch}
    <span class="text-base italic text-gray-700 dark:text-gray-300">Ripescaggio</span>
  {/if}
</div>

{#if $match}
  {#each athleteType as type (type)}
    <Judoka {type} />
  {/each}
{/if}

<Timer />

<PlayPauseButton />

{#if category?.id && match}
  <SaveButton categoryId={category.id} />
{/if}

{#if category?.id}
  <Footer categoryId={category.id} {nextMatch} />
{/if}

<style lang="postcss">
  .pulse {
    animation: pulse-animation 3s infinite ease;
  }

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
