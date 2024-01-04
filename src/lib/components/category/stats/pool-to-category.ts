import type { PoolCategory } from '$lib/types/category.type';
import type { Judoka } from '$lib/types/judoka.type';
import type { Match } from '$lib/types/match.type';

export const poolToCategory = (
  pool: Match[],
  poolAthletes: Judoka[],
  name: string
): PoolCategory => {
  return {
    _id: '',
    name,
    duration: 0,
    type: 'pool',
    matches: pool,
    athletes: poolAthletes
  };
};
