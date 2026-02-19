<script lang='ts'>
  import { onDestroy } from 'svelte';

  import TimerShortcut from '$lib/components/shortcuts/timer-shortcut.svelte';
  import Stop from '$lib/icons/pause.svelte';
  import Play from '$lib/icons/play.svelte';
  import { matchState } from '$lib/state/match/match-state.svelte';
  import { osaekomiState } from '$lib/state/match/osaekomi-state.svelte';
  import { timerState } from '$lib/state/match/timer-state.svelte';

  import { reset } from '../../../edit/reset';

  const disabled = $derived(Boolean(matchState.match?.winner) || osaekomiState.isExtraTime);

  onDestroy(() => reset());
</script>

<button
  class='
    btn flex w-full justify-center preset-filled p-4 text-4xl text-white
    md:text-8xl
    dark:text-gray-100
  '
  class:play={!timerState.isPlaying}
  class:stop={timerState.isPlaying}
  data-testid='play-pause'
  {disabled}
  type='button'
  onclick={(e) => {
    (e.currentTarget as HTMLButtonElement).blur();
    timerState.togglePlay();
  }}
>
  <div>
    {#if timerState.isPlaying}
      <Stop />
    {:else}
      <Play />
    {/if}
  </div>
</button>

<TimerShortcut callback={() => timerState.togglePlay()} {disabled} />

<style>
  button:focus {
    outline: 0;
  }
</style>
