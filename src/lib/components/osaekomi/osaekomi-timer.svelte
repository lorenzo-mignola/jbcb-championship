<script>
  import { onDestroy, onMount } from 'svelte';
  import {
    setDurationOsaekomi,
    startOsaekomi,
    stopOsaekomi,
    timerOsaekomi
  } from './$osaekomi-timer';

  onMount(() => {
    setDurationOsaekomi(20);
    startOsaekomi();
  });

  onDestroy(() => {
    stopOsaekomi();
  });
</script>

<div class="card variant-ringed p-2 m-2 text-center">
  Osae-komi
  <p class="text-timer text-xl">{$timerOsaekomi}</p>
</div>

<style>
  div {
    text-wrap: nowrap;
  }
</style>
