import type { MatchJudoka } from '../../types/match.type';

import { matchState } from './match-state.svelte';

// export function getPoints(athlete?: MatchJudoka) {
//   if (athlete?.ippon) {
//     return 10;
//   }
//   if (athlete?.wazari === 2) {
//     return 10;
//   }
//   return athlete?.wazari ?? 0;
// }

// export const judokasPoints = $derived.by(() => {
//   const match = matchState.match;
//   if (!match) {
//     return {
//       blue: 0,
//       white: 0,
//     };
//   }

//   const { blue, white } = match;
//   return {
//     blue: getPoints(blue),
//     white: getPoints(white),
//   };
// });

// export const whitePoints = $derived(judokasPoints.white);
// export const bluePoints = $derived(judokasPoints.blue);

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
