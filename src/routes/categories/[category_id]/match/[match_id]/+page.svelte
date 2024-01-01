<script lang="ts">
  import Footer from '$lib/components/match/footer.svelte';
  import Judoka from '$lib/components/match/judoka/judoka.svelte';
  import PlayPauseButton from '$lib/components/play-pause-button.svelte';
  import SaveButton from '$lib/components/save-button.svelte';
  import { match } from '$lib/store/$match';
  import { setDuration, timer } from '$lib/store/$timer';
  import { onDestroy } from 'svelte';
  import { localStorageCategoryName } from '../../../../../lib/store/$localStorageMatch';
  import Timer from './timer.svelte';

  export let data;
  $: ({ category, match: matchData, nextMatch } = data);

  $: match.set(matchData);
  $: localStorageCategoryName.set(category?.name || '');

  $: {
    if (category?.duration) {
      setDuration(category.duration);
      timer.set(category.duration);
    }
  }

  onDestroy(() => {
    match.set(undefined);
  });

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
