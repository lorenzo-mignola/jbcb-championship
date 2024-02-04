import { produce } from 'immer';
import { describe, expect, it } from 'vitest';
import type { Judoka } from '../../../types/judoka.type';
import { createSinglePool } from './create-single-pool';

const name = 'single';

describe('SinglePool odds', () => {
  const athletes: Judoka[] = [
    {
      id: '1',
      name: '1'
    },
    {
      id: '2',
      name: '2'
    },
    {
      id: '3',
      name: '3'
    },
    {
      id: '4',
      name: '4'
    },
    {
      id: '5',
      name: '5'
    }
  ];

  it.each([
    ['1', '4', 0],
    ['2', '3', 1],
    ['2', '5', 2],
    ['3', '4', 3],
    ['3', '1', 4],
    ['4', '5', 5],
    ['4', '2', 6],
    ['5', '1', 7],
    ['5', '3', 8],
    ['1', '2', 9]
  ])('should return %s vs %s on %d match', (whiteId, blueId, index) => {
    const pool = createSinglePool(name, athletes, 0);

    const first = pool.matches[index];
    expect(first.white?.id).toBe(whiteId);
    expect(first.blue?.id).toBe(blueId);
  });

  it('should have 10 matchs', () => {
    const pool = createSinglePool(name, athletes, 0);

    expect(pool.matches).toHaveLength(10);
  });

  it('should not have duplicate', () => {
    const pool = createSinglePool(name, athletes, 0);
    const { matches } = pool;
    const onlyId = matches
      .map(({ white, blue }) => {
        const sorted = [white?.id, blue?.id].filter((a): a is string => Boolean(a));
        return sorted;
      })
      .map(([a, b]) => `${a}-${b}`);
    const set = new Set(onlyId);
    expect(set.size).toBe(matches.length);
  });

  it('should not have duplicate with 4 athletes', () => {
    const pool = createSinglePool(name, athletes.slice(0, 4), 0);
    const { matches } = pool;
    const onlyId = matches
      .map(({ white, blue }) => {
        const sorted = [white?.id, blue?.id].filter((a): a is string => Boolean(a));
        return sorted;
      })
      .map(([a, b]) => `${a}-${b}`);
    const set = new Set(onlyId);
    expect(set.size).toBe(matches.length);
  });
});

describe('SinglePool even', () => {
  const athletes: Judoka[] = [
    {
      id: '1',
      name: '1'
    },
    {
      id: '2',
      name: '2'
    },
    {
      id: '3',
      name: '3'
    },
    {
      id: '4',
      name: '4'
    },
    {
      id: '5',
      name: '5'
    },
    {
      id: '6',
      name: '6'
    }
  ];

  it.each([
    ['1', '5', 0],
    ['2', '4', 1],
    ['2', '6', 2],
    ['3', '5', 3],
    ['3', '1', 4],
    ['4', '5', 5]
  ])('should return %s vs %s on %d match', (whiteId, blueId, index) => {
    const pool = createSinglePool(name, athletes, 0);

    const match = pool.matches[index];
    expect(match.white?.id).toBe(whiteId);
    expect(match.blue?.id).toBe(blueId);
  });

  it('should have 15 matchs', () => {
    const pool = createSinglePool(name, athletes, 0);

    expect(pool.matches).toHaveLength(15);
  });

  it.each([[4], [5], [6]])('all athletes do the same numbers of match', (slice) => {
    const pool = createSinglePool(name, athletes.slice(0, slice), 0);

    const nrOfMatch = pool.matches.reduce<Record<string, number>>((counter, match) => {
      const { white, blue } = match;
      const updatedWhite = produce(counter, (c) => {
        if (!white) {
          return;
        }
        if (c[white.id]) {
          c[white.id] += 1;
          return;
        }
        c[white.id] = 1;
      });
      const updatedBlue = produce(updatedWhite, (c) => {
        if (!blue) {
          return;
        }
        if (c[blue.id]) {
          c[blue.id] += 1;
          return;
        }
        c[blue.id] = 1;
      });
      return updatedBlue;
    }, {});

    expect(Object.keys(nrOfMatch).length).toBe(slice);
    const nrMatchPerAthlete = slice - 1;
    Object.values(nrOfMatch).forEach((nr) => {
      expect(nr).toBe(nrMatchPerAthlete);
    });
  });

  it('should not have duplicate', () => {
    const pool = createSinglePool(name, athletes, 0);
    const { matches } = pool;
    const onlyId = matches.map(({ white, blue }) => `${white?.id}-${blue?.id}`);
    const set = new Set(onlyId);
    expect(set.size).toBe(matches.length);
  });
});
