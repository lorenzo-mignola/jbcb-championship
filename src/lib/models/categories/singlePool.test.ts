import { describe, expect, it } from 'vitest';
import type { Judoka } from '../../types/Judoka';
import type { Match } from '../../types/Match';
import { createSinglePool } from './singlePool';

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
    const pool = createSinglePool(name, athletes);

    const first = pool.matches[index];
    expect(first?.white.id).toBe(whiteId);
    expect(first?.blue.id).toBe(blueId);
  });

  it('should have 10 matchs', () => {
    const pool = createSinglePool(name, athletes);

    expect(pool.matches).toHaveLength(10);
  });

  it('should not have duplicate', () => {
    const pool = createSinglePool(name, athletes);
    const { matches } = pool;
    if (matches.some((match) => match === null)) {
      expect.fail();
    }
    const onlyId = (matches as Match[]).map(({ white, blue }) => `${white.id}-${blue.id}`);
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
    ['1', '6', 0],
    ['2', '5', 1],
    ['3', '4', 2],
    ['2', '1', 3],
    ['3', '6', 4],
    ['4', '5', 5]
  ])('should return %s vs %s on %d match', (whiteId, blueId, index) => {
    const pool = createSinglePool(name, athletes);

    const first = pool.matches[index];
    expect(first?.white.id).toBe(whiteId);
    expect(first?.blue.id).toBe(blueId);
  });

  it('should have 15 matchs', () => {
    const pool = createSinglePool(name, athletes);

    expect(pool.matches).toHaveLength(15);
  });

  it('should not have duplicate', () => {
    const pool = createSinglePool(name, athletes);
    const { matches } = pool;
    if (matches.some((match) => match === null)) {
      expect.fail();
    }
    const onlyId = (matches as Match[]).map(({ white, blue }) => `${white.id}-${blue.id}`);
    const set = new Set(onlyId);
    expect(set.size).toBe(matches.length);
  });
});
