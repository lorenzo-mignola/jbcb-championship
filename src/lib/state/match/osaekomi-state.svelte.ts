import { inc } from 'ramda';

import type { JudokaType } from '../../types/match.type';

class OsaekomiState {
  #type = $state<JudokaType | null>(null);
  #timer = $state(0);
  #isPlaying = $state(false);
  #isExtraTime = $state(false);

  #interval: NodeJS.Timeout | null = null;

  get type() {
    return this.#type;
  }

  get timer() {
    return this.#timer;
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  get isExtraTime() {
    return this.#isExtraTime;
  }

  set isExtraTime(isExtraTime: boolean) {
    this.#isExtraTime = isExtraTime;
  }

  startOsaekomi() {
    this.#isPlaying = true;

    this.#interval = setInterval(() => {
      if (this.#isPlaying) {
        this.#timer = inc(this.#timer);
      }
    }, 1000);
  };

  stopOsaekomi() {
    this.#isPlaying = false;
    if (this.#interval !== null) {
      clearInterval(this.#interval);
    }
  };

  resetOsaekomi() {
    this.#isPlaying = false;
    this.#isExtraTime = false;
    this.#type = null;
    this.#timer = 0;
    if (this.#interval !== null) {
      clearInterval(this.#interval);
    }
  };
}

export const osaekomiState = new OsaekomiState();
