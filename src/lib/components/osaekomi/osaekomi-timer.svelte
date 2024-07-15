<script lang="ts" strictEvents>
  import { onDestroy, onMount } from 'svelte';

  import Pause from '$lib/icons/pause.svelte';
  import { isPlaying } from '$lib/store/$timer';

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
  class="card my-2 p-2 text-center shadow-md"
  class:judoka-blue={type === 'blue'}
  class:judoka-white={type === 'white'}
  data-testid={`timer-osaekomi-${type}`}
>
  {#if !view}
    Osae-komi
  {/if}
  <p class="text-timer text-xl" class:view>{timer}</p>
</div>

{#if $isPlaying}
  <button
    class="variant-ghost-surface btn-icon mx-2 md:btn-icon-sm"
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
    @apply p-3 text-4xl;
  }
</style>
