import { dec, inc } from 'ramda';

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
    if (this.#timer === 0) {
      this.#isGoldenScore = true;
    }

    this.#isPlaying = true;

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

  #stop() {
    this.#isPlaying = false;
    if (!osaekomiState.isExtraTime) {
      osaekomiState.resetOsaekomi();
    }
  };
}

export const timerState = new TimerState();
