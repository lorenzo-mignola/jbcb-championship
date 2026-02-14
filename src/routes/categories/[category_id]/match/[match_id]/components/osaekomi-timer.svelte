<script lang='ts'>
  import type { JudokaType } from '$lib/types/match.type';

  import Pause from '$lib/icons/pause.svelte';
  import { osaekomiState } from '$lib/state/match/osaekomi-state.svelte';
  import { timerState } from '$lib/state/match/timer-state.svelte';

  interface Props {
    timer: number;
    type: JudokaType | null;
    view: boolean;
  }

  const { timer, type, view }: Props = $props();

  $effect(() => {
    osaekomiState.startOsaekomi();

    return () => {
      osaekomiState.resetOsaekomi();
    };
  });

  $effect(() => {
    if (type) {
      osaekomiState.watchOsaekomi(type);
    }
  });

  const stopAllTimers = () => {
    osaekomiState.stopOsaekomi();
    timerState.freezeTimer();
  };
</script>

<div
  class='my-2 card p-2 text-center shadow-md'
  class:judoka-blue={type === 'blue'}
  class:judoka-white={type === 'white'}
  data-testid={`timer-osaekomi-${type}`}
>
  {#if !view}
    Osae-komi
  {/if}
  <p class='text-timer text-xl' class:local-view={view}>{timer}</p>
</div>

{#if osaekomiState.isPlaying}
  <button
    class='
      mx-2 btn-icon border border-surface-500 preset-tonal-surface
      md:btn-icon-sm
    '
    type='button'
    onclick={(e) => {
      e.preventDefault();
      stopAllTimers();
    }}
  >
    <Pause />
  </button>
{/if}

<style lang='postcss'>
  @reference "tailwindcss";

  div {
    text-wrap: nowrap;
  }
  .local-view {
    @apply p-3 text-4xl;
  }
</style>
