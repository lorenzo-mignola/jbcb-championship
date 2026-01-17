import { produce } from 'immer';
import { describe, expect, it } from 'vitest';

import type { Match } from '../../types/match.type';

import { judokaPointsState } from '../match/judoka-points-state.svelte';
import { matchState } from '../match/match-state.svelte';

const baseMatch: Match = {
  blue: {
    id: 'blue',
    ippon: 0,
    name: 'blue',
    shido: 0,
    wazari: 0,
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
  },
};

describe('judokaPoints', () => {
  it('should return 0 - 0 when match is undefined', () => {
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(0);
    expect(blue).toBe(0);
  });

  it('should return 0 - 0', () => {
    matchState.match = baseMatch;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(0);
    expect(blue).toBe(0);
  });

  it('should return 1 - 0', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.wazari = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(1);
    expect(blue).toBe(0);
  });

  it('should return 0 - 1', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.wazari = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(0);
    expect(blue).toBe(1);
  });

  it('should return 1 - 1', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.wazari = 1;
      }
      if (draft.blue) {
        draft.blue.wazari = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(1);
    expect(blue).toBe(1);
  });

  it('should return 10 - 0', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.ippon = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(10);
    expect(blue).toBe(0);
  });

  it('should return 0 - 10', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.ippon = 1;
      }
    });
    matchState.match = matchUpdated;
    const white = judokaPointsState.white;
    const blue = judokaPointsState.blue;
    expect(white).toBe(0);
    expect(blue).toBe(10);
  });
});
