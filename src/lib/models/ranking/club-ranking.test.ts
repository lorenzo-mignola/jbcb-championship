import { describe, expect, it } from 'vitest';
import ko from '../../../../tests/mock/2ko.json';
import double from '../../../../tests/mock/double-pool.json';
import single from '../../../../tests/mock/single-pool.json';
import type { Category } from '../../types/category.type';
import { getClubRaking } from './club-ranking';

describe.only('getClubRaking', () => {
  it('should return an object with clubs', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    expect(rank).toHaveProperty('Club 1');
    expect(rank).toHaveProperty('Club 2');
    expect(rank).toHaveProperty('Club 3');
  });
});
