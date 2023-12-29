<script>
  import { formatTimeString } from '$lib/store/$timer';

  let duration = 4 * 60 * 10;
</script>

<div>
  <h2 class="h2">Durata incontro</h2>
  <div class="flex gap-3">
    <input type="range" bind:value={duration} max={4 * 60 * 10} min={1 * 60 * 10} step={30 * 10} />
    <p class="text-xl card variant-ringed-surface p-2">{formatTimeString(duration)}</p>
  </div>
</div>
