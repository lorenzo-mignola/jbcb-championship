<script>
  import TimerView from '$lib/components/match/timer-view.svelte';
  import { oseakomiType, timerOsaekomi } from '$lib/components/osaekomi/$osaekomi-timer';
  import { getMin, getSec, isGoldenScore, timer } from '$lib/store/$timer';
  import WakeLock from '$lib/utils/wake-lock.svelte';

  $: min = getMin($timer);
  $: sec = getSec($timer);
</script>

<WakeLock />
<TimerView
  isGoldenScore={$isGoldenScore}
  {min}
  oseakomiType={$oseakomiType}
  {sec}
  timer={$timerOsaekomi}
/>
