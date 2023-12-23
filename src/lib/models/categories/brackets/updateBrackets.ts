import type { BracketRound, BracketsCategory } from '../../../types/Category';
import type { JudokaType, Match } from '../../../types/Match';
import { getMatches } from './createMatches';

const updateWinner = (round: BracketRound, matchUpdated: Partial<Match>, indexMatch: number) =>
  round.winner.map((match, index) => {
    if (index !== indexMatch) {
      return match;
    }
    return { ...match, ...matchUpdated };
  });

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

  const round = brackets.rounds[roundIndex];
  const matchIndex = round.winner.findIndex(({ id }) => id === match.id);

  if (roundIndex === -1) {
    return brackets;
  }

  const originalMatch = round.winner[matchIndex];

  const nextRoundIndex = roundIndex + 1;
  const nextRound = brackets.rounds[nextRoundIndex];
  const nextMatchInRound = Math.floor(matchIndex / 2);
  // const isOddRound = roundIndex % 2 !== 0;
  // const nextRoundMatchesLength = nextRound.winner.length;
  // const loserNextMatchInRound = Math.floor(
  //   (isOddRound ? nextRoundMatchesLength - 1 - matchIndex : 0 + matchIndex) / 2
  // );
  const isOddMatch = matchIndex % 2 !== 0;
  const isWhiteOrBlueNext: JudokaType = isOddMatch ? 'blue' : 'white';
  const winner = match[match.winner];

  const nextRoundUpdated = {
    ...nextRound,
    winner: updateWinner(
      nextRound,
      {
        [isWhiteOrBlueNext]: winner
      },
      nextMatchInRound
    )
  };

  const matchUpdated = {
    ...originalMatch,
    ...match
  };

  const currentRoundUpdated = {
    ...round,
    winner: updateWinner(round, matchUpdated, nextMatchInRound)
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

  const matches = getMatches(roundsUpdated);

  return {
    ...brackets,
    rounds: roundsUpdated,
    matches
  };
};
