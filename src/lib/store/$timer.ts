import { get, writable } from 'svelte/store';
import { oseakomiType } from '../components/osaekomi/$osaekomi-timer';

const duration = 4 * 60 * 10;
export const timer = writable(duration);
export const isPlaying = writable(false);

let interval: NodeJS.Timeout | null = null;

const play = () => {
  isPlaying.set(true);

  interval = setInterval(() => {
    if (get(isPlaying)) {
      timer.update((time) => time - 1);
    }
  }, 100);
};

export const stop = () => {
  isPlaying.set(false);
};

timer.subscribe((time) => {
  if (time <= 0) {
    isPlaying.set(false);
  }
});

isPlaying.subscribe((play) => {
  if (!play && interval !== null) {
    clearInterval(interval);
  }
  if (get(oseakomiType) !== null) {
    oseakomiType.set(null);
  }
});

export const togglePlay = () => {
  if (get(isPlaying)) {
    stop();
    return;
  }
  play();
};

export const reset = () => {
  isPlaying.set(false);
  timer.set(duration);
  if (interval !== null) {
    clearInterval(interval);
  }
};

export const getMin = (t: number) => Math.floor(t / (60 * 10));
export const getSec = (t: number) => Math.floor((t - getMin(t) * (60 * 10)) / 10);

export const formatTime = (t: number) =>
  `${String(getMin(t)).padStart(2, '0')}:${String(getSec(t)).padStart(2, '0')}`;
