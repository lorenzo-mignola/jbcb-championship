import type { MatchJudoka } from '../../types/match.type';

import { matchState } from './match-state.svelte';

export function getPoints(athlete?: MatchJudoka) {
  if (athlete?.ippon) {
    return 10;
  }
  if (athlete?.wazari === 2) {
    return 10;
  }
  return athlete?.wazari ?? 0;
}

class JudokaPointsState {
  get white() {
    const match = matchState.match;
    if (!match) {
      return 0;
    }

    const { white } = match;
    return getPoints(white);
  };

  get blue() {
    const match = matchState.match;
    if (!match) {
      return 0;
    }

    const { blue } = match;
    return getPoints(blue);
  }
}

export const judokaPointsState = new JudokaPointsState();
