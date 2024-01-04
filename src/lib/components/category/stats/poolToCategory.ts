import type { PoolCategory } from '$lib/types/Category';
import type { Judoka } from '$lib/types/Judoka';
import type { Match } from '$lib/types/Match';

export const poolToCategory = (
  pool: Match[],
  poolAthletes: Judoka[],
  name: string
): PoolCategory => {
  return {
    _id: '',
    name: name,
    duration: 0,
    type: 'pool',
    matches: pool,
    athletes: poolAthletes
  };
};
