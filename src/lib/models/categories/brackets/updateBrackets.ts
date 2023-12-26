import type { BracketsCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';
import { getMatches } from './createMatches';
import { getMatchType, getRoundByMatch } from './findRoundAndMatch';
import { getCurrentMatch } from './getCurrentMatch';
import { updateLoserBrackets } from './updateLoserBrackets';
import { updateWinnerBrackets } from './updateWinnerBrackets';

export const updateBrackets = (brackets: BracketsCategory, match: Match): BracketsCategory => {
  const type = getMatchType(brackets, match);
  if (type === null) {
    return brackets;
  }

  const { round, roundIndex } = getRoundByMatch(brackets.rounds, match, type);
  if (round === null || roundIndex === null) {
    return brackets;
  }

  let rounds = brackets.rounds;
  if (type === 'winner') {
    rounds = updateWinnerBrackets(brackets, round, roundIndex, match);
  }
  if (type === 'loser' || type === 'repechage') {
    rounds = updateLoserBrackets(brackets, round, roundIndex, match, type);
  }

  const matches = getMatches(rounds);
  const currentMatch = getCurrentMatch(brackets.matches, match.id);
  return {
    ...brackets,
    rounds,
    matches,
    currentMatch
  };
};
