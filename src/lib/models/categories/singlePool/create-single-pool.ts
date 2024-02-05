import { clone, reverse } from 'ramda';
import type { PoolCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import type { Match } from '../../../types/match.type';
import { createMatch } from '../../match';
import { isNotByeMatch } from '../../ranking/category';

const getRound = (groupA: (Judoka | undefined)[], groupB: (Judoka | undefined)[]) => {
  const total: Match[] = [];
  groupA.forEach((p, i) => {
    const white = groupA[i];
    const blue = groupB[i];
    const match = createMatch(white, blue);
    total.push(match);
  });
  return total;
};

export const createMatchesPool = (athletes: Judoka[]) => {
  const matches: Match[] = [];

  const athletesArray = clone<(Judoka | undefined)[]>(athletes);
  const isOdd = athletesArray.length % 2 !== 0;
  if (isOdd) {
    athletesArray.push(undefined);
  }

  const athleteLength = athletesArray.length;

  const half = Math.ceil(athleteLength / 2);
  const groupA = athletesArray.slice(0, half);
  const groupB = reverse(athletesArray.slice(half, athleteLength));

  for (let round = 0; round < athletesArray.length - 1; round++) {
    if (round !== 0) {
      // rotate the groups
      groupA.splice(1, 0, groupB.shift());
      groupB.push(groupA.pop());
    }
    getRound(groupA, groupB)
      .filter(isNotByeMatch)
      .forEach((match) => matches.push(match));
  }

  return matches;
};

export const createSinglePool = (
  name: string,
  athletes: Judoka[],
  duration: number,
  tournament = ''
): Omit<PoolCategory, 'id'> => {
  const matches = createMatchesPool(athletes);
  return {
    type: 'pool',
    name,
    tournament,
    athletes,
    matches,
    currentMatch: matches[0].id,
    duration
  };
};
