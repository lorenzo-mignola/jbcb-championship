import { produce } from 'immer';
import type { BracketsCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';
import { getMatches } from './createMatches';
import { getMatchIndex, getRoundByMatch } from './findRoundAndMatch';

export const updateLoserBrackets = (
  brackets: BracketsCategory,
  match: Match,
  type: 'loser' | 'repechage'
) => {
  if (!match.winner) {
    return brackets;
  }

  const { round, roundIndex } = getRoundByMatch(brackets.rounds, match, type);

  if (round === null || roundIndex === null) {
    return brackets;
  }

  const matchIndex = getMatchIndex(round, match, type);

  if (matchIndex === null) {
    return brackets;
  }

  const winner = match[match.winner];

  const nextMatchIndex = type === 'loser' ? matchIndex : Math.floor(matchIndex / 2);

  if (type === 'loser') {
    const currentRoundUpdated = produce(round, (currentRound) => {
      currentRound.repechage[nextMatchIndex].blue = winner;
    });

    const roundsUpdated = produce(brackets.rounds, (rounds) => {
      rounds[roundIndex] = currentRoundUpdated;
    });

    const matches = getMatches(roundsUpdated);

    return {
      ...brackets,
      rounds: roundsUpdated,
      matches
    };
  }
  return brackets;
};
