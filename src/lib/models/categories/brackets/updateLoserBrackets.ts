import { produce } from 'immer';
import type { BracketsCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';
import { getMatches } from './createMatches';
import { getMatchIndex, getRoundByMatch, isWhiteOrBlueNext } from './findRoundAndMatch';

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

  const currentRoundUpdated = produce(round, (currentRound) => {
    if (type === 'loser') {
      currentRound.repechage[nextMatchIndex].blue = winner;
    }
    currentRound.loser[matchIndex] = match;
  });

  const nextRoundIndex = roundIndex + 1;
  const nextRoundUpdated = produce(brackets.rounds[nextRoundIndex], (nextRound) => {
    if (type === 'loser') {
      return;
    }
    const isLastRound = nextRoundIndex === brackets.rounds.length - 1;
    if (!isLastRound) {
      const whiteOrBlue = isWhiteOrBlueNext(matchIndex);
      nextRound.loser[nextMatchIndex][whiteOrBlue] = winner;
    }
  });

  const roundsUpdated = produce(brackets.rounds, (rounds) => {
    rounds[roundIndex] = currentRoundUpdated;
    rounds[roundIndex + 1] = nextRoundUpdated;
  });

  const matches = getMatches(roundsUpdated);

  return {
    ...brackets,
    rounds: roundsUpdated,
    matches
  };
};
