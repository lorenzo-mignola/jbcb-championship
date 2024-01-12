<script>
  import Pause from '$lib/icons/pause.svelte';
  import { isPlaying } from '$lib/store/$timer';
  import { onDestroy, onMount } from 'svelte';
  import { oseakomiType, startOsaekomi, stopOsaekomi, timerOsaekomi } from './$osaekomi-timer';

  onMount(() => {
    startOsaekomi();
  });

  onDestroy(() => {
    stopOsaekomi();
  });

  const stopTimers = () => {
    isPlaying.set(false);
    stopOsaekomi();
  };
</script>

<div
  class="card p-2 m-2 text-center shadow-xl"
  class:judoka-blue={$oseakomiType === 'blue'}
  class:judoka-white={$oseakomiType === 'white'}
>
  Osae-komi
  <p class="text-timer text-xl">{$timerOsaekomi}</p>
</div>

{#if $isPlaying}
  <button
    class="btn-icon md:btn-icon-sm variant-ghost-surface"
    type="button"
    on:click|preventDefault={stopTimers}
  >
    <Pause />
  </button>
{/if}

<style lang="postcss">
  div {
    text-wrap: nowrap;
  }
</style>
