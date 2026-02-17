import { produce, setAutoFreeze } from 'immer';
import { untrack } from 'svelte';

import type { JudokaType, Match } from '../../types/match.type';

import { getOpponentType } from '../../utils/judoka-utils';
import { judokaPointsState } from './judoka-points-state.svelte';
import { osaekomiState } from './osaekomi-state.svelte';
import { timerState } from './timer-state.svelte';

setAutoFreeze(false);

class MatchState {
  match = $state<Match | undefined>(undefined);

  #getJudokaByType(type: JudokaType) {
    return this.match?.[type];
  }

  ippon(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.ippon += 1;
  }

  wazari(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.wazari += 1;
  }

  yuko(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.yuko += 1;
  }

  shido(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.shido += 1;
  }

  removeIppon(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.ippon -= 1;
    if (this.match?.winner) {
      this.match.winner = undefined;
    }
  }

  removeWazari(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.wazari -= 1;
    if (this.match?.winner) {
      this.match.winner = undefined;
    }
  }

  removeShido(type: JudokaType) {
    const judoka = this.#getJudokaByType(type);
    if (!judoka) {
      return;
    }
    judoka.shido -= 1;
    const opponentType = getOpponentType(type);
    if (this.match?.winner === opponentType) {
      this.removeIppon(opponentType);
    }
  }

  #winner(type: JudokaType) {
    if (!this.match) {
      return;
    }

    const matchUpdated = produce(this.match, (match) => {
      if (!match?.[type]) {
        return;
      }
      match.winner = type;
      match.finalTime = timerState.timer;
      match.goldenScore = timerState.isGoldenScore;
    });
    this.match = matchUpdated;
    this.#stopTimers();
  }

  #disqualification(type: JudokaType) {
    const match = this.match;
    if (!match) {
      return;
    }

    const opponentType = getOpponentType(type);
    if (!opponentType) {
      return false;
    }

    const opponent = match[opponentType];
    if (!opponent) {
      return;
    }

    const matchUpdated = produce(this.match, (match) => {
      if (!match?.[opponentType]) {
        return;
      }

      match[opponentType].ippon = 1;
      match.winner = opponentType;
      match.finalTime = timerState.timer;
    });

    this.match = matchUpdated;
    this.#stopTimers();
  };

  #stopTimers() {
    timerState.stopByWinner();
  };

  #isWinnerByWazari(type: JudokaType) {
    const match = this.match;
    if (!match) {
      return false;
    }

    const wazari = match[type]?.wazari ?? 0;
    const opponentType = getOpponentType(type);
    if (!opponentType) {
      return false;
    }
    const judoka = match[type]!;
    const opponent = match[opponentType]!;

    if (judoka.ippon > 0 || opponent.ippon > 0) {
      return false;
    }

    const wazariOpponent = match[opponentType]?.wazari ?? 0;
    const ipponOpponent = match[opponentType]?.ippon ?? 0;
    if (ipponOpponent || wazariOpponent >= 2) {
      return false;
    }

    if (wazari === 0) {
      return false;
    }

    return wazari > wazariOpponent;
  }

  watchWinnerOrLoser(type: JudokaType) {
    $effect(() => {
      const match = this.match;
      if (match?.winner) {
        return;
      }

      const points = judokaPointsState[type];
      if (points === 10) {
        untrack(() => {
          this.#winner(type);
        });
        return;
      }

      const isOverTimer = osaekomiState.isExtraTime
        || timerState.isGoldenScore
        || timerState.timer === 0;
      if (isOverTimer && this.#isWinnerByWazari(type)) {
        untrack(() => {
          this.#winner(type);
          timerState.reset();
        });
        return;
      }

      const judoka = match?.[type];
      if (judoka?.shido === 3) {
        untrack(() => {
          this.#disqualification(type);
        });
      }
    });
  }
}

export const matchState = new MatchState();
