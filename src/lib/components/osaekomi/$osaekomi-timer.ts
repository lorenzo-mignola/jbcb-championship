import { get, writable } from 'svelte/store';
import { wazari } from '../../store/$match';
import type { JudokaType } from '../../types/Match';

export const timerOsaekomi = writable<number>(0);
export const oseakomiType = writable<JudokaType | null>(null);
const isPlaying = writable(false);

let interval: NodeJS.Timeout | null = null;

export const startOsaekomi = () => {
  isPlaying.set(true);

  interval = setInterval(() => {
    if (get(isPlaying)) {
      timerOsaekomi.update((time) => time + 1);
    }
  }, 1000);
};

export const stopOsaekomi = () => {
  isPlaying.set(false);
};

oseakomiType.subscribe((type) => {
  if (type === null) {
    isPlaying.set(false);
  }
});

timerOsaekomi.subscribe((time) => {
  if (time && time <= 0) {
    isPlaying.set(false);
  }
});

isPlaying.subscribe((play) => {
  if (!play && interval !== null) {
    clearInterval(interval);
  }
});

export const reset = () => {
  isPlaying.set(false);
  timerOsaekomi.set(0);
  if (interval !== null) {
    clearInterval(interval);
  }
};

export const watchTimerOsaekomi = (type: JudokaType) => {
  timerOsaekomi.subscribe((time) => {
    if (get(oseakomiType) !== type) {
      return;
    }
    if (time === 10 || time === 20) {
      wazari(type);
    }
  });
};
