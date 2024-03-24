import { describe, expect, it } from 'vitest';
import type { DoublePoolCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import { resetAthlete } from '../brackets/reset-athlete';
import { createDoublePool } from './create-double-pool';
import { updateDoublePool } from './update-double-pool';

const athletes: Judoka[] = [
  { id: '1', name: '1' },
  { id: '2', name: '2' },
  { id: '3', name: '3' },
  { id: '4', name: '4' },
  { id: '5', name: '5' },
  { id: '6', name: '6' },
  { id: '7', name: '7' },
  { id: '8', name: '8' },
  { id: '9', name: '9' },
  { id: '10', name: '10' },
  { id: '11', name: '11' },
  { id: '12', name: '12' },
  { id: '13', name: '13' }
];

describe('createDoublePool', () => {
  it('should have "pools", "semifinals", "finalMatch"', () => {
    const doublePool = createDoublePool('test', athletes, 0);

    expect(doublePool).toHaveProperty('pools');
    expect(doublePool).toHaveProperty('semifinals');
    expect(doublePool).toHaveProperty('finalMatch');
  });

  it('should have pools with athletes', () => {
    const doublePool = createDoublePool('test', athletes, 0);

    const { pools } = doublePool;

    expect(pools.A).toHaveLength(21);
    expect(pools.B).toHaveLength(15);
  });

  it('should have currentMatch as Pool A first match', () => {
    const doublePool = createDoublePool('test', athletes, 0);

    const { pools, currentMatch, matches } = doublePool;

    expect(currentMatch).toBe(pools.A[0].id);
    expect(matches[0].id).toBe(pools.A[0].id);
  });

  it('should update category', () => {
    const doublePool = createDoublePool('test', athletes, 0);

    const poolUpdated = updateDoublePool(doublePool as DoublePoolCategory, {
      ...doublePool.matches[0],
      winner: 'white'
    });
    const { pools, currentMatch, matches } = poolUpdated;

    expect(matches[0].winner).toBe('white');
    expect(poolUpdated.pools.A[0].winner).toBe('white');
    expect(currentMatch).toBe(pools.B[0].id);
  });

  it('should update category last pool match', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const lastMatchIndex = 21 + 15 - 1;
    const lastMatchPool = doublePool.matches[lastMatchIndex];

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!lastMatchPool.white || !lastMatchPool.blue) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail('not last match pool');
    }
    const poolUpdated = updateDoublePool(
      { ...doublePool, currentMatch: lastMatchPool.id } as DoublePoolCategory,
      {
        ...lastMatchPool,
        winner: 'white'
      }
    );
    const { semifinals, currentMatch, matches } = poolUpdated;

    expect(matches[lastMatchIndex].winner).toBe('white');
    expect(currentMatch).toBe(semifinals[0].id);
  });

  it('should have semifinals set (expect first semifinal)', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const lastMatchIndex = 21 + 15 - 1;
    const lastMatchPool = doublePool.matches[lastMatchIndex];

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!lastMatchPool.white || !lastMatchPool.blue) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail('not last match pool');
    }
    const poolUpdated = updateDoublePool(
      { ...doublePool, currentMatch: lastMatchPool.id } as DoublePoolCategory,
      {
        ...lastMatchPool,
        winner: 'white'
      }
    );
    const {
      semifinals,
      pools: { A, B }
    } = poolUpdated;

    const [firstSemifinal] = semifinals;

    // firstSemifinal
    expect(firstSemifinal.white).toBeDefined();
    expect(A.flatMap((m) => [m.white?.id, m.blue?.id])).contains(firstSemifinal.white?.id);
    expect(firstSemifinal.blue).toBeDefined();
    expect(B.flatMap((m) => [m.white?.id, m.blue?.id])).contains(firstSemifinal.blue?.id);
  });

  it('should have semifinals set (expect second semifinal)', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const lastMatchIndex = 21 + 15 - 1;
    const lastMatchPool = doublePool.matches[lastMatchIndex];

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!lastMatchPool.white || !lastMatchPool.blue) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail('not last match pool');
    }
    const poolUpdated = updateDoublePool(
      { ...doublePool, currentMatch: lastMatchPool.id } as DoublePoolCategory,
      {
        ...lastMatchPool,
        winner: 'white'
      }
    );
    const {
      semifinals,
      pools: { A, B }
    } = poolUpdated;

    const [_, secondSemifinal] = semifinals;

    // secondSemifinal
    expect(secondSemifinal.white).toBeDefined();
    expect(B.flatMap((m) => [m.white?.id, m.blue?.id])).contains(secondSemifinal.white?.id);
    expect(secondSemifinal.blue).toBeDefined();
    expect(A.flatMap((m) => [m.white?.id, m.blue?.id])).contains(secondSemifinal.blue?.id);
  });

  it('should update first semifinal', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const firstSemifinal = doublePool.matches.at(-3);

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!firstSemifinal) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail("Semifinal can't be undefined");
    }

    const poolUpdated = updateDoublePool(
      { ...doublePool, currentMatch: firstSemifinal.id } as DoublePoolCategory,
      {
        ...firstSemifinal,
        winner: 'white'
      }
    );

    expect(poolUpdated.semifinals[0].winner).toBe('white');
  });

  it('should update second semifinal', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const secondSemifinal = doublePool.matches.at(-2);

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!secondSemifinal) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail("Semifinal can't be undefined");
    }

    const poolUpdated = updateDoublePool(
      { ...doublePool, currentMatch: secondSemifinal.id } as DoublePoolCategory,
      {
        ...secondSemifinal,
        winner: 'white'
      }
    );

    expect(poolUpdated.semifinals[1].winner).toBe('white');
    expect(poolUpdated.currentMatch).toBe(poolUpdated.finalMatch.id);
  });

  it('should have final', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const firstSemifinal = doublePool.matches.at(-3);

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!firstSemifinal) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail("Semifinal can't be undefined");
    }

    const poolUpdatedFirstSemi = updateDoublePool(
      { ...doublePool, currentMatch: firstSemifinal.id } as DoublePoolCategory,
      {
        ...firstSemifinal,
        white: resetAthlete({
          id: '1',
          name: '1'
        }),
        blue: resetAthlete({
          id: '2',
          name: '2'
        }),
        winner: 'white'
      }
    );

    const secondSemifinal = poolUpdatedFirstSemi.matches.at(-2);

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!secondSemifinal) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail("Semifinal can't be undefined");
    }

    const poolUpdated = updateDoublePool(poolUpdatedFirstSemi, {
      ...secondSemifinal,
      white: resetAthlete({
        id: '3',
        name: '3'
      }),
      blue: resetAthlete({
        id: '4',
        name: '4'
      }),
      winner: 'white'
    });

    expect(poolUpdated.finalMatch.white).toBeDefined();
    expect(poolUpdated.matches.at(-1)?.white).toBeDefined();
    expect(poolUpdated.finalMatch.blue).toBeDefined();
    expect(poolUpdated.matches.at(-1)?.blue).toBeDefined();
  });

  it('should update final', () => {
    const doublePool = createDoublePool('test', athletes, 0);
    const firstSemifinal = doublePool.matches.at(-3);

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!firstSemifinal) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail("Semifinal can't be undefined");
    }

    const poolUpdatedFirstSemi = updateDoublePool(
      { ...doublePool, currentMatch: firstSemifinal.id } as DoublePoolCategory,
      {
        ...firstSemifinal,
        white: resetAthlete({
          id: '1',
          name: '1'
        }),
        blue: resetAthlete({
          id: '2',
          name: '2'
        }),
        winner: 'white'
      }
    );

    const secondSemifinal = poolUpdatedFirstSemi.matches.at(-2);

    // eslint-disable-next-line vitest/no-conditional-in-test -- if used for fail
    if (!secondSemifinal) {
      // eslint-disable-next-line vitest/no-conditional-expect -- if used for fail
      expect.fail("Semifinal can't be undefined");
    }

    const poolUpdatedSecondSemi = updateDoublePool(poolUpdatedFirstSemi, {
      ...secondSemifinal,
      white: resetAthlete({
        id: '3',
        name: '3'
      }),
      blue: resetAthlete({
        id: '4',
        name: '4'
      }),
      winner: 'white'
    });

    const poolUpdated = updateDoublePool(poolUpdatedSecondSemi, {
      ...poolUpdatedSecondSemi.finalMatch,
      winner: 'white'
    });

    expect(poolUpdated.finalMatch.winner).toBe('white');
    expect(poolUpdated.matches.at(-1)?.winner).toBe('white');
    expect(poolUpdated.currentMatch).toBeNull();
  });
});
