import { describe, expect, it } from 'vitest';

import type {
  DoublePoolCategory,
  PoolCategory,
} from '#lib/types/category.type';
import type { Judoka } from '#lib/types/judoka.type';
import type { Match } from '#lib/types/match.type';

import brackets from '#tests/mock/2ko.json';
import doublePool from '#tests/mock/double-pool.json';
import poolCategoryMock from '#tests/mock/pool-category.json';
import singleEven from '#tests/mock/single-pool-even.json';
import singleEven2 from '#tests/mock/single-pool-even2.json';
import singleEven3 from '#tests/mock/single-pool-even3.json';
import single from '#tests/mock/single-pool.json';

import {
  getEvaluationPoint,
  getRanking,
  getRankingBrackets,
  getRankingDoublePool,
  getRankingIcon,
  getRankingPool,
} from './category';

const idPrimo = 'zspTr-9UcYWCASeuWWi50';
const idSecondo = 'QGHoPIhp6kJX4UQl1AxaX';
const idTerzo = 'wiHhvaGexwR9R4ED3HcJI';

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

describe('getEvaluationPoint', () => {
  it('should return 10 for ippon', () => {
    const winner = {
      id: '1',
      ippon: 1,
      name: 'A',
      shido: 0,
      wazari: 0,
      yuko: 0,
    };
    expect(getEvaluationPoint(winner)).toBe(10);
  });

  it('should return 10 for two wazari', () => {
    const winner = {
      id: '1',
      ippon: 0,
      name: 'A',
      shido: 0,
      wazari: 2,
      yuko: 0,
    };
    expect(getEvaluationPoint(winner)).toBe(10);
  });

  it('should return 7 for one wazari', () => {
    const winner = {
      id: '1',
      ippon: 0,
      name: 'A',
      shido: 0,
      wazari: 1,
      yuko: 0,
    };
    expect(getEvaluationPoint(winner)).toBe(7);
  });

  it('should return 5 for yuko', () => {
    const winner = {
      id: '1',
      ippon: 0,
      name: 'A',
      shido: 0,
      wazari: 0,
      yuko: 1,
    };
    expect(getEvaluationPoint(winner)).toBe(5);
  });

  it('should return 0 when winner is missing or has no score', () => {
    const winnerWithoutScore = {
      id: '1',
      ippon: 0,
      name: 'A',
      shido: 0,
      wazari: 0,
      yuko: 0,
    };
    expect(getEvaluationPoint(null)).toBe(0);
    expect(getEvaluationPoint(undefined)).toBe(0);
    expect(getEvaluationPoint(winnerWithoutScore)).toBe(0);
  });
});

