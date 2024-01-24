import type { DoublePoolCategory, PoolCategory } from '$lib/types/category.type';
import type { Judoka } from '$lib/types/judoka.type';
import type { Match } from '$lib/types/match.type';
import brackets from '$tests/mock/2ko.json';
import doublePool from '$tests/mock/double-pool.json';
import poolCategoryMock from '$tests/mock/pool-category.json';
import singleEven from '$tests/mock/single-pool-even.json';
import single from '$tests/mock/single-pool.json';
import { describe, expect, it } from 'vitest';
import {
  getRanking,
  getRankingBrackets,
  getRankingDoublePool,
  getRankingIcon,
  getRankingPool
} from './category';

const idPrimo = 'zspTr-9UcYWCASeuWWi50';
const idSecondo = 'QGHoPIhp6kJX4UQl1AxaX';
const idTerzo = 'wiHhvaGexwR9R4ED3HcJI';

describe('getRankingPool', () => {
  it('should return ["Primo", "Secondo", "Terzo"]', () => {
    const ranking = getRanking(poolCategoryMock as PoolCategory);

    expect(ranking).toStrictEqual([
      { id: idPrimo, matchPoint: 4, evaluationPoint: 17, rank: 1 },
      { id: idSecondo, matchPoint: 2, evaluationPoint: 10, rank: 2 },
      { id: idTerzo, matchPoint: 0, evaluationPoint: 0, rank: 3 }
    ]);
  });
});

describe('getRankingIcon', () => {
  it('should return the correct icon for rank 1', () => {
    const actual = getRankingIcon(1);
    expect(actual).toBe('🥇');
  });

  it('should return the correct icon for rank 2', () => {
    const actual = getRankingIcon(2);
    expect(actual).toBe('🥈');
  });

  it('should return the correct icon for rank 3', () => {
    const actual = getRankingIcon(3);
    expect(actual).toBe('🥉');
  });

  it('should return the correct icon for rank 4', () => {
    const actual = getRankingIcon(4);
    expect(actual).toBe('🥉');
  });

  it('should return the correct icon for a non-medal rank', () => {
    const actual = getRankingIcon(5);
    expect(actual).toBe('#5');
  });
});

describe('getRankingPool', () => {
  it('should return an empty array if no matches are provided', () => {
    const matches: Match[] = [];
    const athletes: Judoka[] = [];
    const actual = getRankingPool(matches, athletes);
    expect(actual).toStrictEqual([]);
  });

  it('should return an array of rankings with the correct order', () => {
    const athletes = single.athletes;
    const matches = single.matches as Match[];
    const actual = getRankingPool(matches, athletes);
    expect(actual).toStrictEqual([
      {
        id: 'DUiUicWK3x8jzoLk3pKlk',
        matchPoint: 6,
        evaluationPoint: 30,
        rank: 1
      },
      {
        id: '5UAhk7jAVQ9mKSLFD7jKT',
        matchPoint: 6,
        evaluationPoint: 30,
        rank: 1
      },
      {
        id: 'sXGiWm4aJ-JaIA69Xy7mT',
        matchPoint: 4,
        evaluationPoint: 20,
        rank: 3
      },
      {
        id: 'jdsEP-lhU7cXXkqZzEkKR',
        matchPoint: 2,
        evaluationPoint: 10,
        rank: 4
      },
      {
        id: '6E6iZxhoFK3KQGL1n5sxx',
        matchPoint: 2,
        evaluationPoint: 10,
        rank: 4
      }
    ]);
  });

  it('should return an array of rankings with all golds', () => {
    const athletes = singleEven.athletes;
    const matches = singleEven.matches as Match[];
    const actual = getRankingPool(matches, athletes);
    expect(actual).toStrictEqual([
      {
        id: 'lCcFKdl28NW643hzVRJqV',
        matchPoint: 2,
        evaluationPoint: 10,
        rank: 1
      },
      {
        id: 'rbBY-dGntsroZWQsCnI-W',
        matchPoint: 2,
        evaluationPoint: 10,
        rank: 1
      },
      {
        id: 'XVmaPYhIA88IyU_SvOPJ1',
        matchPoint: 2,
        evaluationPoint: 10,
        rank: 1
      }
    ]);
  });
});

describe('getRankingBrackets', () => {
  it('should return an empty array if no matches are provided', () => {
    const matches: Match[] = [];
    const actual = getRankingBrackets(matches);
    expect(actual).toStrictEqual([]);
  });

  it('should return an array of rankings with the correct order for a single match', () => {
    const matches = brackets.matches as Match[];
    const actual = getRankingBrackets(matches);
    expect(actual).toStrictEqual([
      { rank: 1, id: 'NgWpB9yyB3skVFBVxC8zh' },
      { rank: 2, id: 'SzJAd73o_aMwWnHKtQ-Hg' },
      { rank: 3, id: 'x4JLNFS78kIeNv5Qb3kb7' },
      { rank: 3, id: 'pC86HJ4_DypStfWhMH-3w' },
      { rank: 5, id: 'U4XtqYZrsa9bG6rDLOkdk' },
      { rank: 5, id: 'MwhUkAR3KuBS0jTXUHwSP' }
    ]);
  });
});

describe('getRankingDoublePool', () => {
  it('should return an array of rankings with the correct order for a single semifinal and final match', () => {
    const semifinals = doublePool.semifinals as DoublePoolCategory['semifinals'];
    const finalMatch = doublePool.finalMatch as DoublePoolCategory['finalMatch'];
    const actual = getRankingDoublePool(semifinals, finalMatch);
    expect(actual).toStrictEqual([
      { rank: 1, id: '36BSMkwj5nVmnkvGqrZpo' },
      { rank: 2, id: 'tTx-zD9vKEjzQpJ9WuA0L' },
      { rank: 3, id: '7RJ6ONgZ-Pd4FeDfTTbI_' },
      { rank: 3, id: 'YRlXYFk-MMZXfMDTTBnOp' }
    ]);
  });
});
