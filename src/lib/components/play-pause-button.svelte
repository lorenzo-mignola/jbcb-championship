<script lang="ts" strictEvents>
  import { onDestroy } from 'svelte';

  import Stop from '../icons/pause.svelte';
  import Play from '../icons/play.svelte';
  import TimerShortcut from '../shortcuts/timer-shortcut.svelte';
  import { match } from '../store/$match';
  import { isPlaying, reset, togglePlay } from '../store/$timer';
  import { isExtraTime } from './osaekomi/$osaekomi-timer';

  $: disabled = Boolean($match?.winner) || $isExtraTime;

  onDestroy(() => reset());
</script>

<button
  class="variant-filled btn flex w-full justify-center p-4 text-4xl text-white dark:text-gray-100 md:text-8xl"
  class:play={!$isPlaying}
  class:stop={$isPlaying}
  data-testid="play-pause"
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

<TimerShortcut callback={togglePlay} {disabled} />

<style lang="postcss">
  button:focus {
    outline: 0;
  }
  .play {
    @apply bg-primary-500 dark:bg-primary-600;
  }
  .stop {
    @apply bg-surface-600 dark:bg-surface-500;
  }
</style>
