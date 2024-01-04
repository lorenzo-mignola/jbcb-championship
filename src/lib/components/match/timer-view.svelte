<script lang="ts" strictEvents>
  import type { JudokaType } from '../../types/match.type';
  import OsaekomiTimer from '../osaekomi/osaekomi-timer.svelte';

  export let oseakomiType: JudokaType | null;
  export let min: number;
  export let sec: number;
  export let isGoldenScore: boolean;
</script>

<div class="flex items-center" class:flex-row-reverse={oseakomiType === 'blue'}>
  {#if oseakomiType}
    <OsaekomiTimer />
  {/if}
  <div class="text-timer w-full text-center p-4 text-4xl md:text-5xl my-5 font-bold">
    {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
  </div>
  {#if isGoldenScore}
    <div class="card p-2 variant-ghost-warning text-xl md:text-2xl mb-1">GS</div>
  {/if}
</div>
