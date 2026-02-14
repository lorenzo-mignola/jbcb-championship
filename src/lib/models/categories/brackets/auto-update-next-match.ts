import type { Category } from '../../../types/category.type';
import type { Match } from '../../../types/match.type';

import { isByeMatch } from '../../ranking/category';

export function needSkipMatch(category: Category) {
  if (!category.currentMatch) {
    return;
  }

  const nextMatch = category.matches.find(
    match => match.id === category.currentMatch,
  );

  if (!nextMatch) {
    return false;
  }

  return isByeMatch(nextMatch);
}

export function getByeWinner(match: Match) {
  const { blue, white } = match;
  if (white) {
    return 'white';
  }
  if (blue) {
    return 'blue';
  }
  return undefined;
}
