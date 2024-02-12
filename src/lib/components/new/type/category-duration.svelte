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
  <div class="flex items-center gap-3">
    <input {max} {min} {step} type="range" bind:value={$duration} />
    <span>
      <button
        class="variant-soft-surface btn-icon btn-icon-sm"
        disabled={$duration === min}
        type="button"
        on:click|preventDefault={subtract}><Subtract /></button
      >
    </span>
    <p class="card variant-ringed-surface p-2 text-xl">{formatTimeString($duration)}</p>
    <span>
      <button
        class="variant-soft-surface btn-icon btn-icon-sm"
        disabled={$duration === max}
        type="button"
        on:click|preventDefault={add}><Add /></button
      >
    </span>
  </div>
</div>
