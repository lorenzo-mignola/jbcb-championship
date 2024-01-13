<script lang="ts" strictEvents>
  import Pause from '$lib/icons/pause.svelte';
  import { isPlaying } from '$lib/store/$timer';
  import { onDestroy, onMount } from 'svelte';
  import type { JudokaType } from '../../types/match.type';
  import { resetOsaekomi, startOsaekomi, stopOsaekomi } from './$osaekomi-timer';

  export let view: boolean;
  export let timer: number;
  export let type: JudokaType | null;

  onMount(() => {
    startOsaekomi();
  });

  onDestroy(() => {
    resetOsaekomi();
  });

  const stopTimers = () => {
    isPlaying.set(false);
    stopOsaekomi();
  };
</script>

<div
  class="card p-2 my-2 text-center shadow-md"
  class:judoka-blue={type === 'blue'}
  class:judoka-white={type === 'white'}
>
  {#if !view}
    Osae-komi
  {/if}
  <p class="text-timer text-xl" class:view>{timer}</p>
</div>

{#if $isPlaying}
  <button
    class="btn-icon md:btn-icon-sm variant-ghost-surface mx-2"
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
  .view {
    @apply text-4xl p-3;
  }
</style>
