<script>
  import { oseakomiType } from '$lib/components/osaekomi/$osaekomi-timer';
  import { getMin, getSec, isGoldenScore, timer } from '$lib/store/$timer';
  import OsaekomiTimer from '../../../../../lib/components/osaekomi/osaekomi-timer.svelte';

  $: min = getMin($timer);
  $: sec = getSec($timer);
</script>

<div class="flex items-center" class:flex-row-reverse={$oseakomiType === 'blue'}>
  {#if $oseakomiType}
    <OsaekomiTimer />
  {/if}
  <div class="text-timer w-full text-center p-4 text-4xl md:text-5xl my-5 font-bold">
    {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
  </div>
  {#if $isGoldenScore}
    <div class="card p-2 variant-ghost-warning text-xl md:text-2xl mb-1">GS</div>
  {/if}
</div>
