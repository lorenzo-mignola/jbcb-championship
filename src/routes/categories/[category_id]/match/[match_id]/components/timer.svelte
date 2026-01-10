<script>
  import { osaekomiState } from '$lib/state/match/osaekomi-state.svelte';
  import { timerState } from '$lib/state/match/timer-state.svelte';
  import { getMinutes, getSeconds } from '$lib/utils/timer-utils';

  import TimerView from './timer-view.svelte';
  import WakeLock from './wake-lock.svelte';

  const min = $derived(getMinutes(timerState.timer));
  const sec = $derived(getSeconds(timerState.timer));
</script>

<WakeLock />
<TimerView
  isGoldenScore={timerState.isGoldenScore}
  {min}
  oseakomiType={osaekomiState.type}
  {sec}
  timer={osaekomiState.timer}
/>
