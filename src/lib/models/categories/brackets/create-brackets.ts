import type { BracketsCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import { getMatches } from './create-matches';
import { createRounds } from './create-rounds';

export const createBrackets = (
  name: string,
  athletes: Judoka[],
  duration: number
): Omit<BracketsCategory, '_id'> => {
  const rounds = createRounds(athletes);
  const matches = getMatches(rounds);
  return {
    type: 'brackets',
    name,
    athletes,
    matches,
    rounds,
    currentMatch: matches[0].id,
    duration
  };
};
