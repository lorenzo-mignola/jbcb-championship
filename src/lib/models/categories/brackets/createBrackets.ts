import { nanoid } from 'nanoid';
import type { BracketsCategory } from '../../../types/Category';
import type { Judoka } from '../../../types/Judoka';
import { getMatches } from './createMatches';
import { createRounds } from './createRounds';

export const createBrackets = (
  name: string,
  athletes: Judoka[],
  duration: number
): BracketsCategory => {
  const rounds = createRounds(athletes);
  const matches = getMatches(rounds);
  return {
    id: nanoid(),
    type: 'brackets',
    name,
    athletes,
    matches,
    rounds,
    currentMatch: matches[0].id,
    duration
  };
};
