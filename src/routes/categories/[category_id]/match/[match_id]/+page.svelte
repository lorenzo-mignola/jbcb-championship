<script lang="ts" strictEvents>
  import Footer from '$lib/components/match/footer.svelte';
  import Judoka from '$lib/components/match/judoka/judoka.svelte';
  import Timer from '$lib/components/match/timer.svelte';
  import PlayPauseButton from '$lib/components/play-pause-button.svelte';
  import SaveButton from '$lib/components/save-button.svelte';
  import { localStorageCategoryName } from '$lib/store/$local-storage-match';
  import { match } from '$lib/store/$match';
  import { setDuration, timer } from '$lib/store/$timer';
  import { onDestroy } from 'svelte';

  export let data;
  $: ({ category, match: matchData, nextMatch, isMedalMatch } = data);

  $: match.set(matchData);
  $: localStorageCategoryName.set(category?.name || '');

  $: if (category?.duration) {
    setDuration(category.duration);
    timer.set(category.duration);
  }

  onDestroy(() => {
    match.set(undefined);
  });

  const athleteType = ['white', 'blue'] as const;
</script>

<div class="text-xl flex items-center gap-3 justify-between">
  {#if category?.name}
    {category.name}
  {:else}
    &nbsp;
  {/if}

  {#if isMedalMatch}
    <span
      class="badge text-2xl md:text-4xl border-4 border-warning-600 shadow-warning-600 shadow-md pulse"
      title="Incontro valido per l'assegnazione delle medaglie">🏅</span
    >
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
