import { produce } from 'immer';
import { describe, expect, it } from 'vitest';

import type { Match } from '../../types/match.type';

import { judokaPointsState, pointsToString } from '../match/judoka-points-state.svelte';
import { matchState } from '../match/match-state.svelte';

const baseMatch: Match = {
  blue: {
    id: 'blue',
    ippon: 0,
    name: 'blue',
    shido: 0,
    wazari: 0,
    yuko: 0,
  },
  finalTime: null,
  goldenScore: null,
  id: 'test',
  white: {
    id: 'white',
    ippon: 0,
    name: 'white',
    shido: 0,
    wazari: 0,
    yuko: 0,
  },
};

describe('judokaPoints', () => {
  it('should return "0 0 0" for both judokas when match is undefined', () => {
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 0');
    expect(pointsToString(blue)).toBe('0 0 0');
  });

  it('should return "0 0 0" for both judokas when scores are zero', () => {
    matchState.match = baseMatch;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 0');
    expect(pointsToString(blue)).toBe('0 0 0');
  });

  it('should return "0 1 0" for white when white has one wazari', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.wazari = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 1 0');
    expect(pointsToString(blue)).toBe('0 0 0');
  });

  it('should return "0 1 0" for blue when blue has one wazari', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.wazari = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 0');
    expect(pointsToString(blue)).toBe('0 1 0');
  });

  it('should return "0 1 0" for both when both have one wazari', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white)
        draft.white.wazari = 1;
      if (draft.blue)
        draft.blue.wazari = 1;
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 1 0');
    expect(pointsToString(blue)).toBe('0 1 0');
  });

  it('should return "1 0 0" for white when white has one ippon', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.ippon = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('1 0 0');
    expect(pointsToString(blue)).toBe('0 0 0');
  });

  it('should return "1 0 0" for blue when blue has one ippon', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.ippon = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 0');
    expect(pointsToString(blue)).toBe('1 0 0');
  });

  it('should return "0 2 0" for white when white has two wazari', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.wazari = 2;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 2 0');
    expect(pointsToString(blue)).toBe('0 0 0');
  });

  it('should return "0 2 0" for blue when blue has two wazari', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.wazari = 2;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 0');
    expect(pointsToString(blue)).toBe('0 2 0');
  });

  it('should return "0 0 1" for white when white has one yuko', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.yuko = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 1');
    expect(pointsToString(blue)).toBe('0 0 0');
  });

  it('should return "0 0 1" for blue when blue has one yuko', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.yuko = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(pointsToString(white)).toBe('0 0 0');
    expect(pointsToString(blue)).toBe('0 0 1');
  });
});
