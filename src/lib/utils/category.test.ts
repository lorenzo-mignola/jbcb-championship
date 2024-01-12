import { describe, expect, it } from 'vitest';
import poolCategoryMock from '../../../tests/mock/pool-category.json';
import type { PoolCategory } from '../types/category.type';
import { getRanking } from './category';

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