describe('getRankingPool', () => {
  it('should return ["Primo", "Secondo", "Terzo"]', () => {
    const ranking = getRanking(poolCategoryMock as PoolCategory);

    expect(ranking).toStrictEqual([
      {
        evaluationPoint: 17,
        id: idPrimo,
        matchPoint: 4,
        rank: 1,
      },
      {
        evaluationPoint: 10,
        id: idSecondo,
        matchPoint: 2,
        rank: 2,
      },
      {
        evaluationPoint: 0,
        id: idTerzo,
        matchPoint: 0,
        rank: 3,
      },
    ]);
  });

  it('should award 5 evaluation points for a win decided by yuko', () => {
    const athletes: Judoka[] = [
      { id: 'ath-1', name: 'Athlete 1' },
      { id: 'ath-2', name: 'Athlete 2' },
    ];
    const matches: Match[] = [
      {
        blue: {
          id: 'ath-2',
          ippon: 0,
          name: 'Athlete 2',
          shido: 0,
          wazari: 0,
          yuko: 0,
        },
        finalTime: 1200,
        goldenScore: false,
        id: 'match-yuko',
        white: {
          id: 'ath-1',
          ippon: 0,
          name: 'Athlete 1',
          shido: 0,
          wazari: 0,
          yuko: 1,
        },
        winner: 'white',
      },
    ];

    const ranking = getRankingPool(matches, athletes);

    expect(ranking).toStrictEqual([
      {
        evaluationPoint: 5,
        id: 'ath-1',
        matchPoint: 2,
        rank: 1,
      },
      {
        evaluationPoint: 0,
        id: 'ath-2',
        matchPoint: 0,
        rank: 2,
      },
    ]);
  });

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
        evaluationPoint: 30,
        id: '5UAhk7jAVQ9mKSLFD7jKT',
        matchPoint: 6,
        rank: 1,
      },
      {
        evaluationPoint: 30,
        id: 'DUiUicWK3x8jzoLk3pKlk',
        matchPoint: 6,
        rank: 2,
      },
      {
        evaluationPoint: 20,
        id: 'sXGiWm4aJ-JaIA69Xy7mT',
        matchPoint: 4,
        rank: 3,
      },
      {
        evaluationPoint: 10,
        id: '6E6iZxhoFK3KQGL1n5sxx',
        matchPoint: 2,
        rank: 4,
      },
      {
        evaluationPoint: 10,
        id: 'jdsEP-lhU7cXXkqZzEkKR',
        matchPoint: 2,
        rank: 5,
      },
    ]);
  });

  it('should return an array of rankings with all golds', () => {
    const athletes = singleEven.athletes;
    const matches = singleEven.matches as Match[];
    const actual = getRankingPool(matches, athletes);

    expect(actual).toStrictEqual([
      {
        evaluationPoint: 10,
        id: 'XVmaPYhIA88IyU_SvOPJ1',
        matchPoint: 2,
        rank: 1,
      },
      {
        evaluationPoint: 10,
        id: 'rbBY-dGntsroZWQsCnI-W',
        matchPoint: 2,
        rank: 2,
      },
      {
        evaluationPoint: 10,
        id: 'lCcFKdl28NW643hzVRJqV',
        matchPoint: 2,
        rank: 3,
      },
    ]);
  });

  it('should handle even results with 4', () => {
    const athletes = singleEven2.athletes;
    const matches = singleEven2.matches as Match[];
    const actual = getRankingPool(matches, athletes);

    expect(actual).toStrictEqual([
      {
        evaluationPoint: 20,
        id: 'SZgvgkrtCH9sqFcG3JJKw',
        matchPoint: 4,
        rank: 1,
      },
      {
        evaluationPoint: 20,
        id: 'ZiJH2v0VEKHiM9NfqlWff',
        matchPoint: 4,
        rank: 2,
      },
      {
        evaluationPoint: 10,
        id: 'nKKK8lM-JxIyX0WmdsD02',
        matchPoint: 2,
        rank: 3,
      },
      {
        evaluationPoint: 10,
        id: 'MNG87YuJ6iUQ2gLqOPooJ',
        matchPoint: 2,
        rank: 4,
      },
    ]);
  });

  it('should handle even results with 4 and circle', () => {
    const athletes = singleEven3.athletes;
    const matches = singleEven3.matches as Match[];
    const actual = getRankingPool(matches, athletes);

    expect(actual).toStrictEqual([
      {
        evaluationPoint: 20,
        id: 'pi7AiKepq9nLHklzZY2Kg',
        matchPoint: 4,
        rank: 1,
      },
      {
        evaluationPoint: 20,
        id: 'tVk2gi6ErZFDxRhW1Z8tz',
        matchPoint: 4,
        rank: 2,
      },
      {
        evaluationPoint: 20,
        id: 'KfgxCgUpviSxSDFq66PKF',
        matchPoint: 4,
        rank: 3,
      },
      {
        evaluationPoint: 0,
        id: 'GtBM0Ichd5pECjxKZPz_6',
        matchPoint: 0,
        rank: 4,
      },
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
      { id: 'NgWpB9yyB3skVFBVxC8zh', rank: 1 },
      { id: 'SzJAd73o_aMwWnHKtQ-Hg', rank: 2 },
      { id: 'x4JLNFS78kIeNv5Qb3kb7', rank: 3 },
      { id: 'pC86HJ4_DypStfWhMH-3w', rank: 3 },
      { id: 'U4XtqYZrsa9bG6rDLOkdk', rank: 5 },
      { id: 'MwhUkAR3KuBS0jTXUHwSP', rank: 5 },
    ]);
  });
});

describe('getRankingDoublePool', () => {
  it(// eslint-disable-next-line style/max-len -- test name
    'should return an array of rankings with the correct order for a single semifinal and final match',
    () => {
      const semifinals
        = doublePool.semifinals as DoublePoolCategory['semifinals'];
      const finalMatch
        = doublePool.finalMatch as DoublePoolCategory['finalMatch'];
      const actual = getRankingDoublePool(semifinals, finalMatch);
      expect(actual).toStrictEqual([
        { id: '36BSMkwj5nVmnkvGqrZpo', rank: 1 },
        { id: 'tTx-zD9vKEjzQpJ9WuA0L', rank: 2 },
        { id: '7RJ6ONgZ-Pd4FeDfTTbI_', rank: 3 },
        { id: 'YRlXYFk-MMZXfMDTTBnOp', rank: 3 },
      ]);
    },
  );
});
