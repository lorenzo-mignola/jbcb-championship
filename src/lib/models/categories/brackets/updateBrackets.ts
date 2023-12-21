import type { BracketsCategory } from '../../../types/Category';
import type { Match } from '../../../types/Match';

export const updateBrackets = (brackets: BracketsCategory, match: Match) => {
  if (!match.winner) {
    return brackets;
  }

  const roundIndex = brackets.rounds.findIndex(({ winner }) =>
    winner.some(({ id }) => id === match.id)
  );

  if (roundIndex === -1) {
    return brackets;
  }

  const isOddRound = roundIndex % 2 !== 0;

  const round = brackets.rounds[roundIndex];
  const matchIndex = round.winner.findIndex(({ id }) => id === match.id);

  if (roundIndex === -1) {
    return brackets;
  }

  const originalMatch = round.winner[matchIndex];

  const nextRoundIndex = roundIndex + 1;
  const nextRound = brackets.rounds[nextRoundIndex];
  const nextRoundMatchesLength = nextRound.winner.length;
  const nextMatchInRound = isOddRound ? nextRoundMatchesLength - 1 - matchIndex : 0 + matchIndex;
  const isWhiteOrBlueNext = isOddRound ? 'white' : ('blue' as const);
  const winner = match[match.winner];

  const nextRoundUpdated = {
    ...nextRound,
    winner: nextRound.winner.map((match, index) => {
      if (index !== nextMatchInRound) {
        return match;
      }
      return {
        ...match,
        [isWhiteOrBlueNext]: winner
      };
    })
  };

  // nextRound.winner[nextMatchInRound][isWhiteOrBlueNext] = winner;

  const matchUpdated = {
    ...originalMatch,
    ...match
  };

  const currentRoundUpdated = {
    ...round,
    winner: round.winner.map((match, index) => {
      if (index !== nextMatchInRound) {
        return match;
      }
      return matchUpdated;
    })
  };

  const roundsUpdated = brackets.rounds.map((round, index) => {
    if (index === roundIndex) {
      return currentRoundUpdated;
    }
    if (index === nextRoundIndex) {
      return nextRoundUpdated;
    }
    return round;
  });

  return {
    ...brackets,
    rounds: roundsUpdated
  };
};
