const defaultDuration = 4 * 60 * 10;

class TimerState {
  timer = $state(defaultDuration);
  isPlaying = $state(false);
  isGoldenScore = $state(false);
  duration = $state(defaultDuration);
  interval: NodeJS.Timeout | null = null;
}

export const timerState = new TimerState();
