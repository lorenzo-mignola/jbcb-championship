<script lang="ts">
  import { onDestroy } from 'svelte';
  import Play from '../../../../../icons/play.svelte';
  import Stop from '../../../../../icons/stop.svelte';
  import { match } from './$match';
  import { isPlaying, reset, togglePlay } from './$timer';

  $: disabled = Boolean($match?.winner);

  onDestroy(() => reset());
</script>

<button
  class="btn variant-filled p-4 text-4xl md:text-8xl w-full flex justify-center text-white"
  class:play={!$isPlaying}
  class:stop={$isPlaying}
  on:click={() => togglePlay()}
  {disabled}
>
  <div>
    {#if $isPlaying}
      <Stop />
    {:else}
      <Play />
    {/if}
  </div>
</button>

<style lang="postcss">
  button:focus {
    outline: 0;
  }
  .play {
    @apply bg-primary-500 dark:bg-primary-600;
  }
  .stop {
    @apply bg-surface-500;
  }
</style>
