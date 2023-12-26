import { produce } from 'immer';
import type { BracketRound, BracketsCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';
import { getMatchIndex, isWhiteOrBlueNext } from './findRoundAndMatch';

export const updateLoserBrackets = (
  brackets: BracketsCategory,
  round: BracketRound,
  roundIndex: number,
  match: Match,
  type: 'loser' | 'repechage'
) => {
  if (!match.winner) {
    return brackets.rounds;
  }
  const matchIndex = getMatchIndex(round, match, type);

  if (matchIndex === null) {
    return brackets.rounds;
  }

  const winner = match[match.winner!];

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

  return produce(brackets.rounds, (rounds) => {
    rounds[roundIndex] = currentRoundUpdated;
    rounds[roundIndex + 1] = nextRoundUpdated;
  });
};
