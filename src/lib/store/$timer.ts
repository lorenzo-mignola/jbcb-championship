import { get, writable } from 'svelte/store';
import { isExtraTime, oseakomiType, resetOsaekomi } from '../components/osaekomi/$osaekomi-timer';
import { localStorageTime } from './$local-storage-match';

const defaultDuration = 4 * 60 * 10;
const duration = writable(defaultDuration);
export const timer = writable(defaultDuration);
export const isPlaying = writable(false);
export const isGoldenScore = writable(false);

let interval: NodeJS.Timeout | null = null;

const play = () => {
  if (get(timer) === 0) {
    isGoldenScore.set(true);
  }
  isPlaying.set(true);

  interval = setInterval(() => {
    if (get(isPlaying)) {
      const ascOrDesc = get(isGoldenScore) ? 1 : -1;
      timer.update((time) => time + ascOrDesc);
    }
  }, 100);
};

export const stop = () => {
  isPlaying.set(false);
};

export const timerWatch = () => {
  const unsubscribeTimer = timer.subscribe(($timer) => {
    if ($timer <= 0) {
      isPlaying.set(false);
      isExtraTime.set(Boolean(get(oseakomiType)));
    }
  });

  const unsubscribePlay = isPlaying.subscribe(($isPlaying) => {
    if (!$isPlaying && interval !== null) {
      clearInterval(interval);
    }
  });

  const unsubscribeStorage = timer.subscribe(($timer) => {
    // update only every 100 ms
    if ($timer % 10 === 0) {
      localStorageTime.set($timer);
    }
  });

  return () => {
    unsubscribeTimer();
    unsubscribePlay();
    unsubscribeStorage();
  };
};

export const togglePlay = () => {
  if (get(isPlaying)) {
    stop();
    return;
  }
  play();
};

export const setDuration = (categoryDuration: number = defaultDuration) => {
  duration.set(categoryDuration);
};

export const reset = () => {
  isPlaying.set(false);
  isGoldenScore.set(false);
  timer.set(get(duration) || defaultDuration);
  resetOsaekomi();
  if (interval !== null) {
    clearInterval(interval);
  }
};

export const getMin = (t: number) => Math.floor(t / (60 * 10));
export const getSec = (t: number) => Math.floor((t - getMin(t) * (60 * 10)) / 10);

export const formatTimeString = (time: number) =>
  `${String(getMin(time)).padStart(2, '0')}:${String(getSec(time)).padStart(2, '0')}`;

export const formatTime =
  (categoryDuration: number) => (time: number | null, goldenScore: boolean | null) => {
    if (time === null) {
      return '-';
    }

    if (goldenScore) {
      return `${formatTimeString(time)} (GS)`;
    }

    const notGoldenScoreTime = categoryDuration - time;
    return formatTimeString(notGoldenScoreTime);
  };
