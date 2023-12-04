<script>
  import { onDestroy, onMount } from 'svelte';
  import { oseakomiType, startOsaekomi, stopOsaekomi, timerOsaekomi } from './$osaekomi-timer';

  onMount(() => {
    startOsaekomi();
  });

  onDestroy(() => {
    stopOsaekomi();
  });
</script>

<div
  class="card p-2 m-2 text-center shadow-xl"
  class:judoka-blue={$oseakomiType === 'blue'}
  class:judoka-white={$oseakomiType === 'white'}
>
  Osae-komi
  <p class="text-timer text-xl">{$timerOsaekomi}</p>
</div>

<style>
  div {
    text-wrap: nowrap;
  }
</style>
