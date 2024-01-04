import { get, writable } from 'svelte/store';
import { wazari } from '../../store/$match';
import type { JudokaType } from '../../types/match.type';

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

export const resetOsaekomi = () => {
  isPlaying.set(false);
  timerOsaekomi.set(0);
  if (interval !== null) {
    clearInterval(interval);
  }
};

export const watchTimerOsaekomi = (type: JudokaType) => {
  const unsubscribeWinner = timerOsaekomi.subscribe((time) => {
    if (get(oseakomiType) !== type) {
      return;
    }
    if (time === 10 || time === 20) {
      wazari(type);
    }
  });

  const unsubscribeType = oseakomiType.subscribe(($oseakomiType) => {
    if ($oseakomiType === null) {
      resetOsaekomi();
    }
  });

  const unsubscribeTimer = timerOsaekomi.subscribe((time) => {
    if (time && time <= 0) {
      isPlaying.set(false);
    }
  });

  const unsubscribePlay = isPlaying.subscribe((play) => {
    if (!play && interval !== null) {
      clearInterval(interval);
    }
  });

  return () => {
    unsubscribeTimer();
    unsubscribeWinner();
    unsubscribeType();
    unsubscribePlay();
  };
};
