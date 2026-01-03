import type { DoublePoolCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import type { Match } from '../../../types/match.type';

import { createMatch } from '../../match';
import { shuffleArray } from '../../ranking/category';
import { createMatchesPool } from '../singlePool/create-single-pool';

function createPools(athletes: Judoka[]) {
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
    aAthletes,
    B: createMatchesPool(bAthletes),
    bAthletes,
  };
}

function getMatches(
  pools: DoublePoolCategory['pools'],
  semifinals: DoublePoolCategory['semifinals'],
  finalMatch: DoublePoolCategory['finalMatch'],
) {
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
}

export function createDoublePool(
  name: string,
  athletes: Judoka[],
  duration: number,
  tournament = '',
): Omit<DoublePoolCategory, 'id'> {
  const pools = createPools(athletes);
  const semifinals: DoublePoolCategory['semifinals'] = [
    createMatch(),
    createMatch(),
  ];
  const finalMatch = createMatch();
  const matches = getMatches(pools, semifinals, finalMatch);

  return {
    athletes,
    currentMatch: matches[0].id,
    duration,
    finalMatch,
    matches,
    name,
    pools,
    semifinals,
    tournament,
    type: 'double_pool',
  };
}
