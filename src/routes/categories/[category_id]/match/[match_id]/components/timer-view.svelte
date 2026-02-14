<script lang='ts'>
  import type { JudokaType } from '../../../../../../lib/types/match.type';

  import OsaekomiTimer from './osaekomi-timer.svelte';

  interface Props {
    isGoldenScore: boolean;
    min: number;
    oseakomiType: JudokaType | null;
    sec: number;
    timer: number;
    view?: boolean;
  }

  const {
    isGoldenScore,
    min,
    oseakomiType,
    sec,
    timer,
    view = false,
  }: Props = $props();
</script>

<div class='flex items-center' data-testid='timer'>
  {#if oseakomiType}
    <OsaekomiTimer {timer} type={oseakomiType} {view} />
  {/if}
  <div
    class='
      text-timer my-5 w-full p-4 text-center text-4xl font-bold
      md:text-5xl
    '
    class:text-9xl!={view}
  >
    {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
  </div>
  {#if isGoldenScore}
    <div
      class='
        mb-1 hidden card border border-warning-500 preset-tonal-warning p-2
        text-center text-xl
        sm:block
        md:text-2xl
      '
      data-testid='golden-score-badge'
    >
      Golden Score
    </div>
    <div
      class='
        mb-1 block card border border-warning-500 preset-tonal-warning p-2
        text-xl
        md:hidden md:text-2xl
      '
    >
      GS
    </div>
  {/if}
</div>
