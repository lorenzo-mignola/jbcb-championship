<script>
  import TimerView from '$lib/components/match/timer-view.svelte';
  import { oseakomiType, timerOsaekomi } from '$lib/components/osaekomi/$osaekomi-timer';
  import { getMin, getSec, isGoldenScore, timer } from '$lib/store/$timer';

  $: min = getMin($timer);
  $: sec = getSec($timer);
</script>

<TimerView
  isGoldenScore={$isGoldenScore}
  {min}
  oseakomiType={$oseakomiType}
  {sec}
  timer={$timerOsaekomi}
/>
