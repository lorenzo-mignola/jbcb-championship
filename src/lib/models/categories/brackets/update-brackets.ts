import type { BracketsCategory } from '../../../types/category.type';
import type { Match } from '../../../types/match.type';
import { getMatches } from './create-matches';
import { getMatchType, getRoundByMatch } from './find-round-and-match';
import { getCurrentMatch } from './get-current-match';
import { updateLoserBrackets } from './update-loser-brackets';
import { updateWinnerBrackets } from './update-winner-brackets';

export const updateBrackets = (brackets: BracketsCategory, match: Match): BracketsCategory => {
  const type = getMatchType(brackets, match);
  if (type === null) {
    return brackets;
  }

  const { round, roundIndex } = getRoundByMatch(brackets.rounds, match, type);
  if (round === null) {
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
