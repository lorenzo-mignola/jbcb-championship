<script lang="ts" strictEvents>
  import { onDestroy } from 'svelte';
  import Stop from '../icons/pause.svelte';
  import Play from '../icons/play.svelte';
  import { match } from '../store/$match';
  import { isPlaying, reset, togglePlay } from '../store/$timer';

  $: disabled = Boolean($match?.winner);

  onDestroy(() => reset());
</script>

<button
  class="btn variant-filled p-4 text-4xl md:text-8xl w-full flex justify-center text-white"
  class:play={!$isPlaying}
  class:stop={$isPlaying}
  {disabled}
  type="button"
  on:click|preventDefault={() => togglePlay()}
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
