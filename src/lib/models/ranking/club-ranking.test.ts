import ko from '$tests/mock/2ko.json';
import double from '$tests/mock/double-pool.json';
import single from '$tests/mock/single-pool.json';
import { describe, expect, it } from 'vitest';
import type { Category } from '../../types/category.type';
import { getClubRaking } from './club-ranking';

describe('getClubRaking', () => {
  it('should return an array with clubs', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    const clubs = rank.map((r) => r.name);

    expect(clubs).toContain('Club 1');
    expect(clubs).toContain('Club 2');
    expect(clubs).toContain('Club 3');
  });

  it('should sum ranking', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    const club1 = rank.find((r) => r.name === 'Club 1');

    expect(club1).toHaveProperty('gold');
    expect(club1).toHaveProperty('silver');
    expect(club1).toHaveProperty('bronze');
  });

  it('should sum ranking gold for Club 1', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    const club1 = rank.find((r) => r.name === 'Club 1');

    expect(club1?.gold).toBe(1);
  });

  it('should sum ranking silver for Club 3', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    const club1 = rank.find((r) => r.name === 'Club 3');

    expect(club1?.silver).toBe(2);
  });

  it('should sum ranking bronze for Club 2', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    const club1 = rank.find((r) => r.name === 'Club 1');

    expect(club1?.bronze).toBe(2);
  });

  it('should sort club', () => {
    const categories = [ko, double, single] as Category[];
    const rank = getClubRaking(categories);

    expect(rank[0].name).toBe('Club 2');
    expect(rank[1].name).toBe('Club 1');
    expect(rank[2].name).toBe('Club 3');
  });
});
