import type { BracketRound, Rounds } from '../../../types/Category';
import type { Match } from '../../../types/Match';

export const getRoundByMatch = (
  rounds: Rounds,
  match: Match,
  type: 'winner' | 'loser' | 'repechage'
) => {
  const roundIndex = rounds.findIndex((round) => round[type].some(({ id }) => id === match.id));

  if (roundIndex === -1) {
    return {
      round: null,
      roundIndex: null
    };
  }

  return {
    round: rounds[roundIndex],
    roundIndex
  };
};

export const getMatchIndex = (
  round: BracketRound,
  match: Match,
  type: 'winner' | 'loser' | 'repechage'
) => {
  const matchIndex = round[type].findIndex(({ id }) => id === match.id);

  if (matchIndex === -1) {
    return null;
  }
  return matchIndex;
};
