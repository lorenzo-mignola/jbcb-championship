import type { BracketsCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';
import { getMatchType, getRoundByMatch } from './findRoundAndMatch';
import { updateLoserBrackets } from './updateLoserBrackets';
import { updateWinnerBrackets } from './updateWinnerBrackets';

export const updateBrackets = (brackets: BracketsCategory, match: Match) => {
  const type = getMatchType(brackets, match);
  if (type === null) {
    return brackets;
  }

  const { round, roundIndex } = getRoundByMatch(brackets.rounds, match, type);
  if (round === null || roundIndex === null) {
    return brackets;
  }

  if (type === 'winner') {
    return updateWinnerBrackets(brackets, round, roundIndex, match);
  }
  if (type === 'loser' || type === 'repechage') {
    return updateLoserBrackets(brackets, round, roundIndex, match, type);
  }

  return brackets;
};
