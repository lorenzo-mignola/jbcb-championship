import type { DoublePoolCategory } from '../../../types/Category';
import type { Judoka } from '../../../types/Judoka';
import type { Match } from '../../../types/Match';
import { shuffleArray } from '../../../utils/category';
import { createMatch } from '../../match';
import { createMatchesPool } from '../singlePool/createSinglePool';

const createPools = (athletes: Judoka[]) => {
  const aAthletes: Judoka[] = [];
  const bAthletes: Judoka[] = [];

  const randomAthletes = shuffleArray(athletes);
  randomAthletes.forEach((athlete, index) => {
    const isA = index % 2 === 0;
    if (isA) {
      aAthletes.push(athlete);
      return;
    }
    bAthletes.push(athlete);
  });

  return {
    A: createMatchesPool(aAthletes),
    B: createMatchesPool(bAthletes),
    aAthletes,
    bAthletes
  };
};

const getMatches = (
  pools: DoublePoolCategory['pools'],
  semifinals: DoublePoolCategory['semifinals'],
  finalMatch: DoublePoolCategory['finalMatch']
) => {
  const poolsMatch: Match[] = [];
  const { A, B } = pools;
  for (let index = 0; index < Math.max(A.length, B.length); index++) {
    const aMatch = A[index];
    if (aMatch) {
      poolsMatch.push(aMatch);
    }
    const bMatch = B[index];
    if (bMatch) {
      poolsMatch.push(bMatch);
    }
  }
  return [...poolsMatch, ...semifinals, finalMatch];
};

export const createDoublePool = (
  name: string,
  athletes: Judoka[],
  duration: number
): Omit<DoublePoolCategory, '_id'> => {
  const pools = createPools(athletes);
  const semifinals: DoublePoolCategory['semifinals'] = [createMatch(), createMatch()];
  const finalMatch = createMatch();
  const matches = getMatches(pools, semifinals, finalMatch);

  return {
    type: 'double_pool',
    name,
    athletes,
    matches,
    currentMatch: matches[0].id,
    duration,
    pools,
    semifinals,
    finalMatch
  };
};
