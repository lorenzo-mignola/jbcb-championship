import { produce } from 'immer';
import { get, writable } from 'svelte/store';
import { describe, expect, it, vi } from 'vitest';

import type { Match } from '../types/match.type';
import { match } from './$match';
import { bluePoints, whitePoints } from './judoka-points';

const baseMatch: Match = {
  id: 'test',
  white: {
    id: 'white',
    name: 'white',
    ippon: 0,
    wazari: 0,
    shido: 0
  },
  blue: {
    id: 'blue',
    name: 'blue',
    ippon: 0,
    wazari: 0,
    shido: 0
  },
  finalTime: null,
  goldenScore: null
};

vi.mock('./$match.ts', async (importOriginal) => {
  const actual = await importOriginal();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- keep all original module
  return {
    // @ts-expect-error -- keep all original module
    ...actual,
    match: writable(undefined)
  };
});

describe('judokaPoints', () => {
  it('should return 0 - 0', () => {
    const white = get(whitePoints);
    const blue = get(bluePoints);
    expect(white).toBe(0);
    expect(blue).toBe(0);
  });

  it('should return 0 - 0', () => {
    match.set(baseMatch);
    const white = get(whitePoints);
    const blue = get(bluePoints);
    expect(white).toBe(0);
    expect(blue).toBe(0);
  });

  it('should return 1 - 0', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.wazari = 1;
      }
    });
    match.set(matchUpdated);
    const white = get(whitePoints);
    const blue = get(bluePoints);
    expect(white).toBe(1);
    expect(blue).toBe(0);
  });

  it('should return 0 - 1', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.wazari = 1;
      }
    });
    match.set(matchUpdated);
    const white = get(whitePoints);
    const blue = get(bluePoints);
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
    match.set(matchUpdated);
    const white = get(whitePoints);
    const blue = get(bluePoints);
    expect(white).toBe(1);
    expect(blue).toBe(1);
  });

  it('should return 10 - 0', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.white) {
        draft.white.ippon = 1;
      }
    });
    match.set(matchUpdated);
    const white = get(whitePoints);
    const blue = get(bluePoints);
    expect(white).toBe(10);
    expect(blue).toBe(0);
  });

  it('should return 0 - 10', () => {
    const matchUpdated = produce(baseMatch, (draft) => {
      if (draft.blue) {
        draft.blue.ippon = 1;
      }
    });
    match.set(matchUpdated);
    const white = get(whitePoints);
    const blue = get(bluePoints);
    expect(white).toBe(0);
    expect(blue).toBe(10);
  });
});
