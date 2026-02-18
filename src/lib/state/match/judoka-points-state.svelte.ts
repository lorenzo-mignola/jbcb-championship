import type { MatchJudoka, Points } from '../../types/match.type';

import { matchState } from './match-state.svelte';

const defaultPoints: Points = {
  ippon: 0,
  wazari: 0,
  yuko: 0,
};

export function pointsToString(points: Points) {
  const { ippon, wazari, yuko } = points;

  const ipponString = ippon || wazari === 2 ? '1' : '';
  const wazariString = wazari === 1 ? '1' : '0';
  const yukoString = `${yuko}`;
  return [ipponString, wazariString, yukoString].filter(Boolean).join(' ');
}

function getPoints(athlete?: MatchJudoka): Points {
  return {
    ippon: athlete?.ippon ?? defaultPoints.ippon,
    wazari: athlete?.wazari ?? defaultPoints.wazari,
    yuko: athlete?.yuko ?? defaultPoints.yuko,
  };
}

class JudokaPointsState {
  get white(): Points {
    const match = matchState.match;
    if (!match) {
      return defaultPoints;
    }

    const { white } = match;
    return getPoints(white);
  };

  get blue(): Points {
    const match = matchState.match;
    if (!match) {
      return defaultPoints;
    }

    const { blue } = match;
    return getPoints(blue);
  }
}

export const judokaPointsState = new JudokaPointsState();
