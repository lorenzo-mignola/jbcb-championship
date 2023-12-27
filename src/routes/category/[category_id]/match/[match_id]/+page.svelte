<script lang="ts">
  import { onDestroy } from 'svelte';
  import { match } from './$match';
  import Judoka from './judoka/judoka.svelte';
  import PlayPauseButton from './play-pause-button.svelte';
  import SaveButton from './save-button.svelte';
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
