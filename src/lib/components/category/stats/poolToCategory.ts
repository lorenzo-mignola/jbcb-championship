import type { Judoka } from '$lib/types/Judoka';
import type { PoolCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';

export const poolToCategory = (
  pool: Match[],
  poolAthletes: Judoka[],
  name: string
): PoolCategory => {
  return {
    id: '',
    name: name,
    duration: 0,
    type: 'pool',
    matches: pool,
    athletes: poolAthletes
  };
};
