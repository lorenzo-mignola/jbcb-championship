import { dec, inc } from 'ramda';

import { getSeconds } from '../../utils/timer-utils';
import { localStorageMatchState } from './local-storage-match-state.svelte';
import { osaekomiState } from './osaekomi-state.svelte';

const defaultDuration = 4 * 60 * 10;

class TimerState {
  #timer = $state(defaultDuration);
  #isPlaying = $state(false);
  #isGoldenScore = $state(false);
  #duration = $state(defaultDuration);

  #interval: NodeJS.Timeout | null = null;

  get timer() {
    return this.#timer;
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  get isGoldenScore() {
    return this.#isGoldenScore;
  }

  get duration() {
    return this.#duration;
  }

  set duration(duration: number) {
    this.#duration = duration;
    this.#timer = duration;
  }

  freezeTimer() {
    this.#isPlaying = false;
  }

  togglePlay() {
    if (this.#isPlaying) {
      this.#stop();
      return;
    }
    this.#play();
  };

  #play() {
    if (this.#timer <= 0 && !this.#isGoldenScore) {
      this.#isGoldenScore = true;
    }

    this.#isPlaying = true;

    if (this.#interval !== null) {
      clearInterval(this.#interval);
    }

    // resume osakeomi if is freezed
    if (osaekomiState.type) {
      osaekomiState.startOsaekomi();
    }

    this.#interval = setInterval(() => {
      if (this.#isPlaying) {
        this.#timer = this.#isGoldenScore ? inc(this.#timer) : dec(this.#timer);
      }
    }, 100);
  };

  reset() {
    this.#isPlaying = false;
    this.#isGoldenScore = false;
    this.#timer = this.#duration || defaultDuration;
    osaekomiState.resetOsaekomi();
    if (this.#interval !== null) {
      clearInterval(this.#interval);
    }
  }

  #stop() {
    this.#isPlaying = false;
    if (!osaekomiState.isExtraTime) {
      osaekomiState.resetOsaekomi();
    }
  };

  stopByWinner() {
    this.#stop();
    osaekomiState.stopOsaekomi();
  }

  watchTimer() {
    $effect(() => {
      if (this.timer <= 0) {
        this.#isPlaying = false;
        osaekomiState.isExtraTime = Boolean(osaekomiState.type);
      }
    });

    $effect(() => {
      if (!this.#isPlaying && this.#interval !== null) {
        clearInterval(this.#interval);
      }
    });

    const seconds = $derived(getSeconds(this.timer));
    $effect(() => {
      localStorageMatchState.time = seconds;
    });

    $effect(() => {
      localStorageMatchState.goldenScore = this.#isGoldenScore;
    });
  }
}

export const timerState = new TimerState();
