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

<div class="flex items-center">
  {#if oseakomiType}
    <OsaekomiTimer {timer} type={oseakomiType} {view} />
  {/if}
  <div
    class="text-timer w-full text-center p-4 text-4xl md:text-5xl my-5 font-bold"
    class:!text-7xl={view}
  >
    {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
  </div>
  {#if isGoldenScore}
    <div
      class="card p-2 variant-ghost-warning text-xl md:text-2xl mb-1 hidden sm:block text-center"
    >
      Golden Score
    </div>
    <div class="card p-2 variant-ghost-warning text-xl md:text-2xl mb-1 md:hidden block">GS</div>
  {/if}
</div>
