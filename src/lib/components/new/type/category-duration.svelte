<script>
  import Add from '$lib/icons/add.svelte';
  import Subtract from '$lib/icons/subtract.svelte';
  import { duration } from '$lib/store/$duration';
  import { formatTimeString } from '$lib/store/$timer';
  const step = 30 * 10;
  const min = 1 * 60 * 10;
  const max = 4 * 60 * 10;

  function add() {
    if ($duration < max) {
      duration.update((d) => d + step);
    }
  }

  function subtract() {
    if ($duration > min) {
      duration.update((d) => d - step);
    }
  }
</script>

<div>
  <h2 class="h3">Durata incontro</h2>
  <div class="flex gap-3 items-center">
    <input type="range" bind:value={$duration} {max} {min} {step} />
    <span>
      <button
        type="button"
        class="btn-icon btn-icon-sm variant-soft-surface"
        on:click|preventDefault={subtract}
        disabled={$duration === min}><Subtract /></button
      >
    </span>
    <p class="text-xl card variant-ringed-surface p-2">{formatTimeString($duration)}</p>
    <span>
      <button
        type="button"
        class="btn-icon btn-icon-sm variant-soft-surface"
        on:click|preventDefault={add}
        disabled={$duration === max}><Add /></button
      >
    </span>
  </div>
</div>
