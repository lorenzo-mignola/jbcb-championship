<script lang='ts'>
  import { Slider } from '@skeletonlabs/skeleton-svelte';
  import Add from '$lib/icons/add.svelte';
  import Subtract from '$lib/icons/subtract.svelte';
  import { durationState } from '$lib/state/duration-state.svelte';
  import { formatTimeString } from '$lib/utils/timer-utils';

  const step = 30 * 10;
  const min = 1 * 60 * 10;
  const max = 4 * 60 * 10;

  function add() {
    if (durationState.duration < max) {
      durationState.duration += step;
    }
  }

  function subtract() {
    if (durationState.duration > min) {
      durationState.duration -= step;
    }
  }
</script>

<div>
  <h2 class='h4'>Durata incontro</h2>
  <div class='flex items-center gap-3'>
    <Slider
      value={[durationState.duration]}
      onValueChange={e => (durationState.duration = e.value[0])}
      min={min}
      max={max}
      step={step}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider>
    <span>
      <button
        class='btn-icon btn-icon-sm preset-tonal-surface'
        disabled={durationState.duration === min}
        type='button'
        onclick={subtract}><Subtract /></button
      >
    </span>
    <p class='card preset-outlined-surface-500 p-2'>
      {formatTimeString(durationState.duration)}
    </p>
    <span>
      <button
        class='btn-icon btn-icon-sm preset-tonal-surface'
        disabled={durationState.duration === max}
        type='button'
        onclick={add}><Add /></button
      >
    </span>
  </div>
</div>
