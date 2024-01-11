import type { BracketsCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';
import { getMatches } from './create-matches';
import { createRounds } from './create-rounds';

export const createBrackets = (
  name: string,
  athletes: Judoka[],
  duration: number,
  tournament?: string
): Omit<BracketsCategory, 'id'> => {
  const rounds = createRounds(athletes);
  const matches = getMatches(rounds);
  return {
    type: 'brackets',
    name,
    tournament,
    athletes,
    matches,
    rounds,
    currentMatch: matches[0].id,
    duration
  };
};
