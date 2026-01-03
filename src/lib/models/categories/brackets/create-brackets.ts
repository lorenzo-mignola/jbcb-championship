import type { BracketsCategory } from '../../../types/category.type';
import type { Judoka } from '../../../types/judoka.type';

import { getMatches } from './create-matches';
import { createRounds } from './create-rounds';

export function createBrackets(
  name: string,
  athletes: Judoka[],
  duration: number,
  tournament = '',
): Omit<BracketsCategory, 'id'> {
  const rounds = createRounds(athletes);
  const matches = getMatches(rounds);
  return {
    athletes,
    currentMatch: matches[0].id,
    duration,
    matches,
    name,
    rounds,
    tournament,
    type: 'brackets',
  };
}
