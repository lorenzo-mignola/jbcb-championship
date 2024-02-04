import { insert } from 'ramda';
import type { PoolCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import { createMatch } from '../../match';
import { isNotByeMatch } from '../../ranking/category';

const rotateArray = (athletes: (Judoka | undefined)[]) => {
  const [first, ...others] = athletes;
  return [...others, first];
};

export const createMatchesPool = (athletes: Judoka[]) => {
  const isEvenPool = athletes.length % 2 === 0;
  const athletesLength = athletes.length + (isEvenPool ? 1 : 0);
  const matchPerRound = Math.floor(athletesLength / 2);
  const matches = [];
  let athletesInRound = JSON.parse(JSON.stringify(athletes)) as (Judoka | undefined)[];
  if (isEvenPool) {
    // add bye match
    const middleIndex = athletes.length / 2;
    athletesInRound = insert(middleIndex, undefined, athletesInRound);
  }
  for (let round = 0; round < athletesLength; round++) {
    const last = athletesLength - 2;
    for (let matchInRound = 0; matchInRound < matchPerRound; matchInRound++) {
      const white = athletesInRound[matchInRound];
      const blue = athletesInRound[last - matchInRound];
      const match = createMatch(white, blue);
      matches.push(match);
    }
    athletesInRound = rotateArray(athletesInRound);
  }
  return matches.filter(isNotByeMatch);
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
