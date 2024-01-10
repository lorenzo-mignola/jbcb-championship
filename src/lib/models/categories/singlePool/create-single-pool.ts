import type { PoolCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import { createMatch } from '../../match';

const rotateArray = (athletes: Judoka[]) => {
  const [first, ...others] = athletes;
  return [...others, first];
};

export const createMatchesPool = (athletes: Judoka[]) => {
  const athletesLength = athletes.length;
  const isOddPool = athletesLength % 2 !== 0;
  const matchPerRound = Math.floor(athletesLength / 2);
  const rounds = athletesLength - (isOddPool ? 0 : 1);
  const matches = [];
  let athletesInRound = JSON.parse(JSON.stringify(athletes)) as Judoka[];
  for (let round = 0; round < rounds; round++) {
    const last = athletesLength - (isOddPool ? 2 : 1);
    for (let matchInRound = 0; matchInRound < matchPerRound; matchInRound++) {
      const white = athletesInRound[matchInRound];
      const blue = athletesInRound[last - matchInRound];
      const match = createMatch(white, blue);
      matches.push(match);
    }
    athletesInRound = rotateArray(athletesInRound);
  }
  return matches;
};

export const createSinglePool = (
  name: string,
  athletes: Judoka[],
  duration: number
): Omit<PoolCategory, 'id'> => {
  const matches = createMatchesPool(athletes);
  return {
    type: 'pool',
    name,
    athletes,
    matches,
    currentMatch: matches[0].id,
    duration
  };
};
