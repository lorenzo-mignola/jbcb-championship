import { derived } from 'svelte/store';

import type { MatchJudoka } from '../types/match.type';
import { match } from './$match';

export const getPoints = (athlete?: MatchJudoka) => {
  if (athlete?.ippon) {
    return 10;
  }
  if (athlete?.wazari === 2) {
    return 10;
  }
  return athlete?.wazari ?? 0;
};

const judokasPoints = derived(
  match,
  ($match) => {
    if (!$match) {
      return {
        white: 0,
        blue: 0
      };
    }
    const { white, blue } = $match;
    return {
      white: getPoints(white),
      blue: getPoints(blue)
    };
  },
  {
    white: 0,
    blue: 0
  }
);

export const whitePoints = derived(judokasPoints, ($judokasPoints) => $judokasPoints.white, 0);

export const bluePoints = derived(judokasPoints, ($judokasPoints) => $judokasPoints.blue, 0);
