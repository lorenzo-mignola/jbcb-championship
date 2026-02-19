import { inc } from 'ramda';
import { untrack } from 'svelte';

import type { JudokaType } from '../../types/match.type';

import { localStorageMatchState } from './local-storage-match-state.svelte';
import { matchState } from './match-state.svelte';

class OsaekomiState {
  type = $state<JudokaType | null>(null);
  #timer = $state(0);
  #isPlaying = $state(false);
  #isExtraTime = $state(false);

  #interval: NodeJS.Timeout | null = null;

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
    this.type = null;
    this.#timer = 0;
    localStorageMatchState.osaekomiType = '';
    if (this.#interval !== null) {
      clearInterval(this.#interval);
    }
  };

  watchOsaekomi(type: JudokaType) {
    $effect(() => {
      if (this.type !== type) {
        return;
      }

      if (this.timer === 10) {
        untrack(() => {
          matchState.wazari(type);
        });
      }

      if (this.timer === 20) {
        untrack(() => {
          matchState.removeWazari(type);
          matchState.ippon(type);
        });
      }
    });

    $effect(() => {
      const type = this.type;

      untrack(() => {
        localStorageMatchState.osaekomiType = type ?? '';
      });
    });

    $effect(() => {
      if (this.timer && this.timer <= 0) {
        this.#isPlaying = false;
      }
    });

    $effect(() => {
      localStorageMatchState.osaekomiTime = this.timer;
    });

    $effect(() => {
      if (!this.#isPlaying && this.#interval !== null) {
        clearInterval(this.#interval);
      }
    });
  }
}

export const osaekomiState = new OsaekomiState();
