<script lang="ts" strictEvents>
  import type { JudokaType } from '../../types/match.type';
  import OsaekomiTimer from '../osaekomi/osaekomi-timer.svelte';

  export let oseakomiType: JudokaType | null;
  export let timer: number;
  export let min: number;
  export let sec: number;
  export let isGoldenScore: boolean;
  export let view: boolean = false;
</script>

<div class="flex items-center" data-testid="timer">
  {#if oseakomiType}
    <OsaekomiTimer {timer} type={oseakomiType} {view} />
  {/if}
  <div
    class="text-timer my-5 w-full p-4 text-center text-4xl font-bold md:text-5xl"
    class:!text-9xl={view}
  >
    {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
  </div>
  {#if isGoldenScore}
    <div
      class="card variant-ghost-warning mb-1 hidden p-2 text-center text-xl sm:block md:text-2xl"
      data-testid="golden-score-badge"
    >
      Golden Score
    </div>
    <div class="card variant-ghost-warning mb-1 block p-2 text-xl md:hidden md:text-2xl">GS</div>
  {/if}
</div>
