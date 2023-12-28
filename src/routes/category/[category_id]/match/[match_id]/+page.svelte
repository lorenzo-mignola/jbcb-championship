<script lang="ts">
  import { onDestroy } from 'svelte';
  import Back from '../../../../../icons/back.svelte';
  import Judoka from '../../../../../lib/components/match/judoka/judoka.svelte';
  import PlayPauseButton from '../../../../../lib/components/play-pause-button.svelte';
  import SaveButton from '../../../../../lib/components/save-button.svelte';
  import { match } from '../../../../../lib/store/$match';
  import Timer from './timer.svelte';

  export let data;
  $: ({ category, match: matchData } = data);

  $: match.set(matchData);

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

<footer class="py-14">
  <a href={`/category/${category?.id}`} class="btn btn-sm variant-soft-surface">
    <span><Back /></span>
    <span>Visualizza categoria</span>
  </a>
</footer>
